import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { ReactComponent as IconeClose } from "../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../assets/IconeTimelinePlusSign.svg";
import { formatDatetimeAxis } from "../../../utils/formatting";

import "./TimelineLiquidoAmniotico.css";
import {
  addCompany,
  initCompany,
  stopCompany,
} from "../../../store/modules/company/actions";
import TimelineCompanyChart from "./TimelineCompanyChart";

const TimelineCompany = () => {
  const dispatch = useDispatch();

  const { companyData, init, positionInit } = useSelector(
    (state: Store.State) => state.company.data
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [time, setTime] = useState("");
  const [timeUnix, setTimeUnix] = useState(0);
  const [timeUnixSecond, setTimeUnixSecond] = useState(0);
  const [firstElement, setFirstElement] = useState<any>(null);
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
      setTimeUnixSecond(new Date(newValue).getTime() / 1000);
      setCompanyDateTimeSecond(newValue.valueOf());
    }
  };

  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (companyData) {
      let aux = companyData;

      const dataReverse = aux.reduceRight(function (
        previous: any,
        current: any
      ) {
        previous.push(current);
        return previous;
      },
      []);
      const find: any = dataReverse.find((item: any) => item?.point);
      if (find?.point && (find.observation !== observation || !init)) {
        setLastInput(find.observation);
      }
    }
  }, [companyData, observation]);

  const onSubmit = async () => {
    const textArea: any = document.getElementById("textarea-company");
    if (init) {
      dispatch(stopCompany());
      const aux = await companyData?.map((item: any) => {
        const itemTime = new Date(item.time).getTime() / 1000;
        if (itemTime < timeUnix && item.position > positionInit) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
          };
        } else {
          return item;
        }
      });
      setObservation("");
      dispatch(addCompany(aux));
    } else {
      const find: any = companyData.find(
        (item: any) => item?.timeLegend === time
      );
      const aux = await companyData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea?.value,
          };
        } else {
          return item;
        }
      });
      dispatch(addCompany(aux));
      setObservation(textArea?.value);
      dispatch(initCompany({ positionInit: find.position, init: true }));
    }

    handleCloseModal();
  };

  const goToEdit = (e: any) => {
    const findLastItem = companyData.find(
      (item: any) => item.position > e.position && item.point !== 0.5
    );
    const dataReverse = companyData.reduceRight(function (
      previous: any,
      current: any
    ) {
      previous.push(current);
      return previous;
    },
    []);
    const findFirstItem = dataReverse.find(
      (item: any) => item?.position < e?.position && item?.point !== 0.5
    );
    setEdit({
      ...findFirstItem,
      firstTime: new Date(findFirstItem.time).getTime() / 1000,
      secondTime: new Date(findLastItem.time).getTime() / 1000,
    });
    setCompanyDateTime(findFirstItem.time);
    setCompanyDateTimeSecond(findLastItem.time);
    setObservation(findFirstItem.observation);
    handleOpenModal();
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById("textarea-compnay");

    const clean = await companyData?.map((item: any) => {
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
        };
      } else {
        return item;
      }
    });
    dispatch(addCompany(aux));

    setEdit(null);
    setObservation("");
    handleCloseModal();
  };

  useEffect(() => {
    if (companyData) {
      let aux = companyData;

      const dataReverse = aux.reduceRight(function (
        previous: any,
        current: any
      ) {
        previous.push(current);
        return previous;
      },
      []);

      const find: any = dataReverse.find((item: any) => item?.point);
      const interval: any[] = [];
      let auxInterval = 0;
      if (find) {
        dataReverse.forEach((item: any) => {
          if (
            find?.point === item?.point &&
            (auxInterval === 0 || auxInterval === 1)
          ) {
            auxInterval = 1;
            interval.push(item);
          } else if (auxInterval === 1) {
            auxInterval = 2;
          }
        });
      }

      if (init) {
        const findSecond = dataReverse.find(
          (item: any) =>
            item?.position < interval[interval.length - 1]?.position &&
            item?.point !== undefined
        );
        const intervalSecond: any[] = [];
        let auxIntervalSecond = 0;
        if (findSecond) {
          dataReverse.forEach((item: any) => {
            if (
              findSecond?.point === item?.point &&
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
        if (findSecond?.point) {
          setFirstElement({
            ...findSecond,
            finalTime: intervalSecond[0]?.timeLegend,
            initialTime: intervalSecond[intervalSecond.length - 1]?.timeLegend,
          });
        }
      } else {
        if (find?.point) {
          setFirstElement({
            ...find,
            finalTime: interval[0]?.timeLegend,
            initialTime: interval[interval.length - 1]?.timeLegend,
          });
        }
      }
    }
  }, [init, companyData]);

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
        <span className="timeline-liquido-amniotico__label">Companhia</span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelineCompanyChart onEdit={goToEdit} />
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
            Companhia
          </span>
          <div>
            <DateTimePicker
              value={companyDateTime}
              onChange={handleCompanyDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="timeline-liquido-amniotico__datetime-input"
            />
          </div>
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
          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            defaultValue={observation}
            id="textarea-company"
          />
          <button
            className="paciente-add-modal__button-submit"
            onClick={edit ? editSubmit : onSubmit}
          >
            {edit ? "Editar" : init ? "Parar" : "Iniciar"}
          </button>
          <ul style={{ width: "100%" }}>
            <li style={{ width: "100%" }}>
              {firstElement && (
                <div
                  className="partograma-page__container-historic"
                  style={{ width: "100%" }}
                >
                  <span>{firstElement.observation}</span>

                  <span>
                    {firstElement?.initialTime} - {firstElement?.finalTime}
                  </span>
                </div>
              )}
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default TimelineCompany;
