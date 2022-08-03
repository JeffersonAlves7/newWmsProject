export default function Paragraph({ text, className }: { text: string | number, className?: string }) {
  return <p className={className ? className : "text-sm sm:text-base"}>
    {text}
  </p>
}