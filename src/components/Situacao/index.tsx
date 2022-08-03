import UIPedido from "../../interfaces/UIPedido";
import Paragraph from "../Texts/Paragraph";

export default function Situacao({ situacao, className }: { situacao: UIPedido['situacao'], className?: string }) {
  let text = ""

  if (situacao === "criar") text = "Criar"
  if (situacao === "emaberto") text = "Em aberto"
  if (situacao === "embalado") text = "Embalado"
  if (situacao === "finalizado") text = "Finalizado"
  if (situacao === "processando") text = "Processando"
  if (className) return <Paragraph text={text} className={className} />
  return <Paragraph text={text} />

}