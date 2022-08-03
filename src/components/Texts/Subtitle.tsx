export default function Subtitle({ text, bold }: { text: string, bold?: boolean }) {
  return <h2 className={"text-lg sm:text-2xl" + (bold === false ? "" : " font-semibold")}>
    {text}
  </h2>
}