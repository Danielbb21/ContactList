import styled from "styled-components";
import plus from "../Images/plus.svg";

const HomeComponent = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #d3d3d3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactMensage = styled.h1`
  font-size: 30px;
  text-align: center;
`;

const ContactListWrapper = styled.div`
  width: 700px;
  height: 450px;
  background-color: white;
  border-radius: 50px;
`;

const ButtonWrapper = styled.button`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #24a0ed;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 25px;
`;

const PlusWrapper = styled.img`
  width: 20px;
  height: 30px;
  margin-right: 10px; 
`;

const Contacts = () => {
  return (
    <>
      <HomeComponent>
        <ContactMensage>
          Olá nome, seja bem vindo, abaixo estão todos os seus contatos
          cadastrados
        </ContactMensage>
        <ButtonWrapper>
          <PlusWrapper src={plus} />
          Adcionar contato
        </ButtonWrapper>
        <ContactListWrapper></ContactListWrapper>
      </HomeComponent>
    </>
  );
};

export default Contacts;
