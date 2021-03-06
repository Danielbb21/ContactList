import styled from "styled-components";
import { Button } from "@mui/material";
import trash from "../Images/trash.svg";
import pencil from "../Images/pencil.svg";
import { useState } from "react";
import DeleteContactModal from "./DeleteContactModal";
import UploadContactModal from "./UploadContactModal";
import {useUpdateData} from '../Context/UserLogged';

const ContactWrapper = styled.div`
  width: 230px;
  height: 280px;
  background-color: #d3d3d3;
  border-radius: 15px;
  margin: 12px;
  overflow: auto;
`;

const InfoWrapper = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 5px;
  word-break: break-all;
`;

const InfoText = styled.span`
  font-weight: normal;
  width: 100%;
  margin: 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 75%;
  height: 100px;
  border-radius: 10px;
`;

const ButtonsWrapper = styled.div`
  width: 95%;
  margin-top: 10px;
  margin-right: 50px;
  display: flex;
  justify-content: flex-end;
`;



const ContactComponent = (props) => {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [contactId = setContactId] = useState('');
  
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const {setUpdateData} = useUpdateData();
  const onOpenDeleteModal = () => {
    
    setOpenDeleteModal(true);
  }

  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  }

  const onOpenUpdateModal = () => {
    
    setUpdateData({name: props.name, email: props.email, phone: props.phone})
    setOpenUpdateModal(true);
    
  }

  const onCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  }

  const url = props.image ? `http://127.0.0.1:3333${props.image}` : 'https://i.stack.imgur.com/l60Hf.png';
  

  return (
    <>
      <ContactWrapper key={props.id}>
        <InfoWrapper>
          Nome: <InfoText>{props.name}</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          Email: <InfoText>{props.email}</InfoText>
        </InfoWrapper>
        <ImageWrapper>
          <Image src={url} alt={props.name} />
        </ImageWrapper>
        <InfoWrapper>
          Telefone: <InfoText>{props.phone}</InfoText>
        </InfoWrapper>
        <ButtonsWrapper>
          <Button
            type="submit"
            style={{
              background: "#FF201B",
              color: "white",
              height: "30px",
              width: "20px",
              marginLeft: "10px",
            }}
            onClick = {onOpenDeleteModal}
          >
            <img src={trash} style={{ color: "white" }} alt="deletar contato"/>
          </Button>
          <Button
            onClick ={onOpenUpdateModal}
            style={{
              background: "#24a0ed",
              color: "white",
              height: "30px",
              width: "20px",
              marginLeft: "10px",
            }}
          >
            <img src={pencil} style={{ color: "white" }} alt="atualizar contato"/>
          </Button>
        </ButtonsWrapper>
      </ContactWrapper>
      <DeleteContactModal open = {openDeleteModal} handleClose = {onCloseDeleteModal} id= {props.id}/>
      <UploadContactModal open={openUpdateModal} handleClose={onCloseUpdateModal} id = {props.id}/>
    </>
  );
};

export default ContactComponent;
