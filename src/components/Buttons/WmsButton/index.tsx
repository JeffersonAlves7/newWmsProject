import { ReactElement } from "react";

export default function WmsButton({ text, onClick, children, green }: { text?: string, onClick: Function, children?: ReactElement, green?: boolean }) {
    const className = "w-full flex items-center justify-center gap-4 hover:scale-105 transition-all hover:bg-blue-500 p-1 pr-2 pl-2 rounded"

    return (
        <button className={className + (green === true ? " bg-green-400" : " bg-wmsPink")} onClick={(e) => { onClick(e) }}>
            {children ? children : text}
        </button>
    )
}