import Paragraph from "../Texts/Paragraph"

export default function DataFormat({ data, className }: { data: string, className?: string }) {
  const formated = (() => {
    let text = data.replace(".000Z", "").replace("T", "")
    const [h, min, s] = text.substring(10, text.length).split(":")
    const [y, m, d] = text.substring(0, 10).split("-")
    return `${d}-${m}-${y} ${Number(h) - 3}:${min}:${s}`
  })()

  if (className) return <Paragraph className={className} text={formated} />
  return <Paragraph text={formated} />
}