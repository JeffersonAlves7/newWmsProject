import { AiFillPrinter } from "react-icons/ai";
import WmsLink from "../../components/Buttons/WmsLink";
import Paragraph from "../../components/Texts/Paragraph";
import UILista from "../../interfaces/UILista";
import UIPedido from "../../interfaces/UIPedido";

export default function ListaDeColeta({ id, nf }: { id: UILista['id'], nf?: UIPedido['nf'] }) {
  const str = `/listaDeColeta/${id}${nf !== undefined ? `/${nf}` : ''}`
  return (
    <WmsLink to={str}>
      <>
        <AiFillPrinter size={20} />
        <Paragraph text={"Lista de Coleta"} />
      </>
    </WmsLink>
  )
}
