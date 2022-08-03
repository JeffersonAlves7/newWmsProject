import UIItens from "../../interfaces/UIItens"
import Paragraph from "../Texts/Paragraph"

function Li({ sku, totalLidos, quantidade }: { sku: UIItens['sku'], totalLidos: number, quantidade: UIItens['quantidade'] }) {
  return (
    <li className="w-full">
      <div className={"flex justify-between h-full uppercase  w-full pr-1 pl-1" + (totalLidos === quantidade ? " bg-green-400" : " ")}>
        <Paragraph text={`Sku: ${sku}`} />
        <Paragraph text={`${totalLidos}/${quantidade}`} />
      </div>
    </li>
  )
}

export default function Box({ lidos, itens, total }: { lidos: string | number, total: number | number, itens: { sku: UIItens['sku'], totalLidos: number, quantidade: number }[] }) {
  return (
    <div className="border rounded-lg shadow-xl min-h-[17rem] w-[20rem] max-h-[20rem] overflow-hidden h-full border-slate-300 flex flex-col justify-between">
      <header className="w-full border-b border-slate-300 p-2">
        <Paragraph text="Leituras" />
      </header>
      <main className="overflow-y-scroll h-full w-full">
        <ul>
          {itens.map(item => <Li {...item} />)}
        </ul>
      </main>
      <footer className={"w-full border-t border-slate-300 p-2" + (lidos === total ? " bg-green-400" : "")}>
        <Paragraph text={`Total Lidos: ${lidos}/${total}`} />
      </footer>
    </div>
  )
}