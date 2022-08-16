import { useState, useEffect } from "react";

import api from "../../api";

//~~>Compose
import RelatorioRow from "../../compose/RelatorioRow";

//~~>Components
import Busca from "../../components/Filters/Busca";
import Filtro from "../../components/Filters/Filtro";
import DataSelector from "../../components/Filters/DataSelector";

//~~>Interfaces
import UISituacao from "../../interfaces/UISituacao";
import Paragraph from "../../components/Texts/Paragraph";
import UIIntegracao from "../../interfaces/UIIntegracao";
import PrintButton from "../../compose/Buttons/PrintButton";
import UIFiltrarPedidos from "../../interfaces/UIFiltrarPedidos";
import UI_FiltrarPedidos from "../../interfaces/UI_FiltrarPedidos";

export default function Relatorio() {
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
    const { situacao, integracao, busca, data, page, pedidos, pages } = pars;

    setStatusData({
      pedidos: pedidos || statusData.pedidos,
      situacao: situacao || statusData.situacao,
      integracao: integracao || statusData.integracao,
      busca: busca || statusData.busca,
      data: (() => {
        if (data == "") return "";
        if (data != undefined) return data;
        return statusData.data;
      })(),
      page: page || 1,
      pages: pages || statusData.pages,
    });
  }

  function infoToUrl(pars: UI_FiltrarPedidos) {
    const check = (key: keyof { situacao: string; integracao: string }) => {
      let tx = "";
      if (!key || pars[key] === "todos") return "";
      if (!pars[key]) tx += `&${key}=${pars[key]}`;
      else if (
        statusData[key]?.toLowerCase() !== "todos" &&
        statusData[key] !== ""
      )
        tx += `&${key}=${statusData[key]}`;
      return tx;
    };
    let text = `/pedidos`;
    if (pars.situacao !== undefined) text += check("situacao");
    if (pars.integracao !== undefined) text += check("integracao");

    if (pars.data !== undefined && pars.data !== "")
      text += `&date=${pars.data}`;
    else if (statusData.data !== "" && pars.data !== "")
      text += `&date=${statusData.data}`;

    text = text.replace("&", "?");

    return text;
  }

  useEffect(() => {
    api.get("/pedidos").then(({ data }) => setInfo({ pedidos: data.response }));
  }, []);

  function updateSituacao(situacao: UISituacao["situacao"]) {
    if (situacao == statusData.situacao) return;
    api
      .get(infoToUrl({ situacao }))
      .then(({ data }) => setInfo({ pedidos: data.response, situacao }));
  }

  function updateIntegracao(integracao: UIFiltrarPedidos["integracao"]) {
    if (integracao == statusData.integracao) return;
    api
      .get(infoToUrl({ integracao }))
      .then(({ data }) => setInfo({ pedidos: data.response, integracao }));
  }

  function updateData(data_: UIFiltrarPedidos["data"]) {
    if (data_ == statusData.data) return;
    api
      .get(infoToUrl({ data: data_ }))
      .then(({ data }) => setInfo({ pedidos: data.response, data: data_ }));
  }

  function Buscar(value: string) {
    if (value.trim() === "") {
      api
        .get("/pedidos")
        .then(({ data }) => setInfo({ pedidos: data.response }));
    }
    api.get(`/pedidos/buscar?busca=${value}`).then(({ data }) => {
      console.log(data);
      setInfo({ pedidos: data.response });
    });
  }

  const ThCell = (props: { text: string | number }) => (
    <th>
      <div className="pb-2 pl-2 flex items-center justify-center">
        <p>{props.text}</p>
      </div>
    </th>
  );

  return (
    <div className="w-[90%] flex-col flex gap-10">
      <header>
        <h1 className="text-4xl font-semibold mb-8"> Relatório de Pedidos </h1>
        <div className="flex justify-center flex-wrap items-center gap-2 print:hidden">
          <Busca
            cb={Buscar}
            id="busca"
            placeholder="Pesquisar ID do Pedido ou Nota Fiscal"
          />
          <Filtro
            title="Situação"
            seletorId="seletorSituacao"
            cb={({ target }: { target: HTMLSelectElement }) => {
              updateSituacao(target.value as UISituacao["situacao"]);
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
            cb={({ target }: { target: HTMLInputElement }) => {
              updateIntegracao(target.value as UIIntegracao["integracao"]);
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
            cb={({ target }: { target: HTMLDataElement }) => {
              updateData(target.value as UIFiltrarPedidos["data"]);
            }}
          />
          <PrintButton />
          <div className=" p-1 rounded-lg border text-wmsPink  border-wmsBlack">
            <Paragraph
              text={`${statusData.pedidos.length} pedidos encontrados`.toUpperCase()}
            />
          </div>
        </div>
      </header>
      <main className="w-full">
        <table className="w-full">
          <thead className="print:hidden">
            <tr className="text-xl border-b-2 border-b-wmsGrey">
              <ThCell text="NF-e" />
              <ThCell text="Chave de Acesso" />
              <ThCell text="SKU" />
              <ThCell text="Número do Pedido" />
              <ThCell text="Canal" />
              <ThCell text="Qnt" />
            </tr>
          </thead>
          <tbody>
            {statusData.pedidos.map(({ chavedeacesso }, i) => (
              <RelatorioRow
                key={"relat_" + chavedeacesso}
                pedido={statusData.pedidos[i]}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
