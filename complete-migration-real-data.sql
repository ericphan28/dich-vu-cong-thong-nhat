-- Migration: Complete File Management Setup with Real Data
-- Generated: September 29, 2025
-- Description: Creates file management system with real files from file-goc directory

-- ============================================
-- 1. CREATE EXTENSION AND ENABLE RLS
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. CREATE CATEGORIES TABLE
-- ============================================

-- Drop and recreate file_categories table
DROP TABLE IF EXISTS file_categories CASCADE;

CREATE TABLE file_categories (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'folder',
    color VARCHAR(50) DEFAULT 'blue',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE file_categories ENABLE ROW LEVEL SECURITY;

-- Create policy for file_categories
CREATE POLICY "Anyone can view categories" ON file_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage categories" ON file_categories 
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert categories
INSERT INTO file_categories (id, name, description, icon, color) VALUES
('postal-services', 'Dịch Vụ Bưu Chính', 'Các tài liệu liên quan đến dịch vụ bưu chính, chuyển phát', 'mail', 'blue'),
('insurance-health', 'Bảo Hiểm Y Tế', 'Tài liệu về bảo hiểm y tế, chính sách sức khỏe', 'heart', 'red'),
('education', 'Giáo Dục', 'Tài liệu giáo dục, đào tạo, học sinh - giáo viên', 'book', 'green'),
('business-plans', 'Kế Hoạch Kinh Doanh', 'Các kế hoạch, chiến lược phát triển kinh doanh', 'trending-up', 'purple'),
('regulations', 'Quy Định - Chính Sách', 'Các quy định, quyết định, chính sách của cơ quan', 'file-text', 'orange'),
('administrative', 'Hành Chính', 'Tài liệu hành chính, quy trình nội bộ', 'briefcase', 'gray');

-- ============================================
-- 3. CREATE DOCUMENTS TABLE
-- ============================================

-- Drop and recreate file_documents table
DROP TABLE IF EXISTS file_documents CASCADE;

CREATE TABLE file_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(500) NOT NULL,
    original_name VARCHAR(500) NOT NULL,
    file_name VARCHAR(500) NOT NULL UNIQUE,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL DEFAULT 0,
    file_type VARCHAR(50) NOT NULL,
    mime_type VARCHAR(200) NOT NULL,
    category_id TEXT NOT NULL REFERENCES file_categories(id) ON DELETE CASCADE,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE file_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for file_documents
CREATE POLICY "Anyone can view active documents" ON file_documents 
    FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage documents" ON file_documents 
    FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_file_documents_category ON file_documents(category_id);
CREATE INDEX IF NOT EXISTS idx_file_documents_active ON file_documents(is_active);
CREATE INDEX IF NOT EXISTS idx_file_documents_created_at ON file_documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_file_documents_tags ON file_documents USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_file_documents_search ON file_documents USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- ============================================
-- 4. CREATE UPDATE TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
DROP TRIGGER IF EXISTS update_file_categories_updated_at ON file_categories;
CREATE TRIGGER update_file_categories_updated_at 
    BEFORE UPDATE ON file_categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_file_documents_updated_at ON file_documents;
CREATE TRIGGER update_file_documents_updated_at 
    BEFORE UPDATE ON file_documents 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. INSERT REAL DATA FROM FILE-GOC DIRECTORY
-- ============================================

-- Real data from file-goc directory (11 files)
INSERT INTO file_documents (
  name, original_name, file_name, file_path, file_size, file_type, mime_type, 
  category_id, description, tags, uploaded_by, is_active, download_count
) VALUES 
(
  'GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL',
  '250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx',
  'giai_phap_dot_pha_2025_ppbl.pptx',
  '/images/file-goc/250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx',
  5329291,
  'powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'business-plans',
  'Tài liệu trình bày giải pháp đột phá cho 6 tháng cuối năm 2025 của Phòng Phát triển Bưu chính Logistics',
  ARRAY['Kế hoạch', '2025', 'Thuyết trình', 'Bưu chính'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  45
),
(
  'Slide Nội dung trao đổi BDT TP về BĐX tỉnh thí điểm',
  '3107 slide Noi dung trao doi BDT TP ve BĐX_tỉnh thí điểm.pptx',
  'slide_noi_dung_trao_doi_bdt_tp.pptx',
  '/images/file-goc/3107 slide Noi dung trao doi BDT TP ve BĐX_tỉnh thí điểm.pptx',
  2799322,
  'powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'administrative',
  'Slide trao đổi nội dung giữa Ban Điều tra Trung ương và các tỉnh thí điểm về cải cách hành chính',
  ARRAY['Thuyết trình', 'Hành chính', 'Thí điểm'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  32
),
(
  'Gia hạn khối lượng BG TMĐT đồng giá',
  '4020. Gia han khôi luong BG TMĐT đồng giá.pdf',
  'gia_han_khoi_luong_bg_tmdt.pdf',
  '/images/file-goc/4020. Gia han khôi luong BG TMĐT đồng giá.pdf',
  1392844,
  'pdf',
  'application/pdf',
  'regulations',
  'Quyết định gia hạn thực hiện chính sách khối lượng Bưu gửi Thương mại điện tử đồng giá',
  ARRAY['Quyết định', 'Bưu chính', 'TMĐT', 'Giá cước'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  28
),
(
  'HƯỚNG DẪN XÂY DỰNG KHHD',
  '6.1 HUONG DAN XAY DUNG KHHD.xlsx',
  'huong_dan_xay_dung_khhd.xlsx',
  '/images/file-goc/6.1 HUONG DAN XAY DUNG KHHD.xlsx',
  30584,
  'excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'administrative',
  'Tài liệu hướng dẫn chi tiết quy trình xây dựng Kế hoạch Hoạt động hàng năm',
  ARRAY['Hướng dẫn', 'Kế hoạch', 'Hành chính'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  56
),
(
  'BHHS Bản chào DBV DNB VNPOST - Thống Nhất',
  'BHHS_Bản chào_DBV DNB_VNPOST_Chỉ áp dụng đia bàn huyện Thống Nhất củ - final.docx',
  'bhhs_ban_chao_dbv_dnb_vnpost_thong_nhat.docx',
  '/images/file-goc/BHHS_Bản chào_DBV DNB_VNPOST_Chỉ áp dụng đia bàn huyện Thống Nhất củ - final.docx',
  4016429,
  'word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'insurance-health',
  'Bản đề xuất chính sách Bảo hiểm Hỗ trợ Sức khỏe của VNPOST Đông Nam Bộ cho khu vực huyện Thống Nhất',
  ARRAY['BHYT', 'VNPOST', 'Thống Nhất', 'Phiên bản cuối'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  41
),
(
  'Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh V1',
  'Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh (V1) CTN025.docx',
  'cuoc_dich_vu_tieu_chuan_hang_nang_cong_kenh.docx',
  '/images/file-goc/Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh (V1) CTN025.docx',
  90743,
  'word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'postal-services',
  'Bảng cước phí dịch vụ chuyển phát hàng nặng và cồng kềnh theo tiêu chuẩn mới phiên bản 1',
  ARRAY['Giá cước', 'Bưu chính', 'Phiên bản'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  67
),
(
  'DỊCH VỤ BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC',
  'DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
  'dich_vu_buu_chinh_chuyen_phat_qt_trong_nuoc.pdf',
  '/images/file-goc/DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
  10882157,
  'pdf',
  'application/pdf',
  'postal-services',
  'Tổng quan về các dịch vụ Bưu chính Chuyển phát Quốc tế và Trong nước của VNPOST',
  ARRAY['Bưu chính', 'Dịch vụ'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  89
),
(
  'Dịch vụ công đầu giây',
  'dich-vu-cong-dau-giay.jpg',
  'dich_vu_cong_dau_giay.jpg',
  '/images/file-goc/dich-vu-cong-dau-giay.jpg',
  338126,
  'image',
  'image/jpeg',
  'administrative',
  'Hình ảnh minh họa về dịch vụ công trực tuyến đầu giây, thể hiện tính tiện lợi và nhanh chóng',
  ARRAY['Dịch vụ công'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  23
),
(
  'QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT',
  'QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT.pdf',
  'quyet_dinh_giao_chi_tieu_bhyt_thong_nhat.pdf',
  '/images/file-goc/QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT.pdf',
  579827,
  'pdf',
  'application/pdf',
  'insurance-health',
  'Quyết định phân bổ và giao chỉ tiêu thực hiện Bảo hiểm Y tế tại địa bàn Xã Thống Nhất',
  ARRAY['Quyết định', 'BHYT', 'Thống Nhất'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  34
),
(
  'QĐ ban hành giá vốn DV E-commerce đi Mỹ',
  'QĐ ban hành giá vốn DV E-commerce đi Mỹ 10.9.pdf',
  'qd_ban_hanh_gia_von_dv_ecommerce_my.pdf',
  '/images/file-goc/QĐ ban hành giá vốn DV E-commerce đi Mỹ 10.9.pdf',
  2568350,
  'pdf',
  'application/pdf',
  'postal-services',
  'Quyết định ban hành giá vốn dịch vụ E-commerce gửi hàng đi Mỹ áp dụng từ ngày 10/9',
  ARRAY['Quyết định', 'E-commerce', 'Giá cước', 'Bưu chính'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  52
),
(
  'Thư ngỏ Phí HS-GV năm học 2025-2026',
  'Thư ngỏ_ Phí HS-GV-năm học 2025-2026 .doc',
  'thu_ngo_phi_hs_gv_2025_2026.doc',
  '/images/file-goc/Thư ngỏ_ Phí HS-GV-năm học 2025-2026 .doc',
  150016,
  'word',
  'application/msword',
  'education',
  'Thư ngỏ thông báo về mức phí đóng góp Học sinh - Giáo viên cho năm học 2025-2026',
  ARRAY['Giáo dục', 'Thông báo', '2025'],
  (SELECT id FROM auth.users LIMIT 1),
  true,
  19
);

-- ============================================
-- 6. CREATE HELPFUL VIEWS
-- ============================================

-- View for file statistics by category
CREATE OR REPLACE VIEW file_stats_by_category AS
SELECT 
    fc.id,
    fc.name as category_name,
    COUNT(fd.id) as total_files,
    SUM(fd.file_size) as total_size,
    SUM(fd.download_count) as total_downloads,
    AVG(fd.download_count) as avg_downloads
FROM file_categories fc
LEFT JOIN file_documents fd ON fc.id = fd.category_id AND fd.is_active = true
GROUP BY fc.id, fc.name
ORDER BY total_files DESC;

-- View for recent files
CREATE OR REPLACE VIEW recent_files AS
SELECT 
    fd.*,
    fc.name as category_name,
    fc.color as category_color,
    fc.icon as category_icon
FROM file_documents fd
JOIN file_categories fc ON fd.category_id = fc.id
WHERE fd.is_active = true
ORDER BY fd.created_at DESC
LIMIT 20;

-- View for popular files
CREATE OR REPLACE VIEW popular_files AS
SELECT 
    fd.*,
    fc.name as category_name,
    fc.color as category_color,
    fc.icon as category_icon
FROM file_documents fd
JOIN file_categories fc ON fd.category_id = fc.id
WHERE fd.is_active = true
ORDER BY fd.download_count DESC
LIMIT 20;

-- ============================================
-- 7. VERIFICATION QUERIES
-- ============================================

-- Check categories
SELECT 'Categories created:' as info, COUNT(*) as count FROM file_categories;

-- Check documents  
SELECT 'Documents created:' as info, COUNT(*) as count FROM file_documents WHERE is_active = true;

-- Check by category
SELECT 
    fc.name as category,
    COUNT(fd.id) as files,
    pg_size_pretty(SUM(fd.file_size)) as total_size
FROM file_categories fc
LEFT JOIN file_documents fd ON fc.id = fd.category_id AND fd.is_active = true
GROUP BY fc.name
ORDER BY files DESC;

-- Success message
SELECT 'File Management System with Real Data Setup Complete!' as status;