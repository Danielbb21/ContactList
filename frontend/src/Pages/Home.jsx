import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useForm from "../Hooks/useForm";
import Input from "../Components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { UseLogged } from "../Context/UserLogged";

export const HomeComponent = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: space-evenly;
`;

export const ImageComponent = styled.img`
  opacity: 0.7;
`;

const LoginComponent = styled.div`
  width: 25%;
  height: 70%;
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

const LoginButton = styled.button`
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

const RegisterMessage = styled.span`
  font-size: 16px;
  margin-left: 20px;

  text-align: center;
`;

const ToRegisterComponent = styled.a`
  font-size: 16px;
  outline: none;
  color: blue;
  cursor: pointer;
`;

export const ErrorContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.span`
  font-size: 15px;
  color: red;
  font-weight: bold;
  font-style: italic;
  text-align: center;
`;

export const AllPageComponent = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #d3d3d3;
`;
export const WelcomeMessagewrapper = styled.div`
  
  height: 25vh;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const WelcomeMessage = styled.h1`
  font-size: 35px;
  text-align: center;
  margin: 0;

  
`;

export const WelcomeInfo = styled.h3`
  text-align: center;
  margin: 0;
  font-size: 20px;
`;

const Home = () => {
  const { setIsLoggedIn } = UseLogged();
  const history = useNavigate();
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

  const formIsValid = emailIsValid && passwordIsValid;

  const submitLoginHandler = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    if (formIsValid) {
      axios
        .post("http://127.0.0.1:3333/session", {
          email: enteredEmail,
          password: enteredPassword,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          setIsLoggedIn(true);
          toast.success("Voc?? est?? logado", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,

            progress: undefined,
          });
          history("/my-contacts");
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
          <MessageComponent>Realizar Login</MessageComponent>
          <FormWrapper onSubmit={submitLoginHandler}>
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
              text="Password"
              onChange={changePasswordHandler}
              value={enteredPassword}
            />
            {passwordError && isClicked && (
              <ErrorMessage>Password Invalido</ErrorMessage>
            )}
            <LoginButton>Login</LoginButton>
          </FormWrapper>
          <RegisterMessage>
            N??o tem conta?{" "}
            <ToRegisterComponent href="/register">
              Registre-se Aqui
            </ToRegisterComponent>
          </RegisterMessage>
        </LoginComponent>
      </HomeComponent>
    </AllPageComponent>
  );
};

export default Home;
