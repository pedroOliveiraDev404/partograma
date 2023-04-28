import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "@mui/material";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import "../Pacientes/modais.css";
import {
  selectBackgroundColor,
  selectNumberOfDeliveries,
} from "../../store/modules/partogramaChart/actions";
import { addObstetricHistory } from "../../store/modules/header/actions";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaObstetricHistory = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const [numberOfBirths, setNumberOfBirths] = useState(0);
  const [numberOfGestations, setNumberOfGestations] = useState(1);
  const [numberOfAbortions, setNumberOfAbortions] = useState<number>(0);
  const [vaginalChildbirth, setVaginalChildbirth] = useState<number>(0);
  const [cesareanChildbirth, setCesareanChildbirth] = useState<number>(0);

  useEffect(() => {
    const soma =
      Number(numberOfAbortions) +
      Number(vaginalChildbirth) +
      Number(cesareanChildbirth) +
      1;
    const subtraction = soma - Number(numberOfAbortions) - 1;
    setNumberOfGestations(soma);
    setNumberOfBirths(subtraction);
  }, [numberOfAbortions, vaginalChildbirth, cesareanChildbirth]);

  const onSubmit = () => {
    const textArea: any = document.getElementById("textarea-obstetric-history");
    dispatch(selectNumberOfDeliveries(numberOfBirths));
    if (numberOfGestations === 1) {
      dispatch(selectBackgroundColor("#FFFF81"));
    }
    if (numberOfBirths > 1) {
      dispatch(selectBackgroundColor("#C1FEFF"));
    }
    if (cesareanChildbirth > 0) {
      dispatch(selectBackgroundColor("#FFC0C0"));
    }

    dispatch(
      addObstetricHistory({
        numberOfBirths,
        numberOfGestations,
        numberOfAbortions,
        vaginalChildbirth,
        cesareanChildbirth,
        observation: textArea?.value,
        responsible: "Médico Responsável",
        dateOfSystem: new Date().toLocaleString("pt-BR").slice(0, 17),
      })
    );
    setTimeout(() => {
      handleCloseModal();
    }, 500);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div
        className="timeline-liquido-amniotico__modal-container"
        style={{ width: "max-content" }}
      >
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">
          Histórico Obstétrico
        </span>

        <div className="tab-rupture__input-container">
          <div style={{ width: "45%" }}>
            <strong className="partograma-page__label-select">G</strong>
            <input
              className="paciente-add-modal__input-textarea"
              type="number"
              style={{ textAlign: "center", cursor: "not-allowed" }}
              min={0}
              readOnly
              value={numberOfGestations}
            />
          </div>
          <div style={{ width: "45%" }}>
            <strong className="partograma-page__label-select">P</strong>
            <input
              className="paciente-add-modal__input-textarea"
              type="number"
              style={{ textAlign: "center", cursor: "not-allowed" }}
              min={0}
              readOnly
              value={numberOfBirths}
            />
          </div>
        </div>
        <div className="tab-rupture__input-container">
          <div style={{ width: "45%" }}>
            <strong className="partograma-page__label-select">
              Partos Vaginais
            </strong>
            <input
              className="paciente-add-modal__input-textarea"
              type="number"
              style={{ textAlign: "center" }}
              min={0}
              onChange={(e: any) => setVaginalChildbirth(e.target.value)}
              value={vaginalChildbirth}
              placeholder="0"
            />
          </div>
          <div style={{ width: "45%" }}>
            <span className="partograma-page__label-select">
              Partos Cesáreos
            </span>
            <input
              className="paciente-add-modal__input-textarea"
              type="number"
              style={{ textAlign: "center" }}
              min={0}
              onChange={(e: any) => setCesareanChildbirth(e.target.value)}
              value={cesareanChildbirth}
              placeholder="0"
            />
          </div>
        </div>
        <div style={{ width: "45%" }}>
          <span className="partograma-page__label-select">Perdas precoce</span>
          <input
            className="paciente-add-modal__input-textarea"
            type="number"
            style={{ textAlign: "center" }}
            min={0}
            value={numberOfAbortions}
            placeholder="0"
            onChange={(e: any) => setNumberOfAbortions(e.target.value)}
          />
        </div>

        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          id="textarea-obstetric-history"
        />
        <button
          className="paciente-add-modal__button-submit"
          onClick={onSubmit}
        >
          Salvar
        </button>
      </div>
    </Modal>
  );
};

export default PartogramaObstetricHistory;
