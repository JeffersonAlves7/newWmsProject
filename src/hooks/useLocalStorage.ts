import React from "react";

export default function useLocalStorage(keyName: string, defaultValue: any) {
  const [storedValue, setStoredValue] = React.useState(() => {
    //storedValue sempre será o valor que já está salvo no storage
    // ||
    //storedValue também pode ser o próprio defaultValue que foi passado

    try {
      const value = window.localStorage.getItem(keyName); //Pegando valor da chave

      if (value) {
        //Se o valor existir, retorna a string transformada em json
        return JSON.parse(value);
      } else {
        //Se não existir, cria um valor para o mesmo transformando o defaultvalue em string
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    //Essa função será utilizada como um setState do useState
    try {
      //Apenas irá atualizar o valor no localStorage
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    //Após atualizar no storage ele também atualiza no useState
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
}
