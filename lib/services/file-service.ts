import { createClient } from '@/lib/supabase/server';
import { FileDocument, FileCategory, FileSearchParams } from '@/lib/types/file-management';

export class FileService {
  
  static async getFiles(params: FileSearchParams = {}): Promise<{
    files: FileDocument[];
    total: number;
  }> {
    const supabase = await createClient();
    
    let query = supabase
      .from('file_documents')
      .select(`
        *,
        category:file_categories (
          id,
          name,
          description,
          icon,
          color
        )
      `, { count: 'exact' })
      .eq('is_active', true);

    // Apply filters
    if (params.categoryId && params.categoryId !== 'all') {
      query = query.eq('category_id', params.categoryId);
    }

    if (params.query) {
      query = query.or(`name.ilike.%${params.query}%,description.ilike.%${params.query}%`);
    }

    if (params.fileType) {
      query = query.eq('file_type', params.fileType);
    }

    if (params.tags && params.tags.length > 0) {
      query = query.overlaps('tags', params.tags);
    }

    if (params.dateFrom) {
      query = query.gte('uploaded_at', params.dateFrom.toISOString());
    }

    if (params.dateTo) {
      query = query.lte('uploaded_at', params.dateTo.toISOString());
    }

    // Apply sorting
    const sortBy = params.sortBy || 'uploaded_at';
    const sortOrder = params.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching files:', error);
      throw new Error('Failed to fetch files');
    }

    // Transform data to match our interface
    const files: FileDocument[] = (data || []).map(item => ({
      ...item,
      uploadedAt: new Date(item.uploaded_at),
      updatedAt: new Date(item.updated_at),
      category: item.category
    }));

    return {
      files,
      total: count || 0
    };
  }

  static async getCategories(): Promise<FileCategory[]> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('file_categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }

    return data || [];
  }

  static async getFileById(id: string): Promise<FileDocument | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('file_documents')
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
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching file:', error);
      return null;
    }

    return {
      ...data,
      uploadedAt: new Date(data.uploaded_at),
      updatedAt: new Date(data.updated_at),
      category: data.category
    };
  }

  static async incrementDownloadCount(fileId: string): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase.rpc('increment_download_count', {
      file_id: fileId
    });

    if (error) {
      console.error('Error incrementing download count:', error);
    }
  }

  static async deleteFile(fileId: string): Promise<void> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('file_documents')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', fileId);

    if (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }

  static async updateFile(fileId: string, updates: Partial<FileDocument>): Promise<FileDocument> {
    const supabase = await createClient();
    
    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (updates.name) updateData.name = updates.name;
    if (updates.description) updateData.description = updates.description;
    if (updates.tags) updateData.tags = updates.tags;
    if (updates.categoryId) updateData.category_id = updates.categoryId;

    const { data, error } = await supabase
      .from('file_documents')
      .update(updateData)
      .eq('id', fileId)
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
      console.error('Error updating file:', error);
      throw new Error('Failed to update file');
    }

    return {
      ...data,
      uploadedAt: new Date(data.uploaded_at),
      updatedAt: new Date(data.updated_at),
      category: data.category
    };
  }

  static async getFileStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    categoryStats: Array<{
      categoryId: string;
      categoryName: string;
      count: number;
      totalSize: number;
    }>;
  }> {
    const supabase = await createClient();

    // Get total files and size
    const { data: totalData, error: totalError } = await supabase
      .from('file_documents')
      .select('file_size')
      .eq('is_active', true);

    if (totalError) {
      console.error('Error fetching total stats:', totalError);
      throw new Error('Failed to fetch file stats');
    }

    const totalFiles = totalData?.length || 0;
    const totalSize = totalData?.reduce((sum, file) => sum + (file.file_size || 0), 0) || 0;

    // Get category stats
    const { data: categoryData, error: categoryError } = await supabase
      .from('file_documents')
      .select(`
        category_id,
        file_size,
        category:file_categories (
          name
        )
      `)
      .eq('is_active', true);

    if (categoryError) {
      console.error('Error fetching category stats:', categoryError);
      throw new Error('Failed to fetch category stats');
    }

    // Group by category
    const categoryMap = new Map();
    categoryData?.forEach(file => {
      const categoryId = file.category_id;
      const categoryName = (file.category as any)?.name || 'Unknown';
      
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          categoryId,
          categoryName,
          count: 0,
          totalSize: 0
        });
      }
      
      const stats = categoryMap.get(categoryId);
      stats.count++;
      stats.totalSize += file.file_size || 0;
    });

    const categoryStats = Array.from(categoryMap.values());

    return {
      totalFiles,
      totalSize,
      categoryStats
    };
  }
}