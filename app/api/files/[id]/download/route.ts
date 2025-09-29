import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FileService } from '@/lib/services/file-service';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const params = await context.params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fileId = params.id;
    const file = await FileService.getFileById(fileId);

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Increment download count
    await FileService.incrementDownloadCount(fileId);

    // Return file info for client-side download
    return NextResponse.json({
      file: {
        id: file.id,
        name: file.originalName,
        filePath: file.filePath,
        fileSize: file.fileSize,
        mimeType: file.mimeType
      },
      success: true
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}