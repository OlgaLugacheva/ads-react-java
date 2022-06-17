import React, { useState } from "react";
import useFormValidation from "../../utils/hooks/useFormValidation";
import LinkForm from "../linkForm/LinkForm";

function EmailLink({ handlerSendLink }) {
  const [email, setEmail] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();

  const handleChangeEmail = (e) => {
    handleChange(e);
    if (email.length > 0) {
      setEmail("");
    }
  };

  function heandlerSubmit(e) {
    e.preventDefault();
    handlerSendLink({ email: values.email });
  }
  return (
    <LinkForm
      onClick={heandlerSubmit}
      error={!isValid}
      disabled={!isValid}
      buttonName="Отправить"
    >
      <label className="linkForm__label">
        <h2 className="linkForm__subtitlte">Ваш электронный адрес</h2>
        <input
          className="linkForm__input"
          required
          value={values.email || ""}
          placeholder="введите ваш e-mail"
          name="email"
          type="email"
          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          onChange={handleChangeEmail}
        />
        <div
          className={`linkForm__inputHidden ${
            errors.email ? "linkForm__inputError" : ""
          }`}
        >
          {errors.email}
        </div>
      </label>
    </LinkForm>
  );
}

export default EmailLink;
