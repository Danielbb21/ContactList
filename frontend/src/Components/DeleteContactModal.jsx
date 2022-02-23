import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import styled from "styled-components";

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
  return (
    <Modal open={props.open}>
      <Box sx={style} style={{ height: "75px" }}>
        <TextContent>Tem certeza que deseja deletar o contato?</TextContent>
        <ButtonWrapper>
          <Button
            style={{ background: "#6BC0B5", color: "white", fontSize: "15px" }}
            onClick={props.handleClose}
          >
            Não
          </Button>
          <Button
            style={{
              background: "#FF201B",
              color: "white",
              fontSize: "15px",
              marginLeft: "12px",
            }}
            onClick={props.handleClose}
          >
            Sim
          </Button>
        </ButtonWrapper>
      </Box>
    </Modal>
  );
};

export default DeleteContactModal;
