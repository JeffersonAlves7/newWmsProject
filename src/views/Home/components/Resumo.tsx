import { HiOutlineMinus } from "react-icons/hi";

import UIPedido from "../../../interfaces/UIPedido";

import MagaluLogo from "../../../img/magalulogo.png"
import MercadoLogo from "../../../img/mercadolivrelogo.png"
import ShopeeLogo from "../../../img/shopeelogo.png"
import CorreiosLogo from "../../../img/correioslogo.png"
import Subtitle from "../../../components/Texts/Subtitle";

function _Compose({ num1, num2, image }: { num1: number, num2: number, image: string }) {
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
  )
}

export default function Resumo({ pedidos }: { pedidos: UIPedido[] }) {
  return (
    <article id="resumo-pedidos">
      <header>
        <Subtitle bold={false} text="Resumo dos Pedidos" />
      </header>
      <main className="w-[280px] pl-4 pr-4 h-[18rem] border shadow-sm rounded-xl">
        <ul className="grid grid-rows-4 items-center h-full w-full ">
          <_Compose image={MercadoLogo} num1={
            pedidos.filter(a => ["emaberto", "processando"].indexOf(a.situacao) === -1 && a.integracao === "MercadoLivre").length
          } num2={
            pedidos.filter((a) => a.integracao === "MercadoLivre").length
          } />
          <_Compose image={MagaluLogo} num1={
            pedidos.filter((a) => ["emaberto", "processando"].indexOf(a.situacao) === -1 && a.integracao === "IntegraCommerce").length
          } num2={
            pedidos.filter((a) => a.integracao === "IntegraCommerce").length
          } />
          <_Compose image={ShopeeLogo} num1={
            pedidos.filter((a) => ["emaberto", "processando"].indexOf(a.situacao) === -1 && a.integracao === "Shopee").length
          } num2={
            pedidos.filter((a) => a.integracao === "Shopee").length
          } />
          <_Compose image={CorreiosLogo} num1={
            pedidos.filter((a) => ["emaberto", "processando"].indexOf(a.situacao) === -1 && ["Kabum", "SkyHub"].indexOf(a.integracao) > -1).length
          } num2={
            pedidos.filter((a) => ["Kabum", "SkyHub"].indexOf(a.integracao) > -1).length
          } />
        </ul>
      </main>
    </article>
  )
}