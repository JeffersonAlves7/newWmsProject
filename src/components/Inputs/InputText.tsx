export default function InputText(props: { onKeyDown: Function, className?: string, id: string, placeholder: string }) {
  const classText = " border pt-4 max-w-full pb-4 pl-4 pr-4 rounded-md border-wmsLightPink outline-none text-xl sm:text-2xl "
  return (
    <input
      onKeyDown={(e) => props.onKeyDown(e)}
      id={props.id}
      placeholder={props.placeholder}
      type="text"
      className={
        props.className
          ? props.className + classText
          : classText
      }
      autoFocus={true}
    />
  )
}