import { useState, useEffect } from "react";

import api from "../../api";
import Pedido from "../../interfaces/UIPedido";

import Resumo from "./components/Resumo";
import Painel from "./components/Painel";

export default function Home() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    api.get("/pedidos?date=true")
      .then(({ data }) => {
        setPedidos(data.response)
      })
  }, [])

  return (
    <main id="Dashboard" className='flex w-[90%] max-w-[1000px] flex-col items-center  min-h-[40rem]'>
      <div className="flex flex-col gap-4 items-center sm:gap-[3rem]">
        <div className="flex gap-4 flex-wrap items-center justify-center">
          <Painel title="Processando"
            span={pedidos.filter(a => a.situacao == "processando").length}
          />
          <Painel title="Em Aberto"
            span={pedidos.filter(a => a.situacao == "emaberto").length}
          />
          <Painel title="Embalados"
            span={pedidos.filter(a => ["emaberto", "processando"].indexOf(a.situacao) == -1).length}
          />
        </div>
        <div className="flex justify-center sm:justify-between  w-full flex-wrap">
          <Resumo pedidos={pedidos} />
          <div>
          </div>
        </div>
      </div>
    </main>
  )
}