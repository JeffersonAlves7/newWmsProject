import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../../api"
import UIItens from "../../interfaces/UIItens"
interface IUPedido { itens: UIItens[] }
import PrintButton from "../../compose/Buttons/PrintButton"

function Row({ sku, quantidade }: { sku: UIItens['sku'], quantidade: UIItens['quantidade'] }) {
    return (
        <tr>
            <td className="p-4 border-b border-t border-r border-black ">{sku}</td>
            <td className="p-4 border-b border-t border-black">{quantidade}</td>
        </tr>
    )
}

function getValues(arr: UIItens[]) {
    const values: { sku: UIItens['sku'], quantidade: UIItens['quantidade'] }[] = []

    for (let i = 0; i < arr.length; i++) {
        const repeated = arr.filter(v => v.sku === arr[i].sku)
        if (!repeated[0]) continue

        const is_repeated = values.filter(v => v.sku === repeated[0].sku)
        if (is_repeated[0]) continue

        const quantidade = repeated.reduce((mut, now) => (
            mut.quantidade
                ? mut.quantidade + now.quantidade
                : (mut as any) + now.quantidade
        ))
        values.push({
            sku: repeated[0].sku,
            quantidade: repeated.length > 1 ? ((typeof quantidade === "number") ? quantidade : 0) : repeated[0].quantidade
        })
    }
    return values
}

export default function ListaDeSeparacao() {
    const [itens, setItens] = useState<UIItens[]>([])
    const { id } = useParams()

    useEffect(() => {
        api.get('/pedidos?itens=true&idLista=' + id)
            .then(({ data }) => {
                const { response } = data
                const mount: UIItens[] = []
                response.forEach((pedido: IUPedido) => {
                    pedido.itens.forEach(item => mount.push(item))
                });
                setItens(mount)
            })
    }, [])

    return (
        <div className="w-full h-full p-8 flex flex-col gap-10 text-sm ">
            <header className="flex justify-evenly items-center">
                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-lg font-semibold">ID da Lista de Coleta: {id}</h1>
                </div>
                <PrintButton />
            </header>
            <main className="flex items-center justify-center text-center">
                <table>
                    <thead>
                        <tr>
                            <th className="border-black border-r p-2">Referência</th>
                            <th>Qtd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getValues(itens).map(item => <Row {...item} />)}
                    </tbody>
                </table>
            </main>
        </div>
    )
}