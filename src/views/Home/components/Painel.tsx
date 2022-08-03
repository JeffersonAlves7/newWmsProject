import Arrow from "../../../components/Buttons/Arrow"
import Subtitle from "../../../components/Texts/Subtitle";

export default function Painel(props: { title: string, span: number, className?: string }) {
  return (
    <article className={props.className ? props.className : ""}>
      <Subtitle text={props.title} bold={false} />
      <div className='border  border-gray-300 shadow-xl flex w-[280px] items-center justify-between pl-5 pr-5 rounded-2xl'>
        <Arrow length="40px" />
        <span className='text-[5rem]'>{props.span}</span>
      </div>
    </article>
  )
}