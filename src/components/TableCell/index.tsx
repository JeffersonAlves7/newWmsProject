import { CSSProperties, ReactNode } from "react";

export default function TableCell(props: { className?: string, style?: CSSProperties, children: ReactNode }) {
  return (
    <td className={props.className ? props.className : ""} style={props.style ? props.style : {}}>
      <div className="min-h-[80px] flex flex-col items-center justify-center">
        {props.children}
      </div>
    </td>
  )
}