"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "./Input";
import { ChevronLeftIcon, ChevronRight, ReceiptText } from "lucide-react";
import ItemsInput from "./ItemsInput";
import CalendarInput from "./CalendarInput";
import DownloadButton from "./DownloadButton";

interface ContentProps {
  label: string;
  placeHolder: string;
  key: string;
  type?: "calender" | "table" | "download";
  inputType?: string;
}

interface PageProps {
  pageTitle: string;
  pageContent: ContentProps[];
}

const InputForm = () =>
  //   {
  //   onFormDataChange,
  // }: {
  //   onFormDataChange: (data: any) => void;
  // }
  {
    const [currPage, setCurrPage] = useState<number>(0);
    // const [formData, setFormData] = useState({});
    const data: PageProps[] = [
      {
        pageTitle: "Client Details",
        pageContent: [
          { label: "Client Name", placeHolder: "John Doe", key: "clientName" },
          {
            label: "CC",
            placeHolder: "Tim Cook, Bill Gates",
            key: "carbonCopy",
          },
          { label: "Phone", placeHolder: "9731 0789", key: "clientPhone" },
          { label: "Fax", placeHolder: "9786 5100", key: "clientFax" },
        ],
      },
      {
        pageTitle: "Your Details",
        pageContent: [
          { label: "Your Name", placeHolder: "James Dyson", key: "userName" },
          {
            label: "Date",
            placeHolder: "31 August 2024",
            key: "formDate",
            type: "calender",
          },
          {
            label: "Title",
            placeHolder: "GIS - Acrylic Poster",
            key: "documentTitle",
          },
        ],
      },
      {
        pageTitle: "Items",
        pageContent: [
          {
            label: "Items ",
            placeHolder: "James Dyson",
            key: "documentItems",
            type: "table",
          },
          {
            label: "Service Tax (%)",
            placeHolder: "5%",
            key: "serviceTax",
            inputType: "number",
          },
        ],
      },
      {
        pageTitle: "Quotation Terms",
        pageContent: [
          {
            label: "Document Reference",
            placeHolder: "AS232310-69",
            key: "documentReference",
          },
          {
            label: "Issue date",
            placeHolder: "19th August 2024",
            key: "issueDate",
            type: "calender",
          },
          {
            label: "Payment deadline",
            placeHolder: "31 August 2024",
            key: "paymentDate",
            type: "calender",
          },
          {
            label: "Remarks",
            placeHolder:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, optio.",
            key: "remarks",
          },
        ],
      },
      {
        pageTitle: "Review and Download",
        pageContent: [
          {
            label: "Download",
            placeHolder: "",
            key: "download",
            type: "download",
          },
        ],
      },
    ];

    const onNextPage = () => setCurrPage(currPage + 1);
    const onPrevPage = () => setCurrPage(currPage - 1);

    // const updateFormData = (key: string, value: any) => {
    //   setFormData((prev) => {
    //     const updatedData = { ...prev, [key]: value };
    //     onFormDataChange(updatedData); // Immediately notify the parent with updated form data
    //     return updatedData;
    //   });
    // };

    return (
      <div className="p-4 w-full h-full flex flex-col">
        <div className="flex justify-between items-center gap-2 mb-8">
          <div className="flex justify-center gap-2 items-center">
            <ReceiptText className="text-slate-700" />
            <p className="font-bold text-sm text-slate-700">
              Quotation Generator
            </p>
          </div>
          <Image
            src={"/APCO sign main logo.png"}
            width={300}
            height={300}
            alt="Company Logo of Apco Sign Sdn Bhd"
            className="w-24 h-8 object-cover"
          />
        </div>

        <div className="flex flex-col flex-auto">
          <p className="mb-8 font-bold text-slate-950">
            {data[currPage].pageTitle}
          </p>
          <form className="flex flex-col gap-4">
            {data[currPage].pageContent.map((content, index) =>
              content.type === "table" ? (
                <ItemsInput key={index} />
              ) : content.type === "calender" ? (
                <CalendarInput
                  key={index}
                  label={content.label}
                  keyValue={content.key}
                />
              ) : content.type === "download" ? (
                <DownloadButton key={index} />
              ) : (
                <Input
                  key={index}
                  label={content.label}
                  placeholder={content.placeHolder}
                  keyValue={content.key}
                  inputType={content.inputType}
                />
              )
            )}
          </form>
        </div>

        <div className="flex justify-between items-center w-full">
          {currPage !== 0 ? (
            <button
              className="flex justify-center items-center text-xs"
              onClick={onPrevPage}
            >
              <ChevronLeftIcon className="text-slate-400" />
              <div className="flex flex-col justify-center items-start">
                <p className="text-slate-400 font-bold">Previous</p>
                <p className="text-slate-950 font-bold">
                  {data[currPage - 1].pageTitle}
                </p>
              </div>
            </button>
          ) : (
            <div></div>
          )}

          {currPage < data.length - 1 ? (
            <button
              className="flex justify-center items-center text-xs"
              onClick={onNextPage}
            >
              <div className="flex flex-col justify-center items-end">
                <p className="text-slate-400 font-bold">Next</p>
                <p className="text-slate-950 font-bold">
                  {data[currPage + 1].pageTitle}
                </p>
              </div>
              <ChevronRight className="text-slate-400" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

export default InputForm;
