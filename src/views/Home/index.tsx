import { useState, useEffect } from "react";
import api from "../../api";
import Pedido from "../../interfaces/UIPedido";
import Resumo from "./components/Resumo";
import Painel from "./components/Painel";
import Subtitle from "../../components/Texts/Subtitle";

export default function Home() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pendentes, setPendentes] = useState(0);

  useEffect(() => {
    api.get("/pedidos?date=true").then(({ data }) => {
      setPedidos(data.response);
    });
    api.get("/pedidos?date=false&situacao=processando").then(({ data }) => {
      setPendentes(data.response.length);
    });
  }, []);

  return (
    <main className="flex w-[90%] max-w-[1000px] flex-col items-center min-h-[40rem]">
      <div className="flex flex-col gap-4 lg:items-start items-center sm:gap-[3rem]">
        <section className="flex gap-4 flex-wrap items-center justify-center">
          <Painel
            title="Processando"
            span={pedidos.filter((a) => a.situacao == "processando").length}
          />
          <Painel
            title="Em Aberto"
            span={pedidos.filter((a) => a.situacao == "emaberto").length}
          />
          <Painel
            title="Embalados"
            span={
              pedidos.filter(
                (a) => ["emaberto", "processando"].indexOf(a.situacao) == -1
              ).length
            }
          />
        </section>
        <section className="flex lg:flex-row lg:w-full flex-col items-end gap-4 justfy-between">
          <Resumo pedidos={pedidos} />
          <article className="flex flex-col items-start justify-center">
            <Subtitle bold={false} text="Pedidos Pendentes" />
            <div className="rounded-xl p-4 h-[18rem] w-[280px] shadow-lg border border-slate-200">
              <div className="w-full h-full flex items-center justify-center border-l-[3px] border-wmsPink">
                <span className="text-[10rem]">{pendentes}</span>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
