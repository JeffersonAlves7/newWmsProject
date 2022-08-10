import { useNavigate, useParams } from "react-router-dom"
import InputText from "../../components/Inputs/InputText";
import Title from "../../components/Texts/Title";

export default function Embalar() {
    const { error } = useParams()
    const navigate = useNavigate()

    if (error) window.history.pushState('page2', 'wmsPage2', '/embalar');

    return (
        <div className="flex max-w-[40rem] pr-4 pl-4 w-full flex-col gap-[2rem]">
            <header>
                <Title text="Embalar" />
            </header>
            <InputText id="input_lista" placeholder="Escanear ou inserir o ID da Lista de Pedido" onKeyDown={(e: KeyboardEvent) => {
                if (e.key !== "Enter") return
                const { value } = e.target as HTMLInputElement
                if (value.trim() === "") return
                navigate(`/listaAtiva/${value}`);
                return
            }} />
            {
                error
                    ? <div className="bg-red-200 p-2 rounded-lg">
                        <p className="font-semibold">Erro: ID da Lista inválido.</p>
                    </div>
                    : <></>
            }
        </div>
    )
}