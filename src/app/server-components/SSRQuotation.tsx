import React from "react";
import { FormDataType } from "../FormProvider";
import formatDate from "../utils/formatDate";
import fs from "fs";
import path from "path";

const SSRQuotation = ({ formData }: { formData: FormDataType }) => {
  const fontSize = `text-[9px]`;

  const totalSum = (data: any) => {
    let total = 0;
    for (let item of data) {
      total = total + item.price;
    }
    return total;
  };

  return (
    <div className="flex flex-col p-4 max-w-[595px] max-h-[842px] gap-4">
      {/* Company */}
      <div className={`flex flex-col justify-center items-end ${fontSize}`}>
        <img
          src={`data:image/png;base64,${fs
            .readFileSync(
              path.join(process.cwd(), "public", "APCO sign main logo.png")
            )
            .toString("base64")}`}
          alt="Company Logo of APCO Sign Sdn Bhd"
          className="w-24 h-8 object-cover"
        />
        <p>(65057-1)</p>
        <p>No 19, Jalan SS 2/91 47300 Petaling Jaya</p>
        <p>Tel: 03-7865 9911</p>
        <p>Email: apcosign@gmail.com</p>
      </div>

      {/* Header */}
      <div className={`flex flex-col justify-center items-start ${fontSize}`}>
        <p>QUOTATION</p>
        <p>{formData.documentReference || "N/A"}</p>

        <div className="flex w-full">
          <div className="flex flex-1 gap-2">
            <div className="flex flex-col gap-1">
              <p>To:</p>
              <p>CC:</p>
              <p>Phone:</p>
              <p>Fax:</p>
            </div>
            <div className="flex flex-col gap-1">
              <p>{formData.clientName || "N/A"}</p>
              <p>{formData.carbonCopy || "N/A"}</p>
              <p>{formData.clientPhone || "N/A"}</p>
              <p>{formData.clientFax || "N/A"}</p>
            </div>
          </div>

          <div className="flex flex-1 gap-2">
            <div className="flex flex-col">
              <p>From:</p>
              <p>Date:</p>
              <p>Pages:</p>
              <p>Title:</p>
            </div>
            <div className="flex flex-col">
              <p>{formData.userName || "N/A"}</p>
              <p>
                {formatDate(
                  formData.formDate?.day,
                  formData.formDate?.month,
                  formData.formDate?.year
                )}
              </p>
              <p>1</p>
              <p>{formData.documentTitle || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <p className={`${fontSize}`}>
        As per your attached design proposal and online discussion, the
        quotation is as follows:
      </p>
      <div
        className={`flex flex-col justify-center items-center ${fontSize} w-full`}
      >
        {formData.itemList.map((item, index) => (
          <div key={index} className="flex w-full justify-between items-center">
            <div className="flex flex-[5_1_0%] flex-col border-l border-t border-zinc-400 p-2">
              <p>
                {index + 1}. {item.title}
              </p>
              <p>{item.description}</p>
            </div>
            <div className="flex flex-1 flex-col justify-center items-end border border-b-0 h-full border-zinc-400 p-2">
              <p className="whitespace-nowrap">
                RM {(item.price / 100).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        <div className="flex w-full justify-between items-center">
          <div className="flex flex-[5_1_0%]  border-l border-t border-zinc-400 p-2">
            <p>
              Add: {formData.serviceTax}% Service Tax for all the above items
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-end border border-b-0 h-full border-zinc-400 p-2">
            <p className="whitespace-nowrap">
              RM{" "}
              {(
                (totalSum(formData.itemList) * formData.serviceTax) /
                100 /
                100
              ).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex w-full justify-between items-center">
          <div className="flex flex-[5_1_0%]  border border-r-0 border-zinc-400 p-2">
            <p>Total:</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-end border  h-full border-zinc-400 p-2">
            <p className="whitespace-nowrap">
              RM{" "}
              {(
                (totalSum(formData.itemList) *
                  (1 + formData.serviceTax / 100)) /
                100
              ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`flex flex-col ${fontSize} w-full gap-2`}>
        <div className="flex flex-col">
          <p>Remarks:</p>
          <p>{formData.remarks || "N/A"}</p>
        </div>
        <div className="flex flex-col">
          <p>Terms:</p>
          <p>
            Kindly issue Purchase Order upon confirmation by{" "}
            {formatDate(
              formData.issueDate?.day,
              formData.issueDate?.month,
              formData.issueDate?.year
            )}
          </p>
          <p>
            Payment by{" "}
            {formatDate(
              formData.paymentDate?.day,
              formData.paymentDate?.month,
              formData.paymentDate?.year
            )}
          </p>
        </div>
        <div className="flex flex-col">
          <p>We look forward to receive your favourable reply</p>
          <p>Thank you</p>
        </div>
        <div className="flex flex-col">
          <p>Yours faithfully</p>
          <p>{formData.userName}</p>
          <p>APCO SIGN Associates Sdn Bhd</p>
        </div>
      </div>
    </div>
  );
};

export default SSRQuotation;
