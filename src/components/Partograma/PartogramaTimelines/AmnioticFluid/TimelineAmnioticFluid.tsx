import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";
import TimelineAmnioticFluidChart from "./TimelineAmnioticFluidChart";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import {
  addAmniotic,
  addAmnioticGemelar,
  initAmniotic,
  initAmnioticGemelar,
  stopAmniotic,
  stopAmnioticGemelar,
} from "../../../../store/modules/amnioticFluid/actions";

import "../TimelineLiquidoAmniotico.css";

interface TimelineAmnioticProps {
  gemelar?: string;
}

const TimelineAmnioticFluid = ({ gemelar }: TimelineAmnioticProps) => {
  const dispatch = useDispatch();

  const {
    amnioticData,
    init,
    positionInit,
    amnioticGemelarData,
    initGemelar,
    positionInitGemelar,
  } = useSelector((state: Store.State) => state.amnioticFluid.data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [time, setTime] = useState("");
  const [timeUnix, setTimeUnix] = useState(0);
  const [timeUnixSecond, setTimeUnixSecond] = useState(0);
  const [firstElement, setFirstElement] = useState<any>(null);
  const [secondElement, setSecondElement] = useState<any>(null);
  const [amnioticDateTime, setAmnioticDateTime] = useState<number | null>(
    Date.now()
  );
  const [amnioticDateTimeSecond, setAmnioticDateTimeSecond] = useState<
    number | null
  >(Date.now());

  const [aspecto, setAspecto] = useState<string>("Claro");
  const handleAspectoChange = (event: SelectChangeEvent<string>) => {
    setAspecto(String(event.target.value));
  };

  const handleAmnioticDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);

      setTimeUnix(new Date(newValue).getTime() / 1000);
      setAmnioticDateTime(newValue.valueOf());
    }
  };

  const handleAmnioticDateTimeChangeSecond = (newValue: any | null) => {
    if (newValue !== null) {
      setTimeUnixSecond(new Date(newValue).getTime() / 1000);
      setAmnioticDateTimeSecond(newValue.valueOf());
    }
  };

  const [observation, setObservation] = useState("");

  const onSubmit = async () => {
    const textArea: any = document.getElementById("textarea-amnioticFluid");
    if (gemelar === "2") {
      if (initGemelar) {
        dispatch(stopAmnioticGemelar());
        const aux = await amnioticGemelarData?.map((item: any) => {
          const itemTime = new Date(item.time).getTime() / 1000;
          if (itemTime < timeUnix && item.position > positionInitGemelar) {
            return {
              ...item,
              point: 0.5,
              observation: textArea?.value,
              aspecto,
            };
          } else {
            return item;
          }
        });
        dispatch(addAmnioticGemelar(aux));
      } else {
        const find: any = amnioticGemelarData?.find(
          (item: any) => item?.timeLegend === time
        );
        setObservation("");
        const aux = await amnioticGemelarData.map((item: any) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              point: 0.5,
              observation: textArea.value,
              aspecto,
            };
          } else {
            return item;
          }
        });
        dispatch(addAmnioticGemelar(aux));
        dispatch(
          initAmnioticGemelar({ positionInit: find.position, init: true })
        );
      }
      handleCloseModal();
    } else {
      if (init) {
        dispatch(stopAmniotic());
        const aux = await amnioticData?.map((item: any) => {
          const itemTime = new Date(item.time).getTime() / 1000;
          if (itemTime < timeUnix && item.position > positionInit) {
            return {
              ...item,
              point: 0.5,
              observation: textArea?.value,
              aspecto,
            };
          } else {
            return item;
          }
        });
        dispatch(addAmniotic(aux));
      } else {
        const find: any = amnioticData?.find(
          (item: any) => item?.timeLegend === time
        );
        const aux = await amnioticData.map((item: any) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              point: 0.5,
              observation: textArea.value,
              aspecto,
            };
          } else {
            return item;
          }
        });
        dispatch(addAmniotic(aux));
        setObservation("");
        dispatch(initAmniotic({ positionInit: find.position, init: true }));
      }
      handleCloseModal();
    }
  };

  const goToEdit = (e: any) => {
    let findFirstItem: any;
    if (gemelar === "2") {
      const dataReverse = amnioticGemelarData?.reduceRight(function (
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

      amnioticGemelarData.forEach((item: any) => {
        if (
          e?.aspecto === item?.aspecto &&
          (auxInterval === 0 || auxInterval === 1)
        ) {
          auxInterval = 1;
          interval.push(item);
        } else if (auxInterval === 1) {
          auxInterval = 2;
        }
      });

      if (interval) {
        setEdit({
          ...findFirstItem,
          firstPosition: interval[0]?.position,
          secondPosition: interval[interval.length - 1]?.position,
        });
        setTimeUnix(new Date(interval[0]?.time).getTime() / 1000);
        setTimeUnixSecond(new Date(interval[0]?.time).getTime() / 1000);
        setAmnioticDateTime(interval[0]?.time);
        setAmnioticDateTimeSecond(interval[interval.length - 1]?.time);
        setAspecto(edit?.aspecto);
        setObservation(findFirstItem.observation);
        handleOpenModal();
      }
    } else {
      const dataReverse = amnioticData?.reduceRight(function (
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
          item?.point !== 0.5 &&
          e.aspecto !== item.aspecto
      );

      //

      const interval: any[] = [];
      let auxInterval = 0;

      amnioticData.forEach((item: any) => {
        if (
          e?.aspecto === item?.aspecto &&
          (auxInterval === 0 || auxInterval === 1)
        ) {
          auxInterval = 1;
          interval.push(item);
        } else if (auxInterval === 1) {
          auxInterval = 2;
        }
      });

      if (interval) {
        setEdit({
          ...findFirstItem,
          firstPosition: interval[0]?.position,
          secondPosition: interval[interval.length - 1]?.position,
        });
        setAmnioticDateTime(interval[0]?.time);
        setAmnioticDateTimeSecond(interval[interval.length - 1]?.time);
        setTimeUnix(new Date(interval[0]?.time).getTime() / 1000);
        setTimeUnixSecond(
          new Date(interval[interval.length - 1]?.time).getTime() / 1000
        );
        setAspecto(edit?.aspecto);
        setObservation(findFirstItem.observation);
        handleOpenModal();
      }
    }
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById("textarea-amnioticFluid");
    if (gemelar === "2") {
      const clean = await amnioticGemelarData?.map((item: any) => {
        const itemTime = new Date(item.time).getTime() / 1000;
        if (itemTime > edit.firstTime && itemTime < edit.secondTime) {
          return {
            ...item,
            point: null,
            observation: null,
          };
        } else {
          return item;
        }
      });

      const aux = await clean?.map((item: any) => {
        const itemTime = new Date(item.time).getTime() / 1000;
        if (itemTime > timeUnix && itemTime < timeUnixSecond) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            aspecto,
          };
        } else {
          return item;
        }
      });
      dispatch(addAmnioticGemelar(aux));

      setEdit(null);
      setObservation("");
      handleCloseModal();
    } else {
      const clean = await amnioticData?.map((item: any) => {
        if (
          item.position > edit.firstPosition &&
          item.position < edit.secondPosition
        ) {
          return {
            ...item,
            point: null,
            observation: null,
            aspecto: null,
          };
        } else {
          return item;
        }
      });

      const aux = await clean?.map((item: any) => {
        const itemTime = new Date(item.time).getTime() / 1000;
        if (itemTime > timeUnix && itemTime < timeUnixSecond) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
            aspecto,
          };
        } else {
          return item;
        }
      });
      
      dispatch(addAmniotic(aux));

      setEdit(null);
      setObservation("");
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (gemelar === "2") {
      if (amnioticGemelarData) {
        let aux = amnioticGemelarData;

        const dataReverse = aux.reduceRight(function (
          previous: any,
          current: any
        ) {
          previous.push(current);
          return previous;
        },
        []);

        const find: any = dataReverse.find((item: any) => item?.aspecto);
        const interval: any[] = [];
        let auxInterval = 0;
        if (find) {
          dataReverse.forEach((item: any) => {
            if (
              find?.aspecto === item?.aspecto &&
              (auxInterval === 0 || auxInterval === 1)
            ) {
              auxInterval = 1;
              interval.push(item);
            } else if (auxInterval === 1) {
              auxInterval = 2;
            }
          });
        }

        const findSecond = dataReverse.find(
          (item: any) =>
            item?.position < interval[interval.length - 1]?.position &&
            item?.aspecto !== undefined
        );
        const intervalSecond: any[] = [];
        let auxIntervalSecond = 0;
        if (findSecond) {
          dataReverse.forEach((item: any) => {
            if (
              findSecond?.aspecto === item?.aspecto &&
              item?.position < interval[interval.length - 1]?.position &&
              auxIntervalSecond !== 2
            ) {
              auxIntervalSecond = 1;
              intervalSecond.push(item);
            } else if (auxInterval === 1) {
              auxIntervalSecond = 2;
            }
          });
        }

        if (initGemelar) {
          const findThird = dataReverse.find(
            (item: any) =>
              item?.position <
                intervalSecond[intervalSecond.length - 1]?.position &&
              item?.aspecto !== undefined
          );
          const intervalThird: any[] = [];
          let auxIntervalThird = 0;
          if (findThird) {
            dataReverse.forEach((item: any) => {
              if (
                findThird?.aspecto === item?.aspecto &&
                item?.position <
                  intervalSecond[intervalSecond.length - 1]?.position &&
                auxIntervalThird !== 2
              ) {
                auxIntervalThird = 1;
                intervalThird.push(item);
              } else if (auxInterval === 1) {
                auxIntervalThird = 2;
              }
            });
          }
          if (findSecond?.aspecto) {
            setFirstElement({
              ...findSecond,
              finalTime: intervalSecond[0]?.timeLegend,
              initialTime:
                intervalSecond[intervalSecond.length - 1]?.timeLegend,
            });
          }
          if (findThird?.aspecto) {
            setSecondElement({
              ...findThird,
              finalTime: intervalThird[0]?.timeLegend,
              initialTime: intervalThird[intervalThird.length - 1]?.timeLegend,
            });
          }
        } else {
          if (find?.aspecto) {
            setFirstElement({
              ...find,
              finalTime: interval[0]?.timeLegend,
              initialTime: interval[interval.length - 1]?.timeLegend,
            });
          }
          if (findSecond?.aspecto) {
            setSecondElement({
              ...findSecond,
              finalTime: intervalSecond[0]?.timeLegend,
              initialTime:
                intervalSecond[intervalSecond.length - 1]?.timeLegend,
            });
          }
        }
      }
    } else {
      if (amnioticData) {
        let aux = amnioticData;

        const dataReverse = aux.reduceRight(function (
          previous: any,
          current: any
        ) {
          previous.push(current);
          return previous;
        },
        []);

        const find: any = dataReverse.find((item: any) => item?.aspecto);
        const interval: any[] = [];
        let auxInterval = 0;
        if (find) {
          dataReverse.forEach((item: any) => {
            if (
              find?.aspecto === item?.aspecto &&
              (auxInterval === 0 || auxInterval === 1)
            ) {
              auxInterval = 1;
              interval.push(item);
            } else if (auxInterval === 1) {
              auxInterval = 2;
            }
          });
        }

        const findSecond = dataReverse.find(
          (item: any) =>
            item?.position < interval[interval.length - 1]?.position &&
            item?.aspecto !== undefined
        );
        const intervalSecond: any[] = [];
        let auxIntervalSecond = 0;
        if (findSecond) {
          dataReverse.forEach((item: any) => {
            if (
              findSecond?.aspecto === item?.aspecto &&
              item?.position < interval[interval.length - 1]?.position &&
              auxIntervalSecond !== 2
            ) {
              auxIntervalSecond = 1;
              intervalSecond.push(item);
            } else if (auxInterval === 1) {
              auxIntervalSecond = 2;
            }
          });
        }

        if (init) {
          const findThird = dataReverse.find(
            (item: any) =>
              item?.position <
                intervalSecond[intervalSecond.length - 1]?.position &&
              item?.aspecto !== undefined
          );
          const intervalThird: any[] = [];
          let auxIntervalThird = 0;
          if (findThird) {
            dataReverse.forEach((item: any) => {
              if (
                findThird?.aspecto === item?.aspecto &&
                item?.position <
                  intervalSecond[intervalSecond.length - 1]?.position &&
                auxIntervalThird !== 2
              ) {
                auxIntervalThird = 1;
                intervalThird.push(item);
              } else if (auxInterval === 1) {
                auxIntervalThird = 2;
              }
            });
          }

          if (findSecond?.aspecto) {
            setFirstElement({
              ...findSecond,
              finalTime: intervalSecond[0]?.timeLegend,
              initialTime:
                intervalSecond[intervalSecond.length - 1]?.timeLegend,
            });
          }
          if (findThird?.aspecto) {
            setSecondElement({
              ...findThird,
              finalTime: intervalThird[0]?.timeLegend,
              initialTime: intervalThird[intervalThird.length - 1]?.timeLegend,
            });
          }
        } else {
          if (find?.aspecto) {
            setFirstElement({
              ...find,
              finalTime: interval[0]?.timeLegend,
              initialTime: interval[interval.length - 1]?.timeLegend,
            });
          }
          if (findSecond?.aspecto) {
            setSecondElement({
              ...findSecond,
              finalTime: intervalSecond[0]?.timeLegend,
              initialTime:
                intervalSecond[intervalSecond.length - 1]?.timeLegend,
            });
          }
        }
      }
    }
  }, [gemelar, amnioticGemelarData, amnioticData, init, initGemelar]);

  return (
    <div
      className="timeline-liquido-amniotico__container"
      style={{ marginTop: "-8px" }}
    >
      <div
        className="timeline-liquido-amniotico__label-container"
        onClick={() => {
          setEdit(null);
          handleOpenModal();
        }}
      >
        <span className="timeline-liquido-amniotico__label">
          Líquido Amniótico {gemelar ? `- G${gemelar}` : ""}
        </span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelineAmnioticFluidChart onEdit={goToEdit} gemelar={gemelar} />
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
            Líquido Amniótico {gemelar ? `- G${gemelar}` : ""}
          </span>
          <div>
            <DateTimePicker
              value={amnioticDateTime}
              onChange={handleAmnioticDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="timeline-liquido-amniotico__datetime-input"
            />
          </div>
          {edit && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Fim intervalo</span>
              <DateTimePicker
                value={amnioticDateTimeSecond}
                onChange={handleAmnioticDateTimeChangeSecond}
                renderInput={(params) => <TextField {...params} />}
                className="timeline-liquido-amniotico__datetime-input"
              />
            </div>
          )}
          <div className="timeline-liquido-amniotico__input-group">
            <span className="timeline-liquido-amniotico__input-label">
              Aspecto do Líquido
            </span>
            <Select
              value={aspecto}
              onChange={handleAspectoChange}
              className="timeline-liquido-amniotico__select-input"
            >
              <MenuItem value="Claro">Claro</MenuItem>
              <MenuItem value="Hemoamnio">Hemoâmnio</MenuItem>
              <MenuItem value="Meconio1">Meconial +1/+4</MenuItem>
              <MenuItem value="Meconio2">Meconial +2/+4</MenuItem>
              <MenuItem value="Meconio3">Meconial +3/+4</MenuItem>
              <MenuItem value="Meconio4">Meconial +4/+4</MenuItem>
            </Select>
          </div>
          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            defaultValue={observation}
            id="textarea-amnioticFluid"
          />
          {gemelar === "2" ? (
            <button
              className="paciente-add-modal__button-submit"
              onClick={edit ? editSubmit : onSubmit}
            >
              {edit ? "Editar" : initGemelar ? "Parar" : "Iniciar"}
            </button>
          ) : (
            <button
              className="paciente-add-modal__button-submit"
              onClick={edit ? editSubmit : onSubmit}
            >
              {edit ? "Editar" : init ? "Parar" : "Iniciar"}
            </button>
          )}

          {firstElement && (
            <div className="partograma-page__container-historic">
              <div className="partograma-page__ball-container">
                <div
                  className="partograma-page__ball-historic"
                  style={{
                    backgroundColor:
                      firstElement.aspecto === "Claro"
                        ? "#2BB6D5"
                        : firstElement.aspecto === "Hemoamnio"
                        ? "#FF0000"
                        : firstElement.aspecto === "Meconio1" ||
                          "Meconio2" ||
                          "Meconio3" ||
                          "Meconio4"
                        ? "#2CDC52"
                        : "#fff",
                  }}
                ></div>
                <span>{`Aspecto ${firstElement.aspecto}`}</span>
              </div>
              <span>
                {firstElement?.initialTime} - {firstElement?.finalTime}
              </span>
            </div>
          )}

          {secondElement && (
            <div className="partograma-page__container-historic">
              <div className="partograma-page__ball-container">
                <div
                  className="partograma-page__ball-historic"
                  style={{
                    backgroundColor:
                      secondElement.aspecto === "Claro"
                        ? "#2BB6D5"
                        : secondElement.aspecto === "Hemoamnio"
                        ? "#FF0000"
                        : secondElement.aspecto === "Meconio1" ||
                          "Meconio2" ||
                          "Meconio3" ||
                          "Meconio4"
                        ? "#2CDC52"
                        : "#fff",
                  }}
                ></div>
                <span>{`Aspecto ${secondElement.aspecto}`}</span>
              </div>

              <span>
                {secondElement?.initialTime} - {secondElement?.finalTime}
              </span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TimelineAmnioticFluid;
