import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import api from "../../api"
import UIPedido from "../../interfaces/UIPedido"

import InputText from "../../components/Inputs/InputText"
import Title from "../../components/Texts/Title"
import Paragraph from "../../components/Texts/Paragraph"

export default function listaAtiva() {
    const [info, setInfo] = useState<{ embalado: number, total: number, pedidos: UIPedido[] }>({ embalado: 0, total: 0, pedidos: [] })
    const { id, error } = useParams()

    if (error) { window.history.pushState('page2', 'wmsPage2', `/listaAtiva/${id}`) }

    const navigate = useNavigate()

    useEffect(() => {
        api.get('/pedidos?idLista=' + id)
            .then(({ data }) => {
                const { response } = data
                if (response.filter((pedido: UIPedido) => pedido.situacao == "finalizado").length === response.length) navigate('/embalar')
                setInfo({
                    embalado: response.filter((pedido: UIPedido) => pedido.situacao == "embalado").length,
                    total: response.length,
                    pedidos: response
                })
            })
            .catch(() => navigate('/embalar/error'))
    }, [])

    return (
        <div className="flex flex-col gap-[2rem] w-[90%] max-w-[700px]">
            <header className='border-b-2 p-2 border-b-wmsPink w-full flex justify-between '>
                <Title text={`Lista de Coleta Ativa - ${id}`} /> <Paragraph text={`${info.embalado}/${info.total}`} />
            </header>
            <InputText id="input_lista" placeholder="Escanear ou inserir o ID do Pedido" onKeyDown={(e: KeyboardEvent) => {
                const { value } = e.target as HTMLInputElement
                const chaves = info.pedidos.map(a => a.chavedeacesso)

                if (e.key !== "Enter") return
                if (value.trim() === "") return

                (e.target as HTMLInputElement).value = ""
                if (chaves.includes(value)) navigate(`/checkout/${value}`);
            }} />
            {
                error
                    ? <div className="bg-red-200 p-2 rounded-lg">
                        <p className="font-semibold">Erro: Pedido não está em aberto.</p>
                    </div>
                    : <></>
            }
        </div>
    )
}