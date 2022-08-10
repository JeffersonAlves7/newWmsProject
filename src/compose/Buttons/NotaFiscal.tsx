import { AiFillPrinter } from "react-icons/ai";
import UIPedido from "../../interfaces/UIPedido";
import services from "../../config/services.json";
import WmsLink from "../../components/Buttons/WmsLink";
import Paragraph from "../../components/Texts/Paragraph";
import WmsButton from "../../components/Buttons/WmsButton";

export default function NotaFiscal({ nf, blank, cb }: { nf?: UIPedido['nf'], blank: boolean, cb?: Function }) {
  return blank === true && nf !== undefined
    ? (
      <WmsLink blank={services.api.baseURL + "/notas?nf=" + nf}>
        <> <AiFillPrinter size={20} /> <Paragraph text="Nota Fiscal" /> </>
      </WmsLink>
    )
    : (
      <WmsButton onClick={() => { if (cb) cb(true) }}>
        <> <AiFillPrinter size={20} /> <Paragraph text="Nota Fiscal" /> </>
      </WmsButton>
    )
}
