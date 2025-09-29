import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FileService } from '@/lib/services/file-service';

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PUT(
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
    const updates = await request.json();

    const updatedFile = await FileService.updateFile(fileId, updates);

    return NextResponse.json({
      file: updatedFile,
      message: 'File updated successfully',
      success: true
    });

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({
      error: 'Failed to update file'
    }, { status: 500 });
  }
}

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

    return NextResponse.json({
      file,
      success: true
    });

  } catch (error) {
    console.error('Fetch file error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}