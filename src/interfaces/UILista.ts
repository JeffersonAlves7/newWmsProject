import UIIntegracao from "./UIIntegracao";
import UIPedido from "./UIPedido";
import UISituacao from "./UISituacao";

export default interface UILista {
  id: number,
  lista_integracao: UIIntegracao['integracao'],
  lista_situacao: UISituacao['situacao'],
  lista_gerada: string,
  lista_alterada: string,
  pedidos: UIPedido[],
}