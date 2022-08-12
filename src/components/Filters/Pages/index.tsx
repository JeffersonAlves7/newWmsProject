import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import DualArrowButton from "../../Buttons/DualArrowButton";

function Pages({
  page,
  pages,
  cb,
}: {
  cb: Function;
  page: number;
  pages: number[];
}) {
  const [pageInfo, setPageInfo] = useState({ page: page, pages: pages });

  useEffect(() => {
    if (pageInfo.page === page && pages === pageInfo.pages) return;
    setPageInfo({ page: page, pages: pages });
  }, [pages, page]);

  function make(p: number) {
    setPageInfo({ page: p, pages: pageInfo.pages });
    cb(p);
  }

  function pageComputed(): [string | number] {
    //Explaining: the pages are like 1 to 9 -> 1 2 3 4 5 6 7 8 9
    //The objective is, mantain the user on the mid like => . . 3 (4) 5 . 7 8 9 || 1 (2) 3 . . . 7 8 9
    // if the user is on the 1, 2, 3 position, the pages must be like 1 2 3 ... [3 last pages]
    // else if the user positions is >3, the pages must be like [2 inner pages] . . . [userP - 1, userP, user P + 1] . . . [ 2 last pages]
    // else if the USERP > lastPosition - 2, the pages must be like [3 inner pages] . . . [ 3 last pages]
    //SO THE CASES IS pages [1 to 9]
    // 1) 1 2 (3) . . .  7 8 9
    // 2) 1 2 . . . 4 (5) 6 . . . 8 9
    // 3) 1 2 3 . . .  7 8 (9) r
    const { pages, page } = pageInfo;

    if (pages.length <= 6) return pages as [string | number];

    const lastArr: [string | number] = [0];
    lastArr.shift();

    const lastPages = [
      pages[pages.length - 3],
      pages[pages.length - 2],
      pages[pages.length - 1],
    ];

    const dots = "...";
    const firstPgs = [1, 2, 3];

    if (page <= 3) {
      //
      firstPgs.forEach((a) => lastArr.push(a));
      [...dots].forEach((a) => lastArr.push(a));
      lastPages.forEach((a) => lastArr.push(a));
      //
    } else if (page >= 4 && page <= pages[pages.length - 1] - 3) {
      //
      const fpgs = firstPgs;
      fpgs.pop();
      fpgs.forEach((a) => lastArr.push(a));

      [...dots].forEach((a) => lastArr.push(a));
      lastArr.push(page - 1);
      lastArr.push(page);
      lastArr.push(page + 1);
      [...dots].forEach((a) => lastArr.push(a));

      const lpgs = lastPages;
      lpgs.shift();
      lpgs.forEach((a) => lastArr.push(a));
      //
    } else {
      //
      firstPgs.forEach((a) => lastArr.push(a));
      [...dots].forEach((a) => lastArr.push(a));
      lastPages.forEach((a) => lastArr.push(a));
      //
    }
    return lastArr;
  }

  return (
    <div className="flex gap-1 items-center">
      <div className="flex gap-2 items-center">
        <DualArrowButton
          reverse={true}
          onCLick={() => {
            if (page === 1) return;
            make(1);
          }}
        />
        <IoIosArrowForward
          className="rotate-180 text-3xl text-wmsPink hover:cursor-pointer hover:text-wmsBlack"
          onClick={() =>
            make(pageInfo.page - 1 == 0 ? pageInfo.page : pageInfo.page - 1)
          }
        />
      </div>
      <main className="flex gap-1">
        {pageComputed().map((pg, i) =>
          pg == pageInfo.page ? (
            <button
              key={"page" + pg + i}
              type="button"
              className="underline text-wmsPink flex items-center justify-center w-3 h-3"
            >
              {pg}
            </button>
          ) : (
            <button
              key={"page" + pg + i}
              type="button"
              className=" text-blue-400 flex items-center justify-center w-3 h-3 hover:cursor-pointer"
              onClick={() => {
                if (pg === page) return;
                if (pg === ".") {
                  if (page < pages[pages.length - 3]) {
                    if (page > 3 && i < 6) {
                      return make(page - 1);
                    }
                    return make(page + 1);
                  }
                  return make(page - 1);
                }
                make(pg as number);
              }}
            >
              {pg}
            </button>
          )
        )}
      </main>
      <div className="flex gap-2 items-center">
        <IoIosArrowForward
          className="text-3xl text-wmsPink hover:cursor-pointer hover:text-wmsBlack"
          onClick={() => {
            make(
              pageInfo.page + 1 > pageInfo.pages[pageInfo.pages.length - 1]
                ? pageInfo.page
                : pageInfo.page + 1
            );
          }}
        />
        <DualArrowButton
          onCLick={() => {
            if (pages[pages.length - 1] === page) return;
            make(pages[pages.length - 1]);
          }}
        />
      </div>
    </div>
  );
}
export default Pages;
