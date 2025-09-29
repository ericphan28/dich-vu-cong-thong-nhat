import fs from 'fs';
import path from 'path';
import { categorizeFileByName, getFileTypeInfo } from '../lib/types/file-management';

interface RealFileData {
  name: string;
  originalName: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  mimeType: string;
  categoryId: string;
  description: string;
  tags: string[];
}

// MIME type mapping
const mimeTypes: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xls': 'application/vnd.ms-excel',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc': 'application/msword',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp'
};

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
    { pattern: /thống nhất/, tag: 'Thống Nhất' },
    { pattern: /2025|2024/, tag: name.match(/202\d/)?.[0] || '' },
    { pattern: /final/, tag: 'Phiên bản cuối' },
    { pattern: /v1|version/, tag: 'Phiên bản' }
  ];

  tagPatterns.forEach(({ pattern, tag }) => {
    if (pattern.test(name) && tag) {
      tags.push(tag);
    }
  });

  return [...new Set(tags)]; // Remove duplicates
}

function generateDescription(fileName: string, fileType: string): string {
  const name = fileName.toLowerCase();
  
  // Generate smart descriptions
  if (name.includes('giải pháp') && name.includes('2025')) {
    return 'Tài liệu trình bày giải pháp đột phá cho 6 tháng cuối năm 2025 của Phòng Phát triển Bưu chính Logistics';
  }
  
  if (name.includes('slide') && name.includes('bdt')) {
    return 'Slide trao đổi nội dung giữa Ban Điều tra Trung ương và các tỉnh thí điểm thực hiện cải cách hành chính';
  }
  
  if (name.includes('gia han') && name.includes('tmđt')) {
    return 'Quyết định gia hạn thực hiện chính sách khối lượng Bưu gửi Thương mại điện tử đồng giá';
  }
  
  if (name.includes('hướng dẫn') && name.includes('khhd')) {
    return 'Tài liệu hướng dẫn chi tiết quy trình xây dựng Kế hoạch Hoạt động hàng năm';
  }
  
  if (name.includes('bhhs') && name.includes('vnpost')) {
    return 'Bản đề xuất chính sách Bảo hiểm Hỗ trợ Sức khỏe của VNPOST Đông Nam Bộ cho khu vực huyện Thống Nhất';
  }
  
  if (name.includes('cước') && name.includes('hàng nặng')) {
    return 'Bảng cước phí dịch vụ chuyển phát hàng nặng và cồng kềnh theo tiêu chuẩn mới phiên bản 1';
  }
  
  if (name.includes('dịch vụ bưu chính')) {
    return 'Tổng quan về các dịch vụ Bưu chính Chuyển phát Quốc tế và Trong nước của VNPOST';
  }
  
  if (name.includes('quyết định') && name.includes('bhyt')) {
    return 'Quyết định phân bổ và giao chỉ tiêu thực hiện Bảo hiểm Y tế tại địa bàn Xã Thống Nhất';
  }
  
  if (name.includes('thư ngỏ') && name.includes('hs-gv')) {
    return 'Thư ngỏ thông báo về mức phí đóng góp Học sinh - Giáo viên cho năm học 2025-2026';
  }
  
  if (name.includes('dịch vụ công')) {
    return 'Hình ảnh minh họa về dịch vụ công trực tuyến đầu giây, thể hiện tính tiện lợi và nhanh chóng';
  }
  
  // Default description based on file type
  const typeMap: Record<string, string> = {
    'pdf': 'Tài liệu PDF',
    'powerpoint': 'Bài thuyết trình PowerPoint',
    'excel': 'Bảng tính Excel',
    'word': 'Tài liệu Word',
    'image': 'Hình ảnh minh họa'
  };
  
  return `${typeMap[fileType] || 'Tài liệu'} - ${fileName}`;
}

export function scanFileGocDirectory(): RealFileData[] {
  const fileGocPath = path.join(process.cwd(), 'public', 'images', 'file-goc');
  const realFiles: RealFileData[] = [];
  
  try {
    if (!fs.existsSync(fileGocPath)) {
      console.log('File-goc directory not found:', fileGocPath);
      return realFiles;
    }
    
    const files = fs.readdirSync(fileGocPath);
    console.log(`Found ${files.length} files in file-goc directory`);
    
    files.forEach((file, index) => {
      try {
        const filePath = path.join(fileGocPath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile()) {
          const ext = path.extname(file).toLowerCase();
          const fileTypeInfo = getFileTypeInfo(file);
          const categoryId = categorizeFileByName(file);
          
          // Generate clean name (remove extension and clean up)
          const nameWithoutExt = path.basename(file, ext);
          const cleanName = nameWithoutExt
            .replace(/^\d+\.?\s*/, '') // Remove leading numbers
            .replace(/\s+/g, ' ') // Normalize spaces
            .trim();
          
          const fileData: RealFileData = {
            name: cleanName,
            originalName: file,
            fileName: `${Date.now()}_${index}_${file.replace(/[^a-zA-Z0-9._-]/g, '_')}`,
            filePath: `/images/file-goc/${file}`,
            fileSize: stats.size,
            fileType: fileTypeInfo.type,
            mimeType: mimeTypes[ext] || 'application/octet-stream',
            categoryId: categoryId,
            description: generateDescription(file, fileTypeInfo.type),
            tags: extractTagsFromFileName(file)
          };
          
          realFiles.push(fileData);
          console.log(`Processed: ${file} (${stats.size} bytes) -> Category: ${categoryId}`);
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
      }
    });
    
  } catch (error) {
    console.error('Error scanning file-goc directory:', error);
  }
  
  return realFiles;
}

export function generateRealDataSQL(): string {
  const realFiles = scanFileGocDirectory();
  
  if (realFiles.length === 0) {
    return '-- No files found in file-goc directory';
  }
  
  let sql = `-- Real data from file-goc directory (${realFiles.length} files)\n\n`;
  
  realFiles.forEach((file, index) => {
    const tagsSQL = file.tags.length > 0 
      ? `ARRAY[${file.tags.map(tag => `'${tag.replace(/'/g, "''")}'`).join(', ')}]`
      : 'ARRAY[]::TEXT[]';
    
    sql += `INSERT INTO file_documents (
  name, original_name, file_name, file_path, file_size, file_type, mime_type, 
  category_id, description, tags, uploaded_by, is_active, download_count
) VALUES (
  '${file.name.replace(/'/g, "''")}',
  '${file.originalName.replace(/'/g, "''")}',
  '${file.fileName.replace(/'/g, "''")}',
  '${file.filePath.replace(/'/g, "''")}',
  ${file.fileSize},
  '${file.fileType}',
  '${file.mimeType}',
  '${file.categoryId}',
  '${file.description.replace(/'/g, "''")}',
  ${tagsSQL},
  (SELECT id FROM auth.users LIMIT 1),
  true,
  ${Math.floor(Math.random() * 50) + 1}
);\n\n`;
  });
  
  return sql;
}

// Export for use in API or CLI
export type { RealFileData };

// If running directly
if (require.main === module) {
  console.log('Scanning file-goc directory for real files...\n');
  
  const realFiles = scanFileGocDirectory();
  const sql = generateRealDataSQL();
  
  console.log('\n=== SUMMARY ===');
  console.log(`Total files found: ${realFiles.length}`);
  
  // Group by category
  const byCategory = realFiles.reduce((acc, file) => {
    acc[file.categoryId] = (acc[file.categoryId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log('\nFiles by category:');
  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} files`);
  });
  
  console.log('\n=== GENERATED SQL ===');
  console.log(sql);
}