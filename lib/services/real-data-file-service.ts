import { FileDocument, FileCategory } from '../types/file-management';

// Define FileStats interface locally since it's not exported
interface FileStats {
  totalFiles: number;
  totalSize: number;
  totalDownloads: number;
  categoriesCount: number;
  byCategory: Record<string, { count: number; size: number; downloads: number }>;
  byFileType: Record<string, { count: number; size: number; downloads: number }>;
}

// Real categories from file-goc analysis
const REAL_CATEGORIES: FileCategory[] = [
  {
    id: 'postal-services',
    name: 'Dịch Vụ Bưu Chính',
    description: 'Các tài liệu liên quan đến dịch vụ bưu chính, chuyển phát',
    icon: 'mail',
    color: 'blue'
  },
  {
    id: 'insurance-health',
    name: 'Bảo Hiểm Y Tế',
    description: 'Tài liệu về bảo hiểm y tế, chính sách sức khỏe',
    icon: 'heart',
    color: 'red'
  },
  {
    id: 'education',
    name: 'Giáo Dục',
    description: 'Tài liệu giáo dục, đào tạo, học sinh - giáo viên',
    icon: 'book',
    color: 'green'
  },
  {
    id: 'business-plans',
    name: 'Kế Hoạch Kinh Doanh',
    description: 'Các kế hoạch, chiến lược phát triển kinh doanh',
    icon: 'trending-up',
    color: 'purple'
  },
  {
    id: 'regulations',
    name: 'Quy Định - Chính Sách',
    description: 'Các quy định, quyết định, chính sách của cơ quan',
    icon: 'file-text',
    color: 'orange'
  },
  {
    id: 'administrative',
    name: 'Hành Chính',
    description: 'Tài liệu hành chính, quy trình nội bộ',
    icon: 'briefcase',
    color: 'gray'
  }
];

// Real files from file-goc directory with correct properties
const REAL_FILES: FileDocument[] = [
  {
    id: '1',
    name: 'GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL',
    originalName: '250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx',
    fileName: 'giai_phap_dot_pha_2025_ppbl.pptx',
    filePath: '/images/file-goc/250625 GIẢI PHÁP ĐỘT PHÁ 6 THÁNG CUỐI NĂM 2025 - PPBL.pptx',
    fileSize: 5329291,
    fileType: 'powerpoint',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    categoryId: 'business-plans',
    description: 'Tài liệu trình bày giải pháp đột phá cho 6 tháng cuối năm 2025 của Phòng Phát triển Bưu chính Logistics',
    tags: ['Kế hoạch', '2025', 'Thuyết trình', 'Bưu chính'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-06-25T10:00:00Z'),
    updatedAt: new Date('2024-06-25T10:00:00Z'),
    isActive: true,
    downloadCount: 45
  },
  {
    id: '2',
    name: 'Slide Nội dung trao đổi BDT TP về BĐX tỉnh thí điểm',
    originalName: '3107 slide Noi dung trao doi BDT TP ve BĐX_tỉnh thí điểm.pptx',
    fileName: 'slide_noi_dung_trao_doi_bdt_tp.pptx',
    filePath: '/images/file-goc/3107 slide Noi dung trao doi BDT TP ve BĐX_tỉnh thí điểm.pptx',
    fileSize: 2799322,
    fileType: 'powerpoint',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    categoryId: 'administrative',
    description: 'Slide trao đổi nội dung giữa Ban Điều tra Trung ương và các tỉnh thí điểm về cải cách hành chính',
    tags: ['Thuyết trình', 'Hành chính', 'Thí điểm'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-07-31T14:00:00Z'),
    updatedAt: new Date('2024-07-31T14:00:00Z'),
    isActive: true,
    downloadCount: 32
  },
  {
    id: '3',
    name: 'Gia hạn khối lượng BG TMĐT đồng giá',
    originalName: '4020. Gia han khôi luong BG TMĐT đồng giá.pdf',
    fileName: 'gia_han_khoi_luong_bg_tmdt.pdf',
    filePath: '/images/file-goc/4020. Gia han khôi luong BG TMĐT đồng giá.pdf',
    fileSize: 1392844,
    fileType: 'pdf',
    mimeType: 'application/pdf',
    categoryId: 'regulations',
    description: 'Quyết định gia hạn thực hiện chính sách khối lượng Bưu gửi Thương mại điện tử đồng giá',
    tags: ['Quyết định', 'Bưu chính', 'TMĐT', 'Giá cước'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-04-20T09:00:00Z'),
    updatedAt: new Date('2024-04-20T09:00:00Z'),
    isActive: true,
    downloadCount: 28
  },
  {
    id: '4',
    name: 'HƯỚNG DẪN XÂY DỰNG KHHD',
    originalName: '6.1 HUONG DAN XAY DUNG KHHD.xlsx',
    fileName: 'huong_dan_xay_dung_khhd.xlsx',
    filePath: '/images/file-goc/6.1 HUONG DAN XAY DUNG KHHD.xlsx',
    fileSize: 30584,
    fileType: 'excel',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    categoryId: 'administrative',
    description: 'Tài liệu hướng dẫn chi tiết quy trình xây dựng Kế hoạch Hoạt động hàng năm',
    tags: ['Hướng dẫn', 'Kế hoạch', 'Hành chính'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-06-01T08:30:00Z'),
    updatedAt: new Date('2024-06-01T08:30:00Z'),
    isActive: true,
    downloadCount: 56
  },
  {
    id: '5',
    name: 'BHHS Bản chào DBV DNB VNPOST - Thống Nhất',
    originalName: 'BHHS_Bản chào_DBV DNB_VNPOST_Chỉ áp dụng đia bàn huyện Thống Nhất củ - final.docx',
    fileName: 'bhhs_ban_chao_dbv_dnb_vnpost_thong_nhat.docx',
    filePath: '/images/file-goc/BHHS_Bản chào_DBV DNB_VNPOST_Chỉ áp dụng đia bàn huyện Thống Nhất củ - final.docx',
    fileSize: 4016429,
    fileType: 'word',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    categoryId: 'insurance-health',
    description: 'Bản đề xuất chính sách Bảo hiểm Hỗ trợ Sức khỏe của VNPOST Đông Nam Bộ cho khu vực huyện Thống Nhất',
    tags: ['BHYT', 'VNPOST', 'Thống Nhất', 'Phiên bản cuối'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-08-15T11:00:00Z'),
    updatedAt: new Date('2024-08-15T11:00:00Z'),
    isActive: true,
    downloadCount: 41
  },
  {
    id: '6',
    name: 'Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh V1',
    originalName: 'Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh (V1) CTN025.docx',
    fileName: 'cuoc_dich_vu_tieu_chuan_hang_nang_cong_kenh.docx',
    filePath: '/images/file-goc/Cước dịch vụ Tiêu chuẩn hàng nặng cồng kềnh (V1) CTN025.docx',
    fileSize: 90743,
    fileType: 'word',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    categoryId: 'postal-services',
    description: 'Bảng cước phí dịch vụ chuyển phát hàng nặng và cồng kềnh theo tiêu chuẩn mới phiên bản 1',
    tags: ['Giá cước', 'Bưu chính', 'Phiên bản'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-05-10T13:15:00Z'),
    updatedAt: new Date('2024-05-10T13:15:00Z'),
    isActive: true,
    downloadCount: 67
  },
  {
    id: '7',
    name: 'DỊCH VỤ BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC',
    originalName: 'DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
    fileName: 'dich_vu_buu_chinh_chuyen_phat_qt_trong_nuoc.pdf',
    filePath: '/images/file-goc/DICH VU BƯU CHÍNH CHUYỂN PHÁT QT VÀ TRONG NƯỚC.pdf',
    fileSize: 10882157,
    fileType: 'pdf',
    mimeType: 'application/pdf',
    categoryId: 'postal-services',
    description: 'Tổng quan về các dịch vụ Bưu chính Chuyển phát Quốc tế và Trong nước của VNPOST',
    tags: ['Bưu chính', 'Dịch vụ'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-03-20T16:00:00Z'),
    updatedAt: new Date('2024-03-20T16:00:00Z'),
    isActive: true,
    downloadCount: 89
  },
  {
    id: '8',
    name: 'Dịch vụ công đầu giây',
    originalName: 'dich-vu-cong-dau-giay.jpg',
    fileName: 'dich_vu_cong_dau_giay.jpg',
    filePath: '/images/file-goc/dich-vu-cong-dau-giay.jpg',
    fileSize: 338126,
    fileType: 'image',
    mimeType: 'image/jpeg',
    categoryId: 'administrative',
    description: 'Hình ảnh minh họa về dịch vụ công trực tuyến đầu giây, thể hiện tính tiện lợi và nhanh chóng',
    tags: ['Dịch vụ công'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-09-01T12:00:00Z'),
    updatedAt: new Date('2024-09-01T12:00:00Z'),
    isActive: true,
    downloadCount: 23
  },
  {
    id: '9',
    name: 'QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT',
    originalName: 'QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT.pdf',
    fileName: 'quyet_dinh_giao_chi_tieu_bhyt_thong_nhat.pdf',
    filePath: '/images/file-goc/QUYẾT ĐỊNH GIAO CHỈ TIÊU BHYT TẠI XÃ THỐNG NHẤT.pdf',
    fileSize: 579827,
    fileType: 'pdf',
    mimeType: 'application/pdf',
    categoryId: 'insurance-health',
    description: 'Quyết định phân bổ và giao chỉ tiêu thực hiện Bảo hiểm Y tế tại địa bàn Xã Thống Nhất',
    tags: ['Quyết định', 'BHYT', 'Thống Nhất'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-07-10T09:45:00Z'),
    updatedAt: new Date('2024-07-10T09:45:00Z'),
    isActive: true,
    downloadCount: 34
  },
  {
    id: '10',
    name: 'QĐ ban hành giá vốn DV E-commerce đi Mỹ',
    originalName: 'QĐ ban hành giá vốn DV E-commerce đi Mỹ 10.9.pdf',
    fileName: 'qd_ban_hanh_gia_von_dv_ecommerce_my.pdf',
    filePath: '/images/file-goc/QĐ ban hành giá vốn DV E-commerce đi Mỹ 10.9.pdf',
    fileSize: 2568350,
    fileType: 'pdf',
    mimeType: 'application/pdf',
    categoryId: 'postal-services',
    description: 'Quyết định ban hành giá vốn dịch vụ E-commerce gửi hàng đi Mỹ áp dụng từ ngày 10/9',
    tags: ['Quyết định', 'E-commerce', 'Giá cước', 'Bưu chính'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-09-10T15:30:00Z'),
    updatedAt: new Date('2024-09-10T15:30:00Z'),
    isActive: true,
    downloadCount: 52
  },
  {
    id: '11',
    name: 'Thư ngỏ Phí HS-GV năm học 2025-2026',
    originalName: 'Thư ngỏ_ Phí HS-GV-năm học 2025-2026 .doc',
    fileName: 'thu_ngo_phi_hs_gv_2025_2026.doc',
    filePath: '/images/file-goc/Thư ngỏ_ Phí HS-GV-năm học 2025-2026 .doc',
    fileSize: 150016,
    fileType: 'word',
    mimeType: 'application/msword',
    categoryId: 'education',
    description: 'Thư ngỏ thông báo về mức phí đóng góp Học sinh - Giáo viên cho năm học 2025-2026',
    tags: ['Giáo dục', 'Thông báo', '2025'],
    uploadedBy: 'system',
    uploadedAt: new Date('2024-08-20T10:00:00Z'),
    updatedAt: new Date('2024-08-20T10:00:00Z'),
    isActive: true,
    downloadCount: 19
  }
];

export class RealDataFileService {
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getFiles(params?: {
    search?: string;
    category?: string;
    fileType?: string;
    sortBy?: 'name' | 'size' | 'date' | 'downloads';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<{ files: FileDocument[]; total: number; hasMore: boolean }> {
    await this.delay();

    let filteredFiles = [...REAL_FILES];

    // Apply search filter
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredFiles = filteredFiles.filter(file =>
        file.name.toLowerCase().includes(searchLower) ||
        (file.description && file.description.toLowerCase().includes(searchLower)) ||
        file.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (params?.category && params.category !== 'all') {
      filteredFiles = filteredFiles.filter(file => file.categoryId === params.category);
    }

    // Apply file type filter
    if (params?.fileType && params.fileType !== 'all') {
      filteredFiles = filteredFiles.filter(file => file.fileType === params.fileType);
    }

    // Apply sorting
    const sortBy = params?.sortBy || 'date';
    const sortOrder = params?.sortOrder || 'desc';
    
    filteredFiles.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = a.fileSize - b.fileSize;
          break;
        case 'downloads':
          comparison = a.downloadCount - b.downloadCount;
          break;
        case 'date':
        default:
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex);
    const hasMore = endIndex < filteredFiles.length;

    return {
      files: paginatedFiles,
      total: filteredFiles.length,
      hasMore
    };
  }

  async getFileById(id: string): Promise<FileDocument | null> {
    await this.delay();
    return REAL_FILES.find(file => file.id === id) || null;
  }

  async getCategories(): Promise<FileCategory[]> {
    await this.delay();
    return REAL_CATEGORIES;
  }

  async getFileStats(): Promise<FileStats> {
    await this.delay();
    
    const stats: FileStats = {
      totalFiles: REAL_FILES.length,
      totalSize: REAL_FILES.reduce((sum, file) => sum + file.fileSize, 0),
      totalDownloads: REAL_FILES.reduce((sum, file) => sum + file.downloadCount, 0),
      categoriesCount: REAL_CATEGORIES.length,
      byCategory: {},
      byFileType: {}
    };

    // Calculate by category
    REAL_CATEGORIES.forEach(category => {
      const categoryFiles = REAL_FILES.filter(file => file.categoryId === category.id);
      stats.byCategory[category.id] = {
        count: categoryFiles.length,
        size: categoryFiles.reduce((sum, file) => sum + file.fileSize, 0),
        downloads: categoryFiles.reduce((sum, file) => sum + file.downloadCount, 0)
      };
    });

    // Calculate by file type
    const fileTypes = [...new Set(REAL_FILES.map(file => file.fileType))];
    fileTypes.forEach(type => {
      const typeFiles = REAL_FILES.filter(file => file.fileType === type);
      stats.byFileType[type] = {
        count: typeFiles.length,
        size: typeFiles.reduce((sum, file) => sum + file.fileSize, 0),
        downloads: typeFiles.reduce((sum, file) => sum + file.downloadCount, 0)
      };
    });

    return stats;
  }

  async uploadFile(fileData: Omit<FileDocument, 'id' | 'uploadedAt' | 'updatedAt' | 'downloadCount'>): Promise<FileDocument> {
    await this.delay(1000); // Longer delay for upload

    const newFile: FileDocument = {
      ...fileData,
      id: Date.now().toString(),
      downloadCount: 0,
      uploadedAt: new Date(),
      updatedAt: new Date()
    };

    REAL_FILES.unshift(newFile);
    return newFile;
  }

  async updateFile(id: string, updates: Partial<FileDocument>): Promise<FileDocument> {
    await this.delay();

    const fileIndex = REAL_FILES.findIndex(file => file.id === id);
    if (fileIndex === -1) {
      throw new Error('File not found');
    }

    const updatedFile = {
      ...REAL_FILES[fileIndex],
      ...updates,
      updatedAt: new Date()
    };

    REAL_FILES[fileIndex] = updatedFile;
    return updatedFile;
  }

  async deleteFile(id: string): Promise<boolean> {
    await this.delay();

    const fileIndex = REAL_FILES.findIndex(file => file.id === id);
    if (fileIndex === -1) {
      throw new Error('File not found');
    }

    REAL_FILES.splice(fileIndex, 1);
    return true;
  }

  async incrementDownloadCount(id: string): Promise<void> {
    await this.delay(200);

    const file = REAL_FILES.find(file => file.id === id);
    if (file) {
      file.downloadCount++;
    }
  }
}

// Export singleton instance
export const realDataFileService = new RealDataFileService();