import mammoth from 'mammoth';
import * as pdfModule from 'pdf-parse';
import { GoogleGenAI } from '@google/genai';

export interface ExtractionResult {
  success: boolean;
  text?: string;
  fileName: string;
  fileFormat: 'PDF' | 'DOCX' | 'TXT' | 'MD';
  fileSizeBytes: number;
  wordCount?: number;
  characterCount?: number;
  error?: string;
}

export async function extractTextFromDocument(
  fileName: string,
  base64Data: string,
  fileSizeBytes: number,
  aiClient?: GoogleGenAI
): Promise<ExtractionResult> {
  const extension = fileName.split('.').pop()?.toLowerCase();

  // Validate format
  if (!extension || !['pdf', 'docx', 'doc', 'txt', 'md'].includes(extension)) {
    return {
      success: false,
      fileName,
      fileFormat: 'TXT',
      fileSizeBytes,
      error: `Unsupported file format ".${extension || 'unknown'}". Please upload a PDF (.pdf), Word document (.docx), or plain text file (.txt, .md).`,
    };
  }

  // Validate size: 10MB maximum
  const MAX_SIZE_BYTES = 10 * 1024 * 1024;
  if (fileSizeBytes > MAX_SIZE_BYTES) {
    const sizeInMB = (fileSizeBytes / (1024 * 1024)).toFixed(1);
    return {
      success: false,
      fileName,
      fileFormat: extension.toUpperCase() as any,
      fileSizeBytes,
      error: `File size (${sizeInMB}MB) exceeds the 10MB limit. Please upload a smaller document.`,
    };
  }

  // Clean base64 data prefix if present (e.g. data:application/pdf;base64,...)
  const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '').trim();
  if (!cleanBase64) {
    return {
      success: false,
      fileName,
      fileFormat: extension.toUpperCase() as any,
      fileSizeBytes,
      error: 'The uploaded file payload is empty. Please select a valid document.',
    };
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(cleanBase64, 'base64');
  } catch (err: any) {
    return {
      success: false,
      fileName,
      fileFormat: extension.toUpperCase() as any,
      fileSizeBytes,
      error: 'Failed to decode file data. The file appears to be corrupted.',
    };
  }

  if (buffer.length === 0) {
    return {
      success: false,
      fileName,
      fileFormat: extension.toUpperCase() as any,
      fileSizeBytes,
      error: 'The uploaded file is 0 bytes (empty). Please check your document and upload a valid file.',
    };
  }

  let extractedText = '';

  // 1. DOCX Extraction via Mammoth
  if (extension === 'docx') {
    try {
      const mammothResult = await mammoth.extractRawText({ buffer });
      extractedText = (mammothResult.value || '').trim();

      if (!extractedText || extractedText.length < 10) {
        return {
          success: false,
          fileName,
          fileFormat: 'DOCX',
          fileSizeBytes,
          error: 'The uploaded Word document appears to be empty or contains no readable text. If it is password-protected or contains only scanned images, please paste your resume text directly.',
        };
      }
    } catch (docxErr: any) {
      console.error('Mammoth DOCX extraction error:', docxErr);
      return {
        success: false,
        fileName,
        fileFormat: 'DOCX',
        fileSizeBytes,
        error: `Could not parse Word document. ${docxErr.message || 'File may be corrupted or password-protected.'}`,
      };
    }
  }

  // 2. PDF Extraction via pdf-parse
  else if (extension === 'pdf') {
    let pdfParseSucceeded = false;

    try {
      const parser = new pdfModule.PDFParse({ data: buffer });
      await parser.load();
      const result = await parser.getText();
      let rawText = '';

      if (typeof result === 'string') {
        rawText = result;
      } else if (result && typeof result.text === 'string') {
        rawText = result.text;
      } else if (result && Array.isArray(result.pages)) {
        rawText = result.pages.map((p: any) => p.text || '').join('\n\n');
      }

      // Clean up pagination artifacts like "-- 1 of 1 --"
      extractedText = rawText.replace(/\n\s*--\s*\d+\s+of\s+\d+\s*--\s*\n/g, '\n').trim();

      if (extractedText && extractedText.length >= 25) {
        pdfParseSucceeded = true;
      }
    } catch (pdfErr: any) {
      console.warn('pdf-parse encountered issue:', pdfErr?.message);
    }

    // If PDF parse returned no text (e.g. scanned image PDF), try Gemini 3.8 Flash OCR if available
    if (!pdfParseSucceeded && aiClient && process.env.GEMINI_API_KEY) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: cleanBase64,
              },
            },
            {
              text: 'Extract the exact plain text content from this resume document word-for-word. Do not summarize, alter, add, or invent any information. Preserve the original sections, dates, and bullet points verbatim. Return plain text only.',
            },
          ],
        });

        const ocrText = (response.text || '').trim();
        if (ocrText && ocrText.length >= 25) {
          extractedText = ocrText;
          pdfParseSucceeded = true;
        }
      } catch (geminiOcrErr: any) {
        console.warn('Gemini OCR fallback error:', geminiOcrErr?.message);
      }
    }

    if (!pdfParseSucceeded || !extractedText || extractedText.length < 20) {
      return {
        success: false,
        fileName,
        fileFormat: 'PDF',
        fileSizeBytes,
        error: 'No readable text could be extracted from this PDF. The document may be a scanned image without an OCR text layer, password-protected, or corrupted. Please check the file or copy & paste your resume text directly.',
      };
    }
  }

  // 3. Plain Text / Markdown
  else if (extension === 'txt' || extension === 'md') {
    try {
      extractedText = buffer.toString('utf-8').trim();
      if (!extractedText || extractedText.length < 10) {
        return {
          success: false,
          fileName,
          fileFormat: extension.toUpperCase() as any,
          fileSizeBytes,
          error: 'The uploaded text file is empty. Please upload a file with resume content.',
        };
      }
    } catch (txtErr: any) {
      return {
        success: false,
        fileName,
        fileFormat: extension.toUpperCase() as any,
        fileSizeBytes,
        error: 'Failed to read text document. File encoding must be UTF-8.',
      };
    }
  }

  const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
  const characterCount = extractedText.length;

  return {
    success: true,
    text: extractedText,
    fileName,
    fileFormat: extension.toUpperCase() as any,
    fileSizeBytes,
    wordCount,
    characterCount,
  };
}
