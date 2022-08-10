import UIItens from "../../../interfaces/UIItens";
import "./style.css"

export default function ItemImage({ item }: { item: UIItens }) {
  return (
    <div className=" itemImage relative transition-all z-1 hover:scale-[2.5] md:hover:scale-[2] hover:p-2 hover:shadow-xl hover:z-10 hover:bg-white h-[70px] w-[70px] md:h-[90px] md:w-[90px] rounded-lg flex items-center justify-center overflow-hidden">
      <img className="cursor-grab max-w-full max-h-full transition-all ease-out" src={item.imagem.url ? item.imagem.url : item.sku} alt={item.sku} />
      <div className="absolute opacity-0 to-hide shadow-lg bottom-0 flex items-center justify-center transition-all bg-slate-100 h-[19px] md:h-[25px] w-full p-1">
        <p className="text-[.35rem] md:text-[.47rem] first-letter:block max-w-full break-words text-blue-500 text-center font-semibold">{item.sku}</p>
      </div>
    </div>
  )
}