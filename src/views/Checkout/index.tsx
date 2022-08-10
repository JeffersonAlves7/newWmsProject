import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import services from "../../config/services.json";

import api from "../../api/index";
import UIItens from "../../interfaces/UIItens";

import Box from "../../components/Box";
import Subtitle from "../../components/Texts/Subtitle";
import ItemImageLarger from "../../components/ImageComponents/ItemImageLarger";
import InputText from "../../components/Inputs/InputText";
import Paragraph from "../../components/Texts/Paragraph";
import Title from "../../components/Texts/Title";
import WmsButton from "../../components/Buttons/WmsButton";

import NotaFiscal from "../../compose/Buttons/NotaFiscal";

interface IUItem {
  totalLidos: number;
  sku: string;
  descricao: string;
  quantidade: number;
  imagem: {
    url?: string;
  };
}

interface IUPedido {
  nf: string;
  pedido: string;
  itens: IUItem[];
  finalizado: boolean;
}

export default function Checkout() {
  const { chavedeacesso } = useParams();

  const [pedido, setPedido] = useState<IUPedido>();
  const [currentItem, setCurrentItem] = useState<IUItem>();
  const [isAvailable, setIsAvailable] = useState(false);
  const [idLista, setIdLista] = useState();

  const navigator = useNavigate();

  useEffect(() => {
    api
      .get(`/pedidos?chavedeacesso=${chavedeacesso}&itens=true`)
      .then(({ data }) => {
        const { response } = data;
        const new_itens: IUItem[] = [];

        if (!response[0]) navigator("/embalar");
        if (response[0].situacao !== "emaberto")
          navigator("/listaAtiva/" + response[0].idLista + "/error");
        setIdLista(response[0].idLista);

        response[0].itens.forEach((element: UIItens) => {
          new_itens.push({
            totalLidos: 0,
            sku: element.sku,
            descricao: element.descricao,
            quantidade: element.quantidade,
            imagem: element.imagem,
          });
        });
        setPedido({
          nf: response[0].nf,
          pedido: response[0].pedido,
          itens: new_itens,
          finalizado: false,
        });
        setCurrentItem(new_itens[0]);
      });
  }, []);

  function alterItemTotal(sku: IUItem["sku"]) {
    if (!pedido || pedido.finalizado) return;
    const skus = pedido.itens.map(({ sku }) => sku);

    //Primeiro achar o index
    const index = skus.indexOf(sku);
    if (index < 0) return;

    //Copiar todos os items do array
    const itens = [...pedido.itens];

    //Coletar novos dados de alteração de informações
    itens[index].totalLidos += 1;
    const finalizado =
      itens.filter((item) => item.quantidade === item.totalLidos).length ===
      itens.length;

    //Enviar informações
    setPedido({
      nf: pedido.nf,
      pedido: pedido.pedido,
      itens: itens,
      finalizado: finalizado,
    });

    //Verificar as novas informações
    if (itens[index].quantidade === itens[index].totalLidos && !finalizado)
      setCurrentItem(itens[index + 1]);

    setCurrentItem(itens[index]);
  }

  if (!pedido || !currentItem) return <></>;

  async function sendPedido() {
    await api.put("/pedidos", {
      chavedeacesso: chavedeacesso,
      situacao: "embalado",
    });
    navigator("/listaAtiva/" + idLista);
  }

  const totalLidos =
    currentItem.totalLidos === currentItem.quantidade
      ? pedido.itens.indexOf(currentItem) + 1
      : pedido.itens.indexOf(currentItem);

  return (
    <div className="w-[90%] flex max-w-[1000px] items-center gap-[1rem] sm:gap-[3rem] flex-col">
      <header className="flex w-full gap-4 sm:gap-[4rem] text-md sm:text-xl text-center lg:text-2xl pr-[2rem] pl-[2rem] font-bold break-words justify-between">
        <Subtitle text={"NF-e: " + pedido.nf} />
        <Subtitle text={"Pedido: " + pedido.pedido} />
      </header>
      <main className="flex w-full  gap-4 flex-row items-center flex-wrap justify-center md:justify-start lg:justify-between">
        {pedido.finalizado === true ? (
          isAvailable === true ? (
            <div className="h-[42rem] flex-col flex gap-10 w-full max-w-[23rem]">
              <div className="text-green-500">
                <Title text="Conferência completa" />
              </div>
              <iframe
                className="h-full w-full"
                src={services.api.baseURL + "/notas?nf=" + pedido.nf}
              ></iframe>
              <div className="w-[150px] grid">
                <WmsButton
                  green={true}
                  onClick={() => {
                    sendPedido();
                  }}
                  text="Confirmar"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full gap-10">
              <div className="text-green-500">
                <Title text="Conferência completa" />
              </div>
              <div className={isAvailable === false ? "w-[150px] grid" : ""}>
                <NotaFiscal
                  blank={false}
                  cb={(v: boolean) => {
                    if (v != true) return;
                    setIsAvailable(v);
                  }}
                />
              </div>
            </div>
          )
        ) : (
          <div className="flex md:w-[50%] max-w-[24rem] h-full justify-between md:max-w-none flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <ItemImageLarger
                url={
                  currentItem.imagem.url
                    ? currentItem.imagem.url
                    : currentItem.sku
                }
              />
              <div className=" flex flex-col  justify-center gap-5  shadow-xl rounded-lg p-2 h-full">
                <Paragraph text={"Sku: " + currentItem.sku} />
                <Paragraph text={"Qnt: " + currentItem.quantidade} />
                <Paragraph
                  text={"Descrição: " + currentItem.descricao + "..."}
                />
              </div>
            </div>
            <InputText
              placeholder="Escanear ou inserir o SKU do Produto"
              id="input_checkout"
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key !== "Enter") return;
                const value = (e.target as HTMLInputElement).value;
                if (value.trim() !== currentItem.sku) return;
                alterItemTotal(currentItem.sku);
                {
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
          </div>
        )}
        <Box
          lidos={totalLidos}
          total={pedido.itens.length}
          itens={pedido.itens}
        />
      </main>
    </div>
  );
}
