import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Modal } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import { selectTypePregnancy } from "../../store/modules/partogramaChart/actions";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";

import "../Pacientes/modais.css";
import { addPregnancyType } from "../../store/modules/header/actions";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  setNumberOfBabys: (babys: string, observation: string) => void;
}

const PartogramaTypeOfPregnancy = ({
  isModalOpen,
  handleCloseModal,
  setNumberOfBabys,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const { typePregnancy } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );
  const [type, setType] = useState<string>("Única Cefálica");
  const [numberBabys, setNumberBabys] = useState<string>();

  const onSubmit = () => {
    const textArea: any = document.getElementById("textarea-typePregnancy");
    if (numberBabys) setNumberOfBabys(numberBabys, textArea.value);

    dispatch(
      addPregnancyType({
        pregnancyType: typePregnancy,
        observation: textArea?.value,
        babyNumbers: numberBabys ? numberBabys : undefined,
      })
    );
    if (typePregnancy !== "Múltipla") {
      handleCloseModal();
    } else {
      if (numberBabys) {
        handleCloseModal();
      }
    }
  };

  const handlePregnancy = (e: any) => {
    setType(e.target.value);
    dispatch(selectTypePregnancy(e.target.value));
  };

  useEffect(() => {
    if (type === "Múltipla") {
      document.getElementById("radio-two-babys")?.click();
    }
  }, [type]);

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginBottom: "16px" }}
        >
          Tipo da Gravidez
        </span>

        <Select
          className="tab-dilatacao__dilatacao-input-select"
          value={type}
          onChange={handlePregnancy}
        >
          <MenuItem value="Única Cefálica">Única Cefálica</MenuItem>
          <MenuItem value="Única Pélvica">Única Pélvica</MenuItem>
          <MenuItem value="Única Córmica">Única Córmica</MenuItem>
          <MenuItem value="Múltipla">Múltipla</MenuItem>
        </Select>
        {type === "Múltipla" && (
          <div style={{ width: "55%", marginTop: "16px", marginLeft: "4px" }}>
            Número de fetos
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="2"
                id="radio-two-babys"
                control={<Radio />}
                label="2"
                defaultChecked
                onChange={(e: any) => setNumberBabys(e.target.value)}
              />
              <FormControlLabel
                value="3 ou mais"
                control={<Radio />}
                label="3 ou mais"
                onChange={(e: any) => setNumberBabys(e.target.value)}
              />
            </RadioGroup>
          </div>
        )}
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          id="textarea-typePregnancy"
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

export default PartogramaTypeOfPregnancy;
