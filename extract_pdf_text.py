import sys
import os
from pdfminer.high_level import extract_text

def extract_text_from_pdf(pdf_path, output_dir):
    try:
        text = extract_text(pdf_path)
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Create output file path
        pdf_filename = os.path.basename(pdf_path)
        txt_filename = os.path.splitext(pdf_filename)[0] + ".txt"
        output_path = os.path.join(output_dir, txt_filename)
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Successfully extracted text from {pdf_path} to {output_path}")
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python extract_pdf_text.py <path_to_pdf_file> <output_directory>", file=sys.stderr)
        sys.exit(1)
    
    pdf_file_path = sys.argv[1]
    output_directory = sys.argv[2]
    extract_text_from_pdf(pdf_file_path, output_directory)
