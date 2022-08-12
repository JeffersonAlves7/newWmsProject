import { useState, useEffect } from "react";

import api from "../../api";

//~~>Compose
import PedidoRow from "../../compose/PedidosRow";
import PedidosHeader from "../../compose/PedidosHeader";

//~~>Interfaces
import UIFiltrarPedidos from "../../interfaces/UIFiltrarPedidos";
import UI_FiltrarPedidos from "../../interfaces/UI_FiltrarPedidos";

//~~>Components
import Title from "../../components/Texts/Title";
import Pages from "../../components/Filters/Pages";
import Busca from "../../components/Filters/Busca";
import Filtro from "../../components/Filters/Filtro";
import DataSelector from "../../components/Filters/DataSelector";

function Historico() {
  const [statusData, setStatusData] = useState<UIFiltrarPedidos>({
    pedidos: [],
    page: 1,
    pages: [1],
    situacao: "todos",
    integracao: "todos",
    busca: "",
    data: "",
  });

  function setInfo(pars: UI_FiltrarPedidos) {
    const { situacao, integracao, busca, data, page, pages, pedidos } = pars;
    setStatusData({
      pedidos: pedidos ? pedidos : statusData.pedidos,
      situacao: situacao ? situacao : statusData.situacao,
      integracao: integracao ? integracao : statusData.integracao,
      busca: busca ? busca : statusData.busca,
      data: (() => {
        if (data == "") return "";
        if (data != void 0) return data;
        return statusData.data;
      })(),
      page: page ? page : 1,
      pages: pages ? pages : statusData.pages,
    });
  }

  function infoToUrl(pars: UI_FiltrarPedidos) {
    let text = `/pedidos?itens=true`;

    if (pars.page != undefined)
      text += pars.page > 0 ? `&page=${pars.page}` : `&page=1`;

    if (text.indexOf("page") === -1) text += "&page=1";

    if (pars.situacao !== undefined) {
      if (pars.situacao !== "" && pars.situacao.toLowerCase() !== "todos")
        text += `&situacao=${pars.situacao}`;
      else if (
        pars.situacao.toLowerCase() !== "todos" &&
        statusData.situacao !== "todos"
      )
        text += `&situacao=${statusData.situacao}`;
    } else if (statusData.situacao !== "" && statusData.situacao !== "todos")
      text += `&situacao=${statusData.situacao}`;

    if (pars.integracao !== undefined) {
      if (pars.integracao !== "" && pars.integracao.toLowerCase() !== "todos")
        text += `&integracao=${pars.integracao}`;
      else if (
        pars.integracao.toLowerCase() !== "todos" &&
        statusData.integracao !== "todos"
      )
        text += `&integracao=${statusData.integracao}`;
    } else if (
      statusData.integracao !== "" &&
      statusData.integracao !== "todos"
    )
      text += `&integracao=${statusData.integracao}`;

    if (pars.data !== undefined && pars.data !== "")
      text += `&gerado=${pars.data}`;
    else if (statusData.data !== "" && pars.data !== "")
      text += `&gerado=${statusData.data}`;

    return text;
  }

  useEffect(() => {
    api.get("/pedidos?itens=true&page=1").then((res) => {
      const { response, pages } = res.data;
      const pgs = [...Array(pages).keys()].map((_, i) => i + 1);
      setInfo({ pedidos: response, pages: pgs });
    });
  }, []);

  function updateSituacao(situacao: UIFiltrarPedidos["situacao"]) {
    if (situacao === statusData.situacao) return;
    const url = infoToUrl({ situacao });

    api.get(url).then(({ data }) => {
      const { response, pages } = data;
      const pgs = [...Array(pages).keys()].map((_, i) => i + 1);
      setInfo({ pedidos: response, situacao, pages: pgs });
    });
  }

  function updateIntegracao(integracao: UIFiltrarPedidos["integracao"]) {
    if (integracao === statusData.integracao) return;
    const url = infoToUrl({ integracao });

    api.get(url).then(({ data }) => {
      const { response, pages } = data;
      const pgs = [...Array(pages).keys()].map((_, i) => i + 1);
      setInfo({ pedidos: response, integracao, pages: pgs });
    });
  }

  function updateData(data: UIFiltrarPedidos["data"]) {
    if (data === statusData.data) return;
    const url = infoToUrl({ data });

    api.get(url).then((res) => {
      const { response, pages } = res.data;
      const pgs = [...Array(pages).keys()].map((_, i) => i + 1);
      setInfo({ pedidos: response, data, pages: pgs });
    });
  }

  function updatePage(page: UIFiltrarPedidos["page"]) {
    if (page === statusData.page) return;
    const url = infoToUrl({ page: page });

    api.get(url).then(({ data }) => setInfo({ pedidos: data.response, page }));

    window.setTimeout(function () {
      window.scrollTo(0, document.body.scrollHeight);
    }, 200);
  }

  function Buscar(value: string) {
    if (value.trim() === "") {
      api.get("/pedidos?itens=true&page=1").then((res) => {
        const { response, pages } = res.data;
        const pgs = [...Array(pages).keys()].map((_, i) => i + 1);
        setInfo({ pedidos: response, pages: pgs });
      });
      return 0;
    }
    api.get(`/pedidos/buscar?busca=${value}`).then(({ data }) => {
      setInfo({ pedidos: data.response, page: 1, pages: [1] });
    });
  }

  return (
    <div className="flex w-[90%]  flex-col items-center gap-10 h-full min-h-[40rem]">
      <header className="flex flex-col gap-5 items-center sm:items-start w-full justify-center">
        <div className="w-full flex sm:justify-start items-center justify-center">
          <Title text="Histórico de Pedidos" />
        </div>
        <div className="flex justify-center flex-wrap items-center gap-2">
          <Busca
            cb={Buscar}
            id="busca"
            placeholder="Pesquisar N° do Pedido ou Nota Fiscal"
          />
          <Filtro
            title="Situação"
            seletorId="seletorSituacao"
            cb={(e: KeyboardEvent) => {
              updateSituacao(
                (e.target as HTMLSelectElement)
                  .value as UIFiltrarPedidos["situacao"]
              );
            }}
            name="situacao"
            options={{
              todos: "Todos",
              processando: "Processando",
              emaberto: "Em Aberto",
              embalado: "Embalado",
              finalizado: "Finalizado",
            }}
          />
          <Filtro
            title="Canais"
            seletorId="seletorCanais"
            cb={(e: KeyboardEvent) => {
              updateIntegracao(
                (e.target as HTMLSelectElement)
                  .value as UIFiltrarPedidos["integracao"]
              );
            }}
            name="integracao"
            options={{
              todos: "Todos",
              MercadoLivre: "Mercado Coletas",
              IntegraCommerce: "Magalu Coletas",
              Correios: "Correios",
              Shopee: "Shopee",
            }}
          />
          <DataSelector
            cb={(e: KeyboardEvent) => {
              updateData(
                (e.target as HTMLDataElement).value as UIFiltrarPedidos["data"]
              );
            }}
          />
        </div>
      </header>
      <main className="w-full">
        <table className="w-full">
          <PedidosHeader />
          <tbody className="">
            {statusData.pedidos.map((pedido) => (
              <PedidoRow key={pedido.chavedeacesso} pedido={pedido} />
            ))}
          </tbody>
        </table>
      </main>
      <footer className="w-full h-full flex items-center pt-2 pb-2 justify-end pr-1">
        <Pages
          cb={updatePage}
          page={statusData.page}
          pages={statusData.pages}
        />
      </footer>
    </div>
  );
}

export default Historico;
