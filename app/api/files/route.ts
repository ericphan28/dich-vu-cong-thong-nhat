import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FileService } from '@/lib/services/file-service';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';
import { 
  FileDocument, 
  categorizeFileByName, 
  getFileTypeInfo,
  SUPPORTED_FILE_TYPES 
} from '@/lib/types/file-management';

// Maximum file size (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Upload directory
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'files');

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadedFiles: FileDocument[] = [];

    // Ensure upload directory exists
    await mkdir(UPLOAD_DIR, { recursive: true });

    for (const file of files) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({
          error: `File ${file.name} is too large. Maximum size is 50MB.`
        }, { status: 400 });
      }

      // Validate file type
      const fileTypeInfo = getFileTypeInfo(file.name);
      if (fileTypeInfo.type === 'unknown') {
        return NextResponse.json({
          error: `File type not supported for ${file.name}`
        }, { status: 400 });
      }

      // Generate unique filename
      const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
      const uniqueFileName = `${nanoid()}_${Date.now()}${fileExtension}`;
      const filePath = join(UPLOAD_DIR, uniqueFileName);

      // Save file to disk
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);

      // Auto-categorize based on filename
      const categoryId = categorizeFileByName(file.name);

      // Create file document
      const fileDocument: Omit<FileDocument, 'id'> = {
        name: file.name.replace(fileExtension, ''),
        originalName: file.name,
        fileName: uniqueFileName,
        filePath: `/uploads/files/${uniqueFileName}`,
        fileSize: file.size,
        fileType: fileTypeInfo.type,
        mimeType: file.type,
        categoryId,
        description: `Tài liệu ${fileTypeInfo.name}`,
        tags: extractTagsFromFileName(file.name),
        uploadedBy: user.id,
        uploadedAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        downloadCount: 0,
        metadata: {
          originalMimeType: file.type,
          uploadedFromIP: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
        }
      };

      // Save to database
      const { data: savedFile, error } = await supabase
        .from('file_documents')
        .insert({
          name: fileDocument.name,
          original_name: fileDocument.originalName,
          file_name: fileDocument.fileName,
          file_path: fileDocument.filePath,
          file_size: fileDocument.fileSize,
          file_type: fileDocument.fileType,
          mime_type: fileDocument.mimeType,
          category_id: fileDocument.categoryId,
          description: fileDocument.description,
          tags: fileDocument.tags,
          uploaded_by: user.id,
          is_active: true,
          download_count: 0,
          metadata: fileDocument.metadata
        })
        .select(`
          *,
          category:file_categories (
            id,
            name,
            description,
            icon,
            color
          )
        `)
        .single();

      if (error) {
        console.error('Database error:', error);
        return NextResponse.json({
          error: `Failed to save file ${file.name} to database`
        }, { status: 500 });
      }

      uploadedFiles.push(savedFile);
    }

    return NextResponse.json({
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      files: uploadedFiles
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const search = searchParams.get('search') || undefined;
    const fileType = searchParams.get('fileType') || undefined;
    const sortBy = (searchParams.get('sortBy') || 'uploadedAt') as any;
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

    const { files, total } = await FileService.getFiles({
      categoryId,
      query: search,
      fileType,
      sortBy,
      sortOrder
    });

    return NextResponse.json({
      files,
      total,
      success: true
    });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json({ error: 'File ID required' }, { status: 400 });
    }

    await FileService.deleteFile(fileId);

    return NextResponse.json({ 
      message: 'File deleted successfully',
      success: true 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Helper function to extract tags from filename
function extractTagsFromFileName(fileName: string): string[] {
  const tags: string[] = [];
  const name = fileName.toLowerCase();

  // Common tag patterns
  const tagPatterns = [
    { pattern: /bưu|post|vnpost/, tag: 'Bưu chính' },
    { pattern: /bhyt|bảo hiểm/, tag: 'BHYT' },
    { pattern: /học|giáo dục|hs-gv/, tag: 'Giáo dục' },
    { pattern: /quyết định|qđ/, tag: 'Quyết định' },
    { pattern: /giá|phí|cước/, tag: 'Giá cước' },
    { pattern: /slide|presentation|ppt/, tag: 'Thuyết trình' },
    { pattern: /kế hoạch|plan/, tag: 'Kế hoạch' },
    { pattern: /hướng dẫn|guide/, tag: 'Hướng dẫn' },
    { pattern: /thông báo|notice/, tag: 'Thông báo' },
    { pattern: /2025|2024/, tag: name.match(/202\d/)?.[0] || '' }
  ];

  tagPatterns.forEach(({ pattern, tag }) => {
    if (pattern.test(name) && tag) {
      tags.push(tag);
    }
  });

  return [...new Set(tags)]; // Remove duplicates
}