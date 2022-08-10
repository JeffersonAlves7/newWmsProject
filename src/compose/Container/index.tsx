import { PropsWithChildren } from "react";
import Header from "../Header";
import { useLocation } from "react-router-dom";

export default function Container(props: PropsWithChildren) {
  const { pathname } = useLocation();
  if (pathname === "/login") return <>{props.children}</>;
  return (
    <>
      <Header />
      <div
        id="container"
        className={
          " w-full print:pl-0 min-h-100% transition-all pb-10 flex print:pt-0 justify-center pt-[9rem]"
        }
      >
        {props.children}
      </div>
      ;
    </>
  );
}
