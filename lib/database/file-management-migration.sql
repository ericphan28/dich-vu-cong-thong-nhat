-- Database migration for File Management System

-- Create file_categories table
CREATE TABLE IF NOT EXISTS file_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create file_documents table
CREATE TABLE IF NOT EXISTS file_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  original_name VARCHAR(500) NOT NULL,
  file_name VARCHAR(500) NOT NULL UNIQUE,
  file_path VARCHAR(1000) NOT NULL,
  file_size BIGINT NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  mime_type VARCHAR(200),
  category_id VARCHAR(50) REFERENCES file_categories(id),
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  download_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'
);

-- Insert default file categories
INSERT INTO file_categories (id, name, description, icon, color) VALUES
('postal-services', 'Dịch Vụ Bưu Chính', 'Tài liệu liên quan đến dịch vụ bưu chính và chuyển phát', '📮', 'bg-blue-500'),
('insurance-health', 'Bảo Hiểm Y Tế', 'Quyết định và tài liệu BHYT', '🏥', 'bg-green-500'),
('education', 'Giáo Dục', 'Thông báo và tài liệu giáo dục, học phí', '🎓', 'bg-purple-500'),
('business-plans', 'Kế Hoạch Kinh Doanh', 'Presentations và kế hoạch phát triển', '📊', 'bg-orange-500'),
('regulations', 'Quy Định & Quyết Định', 'Các quyết định hành chính và quy định', '📋', 'bg-red-500'),
('administrative', 'Hành Chính', 'Tài liệu hành chính tổng quát', '🏛️', 'bg-gray-500')
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_file_documents_category_id ON file_documents(category_id);
CREATE INDEX IF NOT EXISTS idx_file_documents_uploaded_by ON file_documents(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_file_documents_uploaded_at ON file_documents(uploaded_at);
CREATE INDEX IF NOT EXISTS idx_file_documents_is_active ON file_documents(is_active);
CREATE INDEX IF NOT EXISTS idx_file_documents_name ON file_documents USING gin(to_tsvector('simple', name));
CREATE INDEX IF NOT EXISTS idx_file_documents_tags ON file_documents USING gin(tags);

-- Enable Row Level Security (RLS)
ALTER TABLE file_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for file_categories (public read)
CREATE POLICY "file_categories_public_read" ON file_categories
  FOR SELECT USING (true);

-- RLS Policies for file_documents
-- Users can read all active files
CREATE POLICY "file_documents_read" ON file_documents
  FOR SELECT USING (is_active = true);

-- Users can insert their own files
CREATE POLICY "file_documents_insert" ON file_documents
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- Users can update their own files
CREATE POLICY "file_documents_update" ON file_documents
  FOR UPDATE USING (auth.uid() = uploaded_by);

-- Users can delete (soft delete) their own files
CREATE POLICY "file_documents_delete" ON file_documents
  FOR DELETE USING (auth.uid() = uploaded_by);

-- Create a function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_file_categories_updated_at 
  BEFORE UPDATE ON file_categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_file_documents_updated_at 
  BEFORE UPDATE ON file_documents 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(file_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE file_documents 
  SET download_count = download_count + 1,
      updated_at = NOW()
  WHERE id = file_id AND is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_download_count(UUID) TO authenticated;