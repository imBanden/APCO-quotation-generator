"use client";
import moment from "moment";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

export interface FormDataType {
  clientName: string;
  carbonCopy: string;
  clientPhone: string;
  clientFax: string;
  userName: string;
  formDate: { day: number; month: number; year: number };
  documentTitle: string;
  itemList: {
    title: string;
    description: string;
    qty: number;
    price: number;
  }[];
  serviceTax: number;
  documentReference: string;
  issueDate: { day: number; month: number; year: number };
  paymentDate: { day: number; month: number; year: number };
  remarks: string;
}

interface FormContextType {
  formData: FormDataType;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
}

// Initialize context with undefined and validate when consuming
export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormDataType>({
    clientName: "",
    carbonCopy: "",
    clientPhone: "",
    clientFax: "",
    userName: "",
    formDate: {
      day: parseInt(moment().format("DD")),
      month: parseInt(moment().format("MM")),
      year: parseInt(moment().format("YYYY")),
    },
    documentTitle: "",
    itemList: [
      {
        title: "",
        description: "",
        qty: 1,
        price: 0,
      },
    ],
    serviceTax: 0,
    documentReference: "",
    issueDate: { day: 19, month: 9, year: 2024 },
    paymentDate: { day: 30, month: 9, year: 2024 },
    remarks: "",
  });

  const value = { formData, setFormData };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export default FormProvider;
