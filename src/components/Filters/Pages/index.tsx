import { IoIosArrowForward } from 'react-icons/io'
import { useEffect, useState } from 'react'

export default ({ page, pages, cb }: { cb: Function, page: number, pages: number[] }) => {
  const [pageInfo, setPageInfo] = useState({
    page: page,
    pages: pages,
  })

  useEffect(() => {
    setPageInfo({
      page: page,
      pages: pages
    })
  }, [pages, page])

  const ioClassName = "text-3xl text-wmsPink "

  function make(p: number) {
    setPageInfo({
      page: p,
      pages: pageInfo.pages
    })
    cb(p)
  }

  return (
    <div className="flex gap-1 items-center">
      <button className="p-1" onClick={() => {
        make(pageInfo.page - 1 == 0 ? pageInfo.page : pageInfo.page - 1)
      }}>
        <IoIosArrowForward className={ioClassName + "rotate-[180deg]"} />
      </button>
      <div className="flex gap-1">
        {pageInfo.pages.map(pg => pg == pageInfo.page ? <span className="underline text-wmsPink" >{pg}</span> : <span className=' text-blue-400 hover:cursor-pointer' onClick={() => {
          make(pg)
        }}>{pg}</span>)}
      </div>
      <button className="p-1" onClick={() => {
        make(pageInfo.page + 1 > pageInfo.pages[pageInfo.pages.length - 1] ? pageInfo.page : pageInfo.page + 1)
      }}>
        <IoIosArrowForward className={ioClassName} />
      </button>
    </div>
  )
}