import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";
import { formatDatetimeAxis } from "../../../../utils/formatting";

import "../TimelineLiquidoAmniotico.css";
import "./TimelinePharmacological.css";

import TimelinePharmacologicalChart from "./TimelinePharmacologicalChart";
import {
  addPharmacological,
  initPharmacological,
  stopPharmacological,
} from "../../../../store/modules/pharmacological/actions";

const TimelinePharmacological = () => {
  const dispatch = useDispatch();

  const { pharmacologicalData, init, positionInit } = useSelector(
    (state: Store.State) => state.pharmacological.data
  );

  const [toggleRegional, setToggleRegional] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const [stop, setStop] = useState<any>(null);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [time, setTime] = useState("");
  const [timeSecond, setTimeSecond] = useState("");
  const [pharmacological, setPharmacological] = useState<string>("Venoso");
  const [timeUnix, setTimeUnix] = useState(0);
  const [timeUnixSecond, setTimeUnixSecond] = useState(0);
  const [lastInput, setLastInput] = useState("");
  const [companyDateTime, setCompanyDateTime] = useState<number | null>(
    Date.now()
  );
  const [companyDateTimeSecond, setCompanyDateTimeSecond] = useState<
    number | null
  >(Date.now());

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

  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (pharmacologicalData) {
      let aux = pharmacologicalData;

      const dataReverse = aux.reduceRight(function (
        previous: any,
        current: any
      ) {
        previous.push(current);
        return previous;
      },
      []);
      const find: any = dataReverse.find(
        (item: any) => item?.pharmacologicalPoint
      );
      const findSecond: any = dataReverse.find(
        (item: any) =>
          item?.pharmacologicalPoint && item?.observation !== find.observation
      );

      if (
        find?.pharmacologicalPoint &&
        (find.observation !== observation || !init)
      ) {
        setLastInput(find?.observation);
      } else if (findSecond?.pharmacologicalPoint) {
        setLastInput(findSecond?.observation);
      }
    }
  }, [pharmacologicalData, observation, init]);

  const onSubmit = async () => {
    const textArea: any = document.getElementById("textarea-pharmacological");
    const find: any = pharmacologicalData.find(
      (item: any) => item?.timeLegend === time
    );

    const filterPharmaco = pharmacologicalData.filter(
      (item: any) => item?.pharmacologicalPoint
    );
    if (init) {
      let positionInsert = 0;
      const aux = await pharmacologicalData.map((item: any) => {
        if (item.timeLegend === time) {
          positionInsert = item.position;
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            pharmacological,
            pharmacologicalPoint: 0.5,
            id: filterPharmaco.length + 1,
          };
        } else {
          return item;
        }
      });

      const dataReverse = aux.reduceRight(function (
        previous: any,
        current: any
      ) {
        previous.push(current);
        return previous;
      },
      []);

      const lastId = dataReverse.find(
        (item: any) => item?.id && item.position < positionInsert - 1
      );
      const auxInsert = await aux.map((item: any) => {
        if (item.position > lastId.position && item.position < positionInsert) {
          return {
            ...item,
            point: 0.5,
            id: lastId.id,
          };
        } else {
          return item;
        }
      });
      dispatch(
        initPharmacological({ positionInit: find.position, init: true })
      );
      dispatch(addPharmacological(auxInsert));
      setObservation(textArea?.value);
    } else {
      const aux = await pharmacologicalData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            pharmacological,
            pharmacologicalPoint: 0.5,
            id: filterPharmaco.length + 1,
          };
        } else {
          return item;
        }
      });

      dispatch(addPharmacological(aux));
      setObservation(textArea?.value);
      dispatch(
        initPharmacological({ positionInit: find.position, init: true })
      );
    }

    handleCloseModal();
  };

  const goToStop = (e: any) => {
    let findFirstItem: any;
    const dataReverse = pharmacologicalData?.reduceRight(function (
      previous: any,
      current: any
    ) {
      previous.push(current);
      return previous;
    },
    []);
    findFirstItem = dataReverse.find(
      (item: any) => item?.position < e?.position && item?.point !== 0.5
    );

    const interval: any[] = [];
    let auxInterval = 0;
    pharmacologicalData.forEach((item: any) => {
      if (e?.id === item?.id && (auxInterval === 0 || auxInterval === 1)) {
        auxInterval = 1;
        interval.push(item);
      } else if (auxInterval === 1) {
        auxInterval = 2;
      }
    });
    setCompanyDateTime(interval[0]?.time);
    setCompanyDateTimeSecond(interval[interval.length - 1]?.time);
    setTimeUnix(new Date(interval[0]?.time).getTime() / 1000);
    setTimeUnixSecond(
      new Date(interval[interval.length - 1]?.time).getTime() / 1000
    );
    setTime(e?.timeLegend);
    setStop({
      ...findFirstItem,
      firstPosition: interval[0]?.position,
      secondPosition: interval[interval.length - 1]?.position,
      timeLegend: e?.timeLegend,
      finalTime: e.finalTime,
    });
    setObservation(e.observation);
    setPharmacological(e.pharmacological);
    handleOpenModal();
  };

  const goToEdit = (e: any) => {
    setEdit(e);
    setCompanyDateTime(e.time);
    setCompanyDateTimeSecond(e.finalTime);
    setObservation(e.observation);
    setPharmacological(e.pharmacological);
    handleOpenModal();
  };

  const stopSubmit = async () => {
    const textArea: any = document.getElementById("textarea-pharmacological");
    if (stop.timeLegend === time) {
      const aux = await pharmacologicalData?.map((item: any) => {
        const itemTime = new Date(item.time).getTime() / 1000;
        if (stop.position === item.position) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            pharmacological,
            pharmacologicalPoint: 0.5,
            timeStop: timeSecond,
            finalTime: companyDateTimeSecond,
            id: stop.id
          };
        } else if (itemTime >= timeUnix && itemTime <= timeUnixSecond) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            pharmacological,
            timeStop: timeSecond,
            finalTime: companyDateTimeSecond,
            id: stop.id
          };
        } else {
          return item;
        }
      });
      dispatch(addPharmacological(aux));
    } else {
      let lastPosition = 0;

      const aux = await pharmacologicalData.map((item: any) => {
        const itemTime = new Date(item.time).getTime() / 1000;
        if (item.timeLegend === stop.timeLegend) {
          return {
            ...item,
            point: null,
            observation: null,
            pharmacological: null,
            pharmacologicalPoint: null,
            timeStop: null,
            finalTime: null,
          };
        } else if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            pharmacological,
            pharmacologicalPoint: 0.5,
            timeStop: timeSecond,
            finalTime: companyDateTimeSecond,
            id: stop.id
          };
        } else if (itemTime >= timeUnix && itemTime <= timeUnixSecond) {
          lastPosition = item.position;
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            pharmacological,
            timeStop: timeSecond,
            finalTime: companyDateTimeSecond,
            id: stop.id
          };
        } else {
          return item;
        }
      });
      const filter: any = aux.find((item: any) => item?.pharmacologicalPoint);
      const pharmacologicalFilter = aux.map((item: any) => {
        if (item.position < filter.position) {
          return {
            ...item,
            point: null,
            observation: null,
            pharmacological: null,
            pharmacologicalPoint: null,
            timeStop: null,
            finalTime: null,
          };
        } else {
          return item;
        }
      });
      let finish = 0;
      const pharmacoDataFilterInterval = pharmacologicalFilter.map(
        (item: any) => {
          if (
            item.position > lastPosition + 1 &&
            !item.pharmacologicalPoint &&
            (finish === 0 || finish === 1)
          ) {
            finish = 1;
            return {
              ...item,
              point: null,
              observation: null,
              pharmacological: null,
              pharmacologicalPoint: null,
              timeStop: null,
              finalTime: null,
            };
          } else {
            if (finish === 1) {
              finish = 2;
            }
            return item;
          }
        }
      );
      dispatch(addPharmacological(pharmacoDataFilterInterval));
    }
    dispatch(stopPharmacological());
    setStop(null);
    setObservation("");
    handleCloseModal();
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById("textarea-pharmacological");
    if (edit.timeLegend === time) {
      const aux = await pharmacologicalData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            pharmacological,
            pharmacologicalPoint: 0.5,
            timeStop: timeSecond,
            finalTime: companyDateTimeSecond,
          };
        } else {
          return item;
        }
      });
      dispatch(addPharmacological(aux));
    } else {
      const aux = await pharmacologicalData.map((item: any) => {
        if (item.timeLegend === edit.timeLegend) {
          return {
            ...item,
            point: null,
            observation: "",
            pharmacological: null,
            pharmacologicalPoint: null,
            timeStop: null,
            finalTime: null,
          };
        } else if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea.value,
            pharmacological,
            pharmacologicalPoint: 0.5,
            timeStop: timeSecond,
            finalTime: companyDateTimeSecond,
          };
        } else {
          return item;
        }
      });
      dispatch(addPharmacological(aux));
    }
    setEdit(null);
    setObservation("");
    handleCloseModal();
  };

  const handleAspectoChange = (event: SelectChangeEvent<string>) => {
    setPharmacological(String(event.target.value));
  };

  useEffect(() => {
    if (init) {
      const filter = pharmacologicalData.filter(
        (item: any) => item?.pharmacologicalPoint
      );
      if (filter) {
        const running = filter.filter((item: any) => !item.timeStop);
        if (running.length === 0) {
          dispatch(stopPharmacological());
        }
      } else {
        dispatch(stopPharmacological());
      }
    }
  }, [pharmacologicalData, init, dispatch]);

  return (
    <div
      className="timeline-liquido-amniotico__container"
      style={{ marginTop: "-10px" }}
    >
      <div
        className="timeline-liquido-amniotico__label-container"
        onClick={() => {
          setEdit(null);
          handleOpenModal();
        }}
      >
        <span className="timeline-liquido-amniotico__label">Farmacológico</span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelinePharmacologicalChart onStop={goToStop} onEdit={goToEdit} />
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
          <span className="timeline-liquido-amniotico__modal-title">
            Farmacológico
          </span>
          <div>
            <DateTimePicker
              value={companyDateTime}
              onChange={handleCompanyDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="timeline-liquido-amniotico__datetime-input"
            />
          </div>
          {(stop || edit) && (
            <div className="paciente-add-modal__interval-box">
              <span>Fim intervalo</span>
              <DateTimePicker
                value={companyDateTimeSecond}
                onChange={handleCompanyDateTimeChangeSecond}
                renderInput={(params) => <TextField {...params} />}
                className="timeline-liquido-amniotico__datetime-input"
              />
            </div>
          )}
          <Select
            value={pharmacological}
            onChange={handleAspectoChange}
            className="timeline-liquido-amniotico__select-input"
            style={{ marginBottom: "12px" }}
          >
            <MenuItem value="Venoso">Venoso</MenuItem>
            <MenuItem value="Inalatório">Inalatório</MenuItem>
            <MenuItem onClick={() => setToggleRegional(!toggleRegional)}>
              Regional
            </MenuItem>

            <MenuItem
              disabled={!toggleRegional}
              value="Raqui"
              style={{marginLeft: "24px"}}
              onClick={() => setPharmacological("Raqui")}
            >
              Raqui
            </MenuItem>
            <MenuItem
              style={{marginLeft: "24px"}}
              value="Peridual"
              disabled={!toggleRegional}
            >
              Peridual
            </MenuItem>
            <MenuItem
              style={{marginLeft: "24px"}}
              disabled={!toggleRegional}
              value="Peridual com perfuração de Dura"
            >
              Peridual com perfuração de Dura
            </MenuItem>
          </Select>
          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            defaultValue={observation}
            id="textarea-pharmacological"
          />
          <button
            className="paciente-add-modal__button-submit"
            onClick={edit ? editSubmit : stop ? stopSubmit : onSubmit}
          >
            {edit ? "Atualizar" : stop ? "Parar" : "Iniciar"}
          </button>
          <ul className="paciente-add-modal__list">
            <li>
              {lastInput && (
                <div
                  className="partograma-page__container-historic"
                  style={{ width: "100%" }}
                >
                  <span>{lastInput}</span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default TimelinePharmacological;
