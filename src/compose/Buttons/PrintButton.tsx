import { AiFillPrinter } from "react-icons/ai"

export default function PrintButton() {
  return (
    <button type="button" title="imprimir" className=" bg-wmsLightPink p-1 rounded-lg print:hidden" onClick={() => {
      window.print()
    }}>
      <AiFillPrinter className="text-3xl" />
    </button>
  )
}