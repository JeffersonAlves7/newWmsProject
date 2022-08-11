import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import api from "../../api"
import Subtitle from "../../components/Texts/Subtitle"
import WmsLink from "../../components/Buttons/WmsLink"
import Paragraph from "../../components/Texts/Paragraph"

import PedidoRow from "../../compose/PedidosRow"
import PedidosHeader from "../../compose/PedidosHeader"
import NotaFiscal from "../../compose/Buttons/NotaFiscal"
import ListaDeColeta from "../../compose/Buttons/ListaDeColeta"

import UIPedido from "../../interfaces/UIPedido"

export default function Pedido() {
  const [pedidoInfo, setPedidoInfo] = useState<UIPedido>({
    pedidoBling: "",
    integracao: "",
    chavedeacesso: "",
    alterado: "",
    gerado: "",
    serie: 0,
    nf: "",
    qntItens: 0,
    pedido: "",
    situacao: "",
    idLista: 0,
  })

  const { pedido } = useParams()

  useEffect(() => {
    api.get("/pedidos?itens=true&pedido=" + pedido).then(({ data }) => setPedidoInfo(data.response[0]))
  }, [])

  return (
    <div className='flex w-[90%] max-w-[1000px] flex-col items-center gap-[2rem] min-h-[40rem]'>
      <header className='w-full flex  gap-2 items-center justify-between'>
        <div className="flex items-center flex-col gap-2">
          <Subtitle text={"NF-e: " + pedidoInfo.nf} />
          <div className="flex items-center">
            <WmsLink href={"/lista/" + pedidoInfo.idLista} >
              <Paragraph text={"Visitar Lista: " + pedidoInfo.idLista} />
            </WmsLink>
          </div>
        </div>
        <Subtitle text={`Pedido: ${pedido}`} />
        <div className="grid grid-rows-2 items-center justify-items-center gap-2">
          <ListaDeColeta id={pedidoInfo.idLista} nf={pedidoInfo.nf}/>
          <NotaFiscal blank={true} nf={pedidoInfo.nf} />
        </div>
      </header>
      <main className="w-full max-h-[30rem]">
        <table className="w-full">
          <PedidosHeader only={true} />
          <tbody>
            <PedidoRow pedido={pedidoInfo} only={true} />
          </tbody>
        </table>
      </main>
    </div>
  )
}
