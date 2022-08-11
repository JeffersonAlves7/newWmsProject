import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./compose/Header";

import Home from "./views/Home";
import Login from "./views/Login";

import Historico from "./views/Historico";
import Relatorio from "./views/Relatorio";

import Listas from "./views/Listas";
import Lista from "./views/Lista";
import Pedido from "./views/Pedido";

import ListaDeColeta from "./extra/ListaDeColeta";
import ListaDeSeparacao from "./extra/ListaDeSeparacao";

import Embalar from "./views/Embalar";
import ListaAtiva from "./views/ListaAtiva";
import Checkout from "./views/Checkout";
import Container from "./compose/Container";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reguster" element={<Home />} />

          {/* Link para acessar Histórico e o Relatório*/}
          <Route path="/historico" element={<Historico />} />
          <Route path="/relatorio" element={<Relatorio />} />

          {/* Link para acessar todas as listas */}
          <Route path="/listas/:situacao" element={<Listas />} />

          {/* Link para acessar a lista e botão de acessar o pedido */}
          <Route path="/lista/:id" element={<Lista />} />
          <Route path="/pedido/:pedido" element={<Pedido />} />

          {/* Area da tela de embalar até o checkout */}
          <Route path="/embalar" element={<Embalar />} />
          <Route path="/embalar/:error" element={<Embalar />} />
          <Route path="/listaAtiva/:id" element={<ListaAtiva />} />
          <Route path="/listaAtiva/:id/:error" element={<ListaAtiva />} />
          <Route path="/checkout/:chavedeacesso" element={<Checkout />} />

          {/* Lista de coleta e lista de separação para impressão */}
          <Route path="/listaDeColeta/:id" element={<ListaDeColeta />} />
          <Route path="/listaDeSeparacao/:id" element={<ListaDeSeparacao />} />

          <Route path="/listaDeColeta/:id/:nf" element={<ListaDeColeta />} />
          <Route path="/listaDeSeparacao/:id/:nf" element={<ListaDeSeparacao />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
