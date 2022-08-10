import Paragraph from "../Texts/Paragraph"

export default function DataFormat({ data, className }: { data: string, className?: string }) {
  const formated = (() => {
    let text = data.replace(".000Z", "").replace("T", "")
    const [h, min, s] = text.substring(10, text.length).split(":")
    const [y, m, d] = text.substring(0, 10).split("-")
    return `${d}-${m}-${y} ${(Number(h) - 3) < 10 ? `0${(Number(h) - 3)}` : (Number(h) - 3)}:${min}:${s}`
  })()

  return <Paragraph className={className ? className : ""} text={formated} />
}