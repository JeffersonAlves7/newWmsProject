import { AiOutlineUser } from "react-icons/ai";
import Paragraph from "../../Texts/Paragraph";
import "./style.css";

export default function LogoutUser() {
  return (
    <div
      id="userLogout"
      className="flex relative items-center justify-center flex-col"
    >
      <input type="checkbox" className=" " id="checkbox" />
      <label htmlFor="checkbox" className=" bg-wmsPink z-20">
        <AiOutlineUser className="text-black" size={40} />
      </label>
      <div className="underground absolute z-10 transition-all">
        <div
          style={{
            textDecorationColor: "rgb(29, 78, 216)",
          }}
          className=" text-blue-700 underline"
        >
          <Paragraph text="Sair" />
        </div>
      </div>
    </div>
  );
}
