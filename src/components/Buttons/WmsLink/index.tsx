import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

export default function WmsLink({ text, href, to, blank, children }: { text?: string | number, href?: string, children?: ReactElement, to?: string, blank?: string }) {
    const className = "bg-wmsPink w-full flex items-center justify-between gap-4 hover:scale-105 transition-all hover:bg-blue-500 p-1 pr-2 pl-2 rounded"

    if (to != undefined) return (
        <NavLink className={className} to={to}>
            {children ? children : text}
        </NavLink>
    )

    if (blank != undefined) return (
        <a href={blank} target="_blank" className="w-full">
            <button title="notafiscal" type="button" className={className}>
                {children ? children : text}
            </button>
        </a>
    )

    return (
        <NavLink to={href ? href : "/"} className="text-center transition-all text-blue-500 p-1 pr-2 pl-2 rounded ">
            {children ? children : text}
        </NavLink>
    )
}