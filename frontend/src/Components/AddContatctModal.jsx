import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import styled from 'styled-components';

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

`

const AddContactModal = (props) => {
  return (
    <>
      <Modal open={props.open}>
        <Box sx={style} style={{ height: "300px" }}>
          <TitleWrapper>Cadastre um novo contato</TitleWrapper>
          <Button
            style={{ background: "#FF201B", color: "white", fontSize: "15px", marginLeft: '12px' }}
            onClick={props.handleClose}
          >
            Cancelar
          </Button>
          <Button
            style={{ background: "#24a0ed", color: "white", fontSize: "15px", marginLeft: '12px' }}
            onClick={props.handleClose}
          >
            Cadastrar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddContactModal;
