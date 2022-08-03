import UIItens from "../../interfaces/UIItens";
import ItemImage from "../ImageComponents/ItemImage";
import Paragraph from "../Texts/Paragraph";

export default function Item({ item }: { item: UIItens }) {
  return (
    <div className="grid grid-cols-[80px_30px] justify-center justify-items-center" key={item.sku}>
      <ItemImage item={item} />
      <div className="flex items-center justify-center">
        <Paragraph text={`x${item.quantidade}`} />
      </div>
    </div>
  )
}