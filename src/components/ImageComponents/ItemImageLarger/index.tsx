import UIItens from "../../../interfaces/UIItens";
import "./style.css"

export default function ItemImageLarger({ url }: { url: UIItens['imagem']['url'] }) {
  return (
    <div
      id="item-image"
      className="border shadow-xl bg-white  border-slate-300 h-full w-full max-w-[15rem] max-h-[15rem] rounded-xl flex items-center justify-center overflow-hidden">
      <img src={url} alt="" />
    </div>
  )
}
