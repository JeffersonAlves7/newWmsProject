import { ReactElement } from "react"
import { NavLink } from "react-router-dom"

export default function ToTheSame({ to, textContent, children }: { to: string, textContent?: boolean, children: ReactElement }) {
  let className = "w-full flex gap-4 hover:scale-105 transition-all p-1 pr-2 pl-2 rounded"
  if (textContent) className += " text-center text-blue-500"
  else className += " bg-wmsPink flex items-center justify-center gap-4"

  return (
    <NavLink className={className} to={to}>
      {children}
    </NavLink>
  )

}