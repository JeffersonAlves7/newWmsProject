import { HiOutlineMinus } from "react-icons/hi";
import UIPedido from "../../../interfaces/UIPedido";
import MagaluLogo from "../../../img/magalulogo.png";
import MercadoLogo from "../../../img/mercadolivrelogo.png";
import ShopeeLogo from "../../../img/shopeelogo.png";
import CorreiosLogo from "../../../img/correioslogo.png";
import Subtitle from "../../../components/Texts/Subtitle";

function _Compose({
  num1,
  num2,
  image,
}: {
  num1: number;
  num2: number;
  image: string;
}) {
  return (
    <li className="h-full flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <HiOutlineMinus className="rotate-90 text-wmsPink text-[2.2rem]" />
          <img className="max-w-[80px]" src={image} alt="" />
        </div>
        <span className="text-xl">
          {num1}/{num2}
        </span>
      </div>
    </li>
  );
}

export default function Resumo({ pedidos }: { pedidos: UIPedido[] }) {
  function pedidosOpen(integracoes: UIPedido["integracao"][]) {
    return pedidos.filter(
      (a) =>
        ["emaberto", "processando"].indexOf(a.situacao) === -1 &&
        integracoes.indexOf(a.integracao) !== -1
    ).length;
  }
  function pedidosClose(integracoes: UIPedido["integracao"][]) {
    return pedidos.filter((a) => integracoes.indexOf(a.integracao) !== -1)
      .length;
  }
  return (
    <article id="resumo-pedidos">
      <header>
        {" "}
        <Subtitle bold={false} text="Resumo dos Pedidos" />{" "}
      </header>
      <main className="w-[280px] pl-4 pr-4 h-[18rem] border shadow-sm rounded-xl">
        <ul className="grid grid-rows-4 items-center h-full w-full ">
          <_Compose
            image={MercadoLogo}
            num1={pedidosOpen(["MercadoLivre"])}
            num2={pedidosClose(["MercadoLivre"])}
          />
          <_Compose
            image={MagaluLogo}
            num1={pedidosOpen(["IntegraCommerce"])}
            num2={pedidosClose(["IntegraCommerce"])}
          />
          <_Compose
            image={ShopeeLogo}
            num1={pedidosOpen(["Shopee"])}
            num2={pedidosClose(["Shopee"])}
          />
          <_Compose
            image={CorreiosLogo}
            num1={pedidosOpen(["Kabum", "SkyHub", "LojaIntegrada"])}
            num2={pedidosClose(["Kabum", "SkyHub", "LojaIntegrada"])}
          />
        </ul>
      </main>
    </article>
  );
}
