import { PropsWithChildren } from "react";

import WmsButton from "../../components/Buttons/WmsButton";
import WmsLink from "../../components/Buttons/WmsLink";
import DataFormat from "../../components/DataFormat";
import Situacao from "../../components/Situacao";
import TableCell from "../../components/TableCell";
import IntegracaoImage from "../../components/ImageComponents/IntegracaoImage";

import UILista from "../../interfaces/UILista";
import api from "../../api";

import ListaDeSeparacao from "../Buttons/ListaDeSeparacao";
import ListaDeColeta from "../Buttons/ListaDeColeta";
import Paragraph from "../../components/Texts/Paragraph";

function Status({ lista }: { lista: UILista }) {
  if (lista.situacao == "criar") return (
    <WmsButton onClick={(e: MouseEvent) => {
      (async () => {
        await api.put("/listas", {
          id: lista.id,
          situacao: "emaberto"
        })
        window.location.reload()
      })()
    }} text="Gerar Lista" />
  )
  if (lista.situacao == "emaberto") return (
    <div className="flex flex-col gap-1">
      <ListaDeColeta id={lista.id} />
      <ListaDeSeparacao id={lista.id} />
    </div>
  )
  if (lista.situacao == "finalizado") return (
    <Situacao situacao={lista.situacao} />
  )
  return <></>
}

function IdLista({ lista }: { lista: UILista }) {
  if (lista.situacao !== "criar") return (
    <WmsLink text={`${lista.id}`} href={`/lista/${lista.id}`} />
  )
  return <p>{lista.id}</p>
}

export default function ListasRow({ lista }: { lista: UILista }) {
  function First() {
    return (
      <>
        <TableCell>
          <IdLista lista={lista} />
        </TableCell>
        <TableCell>
          <IntegracaoImage integracao={lista.integracao} />
        </TableCell>
        <TableCell>
          <Paragraph text={lista.pedidos} />
        </TableCell>
        <TableCell>
          <Status lista={lista} />
        </TableCell>
      </>
    )
  }

  function Tr(props: PropsWithChildren) {
    return <tr className="border-b h-[60px] border-wmsGrey">{props.children}</tr>
  }

  if (lista.situacao !== "finalizado") return (
    <Tr>
      <First />
    </Tr>
  )

  return (
    <Tr>
      <First />
      <TableCell>
        <DataFormat data={lista.gerado ? lista.alterado : lista.date} />
      </TableCell>
    </Tr>
  )
}