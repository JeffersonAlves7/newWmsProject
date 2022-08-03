import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Header from "./compose/Header"

import Home from "./views/Home"
import Historico from "./views/Historico"
import Relatorio from "./views/Relatorio"

import Listas from "./views/Listas"
import Lista from "./views/Lista"
import Pedido from "./views/Pedido"

import ListaDeColeta from "./extra/ListaDeColeta"
import ListaDeSeparacao from "./extra/ListaDeSeparacao"

import Embalar from "./views/Embalar"
import ListaAtiva from "./views/ListaAtiva"
import Checkout from "./views/Checkout"

function App() {
  return <Router>
    <Header />
    <div className='w-full min-h-screen flex print:pt-0 justify-center pt-[9rem]'>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/historico" element={<Historico />} />
        <Route path="/relatorio" element={<Relatorio />} />

        <Route path="/listas/:situacao" element={<Listas />} />

        <Route path="/lista/:id" element={<Lista />} />
        <Route path="/pedido/:pedido" element={<Pedido />} />

        <Route path="/embalar" element={<Embalar />} />
        <Route path="/listaAtiva/:id" element={<ListaAtiva />} />
        <Route path="/checkout/:chavedeacesso" element={<Checkout />} />

        <Route path="/listaDeColeta/:id" element={<ListaDeColeta />} />
        <Route path="/listaDeSeparacao/:id" element={<ListaDeSeparacao />} />
      </Routes>
    </div>
  </Router>
}

export default App
