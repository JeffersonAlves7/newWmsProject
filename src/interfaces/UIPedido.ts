import UIIntegracao from "./UIIntegracao";
import UIItens from "./UIItens";
import UISituacao from "./UISituacao";

export default interface UIPedido {
  chavedeacesso: string,
  nf: string,
  serie: number,
  idLista: number,
  pedido: string,
  pedidoBling: string,
  qntItens: number,
  itens?: UIItens[],
  situacao: UISituacao['situacao'],
  integracao: UIIntegracao['integracao'],
  gerado: string,
  alterado: string
}