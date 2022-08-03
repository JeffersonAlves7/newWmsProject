import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import api from "../../api"
import UIPedido from "../../interfaces/UIPedido"

import InputText from "../../components/Inputs/InputText"
import Title from "../../components/Texts/Title"
import Paragraph from "../../components/Texts/Paragraph"

export default function listaAtiva() {
    const [info, setInfo] = useState({ embalado: 0, total: 0 })
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        api.get('/pedidos?idLista=' + id)
            .then(({ data }) => {
                const { response } = data
                if (response.filter((pedido: UIPedido) => pedido.situacao == "finalizado").length === response.length) navigate('/embalar')
                setInfo({
                    embalado: response.filter((pedido: UIPedido) => pedido.situacao == "embalado").length,
                    total: response.length
                })
            })
            .catch(() => {
                navigate('/embalar')
            })
    }, [])

    return (
        <div className="flex flex-col gap-[2rem] w-[90%] max-w-[700px]">
            <header className='border-b-2 p-2 border-b-wmsPink w-full flex justify-between '>
                <Title text={`Lista de Coleta Ativa - ${id}`} />
                <Paragraph text={`${info.embalado}/${info.total}`} />
            </header>
            <InputText id="input_lista" placeholder="Escanear ou inserir o ID do Pedido" onKeyDown={(e: KeyboardEvent) => {
                const { value } = e.target as HTMLInputElement
                console.log("Clicou")

                if (e.key !== "Enter") return
                if (value.trim() === "") return
                navigate(`/checkout/${value}`);
                return
            }} />
        </div>
    )
}
