import styled from "styled-components";
import plus from "../Images/plus.svg";
import { useState } from "react";
import AddContatctModal from "../Components/AddContatctModal";
import ContactComponent from "../Components/ContactComponent";
import { useEffect } from "react";
import axios from "axios";

const DUMMY_DATA = [
  {
    id: 1,
    name: "teste1",
    email: "teste1@teste.com",
    img: "https://static1.conquistesuavida.com.br/articles//4/56/84/@/18404-gente-que-da-prioridade-aos-sentimentos-article_gallery-2.jpg",
  },
  {
    id: 2,
    name: "teste2",
    email: "teste2@teste.com",
    img: "https://static1.conquistesuavida.com.br/articles//4/56/84/@/18404-gente-que-da-prioridade-aos-sentimentos-article_gallery-2.jpg",
  },
  {
    id: 3,
    name: "teste3",
    email: "teste3@teste.com",
    img: "https://static1.conquistesuavida.com.br/articles//4/56/84/@/18404-gente-que-da-prioridade-aos-sentimentos-article_gallery-2.jpg",
  },
  {
    id: 4,
    name: "teste4",
    email: "teste4@teste.com",
    img: "https://static1.conquistesuavida.com.br/articles//4/56/84/@/18404-gente-que-da-prioridade-aos-sentimentos-article_gallery-2.jpg",
  },
];

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
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
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
  const [open, setOpen] = useState(false);

  const handleOpenAddContactModal = () => {
    setOpen(true);
  };

  const handleCloseAddContactModal = () => {
    setOpen(false);
  };

  const NoContactWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const NoContactMessage = styled.h3`
    text-align: center;
    font-weight: bold;
    font-size: 25px;
  `;

  const [user, setUser] = useState({name: '', email: ''})
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios.get("http://127.0.0.1:3333/user", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(response =>{
      
      setUser({name: response.data[0].name, email: response.data[0].email})
    }).catch(err => {
      console.log('error', err.message);
    });
  }, []);
  return (
    <>
      <HomeComponent>
        <ContactMensage>
          Olá {user.name}, seja bem vindo, abaixo estão todos os seus contatos
          cadastrados
        </ContactMensage>
        <ButtonWrapper onClick={handleOpenAddContactModal}>
          <PlusWrapper src={plus} />
          Adcionar contato
        </ButtonWrapper>
        <ContactListWrapper>
          {DUMMY_DATA.length !== 0 ? (
            DUMMY_DATA.map((data) => {
              return (
                <ContactComponent
                  key={data.id}
                  name={data.name}
                  email={data.email}
                  image={data.img}
                />
              );
            })
          ) : (
            <NoContactWrapper>
              <NoContactMessage>Nenhum contato encontrado</NoContactMessage>
            </NoContactWrapper>
          )}
        </ContactListWrapper>
      </HomeComponent>
      <AddContatctModal open={open} handleClose={handleCloseAddContactModal} />
    </>
  );
};

export default Contacts;
