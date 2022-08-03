import UIPedido from "./UIPedido"

export default interface UIFiltrarPedidos {
  pedidos: UIPedido[],
  page: number,
  pages: number[],
  situacao: "todos" | UIPedido["situacao"]
  integracao: "todos" | UIPedido["integracao"]
  busca: string,
  data: string,
}