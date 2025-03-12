import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { toast } from 'sonner';

export const exportToDocx = async (elementId: string, fileName: string = "resume.docx", font: string, fontSize: string): Promise<boolean> => {
  const loadingToast = toast.loading("Preparing your DOCX...");

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Resume container not found");
    }

    const doc = new Document({
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            run: {
              font: font,
              size: parseInt(fontSize) * 2, // DOCX font size is in half-points
            },
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Resume"),
                new TextRun({
                  text: "\n\n",
                  break: 1,
                }),
                new TextRun(element.innerText),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, fileName);

    toast.dismiss(loadingToast);
    toast.success("DOCX downloaded successfully!");
    return true;
  } catch (error) {
    console.error("DOCX export error:", error);
    toast.dismiss(loadingToast);
    toast.error("Failed to generate DOCX. Please try again.");
    return false;
  }
};
