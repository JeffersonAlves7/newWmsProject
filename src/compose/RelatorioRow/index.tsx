import { CSSProperties, ReactNode } from "react";

import DataFormat from "../../components/DataFormat";
import Situacao from "../../components/Situacao";

import UIPedido from "../../interfaces/UIPedido";

function Row(props: { className?: string, style?: CSSProperties, children: ReactNode }) {
  return (
    <td className={props.className ? props.className : ""} style={props.style ? props.style : {}}>
      <div className="h-[28px] pl-1 pr-1 min-w-max flex items-center justify-center">
        {props.children}
      </div>
    </td>
  )
}

const textSize = " text-[.75rem] "

function Paragraph(props: { text: string | number }) {
  return <p className={"text-center" + textSize}>
    {props.text}
  </p>
}

export default function RelatorioRow({ pedido }: { pedido: UIPedido }) {
  return (
    <tr className="border-b border-wmsGrey" key={pedido.chavedeacesso + pedido.pedido}>
      <Row>
        <Paragraph text={pedido.chavedeacesso} />
      </Row>
      <Row>
        <Paragraph text={pedido.nf} />
      </Row>
      <Row>
        <Paragraph text={pedido.pedido} />
      </Row>
      <Row>
        <Paragraph text={pedido.integracao} />
      </Row>
      <Row>
        <Paragraph text={pedido.qntItens} />
      </Row>
      <Row>
        <Situacao className={textSize + "text-center"} situacao={pedido.situacao} />
      </Row>
      <Row>
        <DataFormat className={textSize + "text-center"} data={pedido.alterado} />
      </Row>
    </tr>
  )

}