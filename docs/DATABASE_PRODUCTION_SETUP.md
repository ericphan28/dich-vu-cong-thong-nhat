# 🚀 HƯỚNG DẪN SETUP DATABASE CHO HỆ THỐNG FILE MANAGEMENT

## 🎯 TỔNG QUAN HIỆN TẠI

### ✅ Đã hoàn thành:
- **Frontend hoàn chỉnh**: UI/UX với dark mode, responsive design
- **File Management System**: Upload, preview, search, filter, download
- **API Routes**: Complete RESTful API endpoints  
- **Mock Data**: 10 files từ thư mục file-goc với phân loại logic
- **Demo Mode**: Fully functional without database

### 🔧 Cần setup:
- **Database Connection**: Kết nối Supabase database
- **Table Creation**: Tạo tables và sample data
- **Authentication**: User auth integration

---

## 📋 BƯỚC 1: KIỂM TRA THÔNG TIN KẾT NỐI

### Database Info từ backup_db.md.backup:
```
Host: aws-0-ap-southeast-1.pooler.supabase.com
Port: 6543
Username: postgres.ospkleabpejgyvdevkmv  
Database: postgres
Password: gjDB4sxf56Yq1mNq
```

### Kiểm tra connection:
```powershell
# Test connection
$env:PGPASSWORD = "gjDB4sxf56Yq1mNq"
psql --host=aws-0-ap-southeast-1.pooler.supabase.com --port=6543 --username=postgres.ospkleabpejgyvdevkmv --dbname=postgres -c "SELECT version();"
```

---

## 🗄️ BƯỚC 2: TẠO DATABASE SCHEMA

### Option 1: Sử dụng Supabase Dashboard (Khuyến nghị)
1. Đăng nhập [Supabase Dashboard](https://app.supabase.com)
2. Chọn project tương ứng với connection string
3. Vào **SQL Editor**
4. Copy nội dung từ `supabase-file-management-setup.sql`
5. Execute query

### Option 2: Command Line
```powershell
# Chạy migration file
$env:PGPASSWORD = "gjDB4sxf56Yq1mNq"
Get-Content "supabase-file-management-setup.sql" | psql -h aws-0-ap-southeast-1.pooler.supabase.com -p 6543 -U postgres.ospkleabpejgyvdevkmv -d postgres
```

### Option 3: Manual Schema Creation
Nếu các option trên không work, tạo từng bước:

```sql
-- Step 1: Create Categories Table
CREATE TABLE file_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(10),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Insert Categories
INSERT INTO file_categories VALUES
('postal-services', 'Dịch Vụ Bưu Chính', 'Tài liệu liên quan đến dịch vụ bưu chính và chuyển phát', '📮', 'bg-blue-500'),
('insurance-health', 'Bảo Hiểm Y Tế', 'Quyết định và tài liệu BHYT', '🏥', 'bg-green-500'),
('education', 'Giáo Dục', 'Thông báo và tài liệu giáo dục, học phí', '🎓', 'bg-purple-500'),
('business-plans', 'Kế Hoạch Kinh Doanh', 'Presentations và kế hoạch phát triển', '📊', 'bg-orange-500'),
('regulations', 'Quy Định & Quyết Định', 'Các quyết định hành chính và quy định', '📋', 'bg-red-500'),
('administrative', 'Hành Chính', 'Tài liệu hành chính tổng quát', '🏛️', 'bg-gray-500');

-- Step 3: Create Documents Table
CREATE TABLE file_documents (
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
```

---

## 🔐 BƯỚC 3: SETUP ROW LEVEL SECURITY

```sql
-- Enable RLS
ALTER TABLE file_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_documents ENABLE ROW LEVEL SECURITY;

-- Policies for categories (public read)
CREATE POLICY "file_categories_public_read" ON file_categories
  FOR SELECT USING (true);

-- Policies for documents
CREATE POLICY "file_documents_read" ON file_documents
  FOR SELECT USING (is_active = true);

CREATE POLICY "file_documents_insert" ON file_documents
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "file_documents_update" ON file_documents
  FOR UPDATE USING (auth.uid() = uploaded_by);

CREATE POLICY "file_documents_delete" ON file_documents
  FOR DELETE USING (auth.uid() = uploaded_by);
```

---

## 📊 BƯỚC 4: TẠO SAMPLE DATA

```sql
-- Insert sample documents from file-goc
INSERT INTO file_documents (
  name, original_name, file_name, file_path, file_size, file_type, 
  mime_type, category_id, description, tags, uploaded_by, is_active, download_count
) VALUES
('GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025', '250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx', 
 '250625_giai_phap_dot_pha.pptx', '/images/file-goc/250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx', 
 2457600, 'powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
 'business-plans', 'Giải pháp đột phá 6 tháng cuối năm 2025', 
 ARRAY['Giải pháp', 'Kế hoạch', '2025'], (SELECT id FROM auth.users LIMIT 1), true, 15),

-- Add more sample data...
('DỊCH VỤ BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC', 'DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
 'dich_vu_buu_chinh_chuyen_phat.pdf', '/images/file-goc/DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
 3145728, 'pdf', 'application/pdf', 'postal-services', 'Dịch vụ Bưu chính Chuyển phát Quốc tế và Trong nước',
 ARRAY['Bưu chính', 'Chuyển phát', 'Quốc tế'], (SELECT id FROM auth.users LIMIT 1), true, 32);
```

---

## 🔧 BƯỚC 5: KIỂM TRA VÀ TEST

### Verify Tables Created:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('file_categories', 'file_documents');
```

### Test Data:
```sql
SELECT COUNT(*) FROM file_categories; -- Should return 6
SELECT COUNT(*) FROM file_documents;  -- Should return sample count
```

### Test API Endpoints:
```bash
# Test categories
curl http://localhost:3006/api/files/categories

# Test files
curl http://localhost:3006/api/files
```

---

## 🚀 BƯỚC 6: ENABLE PRODUCTION MODE

### Update FileManagerContainer:
Trong file `components/admin/file-manager-container.tsx`, uncomment các API calls:

```typescript
// In fetchFiles function
const response = await fetch('/api/files');
const data = await response.json();

if (data.success) {
  setFiles(data.files);
} else {
  // Fallback to mock data
  setFiles(mockFiles);
}

// In fetchCategories function  
const response = await fetch('/api/files/categories');
const data = await response.json();

if (data.success) {
  setCategories(data.categories);
}

// Enable real upload, download, etc.
```

### Remove Demo Mode Notice:
Comment out `<DemoModeNotice />` component khi database đã hoạt động.

---

## 🛠️ TROUBLESHOOTING

### Common Issues:

**1. Connection Error:**
```
psql: error: connection to server failed: Wrong password
```
**Solution:** 
- Verify password chính xác
- Check if Supabase project đang active
- Try connection pooler trực tiếp thay vì pgbouncer

**2. Table Not Found:**
```
relation "public.file_categories" does not exist
```
**Solution:**
- Run migration script lại
- Check schema permissions
- Verify table creation successful

**3. Foreign Key Error:**
```
Could not find a relationship between 'file_documents' and 'file_categories'
```
**Solution:**
- Check foreign key constraint tồn tại
- Verify category_id references đúng
- Refresh schema cache

### Debug Commands:
```sql
-- Check tables exist
\dt public.*

-- Check foreign keys
SELECT 
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='file_documents';

-- Check sample data
SELECT c.name, COUNT(d.*) 
FROM file_categories c 
LEFT JOIN file_documents d ON c.id = d.category_id 
GROUP BY c.id, c.name;
```

---

## 📈 PERFORMANCE OPTIMIZATION

### Indexes (Already included in migration):
```sql
CREATE INDEX idx_file_documents_category_id ON file_documents(category_id);
CREATE INDEX idx_file_documents_uploaded_at ON file_documents(uploaded_at);
CREATE INDEX idx_file_documents_is_active ON file_documents(is_active);
```

### Query Optimization:
- Use `LIMIT` for large datasets
- Add pagination for file listing
- Consider full-text search for better search performance

---

## 🎯 PRODUCTION CHECKLIST

- [ ] Database connection successful
- [ ] Tables created with correct schema
- [ ] Sample data inserted
- [ ] RLS policies active  
- [ ] Foreign key relationships working
- [ ] API endpoints responding correctly
- [ ] File upload/download functional
- [ ] Authentication working
- [ ] Demo mode disabled
- [ ] Error handling in place
- [ ] Performance indexes created

---

## 📞 SUPPORT

**Issues to check first:**
1. Network connection to Supabase
2. Correct credentials and permissions
3. Database schema matches expected structure
4. RLS policies allow operations

**Contact for help:**
- **Developer:** Thắng Phan - 0907.136.029  
- **Admin:** Anh Trí - 0933.211.134

**Log locations:**
- Browser Console (F12)
- Terminal output (Next.js server)
- Supabase Dashboard > Logs