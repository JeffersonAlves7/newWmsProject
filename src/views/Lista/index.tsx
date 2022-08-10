import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api";
import UIPedido from "../../interfaces/UIPedido";

import PedidoRow from "../../compose/PedidosRow";
import PedidosHeader from "../../compose/PedidosHeader";

import Subtitle from "../../components/Texts/Subtitle";
import ListaDeColeta from "../../compose/Buttons/ListaDeColeta";
import ListaDeSeparacao from "../../compose/Buttons/ListaDeSeparacao";

export default function Lista() {
  const { id } = useParams()

  const [pedidos, setPedidos] = useState<UIPedido[]>([])

  useEffect(() => {
    api.get("/pedidos?itens=true&idLista=" + id).then(({ data }) => setPedidos(data.response))
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
      <main className="w-full">
        <table className="w-full">
          <PedidosHeader />
          <tbody>
            {pedidos.map(pedido => <PedidoRow key={"lista_" + pedido.chavedeacesso} pedido={pedido} />)}
          </tbody>
        </table>
      </main>
    </div>
  )
}