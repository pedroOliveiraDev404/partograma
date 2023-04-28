import { useState } from "react";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import PartogramaFinishFeedback from "./PartogramaFinishFeedback";

import "../Pacientes/modais.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleCancel: () => void;
}
const PartogramaConfirmFinish = ({
  isModalOpen,
  handleCloseModal,
  handleCancel,
}: PacienteAddModalProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const submit = async () => {
    const input = document.getElementById("my-html-element");
    html2canvas(input as any).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf: any = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });

    setOnOpen(true);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        className="paciente-add-modal__modal-container"
        style={{ width: "600px" }}
      >
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <div className="partograma-modal__tab-sangue-fetal">
          <strong
            className="paciente-add-modal__tab-title"
            style={{ marginBottom: "36px" }}
          >
            Finalizar Partograma
          </strong>
        </div>
        <span style={{ marginBottom: "36px", marginTop: "36px" }}>
          Deseja realmente finalizar o partograma?
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <button
            className="paciente-add-modal__button-submit"
            onClick={handleCancel}
          >
            Não
          </button>
          <button
            className="paciente-add-modal__button-submit"
            onClick={submit}
          >
            Sim
          </button>
        </div>
        <PartogramaFinishFeedback
          handleCloseModal={() => {
            setOnOpen(false);
          }}
          isModalOpen={onOpen}
        />
      </Box>
    </Modal>
  );
};

export default PartogramaConfirmFinish;
