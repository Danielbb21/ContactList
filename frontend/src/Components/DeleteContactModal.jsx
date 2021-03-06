import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useAllPages, useContacts, useEmailFilter, useNameFilter, usePage, usePhoneFilter } from "../Context/UserLogged";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  // background: "#A483BB",
};

const TextContent = styled.p`
  font-size: 26px;
  margin: 0;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
`;

const DeleteContactModal = (props) => {
  const { userContacts, setUserContacts } = useContacts();
  const { actualPage, setActualPage } = usePage();
  const { setAllPages } = useAllPages();
  const { nameFilter } = useNameFilter();
  const { emailFilter } = useEmailFilter();
  const { phoneFilter } = usePhoneFilter()

  const handleDeleteContact = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://127.0.0.1:3333/contact/${props.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Contato deletado", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,

          progress: undefined,
        });
        props.handleClose();
        
        if (userContacts.length === 1 && actualPage !== 1) {
          
          const pageAtual = actualPage -1;
          setActualPage(pageAtual);
        }
        axios
          .get("http://127.0.0.1:3333/contact", {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: actualPage, name: nameFilter, email: emailFilter, phone: phoneFilter },
          })
          .then((response) => {
            let pages = [];
            for (let i = 1; i <= response.data.meta.last_page; i++) {
              pages.push(i);
            }
            if(response.data.data.length === 0 && response.data.meta.last_page === 1){
              setAllPages(0);
            }
            else{

              setAllPages(pages);
            }
            setUserContacts(response.data.data);
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
  };

  return (
    <Modal open={props.open}>
      <Box sx={style} style={{ height: "75px" }}>
        <TextContent>Tem certeza que deseja deletar o contato?</TextContent>
        <ButtonWrapper>
          <Button
            style={{ background: "#6BC0B5", color: "white", fontSize: "15px" }}
            onClick={props.handleClose}
          >
            N??o
          </Button>
          <Button
            style={{
              background: "#FF201B",
              color: "white",
              fontSize: "15px",
              marginLeft: "12px",
            }}
            onClick={handleDeleteContact}
          >
            Sim
          </Button>
        </ButtonWrapper>
      </Box>
    </Modal>
  );
};

export default DeleteContactModal;
