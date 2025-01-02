import InputForm from "./components/InputForm";
import Quotation from "./components/Quotation";

export default function Home() {
  // const paperRatio = 0.8;

  return (
    <div className="flex h-screen w-full">
      <div className="flex min-w-[500px] bg-white border-r-slate-300 border-r">
        <InputForm />
      </div>
      <div className="flex flex-grow bg-slate-100 justify-center items-center">
        <div
          className={`flex w-[calc(630px*0.8)] h-[calc(893px*0.8)] bg-white`}
        >
          <Quotation />
        </div>
      </div>
    </div>
  );
}
