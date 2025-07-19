import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function exportDivAsPDF(divId: string, filename: string) {
  const input = document.getElementById(divId);
  if (!input) return;

  try {
    // Create a clone to avoid modifying the original element
    const clone = input.cloneNode(true) as HTMLElement;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    // Replace unsupported color functions in the clone
    const replaceUnsupportedColors = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      
      if (style.color.includes('oklch')) {
        element.style.color = '#000000'; // Fallback to black
      }
      if (style.backgroundColor.includes('oklch')) {
        element.style.backgroundColor = '#ffffff'; // Fallback to white
      }
      
      // Process child elements
      Array.from(element.children).forEach(child => {
        replaceUnsupportedColors(child as HTMLElement);
      });
    };

    replaceUnsupportedColors(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      logging: true,
      useCORS: true,
      ignoreElements: (el) => {
        // Skip certain elements if needed
        return false;
      }
    });

    document.body.removeChild(clone);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF generation error:', error);
    // Create a simple text-based fallback PDF
    const fallbackPdf = new jsPDF();
    fallbackPdf.text('Failed to generate visual report. Exporting data only...', 10, 10);
    
    // Add basic text content from the original element
    const textContent = input.textContent || '';
    fallbackPdf.text(textContent.substring(0, 500), 10, 20); // Limit text length
    
    fallbackPdf.save(`${filename}_fallback.pdf`);
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
