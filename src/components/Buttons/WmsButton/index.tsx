import { ReactElement } from "react";

export default function WmsButton({ text, onClick, children }: { text?: string, onClick: Function, children?: ReactElement }) {
    const className = "bg-wmsPink w-full flex items-center justify-between gap-4 hover:scale-105 transition-all hover:bg-blue-500 p-1 pr-2 pl-2 rounded"
    return (
        <button className={className} onClick={(e) => { onClick(e) }}>
            {children ? children : text}
        </button>
    )
}