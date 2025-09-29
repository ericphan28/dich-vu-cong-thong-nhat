import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FileService } from '@/lib/services/file-service';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await FileService.getFileStats();

    return NextResponse.json({
      stats,
      success: true
    });

  } catch (error) {
    console.error('Fetch stats error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}