import { useState } from "react";

export const useForm = (initForm = {}) => {
  const [formState, setFormState] = useState(initForm);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormState(initForm);
  };

  const onlyLetters = (e) => {
    const regex = /^[a-zA-Z ]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyNumbers = (e) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const onlyEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  return {
    formState,
    handleInputChange,
    handleReset,
    onlyLetters,
    onlyNumbers,
    onlyEmail
  };
};
