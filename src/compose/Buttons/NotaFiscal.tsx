import { AiFillPrinter } from "react-icons/ai";
import WmsLink from "../../components/Buttons/WmsLink";
import UIPedido from "../../interfaces/UIPedido";
import services from "../../config/services.json"
import WmsButton from "../../components/Buttons/WmsButton";
import Paragraph from "../../components/Texts/Paragraph";

export default function NotaFiscal({ nf, blank, cb }: { nf?: UIPedido['nf'], blank: boolean, cb?: Function }) {
  if (blank === true && nf !== undefined) {
    return (
      <WmsLink blank={services.api.baseURL + "/notas?nf=" + nf}>
        <>
          <AiFillPrinter size={20} />
          <Paragraph text="Nota Fiscal" />
        </>
      </WmsLink>
    )
  }
  // <iframe className="h-[30rem] w-full" src={services.api.baseURL + "/notas?nf=" + nf}></iframe>

  return (
    <WmsButton onClick={() => {
      if (cb) cb(true)
    }}>
      <>
        <AiFillPrinter size={20} />
        <Paragraph text="Nota Fiscal" />
      </>
    </WmsButton>
  )
}
