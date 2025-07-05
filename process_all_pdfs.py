import os
import sys
from extract_pdf_text import extract_text_from_pdf

PDF_DIR = "D:\\workspace\\socle-commun\\umbranexus\\.occultisme"
OUTPUT_DIR = "D:\\workspace\\socle-commun\\umbranexus\\.occultisme_extracted"

def process_all_pdfs():
    if not os.path.exists(PDF_DIR):
        print(f"Error: PDF directory not found at {PDF_DIR}", file=sys.stderr)
        sys.exit(1)
    
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR, exist_ok=True)

    pdf_files = [f for f in os.listdir(PDF_DIR) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print(f"No PDF files found in {PDF_DIR}")
        return

    print(f"Found {len(pdf_files)} PDF files to process.")

    for i, pdf_file in enumerate(pdf_files):
        pdf_path = os.path.join(PDF_DIR, pdf_file)
        print(f"Processing {i+1}/{len(pdf_files)}: {pdf_file}")
        extract_text_from_pdf(pdf_path, OUTPUT_DIR)

if __name__ == "__main__":
    process_all_pdfs()
