import pdfplumber
import PyPDF2
from pathlib import Path

def read_pdf_with_pdfplumber(file_path):
    """Đọc PDF bằng pdfplumber (tốt hơn cho text extraction)"""
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"📁 File: {file_path}")
            print(f"📄 Số trang: {len(pdf.pages)}")
            print(f"📊 Metadata: {pdf.metadata}")
            print("\n" + "="*80 + "\n")
            
            full_text = ""
            for i, page in enumerate(pdf.pages, 1):
                print(f"📄 TRANG {i}")
                print("-" * 50)
                
                # Lấy text từ trang
                page_text = page.extract_text()
                if page_text:
                    print(page_text)
                    full_text += f"\n--- TRANG {i} ---\n{page_text}\n"
                else:
                    print("(Không có text hoặc là hình ảnh)")
                    
                # Lấy thông tin bảng nếu có
                tables = page.extract_tables()
                if tables:
                    print(f"\n📊 Phát hiện {len(tables)} bảng:")
                    for j, table in enumerate(tables, 1):
                        print(f"\nBảng {j}:")
                        for row in table:
                            print(" | ".join([str(cell) if cell else "" for cell in row]))
                
                print("\n" + "="*80 + "\n")
                
            return full_text
            
    except Exception as e:
        print(f"❌ Lỗi đọc PDF với pdfplumber: {e}")
        return None

def read_pdf_with_pypdf2(file_path):
    """Đọc PDF bằng PyPDF2 (fallback)"""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            print(f"📁 File: {file_path}")
            print(f"📄 Số trang: {len(pdf_reader.pages)}")
            print("\n" + "="*80 + "\n")
            
            full_text = ""
            for i, page in enumerate(pdf_reader.pages, 1):
                print(f"📄 TRANG {i}")
                print("-" * 50)
                
                page_text = page.extract_text()
                if page_text:
                    print(page_text)
                    full_text += f"\n--- TRANG {i} ---\n{page_text}\n"
                else:
                    print("(Không có text)")
                
                print("\n" + "="*80 + "\n")
                
            return full_text
            
    except Exception as e:
        print(f"❌ Lỗi đọc PDF với PyPDF2: {e}")
        return None

# Main execution
if __name__ == "__main__":
    pdf_file = "QĐ ban hành giá vốn DV E-commerce đi Mỹ 10.9.pdf"
    
    if not Path(pdf_file).exists():
        print(f"❌ Không tìm thấy file: {pdf_file}")
    else:
        print("🔍 Đang thử đọc bằng pdfplumber...")
        text1 = read_pdf_with_pdfplumber(pdf_file)
        
        if not text1:
            print("\n🔍 Thử lại bằng PyPDF2...")
            text2 = read_pdf_with_pypdf2(pdf_file)
            
        print("\n✅ Hoàn thành đọc file PDF!")