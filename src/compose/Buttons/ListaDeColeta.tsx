import { AiFillPrinter } from "react-icons/ai";
import WmsLink from "../../components/Buttons/WmsLink";
import Paragraph from "../../components/Texts/Paragraph";
import UILista from "../../interfaces/UILista";

export default function ListaDeColeta({ id }: { id: UILista['id'] }) {
  return (
    <WmsLink to={"/listaDeColeta/" + id}>
      <>
        <AiFillPrinter size={20} />
        <Paragraph text={"Lista de Coleta"} />
      </>
    </WmsLink>
  )
}