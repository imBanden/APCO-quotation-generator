import { FormDataType } from "@/app/FormProvider";
import SSRQuotation2 from "@/app/server-components/SSRQuotation2";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
const { renderToString } = await import("react-dom/server");

export async function POST(req: Request) {
  try {
    const formData: FormDataType = await req.json(); // Parse JSON body

    // Puppeteer or PDF generation logic
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const formHTML = renderToString(<SSRQuotation2 formData={formData} />);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          ${formHTML}
        </body>
      </html>
    `;
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="quotation.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { message: "Error generating PDF", error: error },
      { status: 500 }
    );
  }
}
