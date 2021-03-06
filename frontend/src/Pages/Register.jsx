import styled from "styled-components";
import backArrow from "../Images/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import useForm from "../Hooks/useForm";
import { useState } from "react";
import Input from "../Components/Input";
import { AllPageComponent, ErrorMessage, HomeComponent, ImageComponent, WelcomeInfo, WelcomeMessage, WelcomeMessagewrapper } from "./Home";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginComponent = styled.div`
  width: 25%;
  height: 90%;
  background-color: white;
  border-radius: 20px;
`;

const MessageComponent = styled.h2`
  margin: 0;
  font-size: 25px;
  text-align: center;
`;


const FormWrapper = styled.form`
  display: flex;

  flex-direction: column;
  justify-content: space-evenly;
`;

const RegisterButton = styled.button`
  width: 150px;
  height: 65px;
  display: flex;
  margin: 0 auto;
  font-size: 18px;
  margin-top: 25px;
  align-items: center;
  justify-content: center;
  background: green;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  border: none;
  margin-bottom: 10px;
`;

const BackMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-left: 15px;
`;

const BackMessage = styled.span`
  font-size: 18px;
`;

const BackArrowComponent = styled.img`
  width: 20px;
  height: 15px;
`;

const Register = () => {
  const [isClicked, setIsClicked] = useState(false);

  const {
    value: enteredEmail,
    changeValueHandler: changeEmailHandler,
    hasError: emailError,
    isValid: emailIsValid,
  } = useForm((value) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
  );

  const {
    value: enteredPassword,
    changeValueHandler: changePasswordHandler,
    hasError: passwordError,
    isValid: passwordIsValid,
  } = useForm((value) => value.trim().length >= 6);

  const {
    value: enteredName,
    changeValueHandler: changeNameHandler,
    hasError: nameError,
    isValid: nameIsValid,
  } = useForm((value) => value.trim().length !== 0);

  const formIsValid = emailIsValid && passwordIsValid && nameIsValid;

  const history = useNavigate();

  const submitRegisterHandler = (event) => {
    event.preventDefault();
    setIsClicked(true);
    if (formIsValid) {
      axios
        .post("http://127.0.0.1:3333/user", {
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((response) => {
          toast.success("Conta criada", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,

            progress: undefined,
          });
          history("/");
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

  const backToLogin = () => {
    history("/");
  };
  return (
    <AllPageComponent>
      <WelcomeMessagewrapper>
        <WelcomeMessage>Minha lista de contatos</WelcomeMessage>
        <WelcomeInfo>Salve seus contatos de forma f??cil e rapida</WelcomeInfo>
      </WelcomeMessagewrapper>
      <HomeComponent>
        <ImageComponent
          src={
            "https://static.appvn.com/a/uploads/thumbnails/112015/my-contacts_icon.png"
          }
        />
        <LoginComponent>
          <MessageComponent>Realize seu cadastro</MessageComponent>
          <FormWrapper onSubmit={submitRegisterHandler}>
            <Input
              type="text"
              text="Digite o seu Name"
              onChange={changeNameHandler}
              value={enteredName}
            />

            {nameError && isClicked && (
              <ErrorMessage>Nome invalido</ErrorMessage>
            )}

            <Input
              type="email"
              text="Digite seu E-mail"
              onChange={changeEmailHandler}
              value={enteredEmail}
            />

            {emailError && isClicked && (
              <ErrorMessage>Email Invalido</ErrorMessage>
            )}

            <Input
              type="password"
              text="Digite sua senha"
              onChange={changePasswordHandler}
              value={enteredPassword}
            />

            {passwordError && isClicked && (
              <ErrorMessage>Password Invalido</ErrorMessage>
            )}

            <RegisterButton>Cadastro</RegisterButton>
            <BackMessageWrapper onClick={backToLogin}>
              <BackArrowComponent
                src={backArrow}
                alt="Seta para voltar ao login"
              />
              <BackMessage>Voltar pro login</BackMessage>
            </BackMessageWrapper>
          </FormWrapper>
        </LoginComponent>
      </HomeComponent>
    </AllPageComponent>
  );
};

export default Register;
