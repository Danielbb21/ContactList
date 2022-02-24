import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Input from "./Input";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useForm from "../Hooks/useForm";
import { ErrorMessage } from "../Pages/Home";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContacts } from "../Context/UserLogged";

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

const TitleWrapper = styled.h1`
  margin: 0;
  text-align: center;
`;
const InputListWrapper = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;
const ButtonsWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const AddContactModal = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const { setUserContacts } = useContacts();
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
  } = useForm((value) => value.trim().length !== 0);

  console.log('fi', props.id);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (props.id) {
      console.log('propsffrf', props.id);
      axios
        .get(`http://127.0.0.1:3333/contact/${props.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log('teste', response.data);
          changeEmailHandler(response.data.email);
          changeNameHandler(response.data.name);
          changePhoneHandler(response.data.phone);
        })
        .catch((err) => {
          console.log("error", err.message);
        });
    }
  }, []);

  const formIsValid = emailIsValid && nameIsValid && phoneIsValid;

  const handleAddContactSubmit = (event) => {
    event.preventDefault();
    setIsClicked(true);
    const token = localStorage.getItem("token");

    if (formIsValid) {
      axios
        .post(
          "http://127.0.0.1:3333/contact",
          { name: enteredName, email: enteredEmail, phone: enteredPhone },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
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
            })
            .then((response) => {
              setUserContacts(response.data);
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

  const handleUpdateData = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (formIsValid) {
      axios
        .put(
          `http://127.0.0.1:3333/contact/${props.id}`,
          { name: enteredName, email: enteredEmail, phone: enteredPhone },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((reponse) => {
          toast.success("Contato Atualizado", {
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
            })
            .then((response) => {
              setUserContacts(response.data);
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
        <Box sx={style} style={{ height: "350px" }}>
          <TitleWrapper>
            {props.id ? "Atualize o contato" : "Cadastre um novo contato"}
          </TitleWrapper>
          <FormWrapper
            onSubmit={props.id ? handleUpdateData : handleAddContactSubmit}
          >
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
              <Input
                type="text"
                text="Digite o telefone do seu contato"
                onChange={changePhoneHandler}
                value={enteredPhone}
              />
              {phoneError && isClicked && (
                <ErrorMessage>Telefone Invalido</ErrorMessage>
              )}
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
                {props.id ? "Atualizar" : "Cadastrar"}
              </Button>
            </ButtonsWrapper>
          </FormWrapper>
        </Box>
      </Modal>
    </>
  );
};

export default AddContactModal;
