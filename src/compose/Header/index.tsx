import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMinus } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";

import Hamburguer from "../../components/Buttons/Hamburguer/index";
import Arrow from "../../components/Buttons/Arrow";

import barrareylogopainel from "../../img/barrareylogopainel.png";
import "./style.css";
import LogoutUser from "../../components/User/LogoutUser";

const Li = (props: { children: ReactNode }) => (
  <li className="flex items-center text-white transition-colors duration-200 hover:text-wmsLightPink">
    {props.children}
  </li>
);

export default function Header(props: { cb?: Function }) {
  const [menuState, setMenuState] = useState(false);

  const navClass = () =>
    menuState ? "left-[0]" : "sm:left-[-35%] left-[-100%]";

  const alterMenuState = () => {
    document.getElementById("container")?.classList.toggle("sm:pl-[200px]");
    setMenuState(!menuState);
  };

  document.onscroll = () => {
    const element = document.getElementById("buttonToUp") as HTMLElement;
    if (window.pageYOffset > 100) {
      element.classList.remove("opacity-0");
      element.classList.add("opacity-80");
      return 0;
    }
    element.classList.remove("opacity-80");
    element.classList.add("opacity-0");
    return 0;
  };

  return (
    <header className="print:hidden">
      <main
        className="bg-wmsPink fixed w-[100%] shadow-2xl
             z-20 h-[100px] flex justify-between items-center pl-16 pr-16"
      >
        <div className="flex gap-10 items-center justify-between">
          <Hamburguer
            length="3rem"
            fn={() => {
              alterMenuState();
              props.cb ? props.cb() : void 0;
            }}
          />
          <NavLink to="/">
            <img src={barrareylogopainel} alt="" className="max-w-[200px]" />
          </NavLink>
        </div>
        <LogoutUser />
      </main>

      <button
        id="buttonToUp"
        onClick={() => {
          window.scrollTo(0, 0);
          console.log("To up");
        }}
        className="rounded-lg flex items-center justify-center transition-all bg-wmsPink opacity-0 w-10 h-10 shadow-xl fixed bottom-1 right-5 z-20"
      >
        <IoIosArrowUp size={30} />
      </button>

      <nav
        className={
          navClass() +
          " w-[100%] z-10 top-0 sm:w-[180px] fixed transition-all h-screen ease-in-out bg-wmsBlack"
        }
      >
        <ul className="sm:pt-[10rem] pt-64 text-3xl sm:block m-[0_auto] grid max-w-max items-center justify-center">
          <Li>
            <HiOutlineMinus className="rotate-90 text-wmsPink" />
            <NavLink to="/">Painel</NavLink>
          </Li>
          <Li>
            <label htmlFor="header_button">
              <input type="checkbox" id="header_button" />
              <div className="flex">
                <HiOutlineMinus className="rotate-90 text-wmsPink" />
                <span className="hover:cursor-pointer" title="pedidos">
                  Pedidos
                </span>
              </div>
              <ul id="ul_to_hide" className="text-2xl">
                <Li>
                  <Arrow length="2rem" />
                  <NavLink to="/listas/criar">Listas</NavLink>
                </Li>
                <Li>
                  <Arrow length="2rem" />
                  <NavLink to="/embalar">Embalar</NavLink>
                </Li>
                <Li>
                  <Arrow length="2rem" />
                  <NavLink to="/historico">Histórico</NavLink>
                </Li>
                <Li>
                  <Arrow length="2rem" />
                  <NavLink to="/relatorio">Relatório</NavLink>
                </Li>
              </ul>
            </label>
          </Li>
        </ul>
      </nav>
    </header>
  );
}
