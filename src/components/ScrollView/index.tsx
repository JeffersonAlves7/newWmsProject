import { ReactElement, useEffect } from "react";

export default function ScrollView({ children, length, total, alter }: { children: ReactElement, alter: any, length: number, total: number }) {

  useEffect(() => {
    const scrollArea = (document.getElementById("scroll-area") as HTMLElement)
    scrollArea.scroll(0, 0)
  }, [alter])

  if (length > total) {
    return <main id="scroll-area" className='w-full scroll-smooth h-full overflow-y-scroll max-h-[36rem]'>
      {children}
    </main>
  }
  return (
    <main id="scroll-area" className="w-full h-full scroll-smooth max-h-[36rem]">
      {children}
    </main>
  )
}