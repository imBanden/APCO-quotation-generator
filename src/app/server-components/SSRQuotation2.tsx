import React from "react";
import Image from "next/image";
import { FormDataType } from "../FormProvider";
import formatDate from "../utils/formatDate";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fs from "fs";
import path from "path";

const SSRQuotation2 = ({ formData }: { formData: FormDataType }) => {
  const fontSize = `text-[9px]`;

  const totalSum = (data: any) => {
    let total = 0;
    for (let item of data) {
      total = total + item.price;
    }

    return total;
  };

  return (
    <div className="flex flex-col p-4 max-w-[595px] max-h-[842px] gap-4 w-full h-full">
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
        <Table className={`${fontSize} table-fixed`}>
          <TableBody>
            <TableRow className="border-none">
              <TableCell className="">QUOTATION</TableCell>
              <TableCell className=""></TableCell>
              <TableCell className=""></TableCell>
              <TableCell className=""></TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="font-bold">
                {formData.documentReference}
              </TableCell>
              <TableCell className=""></TableCell>
              <TableCell className=""></TableCell>
              <TableCell className=""></TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="">To:</TableCell>
              <TableCell className="">{formData.clientName}</TableCell>
              <TableCell className="">From:</TableCell>
              <TableCell className="">{formData.userName}</TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="">CC:</TableCell>
              <TableCell className="">{formData.carbonCopy}</TableCell>
              <TableCell className="">Date:</TableCell>
              <TableCell className="">
                {formatDate(
                  formData.formDate.day,
                  formData.formDate.month,
                  formData.formDate.year
                )}
              </TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="">Phone:</TableCell>
              <TableCell className="">{formData.clientPhone}</TableCell>
              <TableCell className="">Pages</TableCell>
              <TableCell className="">1</TableCell>
            </TableRow>
            <TableRow className="border-none">
              <TableCell className="">Fax:</TableCell>
              <TableCell className="">{formData.clientFax}</TableCell>
              <TableCell className="">Title:</TableCell>
              <TableCell className="">{formData.documentTitle}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Body */}
      <p className={`${fontSize} font-bold`}>
        As per your attached design proposal and online discussion, the
        quotation is as follows
      </p>
      <div
        className={`flex flex-col justify-start items-center ${fontSize} w-full flex-auto overflow-y-auto`}
      >
        <Table className={`${fontSize} border`}>
          <TableHeader>
            <TableRow>
              <TableHead className="border">Item</TableHead>
              <TableHead className="border text-center w-4">Qty</TableHead>
              <TableHead className="border text-right w-20">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData.itemList.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="border">
                  <div>
                    <span className="font-bold">{item.title}</span>
                  </div>
                  <div className="mt-1 break-all">{item.description}</div>
                </TableCell>
                <TableCell className="border text-center">{item.qty}</TableCell>
                <TableCell className="border text-right">
                  {(item.price / 100).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{formData.serviceTax}% Service Tax</TableCell>
              <TableCell></TableCell>
              <TableCell className="border text-right">
                {(
                  (totalSum(formData.itemList) * formData.serviceTax) /
                  100 /
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell></TableCell>
              <TableCell className="border text-right">
                {(
                  (totalSum(formData.itemList) *
                    (1 + formData.serviceTax / 100)) /
                  100
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className={`flex flex-col ${fontSize} w-full gap-2`}>
        <div className="flex flex-col">
          <p>Remarks:</p>
          <div>{formData.remarks}</div>
        </div>
        <div className="flex flex-col">
          <p>Terms:</p>
          <p>
            Kindly issue Purchase Order upon confirmation by{" "}
            {formatDate(
              formData.issueDate.day,
              formData.issueDate.month,
              formData.issueDate.year
            )}
          </p>
          <p>
            Payment by{" "}
            {formatDate(
              formData.paymentDate.day,
              formData.paymentDate.month,
              formData.paymentDate.year
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

export default SSRQuotation2;
