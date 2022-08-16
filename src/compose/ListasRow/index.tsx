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

export default function ListasRow({ lista }: { lista: UILista }) {
  const putOnList = async () => {
    await api.put("/listas", { id: lista.id, situacao: "emaberto" });
    window.location.reload();
  };

  function Status() {
    switch (lista.lista_situacao) {
      case "criar":
        return <WmsButton onClick={putOnList} text="Gerar Lista" />;
      case "emaberto":
        return (
          <div className="flex flex-col gap-1">
            <ListaDeColeta id={lista.id} /> <ListaDeSeparacao id={lista.id} />
          </div>
        );
      case "finalizado":
        return <Situacao situacao={lista.lista_situacao} />;
    }
    return <></>;
  }

  const First = () => {
    const len = lista.pedidos.filter(
      (p) => ["embalado", "finalizado"].indexOf(p.situacao) !== -1
    ).length;
    return (
      <>
        <TableCell>
          {lista.lista_situacao !== "criar" ? (
            <WmsLink text={`${lista.id}`} href={`/lista/${lista.id}`} />
          ) : (
            <Paragraph text={lista.id} />
          )}
        </TableCell>
        <TableCell>
          <IntegracaoImage integracao={lista.lista_integracao} />
        </TableCell>
        <TableCell>
          <div className="flex">
            <Paragraph text={len + "/" + lista.pedidos.length} />
          </div>
        </TableCell>
        <TableCell>
          <Status />
        </TableCell>
      </>
    );
  };

  return (
    <tr className="border-b h-[60px] border-wmsGrey">
      {lista.lista_situacao !== "finalizado" ? (
        <First />
      ) : (
        <>
          <First />
          <TableCell>
            <DataFormat data={lista.lista_gerada} />
          </TableCell>
        </>
      )}
    </tr>
  );
}
