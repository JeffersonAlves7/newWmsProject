import Subtitle from "../../components/Texts/Subtitle"

function ThCell({ text }: { text: string }) {
  return (
    <th>
      <Subtitle text={text} />
    </th>
  )
}

export default function PedidosHeader({ only }: { only?: boolean }) {
  return <tr className="border-b border-black">
    <ThCell text="Conteúdo" />
    {
      only === true
        ? <ThCell text="SKU" />
        : <ThCell text="N° do Pedido/NF" />
    }
    <ThCell text="Integração" />
    <ThCell text="Situação" />
    <ThCell text="Data" />
  </tr>
}