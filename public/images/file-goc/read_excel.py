import pandas as pd
import sys

# Đọc file Excel
file_path = "6.1 HUONG DAN XAY DUNG KHHD.xlsx"

try:
    # Đọc tất cả các sheet
    excel_file = pd.ExcelFile(file_path)
    print(f"📁 File: {file_path}")
    print(f"📊 Số sheet: {len(excel_file.sheet_names)}")
    print(f"📋 Tên các sheet: {excel_file.sheet_names}")
    print("\n" + "="*80 + "\n")
    
    # Đọc từng sheet
    for i, sheet_name in enumerate(excel_file.sheet_names):
        print(f"📄 SHEET {i+1}: {sheet_name}")
        print("-" * 50)
        
        # Đọc sheet
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Hiển thị thông tin sheet
        print(f"Kích thước: {df.shape[0]} dòng x {df.shape[1]} cột")
        print(f"Các cột: {list(df.columns)}")
        print("\nDữ liệu:")
        print(df.to_string(index=False, na_rep=""))
        print("\n" + "="*80 + "\n")
        
except Exception as e:
    print(f"❌ Lỗi đọc file: {e}")