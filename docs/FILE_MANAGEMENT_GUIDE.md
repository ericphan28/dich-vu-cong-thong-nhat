# 📁 HỆ THỐNG QUẢN LÝ FILE - HƯỚNG DẪN SỬ DỤNG

## 🎯 TỔNG QUAN

Hệ thống quản lý file được xây dựng để tổ chức và quản lý các tài liệu dịch vụ công một cách logic và hiệu quả. Hệ thống tự động phân loại các file dựa trên tên và nội dung, giúp việc tìm kiếm và sử dụng trở nên dễ dàng.

## 📊 CÁC TÍNH NĂNG CHÍNH

### 1. **Phân loại tự động**
- ✅ **Dịch Vụ Bưu Chính** 📮: Tài liệu liên quan đến bưu chính và chuyển phát
- ✅ **Bảo Hiểm Y Tế** 🏥: Quyết định và tài liệu BHYT
- ✅ **Giáo Dục** 🎓: Thông báo và tài liệu giáo dục, học phí
- ✅ **Kế Hoạch Kinh Doanh** 📊: Presentations và kế hoạch phát triển
- ✅ **Quy Định & Quyết Định** 📋: Các quyết định hành chính và quy định
- ✅ **Hành Chính** 🏛️: Tài liệu hành chính tổng quát

### 2. **Hỗ trợ đa định dạng file**
- 📄 **PDF Documents** (.pdf)
- 📊 **Excel Spreadsheets** (.xlsx, .xls)
- 📈 **PowerPoint Presentations** (.pptx, .ppt)
- 📝 **Word Documents** (.docx, .doc)
- 🖼️ **Images** (.jpg, .jpeg, .png, .gif, .webp)

### 3. **Giao diện người dùng**
- 🔍 **Tìm kiếm thông minh**: Tìm theo tên, mô tả, tags
- 🏷️ **Hệ thống tags tự động**: Phân loại dựa trên từ khóa
- 👁️ **Xem trước file**: Hỗ trợ PDF và hình ảnh
- 📥 **Upload drag & drop**: Kéo thả file để upload
- 📊 **Thống kê chi tiết**: Số lượt tải xuống, ngày upload

## 🗂️ CÁC FILE HIỆN CÓ

### 📮 Dịch Vụ Bưu Chính
1. **Gia hạn khối lượng BG TMĐT đồng giá** (PDF - 512KB)
2. **Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh** (Word - 1.5MB)
3. **DỊCH VỤ BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC** (PDF - 3MB)

### 🏥 Bảo Hiểm Y Tế
1. **BHHS Bản chào DBV DNB VNPOST - Thống Nhất** (Word - 2MB)
2. **QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT** (PDF - 768KB)

### 🎓 Giáo Dục
1. **Thư ngỏ Phí HS-GV năm học 2025-2026** (Word - 300KB)

### 📊 Kế Hoạch Kinh Doanh
1. **GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL** (PowerPoint - 2.4MB)
2. **HƯỚNG DẪN XÂY DỰNG KHHD** (Excel - 1MB)

### 🏛️ Hành Chính
1. **Slide Nội dung trao đổi BDT TP về BĐX tỉnh thí điểm** (PowerPoint - 1.8MB)
2. **Dịch vụ công đầu giây** (Image - 153KB)

## 🚀 CÁCH SỬ DỤNG

### 📤 Upload File
1. Click vào khu vực **"Kéo thả file vào đây"**
2. Chọn file từ máy tính (hỗ trợ multiple files)
3. Hệ thống sẽ tự động:
   - Phân loại file theo tên
   - Tạo tags tự động
   - Tạo mô tả
   - Lưu vào database

### 🔍 Tìm Kiếm & Lọc
- **Tìm kiếm**: Nhập từ khóa vào ô tìm kiếm
- **Lọc theo danh mục**: Click dropdown "Filter"
- **Sắp xếp**: Theo tên, ngày upload, kích thước, lượt tải

### 👁️ Xem & Tải File
- **Xem trước**: Click vào icon "mắt" để preview (PDF & ảnh)
- **Tải xuống**: Click vào icon "tải xuống"
- **Chỉnh sửa thông tin**: Click vào icon "bút"
- **Chia sẻ**: Sao chép link file
- **Xóa**: Xóa file (soft delete)

## 🔧 TÍNH NĂNG ADMIN

### 📊 Thống Kê Real-time
- Tổng số file trong hệ thống
- Số lượng file theo từng danh mục
- File được tải nhiều nhất
- Dung lượng sử dụng

### 🎯 Logic Phân Loại Tự Động

```typescript
// Ví dụ logic phân loại
function categorizeFile(fileName: string): string {
  const name = fileName.toLowerCase();
  
  if (name.includes('bưu') || name.includes('vnpost')) 
    return 'postal-services';
  
  if (name.includes('bhyt') || name.includes('bảo hiểm')) 
    return 'insurance-health';
  
  if (name.includes('học') || name.includes('giáo dục')) 
    return 'education';
  
  // ... thêm logic khác
}
```

### 🏷️ Tags Tự Động

System tự động tạo tags dựa trên:
- **Loại tài liệu**: Quyết định, Hướng dẫn, Thông báo
- **Cơ quan**: VNPOST, BHYT, Giáo dục
- **Năm**: 2024, 2025
- **Địa phương**: Thống Nhất, Đồng Nai

## 🔒 BẢO MẬT & PHÂN QUYỀN

- ✅ **Row Level Security (RLS)** với Supabase
- ✅ **User authentication** bắt buộc
- ✅ **File upload size limit**: 50MB
- ✅ **Chỉ admin mới có thể xóa file**
- ✅ **Soft delete**: File không bị xóa vĩnh viễn

## 🗄️ CƠ SỞ DỮ LIỆU

### Database Schema

```sql
-- File Categories
file_categories (
  id, name, description, icon, color
)

-- File Documents  
file_documents (
  id, name, original_name, file_name, file_path,
  file_size, file_type, mime_type, category_id,
  description, tags[], uploaded_by, uploaded_at,
  updated_at, is_active, download_count, metadata
)
```

## 🔄 API ENDPOINTS

- `GET /api/files` - Lấy danh sách file với filter & search
- `POST /api/files` - Upload file mới
- `DELETE /api/files` - Soft delete file
- `PUT /api/files/[id]` - Cập nhật thông tin file

## 🎨 UI/UX Features

### 🌙 Dark Mode Support
- Theme switcher hoàn chỉnh
- Consistent colors across all components

### 📱 Mobile Responsive
- Grid layout adapts từ 1-4 columns
- Touch-friendly buttons
- Mobile-optimized preview modal

### ⚡ Performance
- Lazy loading cho file previews
- Pagination cho large datasets
- Optimized file size calculations
- Debounced search input

## 🚦 WORKFLOW LOGIC

### File Upload Process:
1. **Validation**: Kiểm tra file type & size
2. **Auto-categorization**: Phân loại dựa trên tên file
3. **Tag extraction**: Tạo tags tự động
4. **File storage**: Lưu file vào `/public/uploads/files`
5. **Database record**: Tạo record trong database
6. **UI update**: Cập nhật giao diện real-time

### File Management Workflow:
1. **Browse**: Xem danh sách file với grid/list view
2. **Search**: Tìm kiếm theo multiple criteria
3. **Filter**: Lọc theo danh mục và metadata
4. **Preview**: Xem trước file không cần tải về
5. **Download**: Tải file với download counter
6. **Manage**: Edit info, soft delete, share links

## 📈 METRICS & ANALYTICS

- **File popularity**: Theo dõi lượt download
- **Category distribution**: Phân bổ file theo danh mục  
- **Upload patterns**: Thống kê upload theo thời gian
- **Storage usage**: Monitoring dung lượng sử dụng
- **User activity**: Track user file interactions

---

## 📞 Hỗ Trợ

Nếu cần hỗ trợ kỹ thuật, liên hệ:
- **Developer**: Thắng Phan - 0907.136.029
- **Admin**: Anh Trí - 0933.211.134