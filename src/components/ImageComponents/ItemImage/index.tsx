import UIItens from "../../../interfaces/UIItens";

export default function ItemImage({ item }: { item: UIItens }) {
  return (
    <img className="max-h-[70px] max-w-[70px] md:max-h-[90px] md:max-w-[90px]" src={item.imagem.url ? item.imagem.url : item.sku} alt={item.sku} />
  )
}