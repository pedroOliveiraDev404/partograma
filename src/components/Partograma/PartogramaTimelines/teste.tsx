import { useState, useEffect } from "react";
import { Modal, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import { ReactComponent as IconeClose } from "../../../assets/IconeClose.svg";

import { ReactComponent as IconeTimelinePlusSign } from "../../../assets/IconeTimelinePlusSign.svg";

import TimelineChartNonPharmacological from "./testee";
import { data01 } from "../../../pages/Pacientes/mock";
import "./TimelineLiquidoAmniotico.css";
import { reverseFunction } from "../../../utils/formatting";

const TimelineNaoFarmacologico = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [init, setInit] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const [chartData, setChartData] = useState(data01);
  const [firstElement, setFirstElement] = useState<any>(null);
  const [secondElement, setSecondElement] = useState<any>(null);
  const [firstTime, setFirstTime] = useState("");
  const [secondTime, setSecondTime] = useState("");
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => {
    historic();
    setIsModalOpen(true);
  };

  const [liquidoAmnioticoDateTime, setLiquidoAmnioticoDateTime] = useState<
    number | null
  >(Date.now());

  const [liquidoAmnioticoDateTimeSecond, setLiquidoAmnioticoDateTimeSecond] =
    useState<number | null>(Date.now());

  const handleLiquidoAmnioticoDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setLiquidoAmnioticoDateTime(newValue.valueOf());
    }
  };

  const handleLiquidoAmnioticoDateTimeChangeSecond = (
    newValue: Dayjs | null
  ) => {
    if (newValue !== null) {
      setLiquidoAmnioticoDateTimeSecond(newValue.valueOf());
    }
  };

  const onEdit = () => {
    const hourInitial = new Date().getHours();
    const minuteInitial = new Date().getMinutes();
    const hourReference = new Date(
      liquidoAmnioticoDateTime as number
    ).getHours();
    const minuteReference = new Date(
      liquidoAmnioticoDateTime as number
    ).getMinutes();
    const hoursFirst = hourReference - hourInitial;
    const minutesFirst = minuteReference - minuteInitial;
    const minutesTotalInitial = hoursFirst * 60 + minutesFirst;
    const hourReferenceSecond = new Date(
      liquidoAmnioticoDateTimeSecond as number
    ).getHours();
    const minuteReferenceSecond = new Date(
      liquidoAmnioticoDateTimeSecond as number
    ).getMinutes();
    const hoursSecond = hourReferenceSecond - hourInitial;
    const minutesSecond = minuteReferenceSecond - minuteInitial;
    const minutesTotalSecond = hoursSecond * 60 + minutesSecond;
    const newDataChart = chartData.map((item, index) => {
      if (index - 16 > minutesTotalInitial && index - 16 < minutesTotalSecond) {
        return {
          ...item,
          index: 1,
          value: 120,
          initialInterval: `${hourReference}:${
            String(minuteReference).length === 2
              ? minuteReference
              : `0${minuteReference}`
          }`,
          finalInterval: `${hourReferenceSecond}:${
            String(minuteReferenceSecond).length === 2
              ? minuteReferenceSecond
              : `0${minuteReferenceSecond}`
          }`,
          timeFinal: new Date(liquidoAmnioticoDateTimeSecond as number),
          timeInitial: new Date(liquidoAmnioticoDateTime as number),
          aspecto,
          position: index,
        };
      }
      if (index - 14 > minutesTotalSecond) {
        return {
          ...item,
          index: 0,
          value: 0,
          initialInterval: undefined,
          finalInterval: undefined,
          timeFinal: undefined,
          timeInitial: undefined,
          aspecto: undefined,
          position: index,
        };
      } else {
        return { ...item, position: index };
      }
    });
    setEdit(null);
    setChartData(newDataChart);

    handleCloseModal();
  };

  const onSubmit = () => {
    const hourInitial = new Date().getHours();
    const minuteInitial = new Date().getMinutes();
    const hourReference = new Date(
      liquidoAmnioticoDateTime as number
    ).getHours();
    const minuteReference = new Date(
      liquidoAmnioticoDateTime as number
    ).getMinutes();
    const hours = hourReference - hourInitial;
    const minutes = minuteReference - minuteInitial;
    const minutesTotal = hours * 60 + minutes;

    const find: any = chartData.find((e: any) => e?.aspecto);
    const interval: any[] = chartData.filter(
      (item: any) => item?.aspecto === find?.aspecto
    );
    const newDataChart = chartData.map((item, index) => {
      if (index - 16 < minutesTotal && item.index === 0) {
        const minutesInitial = String(
          new Date(
            interval[interval.length - 1].timeFinal || new Date()
          ).getMinutes()
        );
        return {
          ...item,
          index: 1,
          value: 120,
          initialInterval: `${new Date(
            interval[interval.length - 1].timeFinal || new Date()
          ).getHours()}:${
            minutesInitial.length === 1 ? `0${minutesInitial}` : minutesInitial
          }`,
          finalInterval: `${hourReference}:${
            String(minuteReference).length === 2
              ? minuteReference
              : `0${minuteReference}`
          }`,
          timeFinal: new Date(liquidoAmnioticoDateTime as number),
          timeInitial: interval[interval.length - 1].timeFinal || new Date(),
          aspecto,
          position: index,
        };
      } else {
        return { ...item, position: index };
      }
    });
    setChartData(newDataChart);

    handleCloseModal();
  };

  const historic = () => {
    const aux = chartData;
    const dataReverse = reverseFunction(aux);
    const find: any = dataReverse.find((item: any) => item?.aspecto);
    const findSecond = dataReverse.find(
      (item: any) =>
        item?.aspecto !== find?.aspecto && item?.aspecto !== undefined
    );
    reverseFunction(dataReverse);
    if (find?.aspecto) {
      setFirstElement(find);
    }
    if (findSecond?.aspecto) {
      setSecondElement(findSecond);
    }
  };

  const [aspecto, setAspecto] = useState<string>("Claro");
  const handleAspectoChange = (event: SelectChangeEvent<string>) => {
    setAspecto(String(event.target.value));
  };

  useEffect(() => {
    const aux = chartData.find((item) => item.value === 120);
    if (aux) setInit(true);
  }, [chartData]);

  useEffect(() => {
    if (firstElement) {
      const hours = new Date(
        Date.now() + 1000 * 60 * (firstElement.position - 16)
      ).getHours();

      const minutes: any = new Date(
        Date.now() + 1000 * 60 * (firstElement.position - 16)
      ).getMinutes();
      setFirstTime(
        `${hours}:${String(minutes).length === 1 ? `0${minutes}` : minutes}`
      );
    }
  }, [firstElement]);

  useEffect(() => {
    if (secondElement) {
      const hours = new Date(
        Date.now() + 1000 * 60 * (secondElement.position - 16)
      ).getHours();

      const minutes: any = new Date(
        Date.now() + 1000 * 60 * (secondElement.position - 16)
      ).getMinutes();

      setSecondTime(
        `${hours}:${String(minutes).length === 1 ? `0${minutes}` : minutes}`
      );
    }
  }, [secondElement]);

  useEffect(() => {
    const upatedInterval = setInterval(() => {
      const chartDataOrdened = chartData.map((item: any, index) => {
        return { ...item, position: index };
      });
      setChartData([]);
      const find: any = chartDataOrdened.find(
        (e: any, index) => e?.value === 0 && index > 10
      );
      setChartData(
        chartDataOrdened.map((item: any, index) => {
          if (item.position === find.position) {
            const minutesInitial = String(new Date().getMinutes());
            return {
              ...item,
              index: 1,
              value: 120,
              initialInterval: `${new Date().getHours()}:${
                minutesInitial.length === 1
                  ? `0${minutesInitial}`
                  : minutesInitial
              }`,
              timeInitial: new Date(),
              aspecto,
              position: index,
            };
          } else {
            return { ...item, position: index };
          }
        })
      );
    }, 60000);

    return () => {
      clearInterval(upatedInterval);
    };
    // eslint-disable-next-line
  }, [chartData]);

  return (
    <div className="timeline-liquido-amniotico__container">
      <div
        className="timeline-liquido-amniotico__label-container"
        style={{ marginTop: "-28px", cursor: "pointer" }}
        onClick={() => {
          setEdit(null);
          handleOpenModal();
        }}
      >
        <span className="timeline-liquido-amniotico__label">
          Líquido Amniótico
        </span>
        <IconeTimelinePlusSign
          style={{ cursor: "pointer" }}
          onClick={handleOpenModal}
        />
      </div>
      <TimelineChartNonPharmacological
        chartData={chartData}
        onEdit={(e) => {
          setLiquidoAmnioticoDateTime(e?.timeInitial as any);
          setLiquidoAmnioticoDateTimeSecond(e?.timeFinal as any);
          setEdit(e);
          handleOpenModal();
        }}
      />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="timeline-liquido-amniotico__modal-container">
          <IconeClose
            className="paciente-add-modal__icone-close"
            onClick={handleCloseModal}
          />
          <span className="timeline-liquido-amniotico__modal-title">
            Líquido Amniótico
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {edit && <span>Inicio intervalo</span>}
            <DateTimePicker
              value={liquidoAmnioticoDateTime}
              onChange={handleLiquidoAmnioticoDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="timeline-liquido-amniotico__datetime-input"
            />
          </div>
          {edit && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Fim intervalo</span>
              <DateTimePicker
                value={liquidoAmnioticoDateTimeSecond}
                onChange={handleLiquidoAmnioticoDateTimeChangeSecond}
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
          <div
            className="timeline-liquido-amniotico__buttons-container"
            onClick={() => setInit(false)}
          >
            {init && (
              <button className="timeline-liquido-amniotico__stop-button">
                Parar
              </button>
            )}

            <button
              onClick={edit ? onEdit : onSubmit}
              className="timeline-liquido-amniotico__start-button"
              style={{ width: !init ? "100%" : undefined }}
            >
              {edit ? "Atualizar" : init ? "Salvar" : "Iniciar"}
            </button>
          </div>
          {firstElement && (
            <div className="partograma-page__container-historic">
              <span className="tab-dilatacao__notes-input-label">Líquido</span>
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
              <span>{firstTime}</span>
            </div>
          )}
          {secondElement && (
            <div className="partograma-page__container-historic">
              <span
                className="tab-dilatacao__notes-input-label"
                style={{ marginBottom: "8px" }}
              >
                Líquido
              </span>
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

              <span>{secondTime}</span>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TimelineNaoFarmacologico;
