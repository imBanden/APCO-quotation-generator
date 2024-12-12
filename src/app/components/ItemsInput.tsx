import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../FormProvider";

interface ItemProps {
  title: string;
  qty: string;
  price: string;
}

const ItemsInput = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { formData, setFormData } = useFormContext();

  const onAddNewItem = () => {
    setFormData((prev) => ({
      ...prev,
      itemList: [
        ...prev.itemList,
        {
          title: "",
          description: "",
          qty: 1,
          price: 0,
        },
      ],
    }));
  };

  const onDeleteItem = (itemIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      itemList: [...prev.itemList.filter((_, index) => index !== itemIndex)],
    }));
  };

  return (
    <div className="flex flex-col max-w-full">
      <label
        className={`text-base text-slate-950 
        mb-4 transition-all duration-300`}
      >
        Items to Quote
      </label>
      <div>
        {formData.itemList.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="flex flex-col gap-2 pb-8 mb-8 border-b border-b-slate-400"
          >
            <div className="flex gap-2 w-full justify-center items-center">
              <div className="flex flex-[6_0_0] w-full flex-col items-start justify-center">
                <label
                  className={`flex text-xs text-slate-400 ${
                    isFocused && "text-slate-950"
                  } transition-all duration-300`}
                >
                  Name
                </label>
                <input
                  className="w-full border border-slate-400 outline-none text-slate-950 px-2 py-1 text-xs focus:border-slate-950 placeholder:text-xs transition-all duration-300"
                  placeholder="Acrylic Sign"
                  value={item.title}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    const newInputValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      itemList: prev.itemList.map((item, index) =>
                        index === itemIndex
                          ? { ...item, title: newInputValue } // Update only the targeted property
                          : item
                      ),
                    }));
                  }}
                  size={1}
                />
              </div>
              <div className="flex flex-1 flex-col items-start justify-center">
                <label
                  className={`flex text-xs text-slate-400 ${
                    isFocused && "text-slate-950"
                  } transition-all duration-300`}
                >
                  Qty
                </label>
                <input
                  className="w-full border border-slate-400 outline-none text-slate-950 px-2 py-1 text-xs focus:border-slate-950 placeholder:text-xs transition-all duration-300"
                  placeholder="1"
                  type="number"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    const newInputValue = Number(e.target.value);
                    setFormData((prev) => ({
                      ...prev,
                      itemList: prev.itemList.map((item, index) =>
                        index === itemIndex
                          ? { ...item, qty: newInputValue } // Update only the targeted property
                          : item
                      ),
                    }));
                  }}
                  size={1}
                />
              </div>
              <div className="flex flex-[2_0_0] flex-col items-start justify-center">
                <label
                  className={`flex text-xs text-slate-400 ${
                    isFocused && "text-slate-950"
                  } transition-all duration-300`}
                >
                  Price
                </label>
                <div className="flex w-full justify-center items-center gap-2">
                  <input
                    className="w-full border border-slate-400 outline-none text-slate-950 px-2 py-1 text-xs focus:border-slate-950 placeholder:text-xs transition-all duration-300"
                    placeholder="RM 9,000"
                    type="number"
                    value={item.price / 100}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => {
                      const newInputValue = Number(e.target.value) * 100;
                      setFormData((prev) => ({
                        ...prev,
                        itemList: prev.itemList.map((item, index) =>
                          index === itemIndex
                            ? { ...item, price: newInputValue } // Update only the targeted property
                            : item
                        ),
                      }));
                    }}
                    size={1}
                  />
                  <button
                    type="button"
                    className="flex text-slate-400 hover:text-red-400 transition-all duration-300"
                    onClick={() => onDeleteItem(itemIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-[2_0_0] flex-col items-start justify-center">
              <label
                className={`flex text-xs text-slate-400 ${
                  isFocused && "text-slate-950"
                } transition-all duration-300`}
              >
                Description
              </label>

              <input
                className="w-full border border-slate-400 outline-none text-slate-950 px-2 py-1 text-xs focus:border-slate-950 placeholder:text-xs transition-all duration-300"
                placeholder="Injet Coated Signboard with..."
                value={item.description}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  const newInputValue = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    itemList: prev.itemList.map((item, index) =>
                      index === itemIndex
                        ? { ...item, description: newInputValue } // Update only the targeted property
                        : item
                    ),
                  }));
                }}
                size={1}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end items-center">
          <button
            type="button"
            className="flex justify-center items-center text-blue-400 px-2 py-2 hover:bg-blue-400 hover:text-white transition-all duration-300 rounded-full gap-2"
            onClick={onAddNewItem}
          >
            <Plus className="h-[12px] w-[12px]" />
            <p className="text-xs">Add new item</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsInput;
