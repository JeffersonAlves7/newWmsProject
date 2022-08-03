import MagaluLogo from "../../../img/magalulogo.png"
import MercadoLogo from "../../../img/mercadolivrelogo.png"
import ShopeeLogo from "../../../img/shopeelogo.png"
import CorreiosLogo from "../../../img/correioslogo.png"

import UIIntegracao from "../../../interfaces/UIIntegracao"

function Image({ image, integracao }: { image: string, integracao: string }) {
  return <img className="max-h-[35px] max-w-[80px]" src={image} alt={integracao + " " + "logo"} />

}
export default function IntegracaoImage({ integracao }: { integracao: UIIntegracao['integracao'] }) {
  if (integracao == 'IntegraCommerce') return <Image image={MagaluLogo} integracao={integracao} />
  if (integracao == 'MercadoLivre') return <Image image={MercadoLogo} integracao={integracao} />
  if (integracao == 'Shopee') return <Image image={ShopeeLogo} integracao={integracao} />
  if (['kabum', 'skyhub'].indexOf(integracao.toLowerCase()) > -1 || integracao === "Correios") return <Image image={CorreiosLogo} integracao={integracao} />
  return <></>
}