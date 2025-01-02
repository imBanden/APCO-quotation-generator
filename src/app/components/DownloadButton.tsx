import { Download, LoaderCircle, Redo2 } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../FormProvider";
import Link from "next/link";

const DownloadButton = () => {
  const { formData } = useFormContext();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const handleOnClick = async () => {
    setIsDownloading(true);
    try {
      // Send formData to Server
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Download PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = "quotation.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error Generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* <a href="/pdf" target="_blank" className="flex w-full"> */}
      <button
        type="button"
        className="flex w-full bg-slate-950 justify-center items-center py-4 px-2 gap-2 rounded-lg shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:bg-slate-800 transition-all duration-300"
        onClick={handleOnClick}
      >
        <div className="flex justify-center items-center gap-2">
          {isDownloading ? (
            <LoaderCircle className="text-white w-4 h-4 animate-spin" />
          ) : (
            <>
              <Download className="text-white w-4 h-4" />
              <p className="text-white text-xs font-bold">Download</p>
            </>
          )}
        </div>
      </button>

      <Link href="/" className="flex w-full">
        <button
          className="flex w-full bg-white justify-center items-center py-4 px-2 gap-2 border-2 border-slate-950 rounded-lg shadow-sm hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:bg-gray-100 transition-all duration-100"
          type="button"
        >
          <Redo2 className="text-slate-950 w-4 h-4" />
          <p className="text-slate-950 text-xs font-bold">Create new quote</p>
        </button>
      </Link>
    </div>
  );
};

export default DownloadButton;
