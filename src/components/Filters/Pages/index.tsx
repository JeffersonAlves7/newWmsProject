import { IoIosArrowForward } from 'react-icons/io'
import { memo, useEffect, useState } from 'react'
import DualArrowButton from '../../Buttons/DualArrowButton'

function Pages({ page, pages, cb }: { cb: Function, page: number, pages: number[] }) {
  const [pageInfo, setPageInfo] = useState({ page: page, pages: pages, })

  useEffect(() => {
    if (pageInfo.page === page && pages === pageInfo.pages) return
    setPageInfo({ page: page, pages: pages })
  }, [pages, page])

  function make(p: number) {
    setPageInfo({ page: p, pages: pageInfo.pages })
    cb(p)
  }

  return (
    <div className="flex gap-1 items-center">
      <div className='flex gap-2 items-center'>
        <DualArrowButton reverse={true} onCLick={() => {
          if (page === 1) return
          make(1)
        }} />
        <IoIosArrowForward className="rotate-180 text-3xl text-wmsPink hover:cursor-pointer hover:text-wmsBlack" onClick={() => make(pageInfo.page - 1 == 0 ? pageInfo.page : pageInfo.page - 1)} />
      </div>
      <main className="flex gap-1">
        {pageInfo.pages.map(pg => pg == pageInfo.page ? <span key={"page" + pg} className="underline text-wmsPink" >{pg}</span> : <span key={"page" + pg} className=' text-blue-400 hover:cursor-pointer' onClick={() => {
          if (pg === page) return
          make(pg)
        }}>{pg}</span>)}
      </main>
      <div className='flex gap-2 items-center'>
        <IoIosArrowForward className="text-3xl text-wmsPink hover:cursor-pointer hover:text-wmsBlack" onClick={() => {
          make(pageInfo.page + 1 > pageInfo.pages[pageInfo.pages.length - 1] ? pageInfo.page : pageInfo.page + 1)
        }} />
        <DualArrowButton onCLick={() => {
          const pg = pages[pages.length - 1]
          if (pg === page) return
          make(pg)
        }} />
      </div>
    </div>
  )
}
export default Pages