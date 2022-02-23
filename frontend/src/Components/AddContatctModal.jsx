import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Input from "./Input";
import Box from "@mui/material/Box";
import styled from "styled-components";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  // background: "#A483BB",
};

const TitleWrapper = styled.h1`
  margin: 0;
  text-align: center;
`;
const InputListWrapper = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;
const ButtonsWrapper = styled.div`
  
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const AddContactModal = (props) => {
  return (
    <>
      <Modal open={props.open}>
        <Box sx={style} style={{ height: "350px" }}>
          <TitleWrapper>Cadastre um novo contato</TitleWrapper>
          <FormWrapper>
            <InputListWrapper>
              <Input type="text" text="Digite o nome do seu contato" />
              <Input type="email" text="Digite o e-mail do seu contato" />
              <Input type="text" text="Digite o telefone do seu contato" />
            </InputListWrapper>
            <ButtonsWrapper>
              <Button
                style={{
                  background: "#FF201B",
                  color: "white",
                  fontSize: "15px",
                  marginLeft: "12px",
                }}
                onClick={props.handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                style={{
                  background: "#24a0ed",
                  color: "white",
                  fontSize: "15px",
                  marginLeft: "12px",
                }}
              >
                Cadastrar
              </Button>
            </ButtonsWrapper>
          </FormWrapper>
        </Box>
      </Modal>
    </>
  );
};

export default AddContactModal;
