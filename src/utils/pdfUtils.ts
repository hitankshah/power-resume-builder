import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportToPdf = async (elementId: string, fileName: string = "resume.pdf", pageSize: string, font: string, fontSize: string): Promise<boolean> => {
  const loadingToast = toast.loading("Preparing your PDF...");

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Resume container not found");
    }

    // Set scale based on device pixel ratio
    const scale = window.devicePixelRatio || 2;

    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      allowTaint: true,
      foreignObjectRendering: true,
    });

    // Page size measurements in mm
    const pageSizes = {
      A4: { width: 210, height: 297 },
      Letter: { width: 216, height: 279 },
      Legal: { width: 216, height: 356 },
    };

    const { width: imgWidth, height: imgHeight } = pageSizes[pageSize];
    const pdfHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: pdfHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [imgWidth, imgHeight],
    });

    // Add the image to PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      0,
      imgWidth,
      pdfHeight,
      undefined,
      'FAST'
    );

    // Set font and font size
    pdf.setFont(font);
    pdf.setFontSize(parseInt(fontSize));

    // Save the PDF
    pdf.save(fileName);
    
    toast.dismiss(loadingToast);
    toast.success("PDF downloaded successfully!");
    return true;
  } catch (error) {
    console.error("PDF export error:", error);
    toast.dismiss(loadingToast);
    toast.error("Failed to generate PDF. Please try again.");
    return false;
  }
};
