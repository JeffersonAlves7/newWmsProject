import { AiFillPrinter } from "react-icons/ai";
import WmsLink from "../../components/Buttons/WmsLink";
import UILista from "../../interfaces/UILista";

export default function ListaDeColeta({ id }: { id: UILista['id'] }) {
  return (
    <WmsLink to={"/listaDeColeta/" + id}>
      <>
        <AiFillPrinter size={20} />
        <p>Lista de Coleta</p>
      </>
    </WmsLink>
  )
}