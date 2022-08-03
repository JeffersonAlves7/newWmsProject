import WmsLink from "../../components/Buttons/WmsLink";
import DataFormat from "../../components/DataFormat";
import IntegracaoImage from "../../components/ImageComponents/IntegracaoImage";
import Situacao from "../../components/Situacao";
import Item from "../../components/Item";
import TableCell from "../../components/TableCell";

import UIPedido from "../../interfaces/UIPedido";
import Paragraph from "../../components/Texts/Paragraph";

export default function PedidoRow({ pedido, only }: { pedido: UIPedido, only?: boolean }) {
  return (
    <tr className="border-b border-wmsGrey" key={pedido.chavedeacesso + pedido.pedido}>
      <TableCell>
        {pedido.itens?.map(item => <Item item={item} />)}
      </TableCell>
      <TableCell>
        {only === true
          ? pedido.itens?.map(item => <Paragraph text={item.sku} />)
          : <WmsLink href={"/pedido/" + pedido.pedido} >
            <div className="flex font-semibold items-center text-center text-sm sm:text-[1rem] justify-center flex-col">
              <Paragraph text={pedido.pedido} />
              <Paragraph text={pedido.nf} />
            </div>
          </WmsLink>
        }
      </TableCell>
      <TableCell>
        <IntegracaoImage integracao={pedido.integracao} />
      </TableCell>
      <TableCell>
        <Situacao situacao={pedido.situacao} />
      </TableCell>
      <TableCell>
        <DataFormat data={pedido.gerado} />
      </TableCell>
    </tr>
  )

}