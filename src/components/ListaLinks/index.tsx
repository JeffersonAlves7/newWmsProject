import { NavLink, useParams } from "react-router-dom"
import UIPedido from "../../interfaces/UIPedido"

function Row({ text, situacao }: { text: string, situacao: UIPedido['situacao'] }) {
  return (
    <li className={situacao == text.replaceAll(" ", "").toLowerCase() ? "border-b border-wmsLightPink " : "line_after"}>
      <NavLink className="text-xl font-semibold" to={"/listas/" + text.replaceAll(" ", "").toLowerCase()}>{text}</NavLink>
    </li>
  )
}

export default function ListaLinks() {
  const { situacao } = useParams()
  return (
    <ul className="flex items-center gap-10">
      <Row text="Criar" situacao={(situacao as UIPedido['situacao'])} />
      <Row text="Em aberto" situacao={(situacao as UIPedido['situacao'])} />
      <Row text="Finalizado" situacao={(situacao as UIPedido['situacao'])} />
    </ul>
  )
}