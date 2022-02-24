import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Input from "./Input";
import Box from "@mui/material/Box";
import styled from "styled-components";

import useForm from "../Hooks/useForm";
import { ErrorMessage } from "../Pages/Home";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContacts, useUpdateData } from "../Context/UserLogged";
import FormData from "form-data";
import InputMask from "react-input-mask";
import {
  ButtonsWrapper,
  FormWrapper,
  InputListWrapper,
  TitleWrapper,
} from "./AddContatctModal";
import { useEffect, useState } from "react";

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

const UploadContactModal = (props) => {
  const {updateData, setUpdateData} = useUpdateData();
  // const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const [file, setFile] = useState();
  const { setUserContacts } = useContacts();
  
  
  const handleUpdateData = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    // if (formIsValid) {
      let formData = new FormData();
      formData.append("name",updateData.name);
      formData.append("email", updateData.email);
      formData.append("phone", updateData.phone);
      formData.append("image", file);
      axios
        .put(`http://127.0.0.1:3333/contact/${props.id}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((reponse) => {
          toast.success("Contato Atualizado", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,

            progress: undefined,
          });
          
          
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
      // setIsClicked(false);
    // }
  };
  

  return (
    <>
      <Modal open={props.open}>
        <Box sx={style} style={{ height: "350px" }}>
          <TitleWrapper>Atualize o contato</TitleWrapper>
          <FormWrapper
          onSubmit={handleUpdateData }
          >
            <InputListWrapper>
              <Input
                type="text"
                text="Digite o nome do seu contato"
                onChange={(event) => setUpdateData((previus) => {
                  let obj = {...previus, name: event.target.value};
                  return obj;
                })}
                value={updateData  && updateData.name}
              />
              {/* {nameError && isClicked && (
          <ErrorMessage>Nome Invalido</ErrorMessage>
        )} */}
              <Input
                type="email"
                text="Digite o e-mail do seu contato"
                onChange={(event) => setUpdateData((previus) => {
                  let obj = {...previus, email: event.target.value};
                  return obj;
                })}
                value={updateData  && updateData.email}
              />
              {/* {emailError && isClicked && (
          <ErrorMessage>Email Invalido</ErrorMessage>
        )} */}
              <InputMask
                mask="(99) 99999-9999"
                onChange={(event) => setUpdateData((previus) => {
                  let obj = {...previus, phone: event.target.value};
                  return obj;
                })}
                value={updateData  && updateData.phone}
              >
                <Input
                  type="tel"
                  text="Digite o telefone do seu contato"
                  disableUnderline
                />
              </InputMask>
              {/* {phoneError && isClicked && (
              <ErrorMessage>Telefone Invalido</ErrorMessage>
            )} */}
              <Input
                type="file"
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
              >Atualizar</Button>
            </ButtonsWrapper>
          </FormWrapper>
        </Box>
      </Modal>
    </>
  );
};
export default UploadContactModal;
