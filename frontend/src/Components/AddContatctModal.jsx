import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Input from "./Input";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { useState } from "react";
import useForm from "../Hooks/useForm";
import { ErrorMessage } from "../Pages/Home";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContacts, usePage, useAllPages } from "../Context/UserLogged";
import FormData from "form-data";
import InputMask from "react-input-mask";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  // background: "#A483BB",
};

export const TitleWrapper = styled.h1`
  margin: 0;
  text-align: center;
`;
export const InputListWrapper = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

export const FormWrapper = styled.form`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;
export const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const AddContactModal = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const { setUserContacts } = useContacts();
  const { actualPage } = usePage();
  const {setAllPages} = useAllPages();

  const {
    value: enteredEmail,
    changeValueHandler: changeEmailHandler,
    hasError: emailError,
    isValid: emailIsValid,
    clean: cleanEmail,
  } = useForm((value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );
  const {
    value: enteredName,
    changeValueHandler: changeNameHandler,
    hasError: nameError,
    isValid: nameIsValid,
    clean: cleanName,
  } = useForm((value) => value.trim().length !== 0);

  const {
    value: enteredPhone,
    changeValueHandler: changePhoneHandler,
    hasError: phoneError,
    isValid: phoneIsValid,
    clean: cleanPhone,
  } = useForm((value) =>
    /\(?([0-9]{2})\)?([ .-]?)([0-9]{5})-([0-9]{4})/.test(value)
  );

  const formIsValid = emailIsValid && nameIsValid && phoneIsValid;
  const [file, setFile] = useState();

  const handleAddContactSubmit = (event) => {
    event.preventDefault();
    setIsClicked(true);
    const token = localStorage.getItem("token");

    if (formIsValid) {
      let formData = new FormData();
      formData.append("name", enteredName);
      formData.append("email", enteredEmail);
      formData.append("phone", enteredPhone);
      formData.append("image", file);
      console.log("formData", formData);
      axios
        .post("http://127.0.0.1:3333/contact", formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((reponse) => {
          toast.success("Contato criado", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,

            progress: undefined,
          });
          cleanName();
          cleanPhone();
          cleanEmail();
          props.handleClose();
          axios
            .get("http://127.0.0.1:3333/contact", {
              headers: { Authorization: `Bearer ${token}` },
              params: { page: actualPage },
            })
            .then((response) => {
              let pages = [];
              for (let i = 1; i <= response.data.meta.last_page; i++) {
                pages.push(i);
              }
              setAllPages(pages);
              setUserContacts(response.data.data);
            })
            .catch((err) => {
              console.log("error", err.message);
            });
        })
        .catch((err) => {
          toast.error("Algo deu errado", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,

            progress: undefined,
          });
        });
      setIsClicked(false);
    }
  };

  return (
    <>
      <Modal open={props.open}>
        <Box sx={style} style={{ height: "400px" }}>
          <TitleWrapper>Cadastre um novo contato</TitleWrapper>
          <FormWrapper onSubmit={handleAddContactSubmit}>
            <InputListWrapper>
              <Input
                type="text"
                text="Digite o nome do seu contato"
                onChange={changeNameHandler}
                value={enteredName}
              />
              {nameError && isClicked && (
                <ErrorMessage>Nome Invalido</ErrorMessage>
              )}
              <Input
                type="email"
                text="Digite o e-mail do seu contato"
                onChange={changeEmailHandler}
                value={enteredEmail}
              />
              {emailError && isClicked && (
                <ErrorMessage>Email Invalido</ErrorMessage>
              )}
              <InputMask
                mask="(99) 99999-9999"
                onChange={changePhoneHandler}
                value={enteredPhone}
              >
                <Input
                  type="tel"
                  text="Digite o telefone do seu contato"
                  disableUnderline
                />
              </InputMask>
              {phoneError && isClicked && (
                <ErrorMessage>Telefone Invalido</ErrorMessage>
              )}
              <input
                type="file"
                style={{marginTop: '10px', fontSize: '14px'}}
                accept="image/x-png,image/gif,image/jpeg" 
                onChange={(event) => setFile(event.target.files[0])}
              />
            </InputListWrapper>
            <ButtonsWrapper>
              <Button
                style={{
                  background: "#FF201B",
                  color: "white",
                  fontSize: "15px",
                  marginLeft: "12px",
                }}
                onClick={props.handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{
                  background: "#24a0ed",
                  color: "white",
                  fontSize: "15px",
                  marginLeft: "12px",
                }}
              >
                Cadastrar
              </Button>
            </ButtonsWrapper>
          </FormWrapper>
        </Box>
      </Modal>
    </>
  );
};

export default AddContactModal;
