import UIIntegracao from "./UIIntegracao";
import UISituacao from "./UISituacao";

export default interface UILista {
  id: number,
  integracao: UIIntegracao['integracao'],
  situacao: UISituacao['situacao'],
  gerado: string,
  alterado: string,
  pedidos: number,
  date: string
}