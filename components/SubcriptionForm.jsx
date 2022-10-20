import { useForm } from "../hooks/useForm.jsx";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
const axios = require("axios");

export const SubcriptionForm = () => {
  const {
    formState,
    handleInputChange,
    handleReset,
    onlyLetters,
    onlyNumbers,
    onlyEmail,
  } = useForm({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const { firstname, lastname, email, phone } = formState;
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ningun input debe estar vacio
    if (Object.values(formState).find((value) => value === "") === "") {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    //validar email
    if (!onlyEmail(email)) {
      setMessage("Email no válido");
      return;
    }

    //validar telefono
    if (phone.length < 10) {
      setMessage("Teléfono no válido");
      return;
    }

    setMessage("Enviando...");
    axios
      .post("https://5eed24da4cbc340016330f0d.mockapi.io/api/newsletter", {
        firstname,
        lastname,
        email,
        phone,
      })
      .then((resp) => {
        setMessage("Enviado");
        console.log(resp.data);
      })
      .catch((err) => {
        setMessage("Error: " + err.response.data);
        console.log(err);
      });

    handleReset();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <input
          type="text"
          name="firstname"
          placeholder="Nombre"
          value={firstname}
          onKeyPress={onlyLetters}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
          value={lastname}
          onKeyPress={onlyLetters}
          onChange={handleInputChange}
        />
        <input
          type="mail"
          name="email"
          placeholder="Mail"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefono"
          value={phone}
          onKeyPress={onlyNumbers}
          onChange={handleInputChange}
        />
        <button>Enviar</button>
        <button onClick={handleReset}>Limpiar</button>
      </form>
      <p>{message}</p>
    </>
  );
};
