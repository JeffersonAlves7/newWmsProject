import { useNavigate } from "react-router-dom"
import InputText from "../../components/Inputs/InputText";
import Title from "../../components/Texts/Title";

export default function Embalar() {
    const navigate = useNavigate()
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
        </div>
    )
}