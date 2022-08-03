import { useState, useEffect } from 'react'

import api from "../../api"

import PedidoRow from '../../compose/PedidosRow'
import PedidosHeader from '../../compose/PedidosHeader'

import UIFiltrarPedidos from '../../interfaces/UIFiltrarPedidos'
import UI_FiltrarPedidos from '../../interfaces/UI_FiltrarPedidos'

import Busca from '../../components/Filters/Busca'
import Filtro from '../../components/Filters/Filtro'
import DataSelector from '../../components/Filters/DataSelector'
import Title from '../../components/Texts/Title'
import Pages from '../../components/Filters/Pages'
import ScrollView from '../../components/ScrollView'


export default function Historico() {
    const [statusData, setStatusData] = useState<UIFiltrarPedidos>({
        pedidos: [],
        page: 1,
        pages: [1],
        situacao: "todos",
        integracao: "todos",
        busca: "",
        data: "",
    })
    if (!statusData) return <></>

    function setInfo(pars: UI_FiltrarPedidos) {
        const { situacao, integracao, busca, data, page, pages, pedidos } = pars
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

    useEffect(() => {
        api.get('/pedidos?itens=true&page=1')
            .then(res => {
                const { response, pages } = res.data
                const pgs = []
                for (let i = 1; i <= Math.floor(pages); i++) {
                    pgs.push(i)
                }
                setInfo({ pedidos: response, pages: pgs })
            })
    }, [])

    function infoToUrl(pars: UI_FiltrarPedidos) {
        let text = `/pedidos?itens=true`

        if (pars.page != undefined) text += pars.page > 0 ? `&page=${pars.page}` : `&page=1`

        if (text.indexOf("page") === -1) text += "&page=1"

        if (pars.situacao !== undefined) {
            if (pars.situacao !== "" && pars.situacao.toLowerCase() !== "todos") text += `&situacao=${pars.situacao}`
            else if (pars.situacao.toLowerCase() !== "todos" && statusData.situacao !== "todos") text += `&situacao=${statusData.situacao}`
        } else if (statusData.situacao !== "" && statusData.situacao !== "todos") text += `&situacao=${statusData.situacao}`

        if (pars.integracao !== undefined) {
            if (pars.integracao !== "" && pars.integracao.toLowerCase() !== "todos") text += `&integracao=${pars.integracao}`
            else if (pars.integracao.toLowerCase() !== "todos" && statusData.integracao !== "todos") text += `&integracao=${statusData.integracao}`;
        } else if (statusData.integracao !== "" && statusData.integracao !== "todos") text += `&integracao=${statusData.integracao}`

        if (pars.data !== undefined && pars.data !== "") text += `&date=${pars.data}`
        else if (statusData.data !== "" && pars.data !== "") text += `&date=${statusData.data}`

        console.log(text)
        return text
    }

    function updateSituacao(situacao: UIFiltrarPedidos['situacao']) {
        const url = infoToUrl({ situacao })
        api.get(url)
            .then(res => {
                const { response, pages } = res.data
                const pgs = []
                for (let i = 1; i <= Math.floor(pages); i++) { pgs.push(i) }
                setInfo({ pedidos: response, situacao, pages: pgs })
            })
    }

    function updateIntegracao(integracao: UIFiltrarPedidos['integracao']) {
        const url = infoToUrl({ integracao })
        api.get(url).then(res => {
            const { response, pages } = res.data
            const pgs = []
            for (let i = 1; i <= Math.floor(pages); i++) {
                pgs.push(i)
            }
            setInfo({ pedidos: response, integracao, pages: pgs })
        })
    }

    function updateData(data: UIFiltrarPedidos["data"]) {
        console.log(data)
        const url = infoToUrl({ data })
        api.get(url).then(res => {
            const { response, pages } = res.data
            const pgs = []
            for (let i = 1; i <= Math.floor(pages); i++) {
                pgs.push(i)
            }
            console.log(data)
            setInfo({ pedidos: response, data, pages: pgs })
        })
    }

    function updatePage(page: UIFiltrarPedidos["page"]) {
        const url = infoToUrl({ page: page })
        api.get(url).then(res => {
            const { response } = res.data
            setInfo({ pedidos: response, page })
        })
    }

    return (
        <div className='flex w-[90%] max-w-[1000px] flex-col items-center gap-[2rem] h-full min-h-[40rem]'>
            <header className='flex flex-col gap-5 items-center justify-center'>
                <div className='w-full flex sm:justify-start items-center justify-center'>
                    <Title text="Histórico de Pedidos" />
                </div>
                <div className='flex justify-center flex-wrap items-center gap-2'>
                    <Busca cb={(e: KeyboardEvent) => { }} id="busca" placeholder='Pesquisar ID do Pedido ou Nota Fiscal' />
                    <Filtro title="Situação" seletorId="seletorSituacao" cb={(e: KeyboardEvent) => {
                        updateSituacao((e.target as HTMLSelectElement).value as UIFiltrarPedidos['situacao'])
                    }} name="situacao" options={{
                        todos: "Todos",
                        processando: "Processando",
                        emaberto: "Em Aberto",
                        embalado: "Embalado",
                        finalizado: "Finalizado",
                    }} />
                    <Filtro title="Canais" seletorId="seletorCanais" cb={(e: KeyboardEvent) => {
                        updateIntegracao((e.target as HTMLSelectElement).value as UIFiltrarPedidos['integracao'])
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
            <ScrollView alter={[statusData.page, statusData.data, statusData.integracao, statusData.situacao]} length={statusData.pedidos.length} total={5}>
                <>
                    <table className="w-full">
                        <PedidosHeader />
                        <tbody className=''>
                            {statusData.pedidos.map(pedido => <PedidoRow pedido={pedido} />)}
                        </tbody>
                    </table>
                    <footer className='w-full flex items-center justify-end pb-5'>
                        <Pages cb={(p: number) => updatePage(p)} page={statusData.page} pages={statusData.pages} />
                    </footer>
                </>
            </ScrollView>
        </div>
    )
}
