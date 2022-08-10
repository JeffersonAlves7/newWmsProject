import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

interface formulario {
  username: String;
  password: String;
}

export default function Login() {
  const [formInfo, setFormInfo] = useState<formulario>({
    username: "",
    password: "",
  });
  const navigator = useNavigate();
  const key = "currentUser";

  async function checkInfo() {
    const dataInStorage = window.localStorage.getItem(key);
    if (!dataInStorage) return;
    const { username } = JSON.parse(dataInStorage);

    const { data } = await api.post("/isLoggedIn", {
      nome: username,
    });
    const { response } = data;
    if (response) return navigator("/");

    window.localStorage.removeItem(key);
  }

  useEffect(() => {
    checkInfo();
  }, []);

  async function sendData() {
    const { username, password } = formInfo;
    if (!username.trim() || !password.trim()) return;

    const { data } = await api.post("/login", {
      nome: username,
      senha: password,
    });
    const { isLoggedIn } = data;
    if (!isLoggedIn) return;

    const user = window.localStorage.getItem(key);
    if (!user) {
      window.localStorage.setItem(key, JSON.stringify({ username }));
    }
    navigator("/");
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] justify-items-center items-center w-full h-screen">
      <section className="leftArea flex flex-col justify-center p-5 items-start gap-20">
        <header className="w-full items-center flex justify-center">
          <h1 className="text-[3rem] font-serif">Bem Vindo!</h1>
        </header>
        <main id="sectionForm" className="flex flex-col gap-7 items-start">
          <div className="flex flex-col gap-5">
            <div className="flex text-lg flex-col items-start">
              <label className="font-serif " htmlFor="username">
                Usuário
              </label>
              <input
                className="border font-serif border-black rounded-md w-72 shadow-lg p-1"
                type="text"
                id="username"
                onKeyUp={(e) => {
                  setFormInfo({
                    ...formInfo,
                    username: (e.target as HTMLInputElement).value,
                  });
                }}
              />
            </div>
            <div className="flex text-lg flex-col items-start">
              <label htmlFor="password" className="font-serif">
                Senha
              </label>
              <input
                className="border font-serif border-black rounded-md w-72 shadow-lg p-1"
                type="password"
                id="password"
                onKeyUp={(e) => {
                  setFormInfo({
                    ...formInfo,
                    password: (e.target as HTMLInputElement).value,
                  });
                }}
              />
            </div>
          </div>
          <button
            onClick={sendData}
            className=" hover:scale-105 transition-all text-lg w-24 h-11 font-serif rounded-md bg-black text-white"
          >
            Entrar
          </button>
        </main>
        <footer className="flex text-lg flex-col items-start">
          <p className="font-serif">Ainda não tem um login?</p>
          <a
            className="font-serif font-semibold transition-all text-wmsPink hover:opacity-70"
            href="#"
          >
            Registre-se
          </a>
        </footer>
      </section>
      <section id="boxBackground" className="rightArea w-full h-full"></section>
    </div>
  );
}
