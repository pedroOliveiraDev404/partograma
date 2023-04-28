import { useState, SyntheticEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import { addFetalMonitoring } from "../../../../store/modules/fetalMonitoring/actions";
import PartogramaConfirmDelete from "../../PartogramaConfirmDelete";
import AbaPacient from "./AbaPacient";
import AbaBabyOne from "./AbaBabyOne";
import AbaBabyTwo from "./AbaBabyTwo";
import "../../../Pacientes/modais.css";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  edit?: any;
}

interface TabTitleProps {
  title: string;
}

function TabTitle({ title }: TabTitleProps) {
  return (
    <Typography className="partograma-modal__tab-title">{title}</Typography>
  );
}

const PartogramaMonitoringMenu = ({
  isModalOpen,
  handleCloseModal,
  edit,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const { fetalMonitoringData } = useSelector(
    (state: Store.State) => state.fetalMonitoring.data
  );
  const { typePregnancy } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [index, setIndex] = useState(0);
  const [frequencyOne, setFrequencyOne] = useState(0);
  const [frequencyTwo, setFrequencyTwo] = useState(0);
  const [frequencyMother, setFrequencyMother] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [pas, setPas] = useState(0);
  const [pad, setPad] = useState(0);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [placentaDateTime, setPlacentaDateTime] = useState<number | null>(
    Date.now()
  );
  const [time, setTime] = useState("");
  const [observationOne, setObservationOne] = useState("");
  const [observationTwo, setObservationTwo] = useState("");
  const [observationTree, setObservationTree] = useState("");
  const handlePlacentaDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setPlacentaDateTime(newValue.valueOf());
    }
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    if (edit === null) {
      setIndex(newValue);
    }
  };

  const updateHearts = async (array: any[]) => {
    let auxArray = [];
    if (
      array.find(
        (item: any) =>
          Number(item?.frequencyOne) > 210 ||
          Number(item?.frequencyTwo) > 210 ||
          Number(item?.frequencyMother) > 210
      )
    ) {
      const aux = await array.map((item: any) => {
        if (item.position === 29) {
          return {
            ...item,
            frequencyAboveOne: 215,
          };
        } else {
          return item;
        }
      });
      auxArray = aux;
      await dispatch(addFetalMonitoring(aux));
    }

    if (
      array.find(
        (item: any) =>
          Number(item?.frequencyOne) < 60 ||
          Number(item?.frequencyTwo) < 60 ||
          Number(item?.frequencyMother) < 60
      )
    ) {
      let aux = [];

      if (auxArray.length > 1) {
        aux = await auxArray.map((item: any) => {
          if (item.position === 29) {
            return {
              ...item,
              frequencyBelowOne: 55,
            };
          } else {
            return item;
          }
        });
      } else {
        aux = await array.map((item: any) => {
          if (item.position === 29) {
            return {
              ...item,
              frequencyBelowOne: 55,
            };
          } else {
            return item;
          }
        });
      }

      await dispatch(addFetalMonitoring(aux));
    }
  };

  const onSubmit = async () => {
    if (typePregnancy === "Múltipla") {
      if (index === 0) {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringMother"
        );
        const aux = await fetalMonitoringData.map((item: any) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              frequencyMother,
              observation: textArea?.value,
              saturation,
              pas,
              pad,
              index: 0,
            };
          } else {
            return item;
          }
        });
        await dispatch(addFetalMonitoring(aux));
        updateHearts(aux);
      } else if (index === 1) {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringOne"
        );
        const aux = await fetalMonitoringData.map((item: any) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              frequencyOne,
              observation: textArea?.value,
              index: 1,
            };
          } else {
            return item;
          }
        });

        await dispatch(addFetalMonitoring(aux));
        updateHearts(aux);
      } else {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringTwo"
        );
        const aux = await fetalMonitoringData.map((item: any) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              frequencyTwo,
              observation: textArea?.value,
              index: 2,
            };
          } else {
            return item;
          }
        });
        await dispatch(addFetalMonitoring(aux));
        updateHearts(aux);
      }
    } else {
      if (index) {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringOne"
        );
        const aux = await fetalMonitoringData.map((item: any) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              frequencyOne,
              observation: textArea?.value,
              index: 1,
            };
          } else {
            return item;
          }
        });

        await dispatch(addFetalMonitoring(aux));
        updateHearts(aux);
      } else {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringMother"
        );
        const aux = await fetalMonitoringData.map((item: any) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              frequencyMother,
              saturation,
              pas,
              pad,
              observation: textArea?.value,
            };
          } else {
            return item;
          }
        });
        await dispatch(addFetalMonitoring(aux));
        updateHearts(aux);
      }
    }

    handleCloseModal();
  };

  const editSubmit = async () => {
    if (typePregnancy === "Múltipla") {
      if (index === 0) {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringMother"
        );
        if (edit.timeLegend === time) {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === time) {
              return {
                ...item,
                frequencyMother,
                saturation,
                pas,
                pad,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        } else {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === edit.timeLegend) {
              return {
                ...item,
                frequencyMother: undefined,
                saturation: undefined,
                pas: undefined,
                pad: undefined,
                observation: undefined,
              };
            } else if (item.timeLegend === time) {
              return {
                ...item,
                frequencyMother,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        }
      } else if (index === 1) {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringTwo"
        );
        if (edit.timeLegend === time) {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === time) {
              return {
                ...item,
                frequencyTwo,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        } else {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === edit.timeLegend) {
              return {
                ...item,
                frequencyTwo: undefined,
                observation: "",
              };
            } else if (item.timeLegend === time) {
              return {
                ...item,
                frequencyTwo,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        }
      } else {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringTwo"
        );
        if (edit.timeLegend === time) {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === time) {
              return {
                ...item,
                frequencyTwo,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        } else {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === edit.timeLegend) {
              return {
                ...item,
                frequencyTwo: undefined,
                observation: "",
              };
            } else if (item.timeLegend === time) {
              return {
                ...item,
                frequencyTwo,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        }
      }
    } else {
      if (index) {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringOne"
        );
        if (edit.timeLegend === time) {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === time) {
              return {
                ...item,
                frequencyOne,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        } else {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === edit.timeLegend) {
              return {
                ...item,
                frequencyOne: undefined,
                observation: undefined,
              };
            } else if (item.timeLegend === time) {
              return {
                ...item,
                frequencyOne,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        }
      } else {
        const textArea: any = document.getElementById(
          "textarea-fetalMonitoringMother"
        );
        if (edit.timeLegend === time) {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === time) {
              return {
                ...item,
                frequencyMother,
                saturation,
                pas,
                pad,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        } else {
          const aux = await fetalMonitoringData.map((item: any) => {
            if (item.timeLegend === edit.timeLegend) {
              return {
                ...item,
                frequencyMother: undefined,
                saturation: undefined,
                pas: undefined,
                pad: undefined,
                observation: undefined,
              };
            } else if (item.timeLegend === time) {
              return {
                ...item,
                frequencyMother,
                saturation,
                pas,
                pad,
                observation: textArea?.value,
              };
            } else {
              return item;
            }
          });
          dispatch(addFetalMonitoring(aux));
        }
      }
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (edit) {
      setIndex(edit.index);
      setPlacentaDateTime(edit.time);
      setTime(edit.timeLegend);

      if (edit.index === 1) {
        setObservationOne(edit.observation);
        setFrequencyOne(edit.frequencyOne);
      } else if (edit.index === 2) {
        setObservationTwo(edit.observation);
        setFrequencyTwo(edit.frequencyTwo);
      } else {
        setObservationTree(edit.observation);
        setFrequencyMother(edit.frequencyMother);
        setSaturation(edit.saturation);
        setPad(edit.pad);
        setPas(edit.pas);
      }
    }
  }, [edit]);

  const onDelete = () => {
    const newDataChart = fetalMonitoringData.map((item: any, index: number) => {
      if (edit && item.position === edit?.position) {
        return {
          ...item,
          frequencyMother: undefined,
          frequencyOne: undefined,
          frequencyTwo: undefined,
          observation: undefined,
          saturation: undefined,
          pas: undefined,
          pad: undefined,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    dispatch(addFetalMonitoring(newDataChart));
    handleCloseModal();
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">
          Monitoramento Cardíaco
        </span>
        {typePregnancy === "Múltipla" ? (
          <Tabs
            aria-label="partograma tabs"
            style={{
              marginBottom: "16px",
            }}
            value={index}
            onChange={handleTabChange}
          >
            <Tab
              label={<TabTitle title="Paciente" />}
              id="tab-one"
              style={{ cursor: edit ? "not-allowed" : "pointer" }}
            />
            <Tab
              label={<TabTitle title="1° Gemelar" />}
              id="tab-two"
              style={{ cursor: edit ? "not-allowed" : "pointer" }}
            />
            <Tab
              label={<TabTitle title="2° Gemelar" />}
              id="tab-tree"
              style={{ cursor: edit ? "not-allowed" : "pointer" }}
            />
          </Tabs>
        ) : (
          <Tabs
            aria-label="partograma tabs"
            style={{
              marginBottom: "16px",
            }}
            value={index}
            onChange={handleTabChange}
          >
            <Tab
              label={<TabTitle title="Paciente" />}
              id="tab-one"
              style={{ cursor: edit ? "not-allowed" : "pointer" }}
            />
            <Tab
              label={<TabTitle title="Bebê" />}
              id="tab-two"
              style={{ cursor: edit ? "not-allowed" : "pointer" }}
            />
          </Tabs>
        )}
        <AbaBabyOne
          handleCloseModal={handleCloseModal}
          placentaDateTime={placentaDateTime}
          handlePlacentaDateTimeChange={handlePlacentaDateTimeChange}
          index={index}
          edit={edit}
          editSubmit={editSubmit}
          onSubmit={onSubmit}
          onDelete={onDelete}
          frequencyOne={frequencyOne}
          setFrequencyOne={setFrequencyOne}
          observationOne={observationOne}
        />
        <AbaBabyTwo
          handleCloseModal={handleCloseModal}
          placentaDateTime={placentaDateTime}
          handlePlacentaDateTimeChange={handlePlacentaDateTimeChange}
          index={index}
          edit={edit}
          editSubmit={editSubmit}
          onSubmit={onSubmit}
          onDelete={onDelete}
          frequencyTwo={frequencyTwo}
          setFrequencyTwo={setFrequencyTwo}
          observationTwo={observationTwo}
        />
        <AbaPacient
          handleCloseModal={handleCloseModal}
          placentaDateTime={placentaDateTime}
          handlePlacentaDateTimeChange={handlePlacentaDateTimeChange}
          setFrequencyMother={setFrequencyMother}
          frequencyMother={frequencyMother}
          observationTree={observationTree}
          index={index}
          edit={edit}
          editSubmit={editSubmit}
          onSubmit={onSubmit}
          onDelete={onDelete}
          saturation={saturation}
          setSaturation={setSaturation}
          pas={pas}
          setPas={setPas}
          pad={pad}
          setPad={setPad}
        />
        <PartogramaConfirmDelete
          isModalOpen={isModalDeleteOpen}
          handleCloseModal={() => setIsModalDeleteOpen(false)}
          handleSubmit={onDelete}
        />
      </div>
    </Modal>
  );
};

export default PartogramaMonitoringMenu;
