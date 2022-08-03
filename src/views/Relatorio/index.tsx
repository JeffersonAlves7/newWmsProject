import { useState, useEffect } from "react"

import api from "../../api/index"

//~~>Components
import Busca from "../../components/Filters/Busca"
import Filtro from "../../components/Filters/Filtro"
import DataSelector from "../../components/Filters/DataSelector"
import RelatorioRow from "../../compose/RelatorioRow"

//~~>Interfaces
import UIFiltrarPedidos from "../../interfaces/UIFiltrarPedidos"
import UI_FiltrarPedidos from "../../interfaces/UI_FiltrarPedidos"
import UISituacao from "../../interfaces/UISituacao"
import UIIntegracao from "../../interfaces/UIIntegracao"

export default function Relatorio() {
    const [statusData, setStatusData] = useState<UIFiltrarPedidos>({
        pedidos: [],
        page: 1,
        pages: [1],
        situacao: "todos",
        integracao: "todos",
        busca: "",
        data: "true"
    })

    function setInfo(pars: UI_FiltrarPedidos) {
        const { situacao, integracao, busca, data, page, pedidos, pages } = pars

        console.log(pars)
        setStatusData(
            {
                pedidos: pedidos ? pedidos : statusData.pedidos,
                situacao: situacao ? situacao : statusData.situacao,
                integracao: integracao ? integracao : statusData.integracao,
                busca: busca ? busca : statusData.busca,
                data: (() => {
                    if (data == "") return ""
                    if (data != undefined) return data
                    return statusData.data
                })(),
                page: page ? page : 1,
                pages: pages ? pages : statusData.pages
            }
        )
    }

    function infoToUrl(pars: UI_FiltrarPedidos) {
        let text = `/pedidos`

        if (pars.situacao !== undefined) {
            if (pars.situacao !== "" && pars.situacao.toLowerCase() !== "todos")
                text += `&situacao=${pars.situacao}`
            else if (statusData.integracao.toLowerCase() !== "todos" && statusData.integracao !== "")
                text += `&situacao=${statusData.situacao}`
        }

        if (pars.integracao !== undefined) {
            if (pars.integracao !== "" && pars.integracao.toLowerCase() !== "todos") text += `&integracao=${pars.integracao}`
            else if (statusData.integracao.toLowerCase() !== "todos" && statusData.integracao !== "") text += `&integracao=${statusData.integracao}`;
        }

        if (pars.data !== undefined && pars.data !== "") text += `&date=${pars.data}`
        else if (statusData.data !== "" && pars.data !== "") text += `&date=${statusData.data}`

        text = text.replace("&", "?")

        console.log(text)
        return text
    }

    useEffect(() => {
        api.get('/pedidos?date=true')
            .then(res => {
                const { response } = res.data
                console.log(response)
                setInfo({ pedidos: response })
            })
    }, [])

    function updateSituacao(situacao: UISituacao['situacao']) {
        const url = infoToUrl({ situacao })
        api.get(url)
            .then(res => {
                const { response } = res.data
                setInfo({ pedidos: response, situacao })
            })
    }

    function updateIntegracao(integracao: UIFiltrarPedidos['integracao']) {
        const url = infoToUrl({ integracao })
        api.get(url).then(res => {
            const { response } = res.data
            setInfo({ pedidos: response, integracao })
        })
    }

    function updateData(data: UIFiltrarPedidos["data"]) {
        const url = infoToUrl({ data })
        if (data == "") {
            console.log(url)
            api.get("/pedidos?date=true").then(res => {
                const { response } = res.data
                setInfo({ pedidos: response, data: "" })
            })
        } else {
            api.get(url).then(res => {
                const { response } = res.data
                setInfo({ pedidos: response, data: data })
            })
        }
    }

    function updatePage(page: UIFiltrarPedidos["page"]) {
        const url = infoToUrl({ page: page })
        api.get(url).then(res => {
            const { response } = res.data
            setInfo({ pedidos: response, page })
        })
    }

    function ThCell(props: { text: string | number }) {
        return (
            <th>
                <div className="pb-2 pl-2 flex items-center justify-center">
                    <p>{props.text}</p>
                </div>
            </th>
        )
    }

    return (
        <div className="max-w-[1000px] w-[90%] flex-col flex gap-10">
            <header>
                <h1 className="text-4xl font-semibold mb-8">
                    Relatório de Pedidos
                </h1>
                <div className='flex justify-center flex-wrap items-center gap-2'>
                    <Busca cb={(e: KeyboardEvent) => { }} id="busca" placeholder='Pesquisar ID do Pedido ou Nota Fiscal' />
                    <Filtro title="situacao" seletorId="seletorSituacao" cb={(e: KeyboardEvent) => {
                        updateSituacao((e.target as HTMLSelectElement).value as UISituacao['situacao'])
                    }} name="situacao" options={{
                        todos: "Todos",
                        processando: "Processando",
                        emaberto: "Em Aberto",
                        embalado: "Embalado",
                        finalizado: "Finalizado",
                    }} />
                    <Filtro title="Canais" seletorId="seletorCanais" cb={(e: KeyboardEvent) => {
                        updateIntegracao((e.target as HTMLSelectElement).value as UIIntegracao['integracao'])
                    }} name="integracao" options={{
                        todos: "Todos",
                        MercadoLivre: "Mercado Coletas",
                        IntegraCommerce: "Magalu Coletas",
                        Correios: "Correios",
                        Shopee: "Shopee"
                    }} />
                    <DataSelector cb={(e: KeyboardEvent) => {
                        updateData((e.target as HTMLDataElement).value as UIFiltrarPedidos['data'])
                    }} />
                </div>
            </header>
            <main className='w-full'>
                <table className="w-full">
                    <thead>
                        <tr className="text-xl border-b-2 border-b-wmsGrey">
                            <ThCell text="Chave de Acesso" />
                            <ThCell text="NF-e" />
                            <ThCell text="Pedido" />
                            <ThCell text="Integração" />
                            <ThCell text="Quantidade" />
                            <ThCell text="Status" />
                            <ThCell text="Data" />
                        </tr>
                    </thead>
                    <tbody>
                        {statusData.pedidos.map(pedido => <RelatorioRow pedido={pedido} />)}
                    </tbody>
                </table >
            </main>
        </div>
    )
}