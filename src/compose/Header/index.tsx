import { ReactNode, useState } from 'react'
import { NavLink } from "react-router-dom"
import { HiOutlineMinus } from "react-icons/hi"
import Hamburguer from '../../components/Buttons/Hamburguer/index'
import Arrow from '../../components/Buttons/Arrow'

import barrareylogopainel from "../../img/barrareylogopainel.png"

import "./style.css"

interface UILinks {
    title: string,
    link: string,
    cb?: Function
}

function Li(props: { children: ReactNode }) {
    return <li className="flex items-center text-white transition-colors duration-200 hover:text-wmsLightPink">
        {props.children}
    </li>
}

function Ul_li(props: UILinks) {
    return (
        <Li>
            <HiOutlineMinus className="rotate-90 text-wmsPink" />
            <NavLink onClick={() => props.cb ? props.cb() : false} to={props.link}>{props.title}</NavLink>
        </Li>
    )
}
function Li_li(props: UILinks) {
    return (
        <Li>
            <Arrow length="2rem" />
            <NavLink onClick={() => props.cb ? props.cb() : false} to={props.link}>{props.title}</NavLink>
        </Li>
    )
}

export default function Header() {
    const [menuState, setMenuState] = useState("false");

    const navClass = {
        "true": "left-[0]",
        "false": "sm:left-[-35%] left-[-100%]"
    }

    return (
        <header className='print:hidden'>
            <main className='bg-wmsPink fixed w-[100%] shadow-2xl
             z-20 h-[100px] flex gap-10 items-center pl-10 pr-10'>
                <Hamburguer length="3rem" fn={() => {
                    setMenuState(menuState == "true" ? "false" : "true")
                }} />
                <NavLink to="/"> <img src={barrareylogopainel} alt="" className='max-w-[200px]' /></NavLink>
            </main>
            <nav className={navClass[menuState as keyof typeof navClass] + " w-[100%] z-10 top-0 sm:w-[200px] fixed transition-all h-screen ease-in-out duration-500 bg-wmsBlack"}>
                <ul className="sm:pt-[10rem] pt-64 text-3xl sm:block grid justify-center">
                    <Ul_li cb={() => { setMenuState(menuState == "true" ? "false" : "true") }} link='/' title='Painel' />
                    <Li>
                        <label htmlFor="header_button">
                            <input type="checkbox" id="header_button" />
                            <div className="flex">
                                <HiOutlineMinus className="rotate-90 text-wmsPink" />
                                <span className="hover:cursor-pointer" title="pedidos">Pedidos</span>
                            </div>
                            <ul id="ul_to_hide" className='text-2xl'>
                                <Li_li cb={() => { setMenuState(menuState == "true" ? "false" : "true") }} title='Listas' link='/listas/criar' />
                                <Li_li cb={() => { setMenuState(menuState == "true" ? "false" : "true") }} title='Embalar' link='/embalar' />
                                <Li_li cb={() => { setMenuState(menuState == "true" ? "false" : "true") }} title='Histórico' link='/historico' />
                            </ul>
                        </label>
                    </Li>
                    <Ul_li cb={() => { setMenuState(menuState == "true" ? "false" : "true") }} title='Relatório' link='/relatorio' />
                </ul>
            </nav>
        </header>
    )
}