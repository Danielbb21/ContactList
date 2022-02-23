import styled from "styled-components";

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

const Contacts = () => {
  return (
    <>
      <HomeComponent>
        <ContactMensage>
          Olá nome, seja bem vindo, abaixo estão todos os seus contatos
          cadastrados
        </ContactMensage>
        <ContactListWrapper>

        </ContactListWrapper>
      </HomeComponent>
    </>
  );
};

export default Contacts;
