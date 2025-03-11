
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportToPdf = async (elementId: string, fileName: string = "resume.pdf"): Promise<void> => {
  try {
    toast.loading("Preparing your PDF...");
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    // Hide any elements with the class "no-print"
    const noPrintElements = element.querySelectorAll(".no-print");
    noPrintElements.forEach(el => {
      (el as HTMLElement).style.display = "none";
    });

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    // Show the hidden elements again
    noPrintElements.forEach(el => {
      (el as HTMLElement).style.display = "";
    });

    // Get the width and height of the resume in the PDF
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF of A4 size
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Handle multi-page resumes
    let position = 0;
    let heightLeft = imgHeight;

    // Add image to the first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add subsequent pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save the PDF
    pdf.save(fileName);
    
    toast.dismiss();
    toast.success("PDF successfully downloaded!");
  } catch (error) {
    console.error("Error exporting PDF:", error);
    toast.dismiss();
    toast.error("Failed to export PDF. Please try again.");
  }
};
