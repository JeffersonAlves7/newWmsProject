import UIPedido from "./UIPedido"

export default interface UI_FiltrarPedidos {
  pedidos?: UIPedido[],
  page?: number,
  pages?: number[],
  situacao?: "todos" | "" | UIPedido["situacao"]
  integracao?: "todos" | "" | UIPedido["integracao"]
  busca?: string,
  data?: string,
}