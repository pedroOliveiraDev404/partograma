import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PartogramaBloodType from "./PartogramaBloodType";
import PartogramaCarePlan from "./PartogramaCarePlan";
import PartogramaGestacionalAge from "./PartogramaGestacionalAge";
import PartogramaObstetricHistory from "./PartogramaObstetricHistory";
import PartogramaRupture from "./PartogramaRupture";
import PartogramaStatusGbs from "./PartogramaStatusGbs";
import PartogramaTypeOfPregnancy from "./PartogramaTypeOfPregnancy";
import PartogramaTypeOfDelivery from "./PartogramaTypeOfDelivery";
import PartogramaDeliveryTime from "./PartogramaDeliveryTime";
import PartogramaPlacentaTime from "./PartogramaPlacentaTime";
import PartogramaApgarsOne from "./PartogramaApgarsOne";

import { ReactComponent as IconePlus } from "../../assets/IconePlus.svg";
import { ReactComponent as IconeUnplus } from "../../assets/IconeUnplus.svg";
import PartogramaCustomizable from "./PartogramaCustomizable";
import PartogramaBirth from "./PartogramaBirth";
import { toggleMenuHistoric } from "../../store/modules/partogramaChart/actions";
import PartogramaFinishModal from "./PartogramaFinishModal";
import { addCustomizableTitle } from "../../store/modules/header/actions";

interface Props {
  paciente: any;
}

const PartogramaUpperBar = ({ paciente }: Props) => {
  const dispatch = useDispatch();

  const { typePregnancy, openMenuHistoric } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [birthday, setBirthday] = useState(paciente.birth);
  const [errorBirthday, setErrorBirthday] = useState(false);
  const [age, setAge] = useState(paciente.idade.slice(0, 2));
  const [gestacionalAgeOpen, setGestacionalAge] = useState(false);
  const [apgarsOne, setApgarsOne] = useState(false);
  const [obstetricHistory, setObstetricHistory] = useState(false);
  const [typeOfPregnancy, setTypeOfPregnancy] = useState(false);
  const [typeOfDelivery, setTypeOfDelivery] = useState(false);
  const [placentaTime, setplacentaTime] = useState(false);
  const [carePlan, setCarePlan] = useState(false);
  const [statusGbs, setStatusGbs] = useState(false);
  const [rupture, setRupture] = useState(false);
  const [bloodType, setBloodType] = useState(false);
  const [timeOfChildbirth, setTimeOfChildbirth] = useState(false);
  const [plusButtons, setPlusButtons] = useState(false);
  const [birthOpen, setBirthOpen] = useState(false);
  const [onOpenFinish, setOnOpenFinish] = useState(false);
  const [obsTypeOfPregnancy, setObsTypeOfPregnancy] = useState("");

  const [customizableOne, setCustomizableOne] = useState(false);
  const [customizableTwo, setCustomizableTwo] = useState(false);
  const [customizableThree, setCustomizableThree] = useState(false);

  const [customizableOneTitle, setCustomizableOneTitle] = useState(
    "Título Customizável"
  );
  const [customizableTwoTitle, setCustomizableTwoTitle] = useState(
    "Título Customizável"
  );
  const [customizableThreeTitle, setCustomizableThreeTitle] = useState(
    "Título Customizável"
  );

  const onChangeBirthday = () => {
    if (birthday.length === 10) {
      setAge(calcularIdade(birthday));
      setErrorBirthday(false);
    } else {
      setErrorBirthday(true);
    }
  };

  const styleDisabled = {
    color: "#a9a9a9",
    borderColor: "#a9a9a9",
    cursor: "not-allowed",
  };

  function calcularIdade(aniversario: string) {
    var nascimento = aniversario.split("/");
    var dataNascimento = new Date(
      parseInt(nascimento[2], 10),
      parseInt(nascimento[1], 10) - 1,
      parseInt(nascimento[0], 10)
    );

    var diferenca = Date.now() - dataNascimento.getTime();
    var idade = new Date(diferenca);

    return Math.abs(idade.getUTCFullYear() - 1970);
  }

  useEffect(() => {
    if (openMenuHistoric) {
      setObstetricHistory(true);
      dispatch(toggleMenuHistoric());
    }
  }, [openMenuHistoric, dispatch]);

  return (
    <div className="partograma-page__upper-bar">
      <div className="partograma-page__pacient-data">
        <div className="partograma-page__pacient-data-item">
          <span className="partograma-page__pacient-data-span">
            Parturiente
          </span>
          <strong className="partograma-page__pacient-data-strong">
            <input
              className="partograma-page__input-pacient-data"
              defaultValue={paciente.name}
            />
          </strong>
        </div>
        <div className="partograma-page__pacient-data-item">
          <span className="partograma-page__pacient-data-span">
            Data de Nascimento
          </span>

          <input
            className="partograma-page__input-pacient-data"
            onMouseOut={(e: any) => onChangeBirthday()}
            onChange={(e: any) => setBirthday(e.target.value)}
            value={birthday}
            style={{ border: errorBirthday ? "1px solid red" : "0px solid" }}
          />
        </div>
        <div className="partograma-page__pacient-data-item">
          <span className="partograma-page__pacient-data-span">Idade</span>
          <strong className="partograma-page__pacient-data-strong">
            {age && age} anos
          </strong>
        </div>
        <div className="partograma-page__pacient-data-item">
          <span className="partograma-page__pacient-data-span">CPF</span>

          <strong className="partograma-page__pacient-data-strong">
            xxx.xxx.xxx-xx
          </strong>
        </div>
      </div>
      <div className="partograma-page__pacient-data-line"></div>
      <div className="partograma-page__pacient-data-grid">
        <div
          className="partograma-page__pacient-data-button"
          onClick={() => setGestacionalAge(true)}
        >
          Idade Gestacional
        </div>
        <div
          className="partograma-page__pacient-data-button"
          onClick={() => setObstetricHistory(true)}
        >
          Histórico Obstétrico
        </div>
        <div
          className="partograma-page__pacient-data-button"
          style={{}}
          onClick={() => setCarePlan(true)}
        >
          Plano de Cuidado
        </div>

        <div
          className="partograma-page__pacient-data-button"
          onClick={() => setBloodType(true)}
        >
          Tipo Sanguíneo
        </div>
      </div>
      <div className="partograma-page__pacient-data-grid">
        <div
          className="partograma-page__pacient-data-button"
          onClick={() => setStatusGbs(true)}
        >
          Status GBS
        </div>
        <div
          className="partograma-page__pacient-data-button"
          onClick={() => {
            setTypeOfPregnancy(true);
            setTimeout(() => {
              document.getElementById("radio-two-babys")?.click();
            }, 300);
          }}
        >
          Tipo de gravidez
        </div>
        <div
          className="partograma-page__pacient-data-button"
          onClick={() => setRupture(true)}
          style={typePregnancy ? {} : styleDisabled}
        >
          Ruptura da Bolsa
        </div>
        <div
          className="partograma-page__pacient-data-button"
          onClick={() => setTypeOfDelivery(true)}
          style={typePregnancy ? {} : styleDisabled}
        >
          Indicação de Parto
        </div>
      </div>
      {!plusButtons && (
        <div 
          className="partograma-page__icon-plus" 
          onClick={() => setPlusButtons(true)}
        >
          <IconePlus className="partograma-page__icon-plus-svg"/>
        </div>
      )}

      {plusButtons && (
        <>
          <div className="partograma-page__pacient-data-grid">
            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setBirthOpen(true)}
              style={typePregnancy ? {} : styleDisabled}
            >
              Início do Trabalho de Parto
            </div>
            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setTimeOfChildbirth(true)}
              style={typePregnancy ? {} : styleDisabled}
            >
              Nascimento
            </div>

            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setApgarsOne(true)}
              style={typePregnancy ? {} : styleDisabled}
            >
              Apgar
            </div>
            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setplacentaTime(true)}
              style={typePregnancy ? {} : styleDisabled}
            >
              Data e Hora Placenta
            </div>
          </div>
          <div className="partograma-page__pacient-data-grid">
            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setCustomizableOne(true)}
            >
              {customizableOneTitle}
            </div>
            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setCustomizableTwo(true)}
            >
              {customizableTwoTitle}
            </div>
            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setCustomizableThree(true)}
            >
              {customizableThreeTitle}
            </div>
            <div
              className="partograma-page__pacient-data-button"
              onClick={() => setCustomizableOne(true)}
            >
              {customizableOneTitle}
            </div>
          </div>
          <div 
            className="partograma-page__icon-plus" 
            onClick={() => setPlusButtons(false)}
          >
            <IconeUnplus className="partograma-page__icon-plus-svg"/>
          </div>
        </>
      )}

      <PartogramaGestacionalAge
        isModalOpen={gestacionalAgeOpen}
        handleCloseModal={() => setGestacionalAge(false)}
      />
      <PartogramaObstetricHistory
        isModalOpen={obstetricHistory}
        handleCloseModal={() => setObstetricHistory(false)}
      />
      <PartogramaTypeOfPregnancy
        isModalOpen={typeOfPregnancy}
        handleCloseModal={() => setTypeOfPregnancy(false)}
        setNumberOfBabys={(babys, observation) => {
          if (babys === "3 ou mais") {
            setObsTypeOfPregnancy(observation);
            setOnOpenFinish(true);
          }
        }}
      />
      <PartogramaFinishModal
        handleCloseModal={() => setOnOpenFinish(false)}
        isModalOpen={onOpenFinish}
        observation={obsTypeOfPregnancy}
        cause="Evoluiu para um parto cesáreo"
      />
      <PartogramaCarePlan
        isModalOpen={carePlan}
        handleCloseModal={() => setCarePlan(false)}
      />
      <PartogramaStatusGbs
        isModalOpen={statusGbs}
        handleCloseModal={() => setStatusGbs(false)}
      />

      <PartogramaRupture
        isModalOpen={rupture}
        handleCloseModal={() => {
          setRupture(false);
        }}
      />

      <PartogramaBirth
        isModalOpen={birthOpen}
        handleCloseModal={() => setBirthOpen(false)}
      />
      <PartogramaBloodType
        isModalOpen={bloodType}
        handleCloseModal={() => setBloodType(false)}
      />
      <PartogramaDeliveryTime
        isModalOpen={timeOfChildbirth}
        handleCloseModal={() => setTimeOfChildbirth(false)}
        typePregnancy={typePregnancy}
      />
      <PartogramaPlacentaTime
        isModalOpen={placentaTime}
        handleCloseModal={() => setplacentaTime(false)}
      />
      <PartogramaTypeOfDelivery
        isModalOpen={typeOfDelivery}
        handleCloseModal={() => setTypeOfDelivery(false)}
      />
      <PartogramaApgarsOne
        isModalOpen={apgarsOne}
        handleCloseModal={() => setApgarsOne(false)}
      />
      <PartogramaCustomizable
        isModalOpen={customizableOne}
        handleCloseModal={() => {
          setCustomizableOne(false);
        }}
        onFinish={(value) =>
          dispatch(
            addCustomizableTitle({
              title: customizableOneTitle,
              observation: value,
              index: 0,
            })
          )
        }
        setTitle={setCustomizableOneTitle}
        title={customizableOneTitle}
      />
      <PartogramaCustomizable
        isModalOpen={customizableTwo}
        handleCloseModal={() => setCustomizableTwo(false)}
        onFinish={(value) =>
          dispatch(
            addCustomizableTitle({
              title: customizableTwoTitle,
              observation: value,
              index: 1,
            })
          )
        }
        setTitle={setCustomizableTwoTitle}
        title={customizableTwoTitle}
      />
      <PartogramaCustomizable
        isModalOpen={customizableThree}
        handleCloseModal={() => setCustomizableThree(false)}
        setTitle={setCustomizableThreeTitle}
        title={customizableThreeTitle}
        onFinish={(value) =>
          dispatch(
            addCustomizableTitle({
              title: customizableThreeTitle,
              observation: value,
              index: 2,
            })
          )
        }
      />
    </div>
  );
};

export default PartogramaUpperBar;
