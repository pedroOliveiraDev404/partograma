import { useState } from "react";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import "../Pacientes/modais.css";
import { useDispatch } from "react-redux";
import { addGestacionalAge } from "../../store/modules/header/actions";
import { formatDateAxis, formatDatetimeAxis } from "../../utils/formatting";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaGestacionalAge = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const [gestacionalAgeDateTime, setGestacionalAgeDateTime] = useState<
    number | null
  >(Date.now());

  const [weeksDum, setWeeksDum] = useState(0);
  const [daysDum, setDaysDum] = useState(0);
  const [weeksUltrasound, setWeeksUltrasound] = useState(0);
  const [daysUltrasound, setDaysUltrasound] = useState(0);
  const [dateFormatted, setDateFormatted] = useState("");

  const handleGestacionalAgeTimeChange = (newValue: any | null | string) => {
    if (newValue !== null) {
      const timeString = formatDateAxis(newValue);
      setDateFormatted(timeString);
      setGestacionalAgeDateTime(newValue.valueOf());
    }
  };

  const [errorForm, setErrorForm] = useState({
    weeksDum: false,
    daysDum: false,
    weeksUltrasound: false,
    daysUltrasound: false,
  });

  const onSubmit = () => {
    const textArea: any = document.getElementById("textarea-gestacional-age");
    let error = {
      weeksDum: false,
      daysDum: false,
      weeksUltrasound: false,
      daysUltrasound: false,
    };
    error.weeksDum = weeksDum > 0 && weeksDum < 45 ? false : true;
    error.daysDum = daysDum > -1 && daysDum < 7 ? false : true;
    error.weeksUltrasound =
      weeksUltrasound > 0 && weeksUltrasound < 45 ? false : true;
    error.daysUltrasound =
      daysUltrasound > -1 && daysUltrasound < 7 ? false : true;

    setErrorForm(error);

    if (
      !error.weeksDum &&
      !error.daysDum &&
      !error.weeksUltrasound &&
      !error.daysUltrasound
    ) {
      dispatch(
        addGestacionalAge({
          weeksDum,
          daysDum,
          weeksUltrasound,
          daysUltrasound,
          observation: textArea.value,
          responsible: "Médico Responsável",
          dateOfRegistration: dateFormatted,
          dateOfSystem: new Date().toLocaleString("pt-BR").slice(0, 17),
        })
      );
      handleCloseModal();
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">
          Idade Gestacional
        </span>
        <div style={{ marginTop: "8px" }}>
          <DateTimePicker
            value={gestacionalAgeDateTime}
            onChange={handleGestacionalAgeTimeChange}
            renderInput={(params: any) => {
              const newParams = {
                ...params,
                inputProps: {
                  ...params.inputProps,
                  value: params.inputProps.value.slice(0, 11),
                },
              };
              return <TextField {...newParams} />;
            }}
            className="timeline-liquido-amniotico__datetime-input"
          />
        </div>
        <div
          className="timeline-liquido-amniotico__input-group"
          style={{ marginTop: "16px" }}
        >
          <span className="timeline-liquido-amniotico__input-label">
            Idade Gestacional pela DUM:
          </span>
          <div className="partograma-gestacional-age__input-content">
            <input
              className={`paciente-add-modal__input-textarea${
                errorForm.weeksDum ? "-error" : ""
              }`}
              type="number"
              style={{ textAlign: "center" }}
              max={44}
              min={0}
              onChange={(e: any) => setWeeksDum(e.target.value)}
              value={weeksDum}
            />
            semanas
            <input
              className={`paciente-add-modal__input-textarea${
                errorForm.daysDum ? "-error" : ""
              }`}
              type="number"
              style={{ textAlign: "center" }}
              max={6}
              min={0}
              onChange={(e: any) => setDaysDum(e.target.value)}
              value={daysDum}
            />
            dias
          </div>
        </div>
        <div className="timeline-liquido-amniotico__input-group">
          <span className="timeline-liquido-amniotico__input-label">
            Idade Gestacional pelo ultrassom :
          </span>
          <div className="partograma-gestacional-age__input-content">
            <input
              className={`paciente-add-modal__input-textarea${
                errorForm.weeksUltrasound ? "-error" : ""
              }`}
              type="number"
              style={{ textAlign: "center" }}
              max={44}
              min={0}
              onChange={(e: any) => setWeeksUltrasound(e.target.value)}
              value={weeksUltrasound}
            />
            semanas
            <input
              className={`paciente-add-modal__input-textarea${
                errorForm.daysUltrasound ? "-error" : ""
              }`}
              type="number"
              style={{ textAlign: "center" }}
              max={6}
              min={0}
              onChange={(e: any) => setDaysUltrasound(e.target.value)}
              value={daysUltrasound}
            />
            dias
          </div>
        </div>
        <span className="tab-dilatacao__notes-input-label">Observações</span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          id="textarea-gestacional-age"
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

export default PartogramaGestacionalAge;
