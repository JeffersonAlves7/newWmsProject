import { useState, useEffect, PropsWithChildren } from "react";
import api from "../../api";
import { useBarcode } from "next-barcode";
import { useParams } from "react-router-dom";
import UIPedido from "../../interfaces/UIPedido";
import PrintButton from "../../compose/Buttons/PrintButton";

const Paragraph = ({ text }: { text: string | number }) => (
  <p className="text-[.65rem]">{text}</p>
);

const ThCell = ({ text }: { text: string }) => (
  <th>
    <h2>{text}</h2>
  </th>
);

const Cell = (props: PropsWithChildren) => (
  <td>
    <div className="flex items-center flex-col justify-center pr-1 pl-1">
      {props.children}
    </div>
  </td>
);
const Row = ({ pedido }: { pedido: UIPedido }) => (
  <tr>
    <Cell>
      <Paragraph text={pedido.nf} />
    </Cell>
    <Cell>
      <svg
        ref={
          useBarcode({
            value: `${pedido.chavedeacesso}`,
            options: { fontSize: 10, height: 55, width: 1 },
          }).inputRef
        }
      />
    </Cell>
    <Cell>
      {pedido.itens?.map((item) => (
        <Paragraph key={"coleta_sku_" + item.sku} text={item.sku} />
      ))}
    </Cell>
    <Cell>
      <Paragraph text={pedido.pedido} />
    </Cell>
    <Cell>
      <Paragraph text={pedido.integracao} />
    </Cell>
    <Cell>
      {pedido.itens?.map((item) => (
        <Paragraph key={"qnt_" + item.sku} text={item.quantidade} />
      ))}
    </Cell>
  </tr>
);

export default function ListaDeColeta() {
  const { id, nf } = useParams();
  const [pedidos, setPedidos] = useState<UIPedido[]>([]);

  const str = `/pedidos?itens=true&idLista=${id}${
    nf !== undefined ? `&nf=${nf}` : ""
  }`;

  useEffect(() => {
    api.get(str).then(({ data }) => setPedidos(data.response));
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center">
      <header className="flex justify-evenly items-center">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-lg font-semibold">
            {nf === undefined
              ? "ID da Lista de Coleta:"
              : "Id da Lista de Coleta  Única:"}
            {id}
          </h1>
          <svg
            ref={
              useBarcode({
                value: `${id}`,
                options: { fontSize: 10, height: 50, width: 1 },
              }).inputRef
            }
          />
        </div>
        <PrintButton />
      </header>
      <main className="m-[0_auto]">
        <table>
          <thead>
            <tr>
              <ThCell text="NF-e" />
              <ThCell text="Chave de Acesso" />
              <ThCell text="SKU" />
              <ThCell text="Número do Pedido" />
              <ThCell text="Canal" />
              <ThCell text="Qnt" />
            </tr>
          </thead>
          <tbody>
            {pedidos
              .filter((pedido) => pedido.situacao !== "embalado")
              .map((pedido) => (
                <Row key={"coleta_" + pedido.chavedeacesso} pedido={pedido} />
              ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
