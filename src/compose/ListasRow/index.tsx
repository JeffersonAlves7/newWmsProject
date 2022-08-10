import api from "../../api";
import UILista from "../../interfaces/UILista";

import ListaDeColeta from "../Buttons/ListaDeColeta";
import ListaDeSeparacao from "../Buttons/ListaDeSeparacao";

import Situacao from "../../components/Situacao";
import TableCell from "../../components/TableCell";
import DataFormat from "../../components/DataFormat";
import WmsLink from "../../components/Buttons/WmsLink";
import Paragraph from "../../components/Texts/Paragraph";
import WmsButton from "../../components/Buttons/WmsButton";
import IntegracaoImage from "../../components/ImageComponents/IntegracaoImage";

function Status({ lista }: { lista: UILista }) {
  if (lista.lista_situacao == "criar")
    return (
      <WmsButton
        onClick={() => {
          (async () => {
            await api.put("/listas", { id: lista.id, situacao: "emaberto" });
            window.location.reload();
          })();
        }}
        text="Gerar Lista"
      />
    );
  if (lista.lista_situacao == "emaberto")
    return (
      <div className="flex flex-col gap-1">
        <ListaDeColeta id={lista.id} />
        <ListaDeSeparacao id={lista.id} />
      </div>
    );
  if (lista.lista_situacao == "finalizado")
    return <Situacao situacao={lista.lista_situacao} />;
  return <></>;
}

export default function ListasRow({ lista }: { lista: UILista }) {
  const First = () => (
    <>
      <TableCell>
        {lista.lista_situacao !== "criar" ? (
          <WmsLink text={`${lista.id}`} href={`/lista/${lista.id}`} />
        ) : (
          <Paragraph text={lista.id} />
        )}
      </TableCell>
      <TableCell>
        {" "}
        <IntegracaoImage integracao={lista.lista_integracao} />{" "}
      </TableCell>
      <TableCell>
        <div className="flex">
          <Paragraph
            text={
              lista.pedidos.filter(
                (pedido) =>
                  ["embalado", "finalizado"].indexOf(pedido.situacao) !== -1
              ).length +
              "/" +
              lista.pedidos.length
            }
          />
        </div>
      </TableCell>
      <TableCell>
        <Status lista={lista} />{" "}
      </TableCell>
    </>
  );

  return lista.lista_situacao !== "finalizado" ? (
    <tr className="border-b h-[60px] border-wmsGrey">
      <First />
    </tr>
  ) : (
    <tr className="border-b h-[60px] border-wmsGrey">
      <First />
      <TableCell>
        <DataFormat data={lista.lista_gerada} />
      </TableCell>
    </tr>
  );
}
