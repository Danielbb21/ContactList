import styled from "styled-components";
import backArrow from "../Images/back-arrow.svg";
import { useNavigate } from "react-router-dom";

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
  height: 60%;
  background-color: white;
  border-radius: 20px;
`;

const MessageComponent = styled.h2`
  margin: 0;
  font-size: 25px;
  text-align: center;
`;

const InputComponent = styled.input`
  padding-bottom: 15px;
  padding-top: 25px;
  padding-left: 15px;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid #ebebeb;
  &: focus {
    outline: none;
  }
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
  justify-content: center;
  cursor: pointer;
`;

const BackMessage = styled.span`
  font-size: 18px;
`;

const BackArrowComponent = styled.img`
  width: 20px;
  height: 15px;
`;

const Register = () => {
  const history = useNavigate();

  const backToLogin = () => {
    history("/");
  };
  return (
    <HomeComponent>
      <ImageComponent />
      <LoginComponent>
        <MessageComponent>Realizar seu cadastro</MessageComponent>
        <FormWrapper>
          <InputComponent type="text" placeholder="Digite seu nome" />
          <InputComponent type="email" placeholder="Digite seu e-mail" />
          <InputComponent type="password" placeholder="Digite sua senha" />
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
  );
};

export default Register;
