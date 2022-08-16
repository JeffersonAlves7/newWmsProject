import Subtitle from "../../components/Texts/Subtitle";

function ThCell({ text }: { text: string }) {
  return (
    <th>
      <Subtitle text={text} />
    </th>
  );
}

export default function PedidosHeader({ only }: { only?: boolean }) {
  return (
    <thead>
      <tr className="border-b border-black">
        <ThCell text="Data" />
        {only ? <ThCell text="SKU" /> : <ThCell text="N° do Pedido/NF" />}
        <ThCell text="Integração" />
        <ThCell text="Situação" />
        <ThCell text="Conteúdo" />
      </tr>
    </thead>
  );
}
