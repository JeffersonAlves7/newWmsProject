import { IoIosArrowForward } from "react-icons/io";

export default function DualArrowButton({ onCLick, reverse }: { onCLick: Function, reverse?: boolean }) {
  return (
    <button className="DualArrowButton relative flex items-center transition-all hover:scale-105 hover:text-wmsBlack text-wmsPink w-[30px] h-[30px]" onClick={() => { onCLick() }}>
      <IoIosArrowForward className={"text-3xl absolute " + (reverse === true ? "rotate-[180deg] left-[10px]" : " left-[-10px]")} />
      <IoIosArrowForward className={"text-3xl absolute " + (reverse === true ? "rotate-[180deg]" : "")} />
    </button>
  )
}