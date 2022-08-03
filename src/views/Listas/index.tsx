import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import api from "../../api";
import UILista from '../../interfaces/UILista';

import ListasRow from '../../compose/ListasRow';

import Filtro from "../../components/Filters/Filtro";
import ListaLinks from "../../components/ListaLinks";
import Title from '../../components/Texts/Title';
import ScrollView from '../../components/ScrollView';
import Subtitle from '../../components/Texts/Subtitle';

function TheadCell({ text, className }: { text: string, className?: string }) {
    return (
        <th className={className ? className : ""}>
            <Subtitle text={text} />
        </th>
    )
}

export default function Listas() {
    const [listas, setListas] = useState<UILista[]>([])

    const { situacao } = useParams()

    useEffect(() => {
        api.get(`/listas?situacao=${situacao}`).then(({ data }) => {
            const { response } = data
            setListas(response)
        })
    }, [situacao])

    function alterData(integracao: UILista['integracao']) {
        let url = `/listas?situacao=${situacao}`
        if (integracao.toLowerCase() !== "todos") url += `&integracao=${integracao}`
        api.get(url).then(({ data }) => {
            const { response } = data
            setListas(response)
        })
    }

    return (
        <div className="max-w-[700px] w-[90%] flex-col flex gap-10">
            <header className="flex justify-between items-center">
                <Title text="Selecionar" />
                <Filtro title="Canais" seletorId="seletorCanais" cb={(e: KeyboardEvent) => {
                    alterData((e.target as HTMLSelectElement).value as UILista['integracao'])
                }} name="integracao" options={{
                    todos: "Todos",
                    MercadoLivre: "Mercado Coletas",
                    IntegraCommerce: "Magalu Coletas",
                    Correios: "Correios",
                    Shopee: "Shopee"
                }} />
            </header>
            <main className="flex w-full flex-col gap-5">
                <ListaLinks />
                <ScrollView alter={listas} length={listas.length} total={5} >
                    <table className="w-full">
                        <thead>
                            <tr className='border-b border-black'>
                                <TheadCell text="ID da Lista" />
                                <TheadCell text="integracao" />
                                <TheadCell text="Pedidos" />
                                <TheadCell text="Status" />
                            </tr>
                        </thead>
                        <tbody>
                            {listas.map(lista => <ListasRow lista={lista} />)}
                        </tbody>
                    </table>
                </ScrollView>
            </main>
        </div>
    )
}
//164 lines