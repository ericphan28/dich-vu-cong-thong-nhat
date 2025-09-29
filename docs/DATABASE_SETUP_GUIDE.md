# 🗄️ HƯỚNG DẪN CÀI ĐẶT DATABASE CHO FILE MANAGEMENT

## 📋 BƯỚC 1: SETUP SUPABASE DATABASE

### Kết nối Database:
- **Host:** aws-0-ap-southeast-1.pooler.supabase.com
- **Port:** 6543
- **Username:** postgres.ospkleabpejgyvdevkmv
- **Database:** postgres
- **Password:** gjDB4sxf56Yq1mNq

## 🚀 BƯỚC 2: CHẠY MIGRATION

### Cách 1: Sử dụng Supabase Dashboard
1. Truy cập [Supabase Dashboard](https://app.supabase.com)
2. Mở SQL Editor
3. Copy toàn bộ nội dung file `supabase-file-management-setup.sql`
4. Paste vào SQL Editor và chạy

### Cách 2: Sử dụng psql command line
```powershell
# Set password
$env:PGPASSWORD = "gjDB4sxf56Yq1mNq"

# Run migration
psql --host=aws-0-ap-southeast-1.pooler.supabase.com --port=6543 --username=postgres.ospkleabpejgyvdevkmv --dbname=postgres -f "supabase-file-management-setup.sql"
```

### Cách 3: Sử dụng Supabase CLI (khuyến nghị)
```powershell
# Install Supabase CLI
npm install -g supabase

# Run migration
supabase db reset --db-url "postgresql://postgres.ospkleabpejgyvdevkmv:gjDB4sxf56Yq1mNq@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
```

## 🔧 BƯỚC 3: KIỂM TRA INSTALLATION

### Kiểm tra Tables được tạo:
```sql
-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('file_categories', 'file_documents');

-- Check sample data
SELECT * FROM file_categories;
SELECT COUNT(*) FROM file_documents;
```

### Expected Results:
- ✅ `file_categories`: 6 categories
- ✅ `file_documents`: 10 sample files from file-goc
- ✅ Indexes created
- ✅ RLS policies active
- ✅ Triggers working

## 📊 BƯỚC 4: XÁC NHẬN DATA

### Kiểm tra Categories:
```sql
SELECT id, name, icon FROM file_categories ORDER BY name;
```
**Expected output:**
```
administrative     | Hành Chính                  | 🏛️
business-plans     | Kế Hoạch Kinh Doanh        | 📊
education          | Giáo Dục                    | 🎓
insurance-health   | Bảo Hiểm Y Tế             | 🏥
postal-services    | Dịch Vụ Bưu Chính         | 📮
regulations        | Quy Định & Quyết Định     | 📋
```

### Kiểm tra Sample Files:
```sql
SELECT 
  name,
  file_type,
  category_id,
  file_size,
  download_count
FROM file_documents 
WHERE is_active = true 
ORDER BY uploaded_at DESC;
```

## 🔐 BƯỚC 5: AUTHENTICATION SETUP

### Kiểm tra RLS Policies:
```sql
SELECT schemaname, tablename, policyname, permissive, cmd
FROM pg_policies 
WHERE tablename IN ('file_categories', 'file_documents');
```

### Test Authentication:
1. Tạo user trong Supabase Auth
2. Login vào ứng dụng
3. Truy cập `/admin/files`
4. Kiểm tra CRUD operations

## 🌐 BƯỚC 6: TEST API ENDPOINTS

### Test với curl hoặc Postman:

**Get Files:**
```bash
GET http://localhost:3006/api/files
Authorization: Bearer <your-supabase-jwt>
```

**Upload File:**
```bash
POST http://localhost:3006/api/files
Content-Type: multipart/form-data
Authorization: Bearer <your-supabase-jwt>
Body: files = [your-files]
```

**Get Categories:**
```bash
GET http://localhost:3006/api/files/categories
Authorization: Bearer <your-supabase-jwt>
```

**Get Stats:**
```bash
GET http://localhost:3006/api/files/stats
Authorization: Bearer <your-supabase-jwt>
```

## 🛡️ BƯỚC 7: SECURITY CHECK

### Kiểm tra RLS Policies hoạt động:
```sql
-- Test as authenticated user
SET LOCAL "request.jwt.claims" = '{"sub":"user-id","role":"authenticated"}';

-- Should work
SELECT * FROM file_documents WHERE is_active = true;

-- Test as anonymous
RESET ALL;

-- Should fail
SELECT * FROM file_documents;
```

## 📁 BƯỚC 8: FILE STORAGE SETUP

### Tạo thư mục upload:
```powershell
# Create upload directory
New-Item -ItemType Directory -Force -Path "public\uploads\files"
```

### Cấu hình permissions:
- Đảm bảo Next.js có quyền write vào thư mục `public/uploads/files`
- Cấu hình .gitignore để exclude uploaded files (nếu cần)

## ⚡ BƯỚC 9: OPTIMIZATION

### Add indexes for better performance:
```sql
-- These are already included in migration, but verify:
EXPLAIN ANALYZE SELECT * FROM file_documents WHERE category_id = 'postal-services';
EXPLAIN ANALYZE SELECT * FROM file_documents WHERE name ILIKE '%bưu%';
```

### Monitor performance:
```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats 
WHERE tablename IN ('file_categories', 'file_documents');
```

## 🚨 TROUBLESHOOTING

### Common Issues:

**1. Connection refused:**
- Check firewall settings
- Verify Supabase connection pooler is active
- Try direct connection without pooler

**2. Authentication errors:**
- Verify JWT secret in environment variables
- Check RLS policies are properly configured
- Ensure user has proper role

**3. File upload fails:**
- Check disk space and permissions
- Verify file size limits
- Check MIME type restrictions

**4. Slow queries:**
- Analyze query plans with EXPLAIN
- Check if indexes are being used
- Consider query optimization

### Debug Commands:
```sql
-- Check active connections
SELECT * FROM pg_stat_activity WHERE datname = 'postgres';

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public';
```

## ✅ VERIFICATION CHECKLIST

- [ ] Database connection successful
- [ ] Tables created: `file_categories`, `file_documents`
- [ ] Sample data inserted (6 categories, 10 files)
- [ ] RLS policies active
- [ ] Triggers working (updated_at)
- [ ] Upload directory created
- [ ] API endpoints responding
- [ ] Authentication working
- [ ] File operations (CRUD) functional
- [ ] File preview working
- [ ] Download counter incrementing

## 🎯 NEXT STEPS

1. **Production Setup:** Move to production Supabase project
2. **Backup Strategy:** Setup automated backups
3. **Monitoring:** Add logging and analytics
4. **CDN:** Consider file delivery optimization
5. **Storage:** Implement cloud storage (S3, etc.)

---

## 📞 Support

**Developer:** Thắng Phan - 0907.136.029
**Admin:** Anh Trí - 0933.211.134

Nếu gặp vấn đề, tham khảo logs tại:
- Next.js console
- Supabase Dashboard > Logs
- Browser Developer Tools