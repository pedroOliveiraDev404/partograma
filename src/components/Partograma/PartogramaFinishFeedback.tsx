import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import { ReactComponent as IconeCheckFinish } from "../../assets/Icone_Check_Finish.svg";
import "../Pacientes/modais.css";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}
const PartogramaFinishFeedback = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const history = useNavigate();
  const submit = () => {
    history("/")
    /*
    let error = {
      pacientName: false,
    };
    error.pacientName = !pacientName ? true : false;
    setErrorForm(error);

    if (!error.pacientName) {
      handleCloseModal();
    }
    */
  };


  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box className="paciente-add-modal__modal-container" style={{ width: "600px", display: "flex", alignItems: "center", gap: "12px" }}>
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={submit}
        />
        <div className="partograma-modal__tab-sangue-fetal">
          <strong className="partograma-title-finish-feedback">
            Partograma Finalizado
          </strong>
        </div>
        <span style={{ marginBottom: "36px" }}>Partograma salvo no histórico com sucesso.</span>
        <IconeCheckFinish />
      </Box>
    </Modal>
  );
};

export default PartogramaFinishFeedback;
