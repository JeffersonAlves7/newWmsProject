import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Busca(props: {
  cb: Function;
  id?: string;
  placeholder?: string;
}) {
  const [state, setState] = useState("");

  function alterState(e: any) {
    const { value } = e.target as HTMLInputElement;
    if (value.trim() === "") props.cb("");
    setState(value);
  }

  return (
    <div className="border-wmsBlack border h-[2.3rem] rounded-lg p-1 flex items-center">
      <input
        placeholder={props.placeholder ? props.placeholder : ""}
        className="outline-none w-[20rem] h-full"
        type="search"
        id={props.id ? props.id : ""}
        onInput={alterState}
        name="pesquisar"
      />
      <button
        type="button"
        title="buscar"
        onClick={() => props.cb(state)}
        className="w-[30px] h-[30px] flex items-center justify-center"
      >
        <BiSearch fontSize={20} />
      </button>
    </div>
  );
}
