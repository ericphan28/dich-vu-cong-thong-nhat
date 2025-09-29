-- File Management System Database Setup
-- Execute this in Supabase SQL Editor

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
DROP POLICY IF EXISTS "file_categories_public_read" ON file_categories;
CREATE POLICY "file_categories_public_read" ON file_categories
  FOR SELECT USING (true);

-- RLS Policies for file_documents
-- Users can read all active files
DROP POLICY IF EXISTS "file_documents_read" ON file_documents;
CREATE POLICY "file_documents_read" ON file_documents
  FOR SELECT USING (is_active = true);

-- Users can insert their own files
DROP POLICY IF EXISTS "file_documents_insert" ON file_documents;
CREATE POLICY "file_documents_insert" ON file_documents
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

-- Users can update their own files
DROP POLICY IF EXISTS "file_documents_update" ON file_documents;
CREATE POLICY "file_documents_update" ON file_documents
  FOR UPDATE USING (auth.uid() = uploaded_by);

-- Users can delete (soft delete) their own files
DROP POLICY IF EXISTS "file_documents_delete" ON file_documents;
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
DROP TRIGGER IF EXISTS update_file_categories_updated_at ON file_categories;
CREATE TRIGGER update_file_categories_updated_at 
  BEFORE UPDATE ON file_categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_file_documents_updated_at ON file_documents;
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

-- Insert sample data from file-goc folder
INSERT INTO file_documents (
  name, original_name, file_name, file_path, file_size, file_type, mime_type, 
  category_id, description, tags, uploaded_by, is_active, download_count
) VALUES
(
  'GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL',
  '250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx',
  '250625_giai_phap_dot_pha.pptx',
  '/images/file-goc/250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx',
  2457600,
  'powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'business-plans',
  'Giải pháp đột phá 6 tháng cuối năm 2025 - Phòng Phát triển Bưu chính Logistics',
  ARRAY['Giải pháp', 'Kế hoạch', '2025', 'Thuyết trình'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  15
),
(
  'Slide Nội dung trao đổi BDT TP về BĐX tỉnh thí điểm',
  '3107 slide Noi dung trao doi BDT TP ve BĐX_tỉnh thí điểm.pptx',
  '3107_slide_noi_dung_trao_doi.pptx',
  '/images/file-goc/3107 slide Noi dung trao doi BDT TP ve BĐX_tỉnh thí điểm.pptx',
  1843200,
  'powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'administrative',
  'Slide nội dung trao đổi Ban Điều tra Trung ương về Ban Điều tra tỉnh thí điểm',
  ARRAY['BĐT', 'Thí điểm', 'Thuyết trình', 'Hành chính'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  8
),
(
  'Gia hạn khối lượng BG TMĐT đồng giá',
  '4020. Gia han khôi luong BG TMĐT đồng giá.pdf',
  '4020_gia_han_khoi_luong_bg_tmdt.pdf',
  '/images/file-goc/4020. Gia han khôi luong BG TMĐT đồng giá.pdf',
  524288,
  'pdf',
  'application/pdf',
  'postal-services',
  'Quyết định gia hạn khối lượng Bưu gửi Thương mại điện tử đồng giá',
  ARRAY['Quyết định', 'Bưu chính', 'TMĐT', 'Gia hạn'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  12
),
(
  'HƯỚNG DẪN XÂY DỰNG KHHD',
  '6.1 HUONG DAN XAY DUNG KHHD.xlsx',
  '61_huong_dan_xay_dung_khhd.xlsx',
  '/images/file-goc/6.1 HUONG DAN XAY DUNG KHHD.xlsx',
  1048576,
  'excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'business-plans',
  'Hướng dẫn xây dựng Kế hoạch Hoạt động',
  ARRAY['Hướng dẫn', 'Kế hoạch', 'KHHD', 'Excel'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  25
),
(
  'BHHS Bản chào DBV DNB VNPOST - Thống Nhất',
  'BHHS_Bản chào_DBV DNB_VNPOST_Chỉ áp dụng đia bàn huyện Thống Nhất củ - final.docx',
  'bhhs_ban_chao_dbv_dnb_vnpost_thong_nhat.docx',
  '/images/file-goc/BHHS_Bản chào_DBV DNB_VNPOST_Chỉ áp dụng đia bàn huyện Thống Nhất củ - final.docx',
  2097152,
  'word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'insurance-health',
  'Bản chào Bảo hiểm Hỗ trợ Sức khỏe - Đông Nam Bộ VNPOST - Huyện Thống Nhất',
  ARRAY['BHHS', 'Bảo hiểm', 'VNPOST', 'Thống Nhất'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  7
),
(
  'Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh',
  'Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh (V1) CTN025.docx',
  'cuoc_dich_vu_tieu_chuan_hang_nang_cong_kenh.docx',
  '/images/file-goc/Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh (V1) CTN025.docx',
  1572864,
  'word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'postal-services',
  'Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh phiên bản 1 - CTN025',
  ARRAY['Giá cước', 'Bưu chính', 'Hàng nặng', 'Tiêu chuẩn'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  18
),
(
  'DỊCH VỤ BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC',
  'DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
  'dich_vu_buu_chinh_chuyen_phat_qt_trong_nuoc.pdf',
  '/images/file-goc/DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
  3145728,
  'pdf',
  'application/pdf',
  'postal-services',
  'Dịch vụ Bưu chính Chuyển phát Quốc tế và Trong nước',
  ARRAY['Bưu chính', 'Chuyển phát', 'Quốc tế', 'Trong nước'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  32
),
(
  'QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT',
  'QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT.pdf',
  'qd_giao_chi_tieu_bhyt_xa_thong_nhat.pdf',
  '/images/file-goc/QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT.pdf',
  786432,
  'pdf',
  'application/pdf',
  'insurance-health',
  'Quyết định giao chỉ tiêu Bảo hiểm Y tế tại Xã Thống Nhất',
  ARRAY['Quyết định', 'BHYT', 'Chỉ tiêu', 'Thống Nhất'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  14
),
(
  'Thư ngỏ Phí HS-GV năm học 2025-2026',
  'Thư ngỏ_ Phí HS-GV-năm học 2025-2026 .doc',
  'thu_ngo_phi_hs_gv_nam_hoc_2025_2026.doc',
  '/images/file-goc/Thư ngỏ_ Phí HS-GV-năm học 2025-2026 .doc',
  307200,
  'word',
  'application/msword',
  'education',
  'Thư ngỏ về Phí Học sinh - Giáo viên năm học 2025-2026',
  ARRAY['Thông báo', 'Học phí', 'HS-GV', '2025-2026', 'Giáo dục'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  21
),
(
  'Dịch vụ công đầu giây',
  'dich-vu-cong-dau-giay.jpg',
  'dich_vu_cong_dau_giay.jpg',
  '/images/file-goc/dich-vu-cong-dau-giay.jpg',
  156672,
  'image',
  'image/jpeg',
  'administrative',
  'Hình ảnh minh họa dịch vụ công đầu giây',
  ARRAY['Dịch vụ công', 'Hình ảnh', 'Minh họa'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  5
);