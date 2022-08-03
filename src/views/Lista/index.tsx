import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api";
import UIPedido from "../../interfaces/UIPedido";

import PedidosHeader from "../../compose/PedidosHeader";
import PedidoRow from "../../compose/PedidosRow";
import ScrollView from "../../components/ScrollView";

import ListaDeColeta from "../../compose/Buttons/ListaDeColeta";
import ListaDeSeparacao from "../../compose/Buttons/ListaDeSeparacao";
import Subtitle from "../../components/Texts/Subtitle";

export default function Lista() {
  const { id } = useParams()

  const [pedidos, setPedidos] = useState<UIPedido[]>([])

  useEffect(() => {
    api.get("/pedidos?itens=true&idLista=" + id).then(({ data }) => {
      const { response } = data
      console.log(response)
      setPedidos(response)
    })
  }, [])

  if (!pedidos) return <></>

  return (
    <div className='flex w-[90%] max-w-[900px] flex-col items-center gap-[2rem] min-h-[40rem]'>
      <header className='flex w-full gap-5 items-center justify-between'>
        <Subtitle text={`ID da Lista de Coleta - ${id}`} />
        <div className="grid grid-cols-2 gap-2">
          <ListaDeColeta id={id ? Number(id) : 0} />
          <ListaDeSeparacao id={id ? Number(id) : 0} />
        </div>
      </header>
      <ScrollView alter={pedidos} length={pedidos.length} total={5}>
        <table className="w-full">
          <PedidosHeader />
          <tbody>
            {pedidos.map(pedido => <PedidoRow pedido={pedido} />)}
          </tbody>
        </table>
      </ScrollView>
    </div>
  )
}