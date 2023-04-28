import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { ReactComponent as IconeClose } from "../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../assets/IconeTimelinePlusSign.svg";
import { ReactComponent as IconeTrash } from "../../../assets/Icone_Trash.svg";
import { formatDatetimeAxis } from "../../../utils/formatting";


import {
  addOxytocin,
  initOxytocin,
  stopOxytocin,
} from "../../../store/modules/oxytocin/actions";
import TimelineOxytocinChart from "./TimelineOxytocinChart";
import PartogramaConfirmDelete from "../PartogramaConfirmDelete";

import "./TimelineLiquidoAmniotico.css";

const TimelineOxytocin = () => {
  const dispatch = useDispatch();

  const { oxytocinData, init } = useSelector(
    (state: Store.State) => state.oxytocin.data
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [time, setTime] = useState("");
  const [canStop, setCanStop] = useState(false);
  const [oxytocinUnit, setOxytocinUnit] = useState(0);
  const [saline, setSaline] = useState(0);
  const [infusionRate, setInfusionRate] = useState(0);
  const [administeredDose, setAdministeredDose] = useState(0);
  const [timeSecond, setTimeSecond] = useState("");
  const [timeUnix, setTimeUnix] = useState(0);
  const [timeUnixSecond, setTimeUnixSecond] = useState(0);
  const [last, setLast] = useState<any>(null);
  const [companyDateTime, setCompanyDateTime] = useState<number | null>(
    Date.now()
  );
  const [companyDateTimeSecond, setCompanyDateTimeSecond] = useState<
    number | null
  >(Date.now());

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleCompanyDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setTimeUnix(new Date(newValue).getTime() / 1000);
      setCompanyDateTime(newValue.valueOf());
    }
  };

  const handleCompanyDateTimeChangeSecond = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTimeSecond(timeString);
      setTimeUnixSecond(new Date(newValue).getTime() / 1000);
      setCompanyDateTimeSecond(newValue.valueOf());
    }
  };

  const onSubmit = async () => {
    const find: any = oxytocinData.find(
      (item: any) => item?.timeLegend === time
    );
    const iconDose = await (
      <svg>
        <text
          fontSize="9"
          x={0}
          y={10}
          fill="black"
          fontWeight="700"
          width="200"
          height="200"
        >
          {administeredDose.toFixed()}
        </text>
      </svg>
    );
    const filterDose = oxytocinData.filter((item: any) => item?.iconDose);
    const aux = await oxytocinData.map((item: any) => {
      if (item.timeLegend === time) {
        return {
          ...item,
          point: 0.5,
          infusionRate,
          administeredDose,
          saline,
          oxytocinUnit,
          id: filterDose.length + 1,
          iconDose,
        };
      } else {
        return item;
      }
    });
    dispatch(addOxytocin(aux));
    dispatch(initOxytocin({ positionInit: find.position, init: true }));

    handleCloseModal();
  };

  const onInsert = async () => {
    const iconDose = await (
      <svg>
        <text
          fontSize="9"
          x={0}
          y={10}
          fill="black"
          width="200"
          fontWeight="700"
          height="200"
        >
          {administeredDose.toFixed()}
        </text>
      </svg>
    );
    let positionInsert = 0;

    const filterDose = oxytocinData.filter((item: any) => item?.iconDose);

    const aux = await oxytocinData.map((item: any) => {
      if (item.timeLegend === time) {
        positionInsert = item.position;
        return {
          ...item,
          point: 0.5,
          infusionRate,
          administeredDose,
          saline,
          oxytocinUnit,
          iconDose,
          id: filterDose.length + 1,
        };
      } else {
        return item;
      }
    });

    const dataReverse = aux.reduceRight(function (previous: any, current: any) {
      previous.push(current);
      return previous;
    }, []);

    const lastAdministeredDose = dataReverse.find(
      (item: any) => item?.administeredDose && item.position < positionInsert
    );

    const auxInsert = await aux.map((item: any) => {
      if (item.position > lastAdministeredDose.position && item.position < positionInsert) {
        return {
          ...item,
          point: 0.5,
          administeredDose: lastAdministeredDose.administeredDose,
          id: lastAdministeredDose.id,
        };
      } else {
        return item;
      }
    });

    dispatch(addOxytocin(auxInsert));

    handleCloseModal();
  };

  const goToEdit = (e: any) => {
    let findFirstItem: any;
    const dataReverse = oxytocinData?.reduceRight(function (
      previous: any,
      current: any
    ) {
      previous.push(current);
      return previous;
    },
    []);
    findFirstItem = dataReverse.find(
      (item: any) =>
        item?.position < e?.position &&
        item?.point !== 0.5
    );

    //

    const interval: any[] = [];
    let auxInterval = 0;
    oxytocinData.forEach((item: any) => {
      if (
        e?.id === item?.id &&
        (auxInterval === 0 || auxInterval === 1)
      ) {
        auxInterval = 1;
        interval.push(item);
      } else if (auxInterval === 1) {
        auxInterval = 2;
      }
    });
    setCompanyDateTime(interval[0]?.time);
    setTimeUnix(new Date(interval[0]?.time).getTime() / 1000);
    setTimeUnixSecond(
      new Date(interval[interval.length - 1]?.time).getTime() / 1000
    );
    setTime(e.timeLegend);
    setCompanyDateTimeSecond(interval[interval.length - 1]?.time);

    setCanStop(e.timeLegend === last?.timeLegend && !last?.finalTime);
    setEdit({
      ...findFirstItem,
      firstPosition: interval[0]?.position,
      secondPosition: interval[interval.length - 1]?.position,
      timeLegend: e?.timeLegend,
      finalTime: e.finalTime,
    });
    handleOpenModal();
  };

  const stopSubmit = async () => {
    const dataReverse = oxytocinData.reduceRight(function (
      previous: any,
      current: any
    ) {
      previous.push(current);
      return previous;
    },
    []);

    const lastAdministeredDose = dataReverse.find(
      (item: any) => item?.iconDose
    );

    const aux = await oxytocinData?.map((item: any) => {
      const itemTime = new Date(item.time).getTime() / 1000;

      if (
        itemTime < timeUnix &&
        item.position > lastAdministeredDose.position
      ) {
        return {
          ...item,
          point: 0.5,
          infusionRate,
          administeredDose,
          saline,
          oxytocinUnit,
          timeInitial: time,
          timeStop: timeSecond,
          finalTime: companyDateTimeSecond,
        };
      }

      if (time === item.timeLegend) {
        return {
          ...item,
          point: 0.5,
          infusionRate,
          administeredDose,
          saline,
          oxytocinUnit,
          timeInitial: time,
          timeStop: timeSecond,
          finalTime: companyDateTimeSecond,
        };
      } else if (itemTime > timeUnixSecond && edit) {
        return {
          ...item,
          point: null,
          infusionRate: null,
          administeredDose: null,
          saline: null,
          oxytocinUnit: null,
          iconDose: null,
        };
      } else if (itemTime > timeUnix && !edit) {
        return {
          ...item,
          point: null,
          infusionRate: null,
          administeredDose: null,
          saline: null,
          oxytocinUnit: null,
          iconDose: null,
        };
      } else {
        return item;
      }
    });
    dispatch(addOxytocin(aux));
    dispatch(stopOxytocin());



    handleCloseModal();
  };

  const editSubmit = async () => {
    const iconDose = await (
      <svg>
        <text
          fontSize="9"
          x={0}
          y={10}
          fill="black"
          width="200"
          height="200"
          fontWeight="700"
        >
          {administeredDose.toFixed()}
        </text>
      </svg>
    );
    let lastPosition = 0;
    // Define intervalos
    const aux = await oxytocinData.map((item: any) => {
      const itemTime = new Date(item.time).getTime() / 1000;
      if (
        item.timeLegend === edit.timeLegend &&
        !(itemTime >= timeUnix && itemTime <= timeUnixSecond)
      ) {
        return {
          ...item,
          infusionRate: null,
          administeredDose: null,
          saline: null,
          oxytocinUnit: null,
          timeInitial: null,
          timeStop: null,
          finalTime: null,
          iconDose: null,
        };
      } else if (item.timeLegend === time) {
        return {
          ...item,
          point: 0.5,
          infusionRate,
          administeredDose,
          saline,
          oxytocinUnit,
          timeInitial: time,
          timeStop: timeSecond,
          finalTime: companyDateTimeSecond,
          iconDose,
        };
      } else if (itemTime >= timeUnix && itemTime <= timeUnixSecond) {
        lastPosition = item.position;
        return {
          ...item,
          point: 0.5,
          infusionRate,
          administeredDose,
          saline,
          oxytocinUnit,
          timeInitial: time,
          timeStop: timeSecond,
          finalTime: companyDateTimeSecond,
        };
      } else {
        return item;
      }
    });

    const clean = await aux.map((item: any) => {
      if (item.timeLegend === edit.timeLegend && edit.legend !== time) {
        return {
          ...item,
          iconDose: null,
        };
      } else {
        return item;
      }
    });

    const filter: any = clean.find(
      (item: any) => item?.iconDose !== null && item?.iconDose !== undefined
    );

    const oxytocinDataFilterInitial = clean.map((item: any) => {
      if (item.position < filter.position) {
        return {
          ...item,
          point: null,
          infusionRate: null,
          administeredDose: null,
          saline: null,
          oxytocinUnit: null,
          timeInitial: null,
          timeStop: null,
          finalTime: null,
          iconDose: null,
        };
      } else {
        return item;
      }
    });
    let finish = 0;
    const oxytocinDataFilterInterval = oxytocinDataFilterInitial.map(
      (item: any) => {
        if (
          item.position > lastPosition + 1 &&
          !item.iconDose &&
          (finish === 0 || finish === 1)
        ) {
          finish = 1;
          return {
            ...item,
            point: null,
            infusionRate: null,
            administeredDose: null,
            saline: null,
            oxytocinUnit: null,
            timeInitial: null,
            timeStop: null,
            finalTime: null,
            iconDose: null,
          };
        } else {
          if (finish === 1) {
            finish = 2;
          }
          return item;
        }
      }
    );
    dispatch(addOxytocin(oxytocinDataFilterInterval));

    setEdit(null);
    handleCloseModal();
  };

  useEffect(() => {
    if (infusionRate && oxytocinUnit && saline) {
      const drugVolume = oxytocinUnit / 5;
      const auxSoma = Number(drugVolume) + Number(saline);
      const solutionConcentration = (oxytocinUnit * 1000) / auxSoma;
      const soma = (infusionRate * solutionConcentration) / 60;
      setAdministeredDose(Number(soma.toFixed(1)));
    }
  }, [infusionRate, oxytocinUnit, saline]);

  useEffect(() => {
    if (oxytocinData) {
      let aux = oxytocinData;

      const dataReverse = aux.reduceRight(function (
        previous: any,
        current: any
      ) {
        previous.push(current);
        return previous;
      },
      []);

      const find: any = dataReverse.find((item: any) => item?.administeredDose);
      if (find?.administeredDose) {
        setLast(find);
      }
    }
  }, [oxytocinData]);

  const DatePicker = () => (
    <div className="partograma-page__date-picker-line">
      <DateTimePicker
        value={companyDateTime}
        onChange={handleCompanyDateTimeChange}
        renderInput={(params) => <TextField {...params} />}
        className="timeline-liquido-amniotico__datetime-input"
      />
      {edit && (
        <div className="partograma-page__trash-icon">
          <IconeTrash onClick={() => setIsModalDeleteOpen(true)} />
        </div>
      )}
    </div>
  );

  

  return (
    <div
      className="timeline-liquido-amniotico__container"
      style={{ marginBottom: "-12px" }}
    >
      <div
        className="timeline-liquido-amniotico__label-container"
        onClick={() => {
          setEdit(null);
          setCanStop(true);
          handleOpenModal();
        }}
      >
        <span className="timeline-liquido-amniotico__label">Ocitocina</span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelineOxytocinChart onEdit={goToEdit} />
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          disableAutoFocus
          disableRestoreFocus
          disableEnforceFocus
        >
          <div className="timeline-liquido-amniotico__modal-container">
            <IconeClose
              className="paciente-add-modal__icone-close"
              onClick={handleCloseModal}
            />
            <strong>Ocitocina</strong>
            <DatePicker/>
            {edit && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>Fim intervalo</span>
                <DateTimePicker
                  value={companyDateTimeSecond}
                  onChange={handleCompanyDateTimeChangeSecond}
                  renderInput={(params) => <TextField {...params} />}
                  className="timeline-liquido-amniotico__datetime-input"
                />
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: "-12px",
              }}
            >
              <strong>Número de Unidades de Ocitocina [5 UI/ml]:</strong>
              <input
                className={`paciente-add-modal__input-textarea`}
                type="number"
                style={{ textAlign: "center", width: "75px" }}
                min={0}
                value={oxytocinUnit}
                onChange={(e: any) => setOxytocinUnit(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2px",
                alignItems: "baseline",
                marginTop: "-12px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <strong>Volume do diluente (soro) em ml:</strong>
              <input
                className={`paciente-add-modal__input-textarea`}
                type="number"
                style={{ textAlign: "center", width: "75px" }}
                min={0}
                value={saline}
                onChange={(e: any) => setSaline(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2px",
                alignItems: "baseline",
                width: "100%",
                justifyContent: "space-between",
                marginTop: "-12px",
              }}
            >
              <strong>Velocidade de Infusão em ml/h (VI): </strong>
              <input
                className={`paciente-add-modal__input-textarea`}
                type="number"
                style={{ textAlign: "center", width: "75px" }}
                min={0}
                value={infusionRate}
                onChange={(e: any) => setInfusionRate(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "2px",
                alignItems: "baseline",
                marginTop: "-12px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <strong>Dose Administrada em mUI/min:</strong>
              <input
                className={`paciente-add-modal__input-textarea`}
                type="number"
                style={{ textAlign: "center", width: "75px" }}
                min={0}
                readOnly
                value={administeredDose}
                onChange={(e: any) => setAdministeredDose(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: "8px",
              }}
            >
              {init && (
                <button
                  className="paciente-add-modal__button-submit"
                  onClick={edit ? editSubmit : onInsert}
                >
                  Atualizar
                </button>
              )}
              {!init && edit && (
                <button
                  className="paciente-add-modal__button-submit"
                  onClick={edit ? editSubmit : onInsert}
                >
                  Atualizar
                </button>
              )}
              {canStop && init && (
                <button
                  className="paciente-add-modal__button-submit"
                  onClick={stopSubmit}
                >
                  Parar
                </button>
              )}
              {!init && (
                <button
                  className="paciente-add-modal__button-submit"
                  onClick={init ? stopSubmit : onSubmit}
                >
                  Iniciar
                </button>
              )}
            </div>

            <ul style={{ width: "100%" }}>
              <li style={{ width: "100%" }}>
                {last && `Última dose ${last.administeredDose}`}
              </li>
            </ul>
          </div>
          
        </Modal>
        
      )}
    </div>
  );
};

export default TimelineOxytocin;
