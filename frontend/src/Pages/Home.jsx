import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useForm from "../Hooks/useForm";
import Input from "../Components/Input";
import axios from 'axios';
import { toast } from "react-toastify";
import {UseLogged} from '../Context/UserLogged';

const HomeComponent = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #d3d3d3;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ImageComponent = styled.div`
  background: url("https://static.appvn.com/a/uploads/thumbnails/112015/my-contacts_icon.png");
  background-repeat: no-repeat;
  opacity: 0.7;

  width: 50%;
  height: 50%;
`;

const LoginComponent = styled.div`
  width: 25%;
  height: 55%;
  background-color: white;
  border-radius: 20px;
`;

const MessageComponent = styled.h2`
  margin: 0;
  font-size: 25px;
  text-align: center;
`;

// const InputComponent = styled.input`
//   padding-bottom: 15px;
//   padding-top: 25px;
//   padding-left: 15px;
//   border: none;
//   font-size: 17px;
//   border-bottom: 2px solid #ebebeb;
//   &: focus {
//     outline: none;
//   }
// `;

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

const Home = () => {
  const { setIsLoggedIn} = UseLogged();
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
      axios.post('http://127.0.0.1:3333/session' ,{
        email: enteredEmail,
        password: enteredPassword
      }).then(response => {
        
        localStorage.setItem("token",response.data.token);
        setIsLoggedIn(true);
        toast.success('Você está logado', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          
          progress: undefined,
          });
        history("/my-contacts");
      })
      .catch(err => {
        toast.error('Algo deu errado', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          
          progress: undefined,
          });
        
      })

      
      setIsClicked(false);
    }
  };


  return (
    <>
      <HomeComponent>
        <ImageComponent />
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
            Não tem conta?{" "}
            <ToRegisterComponent href="/register">
              Registre-se Aqui
            </ToRegisterComponent>
          </RegisterMessage>
        </LoginComponent>
      </HomeComponent>
    </>
  );
};

export default Home;
