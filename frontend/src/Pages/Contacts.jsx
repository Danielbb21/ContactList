import styled from "styled-components";
import plus from "../Images/plus.svg";
import { Button, Input } from "@mui/material";
import { useState } from "react";
import AddContatctModal from "../Components/AddContatctModal";
import ContactComponent from "../Components/ContactComponent";
import { useEffect } from "react";
import axios from "axios";
import { useAllPages, UseLogged } from "../Context/UserLogged";
import { useContacts } from "../Context/UserLogged";
import {
  usePage,
  useEmailFilter,
  usePhoneFilter,
  useNameFilter,
} from "../Context/UserLogged";
import InputMask from "react-input-mask/lib/react-input-mask.development";

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #d3d3d3;
`;

const HomeComponent = styled.div`
  /* height: 100vh;
  width: 100vw;
  background-color: #d3d3d3; */
  display: flex;
  /* flex: 1; */
  height: 90vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactMensage = styled.h1`
  font-size: 30px;
  text-align: center;
`;

const ContactListWrapper = styled.div`
  width: 800px;
  height: 450px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
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

const LogoutButtonWrapper = styled.div`
  width: 95%;
  display: flex;

  justify-content: flex-end;
`;

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

const PagesButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const FilterWrapper = styled.div`
  width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const Contacts = () => {
  const [open, setOpen] = useState(false);
  const { setIsLoggedIn } = UseLogged();
  const { nameFilter, setNameFilter } = useNameFilter();
  const { emailFilter, setEmailFilter } = useEmailFilter();
  const { phoneFilter, setPhoneFilter } = usePhoneFilter();

  const handleOpenAddContactModal = () => {
    setOpen(true);
  };

  const handleCloseAddContactModal = () => {
    setOpen(false);
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const { userContacts, setUserContacts } = useContacts();

  const { actualPage, setActualPage } = usePage();
  const { allPages, setAllPages } = useAllPages();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:3333/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser({ name: response.data[0].name, email: response.data[0].email });
      })
      .catch((err) => {
        console.log("error", err.message);
      });
    if (
      nameFilter.trim() !== "" ||
      emailFilter.trim() !== "" ||
      phoneFilter.trim() !== ""
    ) {
      const time = setTimeout(() => {
        axios
          .get("http://127.0.0.1:3333/contact", {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              page: actualPage,
              name: nameFilter,
              email: emailFilter,
              phone: phoneFilter,
            },
          })
          .then((response) => {
            console.log("response.data.lastPage", response.data);
            let pages = [];
            for (let i = 1; i <= response.data.meta.last_page; i++) {
              pages.push(i);
            }
            if (
              response.data.data.length === 0 &&
              response.data.meta.last_page === 1
            ) {
              setAllPages(0);
            } else {
              setAllPages(pages);
            }

            setUserContacts(response.data.data);
          })
          .catch((err) => {
            console.log("error", err.message);
          });
      }, 500);
      return () => {
        clearTimeout(time);
      };
    } else {
      axios
        .get("http://127.0.0.1:3333/contact", {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page: actualPage,
            name: nameFilter,
            email: emailFilter,
            phone: phoneFilter,
          },
        })
        .then((response) => {
          console.log("response.data.lastPage", response.data);
          let pages = [];
          for (let i = 1; i <= response.data.meta.last_page; i++) {
            pages.push(i);
          }
          if (
            response.data.data.length === 0 &&
            response.data.meta.last_page === 1
          ) {
            setAllPages(0);
          } else {
            setAllPages(pages);
          }

          setUserContacts(response.data.data);
        })
        .catch((err) => {
          console.log("error", err.message);
        });
    }
  }, [
    setUserContacts,
    actualPage,
    setAllPages,
    nameFilter,
    emailFilter,
    phoneFilter,
  ]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <PageWrapper>
      <LogoutButtonWrapper>
        <Button
          style={{
            background: "#FF201B",
            color: "white",
            fontSize: "15px",
            marginTop: "10px",
          }}
          onClick={handleLogOut}
        >
          Sair
        </Button>
      </LogoutButtonWrapper>
      <HomeComponent>
        <ContactMensage>
          Olá {user.name}, seja bem vindo, abaixo estão todos os seus contatos
          cadastrados
        </ContactMensage>
        <ButtonWrapper onClick={handleOpenAddContactModal}>
          <PlusWrapper src={plus} />
          Adcionar contato
        </ButtonWrapper>
        <FilterWrapper>
          <Input
            type="text"
            placeholder="Filtrar por nome"
            value={nameFilter}
            onChange={(event) => {
              setNameFilter(event.target.value);
              setActualPage(1);
            }}
          />
          <Input
            type="text"
            placeholder="Filtrar por e-mail"
            value={emailFilter}
            onChange={(event) => {
              setEmailFilter(event.target.value);
              setActualPage(1);
            }}
          />
          <InputMask
            mask="(99) 99999-9999"
            value={phoneFilter}
            onChange={(event) => {
              setPhoneFilter(event.target.value);
              setActualPage(1);
            }}
          >
            <Input type="text" placeholder="Filtrar por telefone" />
          </InputMask>
        </FilterWrapper>
        <ContactListWrapper>
          {userContacts.length !== 0 ? (
            userContacts.map((data) => {
              return (
                <ContactComponent
                  key={data.id}
                  id={data.id}
                  name={data.name}
                  email={data.email}
                  phone={data.phone}
                  image={data.image}
                />
              );
            })
          ) : (
            <NoContactWrapper>
              <NoContactMessage>Nenhum contato encontrado</NoContactMessage>
            </NoContactWrapper>
          )}
        </ContactListWrapper>
        <PagesButtonWrapper>
          {allPages.length > 0 &&
            allPages.map((p, index) => {
              return (
                <>
                  <Button
                    style={{
                      background: p === actualPage ? "#103a53" : "",
                      color: p === actualPage ? "white" : "black",
                      fontSize: "15px",
                      marginRight: "15px",
                    }}
                    key={index}
                    onClick={() => setActualPage(+p)}
                  >
                    {p}
                  </Button>
                </>
              );
            })}
        </PagesButtonWrapper>
      </HomeComponent>
      <AddContatctModal
        open={open}
        handleClose={handleCloseAddContactModal}
        id={""}
      />
    </PageWrapper>
  );
};

export default Contacts;
