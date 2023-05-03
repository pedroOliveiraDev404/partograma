import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as IconeSidebarBack } from "../../assets/IconeSidebarBack.svg";
import { ReactComponent as IconeSidebarNascimento } from "../../assets/IconeSidebarNascimento.svg";
import { ReactComponent as IconeSidebarAtualizar } from "../../assets/IconeSidebarAtualizar.svg";
import { ReactComponent as IconeSidebarFinalizar } from "../../assets/IconeSidebarFinalizar.svg";
import { ReactComponent as IconeSidebarRuptura } from "../../assets/IconeSidebarRuptura.svg";
import { ReactComponent as IconeSidebarGrafico } from "../../assets/IconeSidebarGrafico.svg";
import { ReactComponent as IconeGraficoDilatacao } from "../../assets/IconeGraficoDilatacao.svg";
import { ReactComponent as IconeGraficoRotacao } from "../../assets/IconeGraficoRotacao.svg";
import { ReactComponent as IconeSidebarAmostra } from "../../assets/IconeSidebarAmostra.svg";
import { ReactComponent as IconeSidebarDequitacao } from "../../assets/IconeSidebarDequitacao.svg";

import "./PartogramaSidebar.css";
import PartogramaDequitacaoModal from "./PartogramaDequitacaoModal";
import {
  selectTab,
  toggleLines,
  toggleMenuHistoric,
} from "../../store/modules/partogramaChart/actions";
import PartogramaFinishModal from "./PartogramaFinishModal";
import PartogramaDeliveryTime from "./PartogramaDeliveryTime";

interface PartogramaSidebarProps {
  handleOpenModal: () => void;
}

const PartogramaSidebar = ({ handleOpenModal }: PartogramaSidebarProps) => {
  const history = useNavigate();
  const params: any = useParams();
  const dispatch = useDispatch();
  const {
    typePregnancy,
    earlyDelivery,
    numberOfDeliveries,
    editDilatation,
    editPosition,
  } = useSelector((state: Store.State) => state.partogramaChart.data);
  const [onOpenDequitacao, setOnOpenDequitacao] = useState(false);
  const [onOpenFinish, setOnOpenFinish] = useState(false);
  const [timeOfChildbirth, setTimeOfChildbirth] = useState(false);

  const openModal = () => {
    handleOpenModal();
  };

  useEffect(() => {
    if (editDilatation) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editDilatation]);

  useEffect(() => {
    if (editPosition) {
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editPosition]);

  return (
    <div className="partograma-sidebar__container">
      <div className="partograma-sidebar__home-button" onClick={() => history(`/pdf/${Number(params.idPaciente)}`)}>
        <Paper className="partograma-sidebar__paper">P</Paper>
      </div>

      <hr className="partograma-sidebar__hr-home" />

      <div className="partograma-sidebar__actions">
        <div
          className="partograma-sidebar__button"
          onClick={() => history("/")}
        >
          <Paper className="partograma-sidebar__paper">
            <IconeSidebarBack />
            <span className="partograma-sidebar__button-label">
              Voltar ao sistema
            </span>
          </Paper>
        </div>

        <div
          className="partograma-sidebar__button"
          onClick={() => setTimeOfChildbirth(true)}
        >
          <Paper className="partograma-sidebar__paper">
            <IconeSidebarNascimento />
            <span className="partograma-sidebar__button-label">
              Nascimento do bebê
            </span>
          </Paper>
        </div>

        <div className="partograma-sidebar__button">
          <Paper className="partograma-sidebar__paper">
            <IconeSidebarAtualizar />
            <span className="partograma-sidebar__button-label">
              Atualizar o sistema
            </span>
          </Paper>
        </div>

        <div
          className="partograma-sidebar__button"
          onClick={() => setOnOpenFinish(true)}
        >
          <Paper className="partograma-sidebar__paper">
            <IconeSidebarFinalizar />
            <span className="partograma-sidebar__button-label">
              Finalizar Partograma
            </span>
          </Paper>
        </div>
      </div>

      <hr className="partograma-sidebar__hr-actions" />

      <div className="partograma-sidebar__variables">
        <div
          className="partograma-sidebar__button"
          onClick={() => {
            dispatch(selectTab(0));
            openModal();
          }}
        >
          <Paper className="partograma-sidebar__paper">
            <IconeSidebarRuptura />

            <span className="partograma-sidebar__button-label">
              Ruptura da bolsa
            </span>
          </Paper>
        </div>
        {typePregnancy !== "Múltipla" && earlyDelivery && (
          <div
            className="partograma-sidebar__button"
            onClick={() =>
              numberOfDeliveries !== null
                ? dispatch(toggleLines())
                : dispatch(toggleMenuHistoric())
            }
          >
            <Paper className="partograma-sidebar__paper">
              <IconeSidebarGrafico />
              <span className="partograma-sidebar__button-label">
                Gráfico - Oladapo OT, 2018
              </span>
            </Paper>
          </div>
        )}

        <div
          className="partograma-sidebar__button"
          onClick={() => {
            dispatch(selectTab(1));
            openModal();
          }}
        >
          <Paper className="partograma-sidebar__paper">
            <IconeGraficoDilatacao />
            <span className="partograma-sidebar__button-label">
              Cervicodilatação
            </span>
          </Paper>
        </div>

        <div
          className="partograma-sidebar__button"
          onClick={() => {
            dispatch(selectTab(2));
            openModal();
          }}
        >
          <Paper className="partograma-sidebar__paper">
            <IconeGraficoRotacao />
            <span className="partograma-sidebar__button-label">Rotação</span>
          </Paper>
        </div>
        {typePregnancy && (
          <div
            className="partograma-sidebar__button"
            onClick={() => {
              dispatch(selectTab(3));
              openModal();
            }}
          >
            <Paper className="partograma-sidebar__paper">
              <IconeSidebarAmostra />

              <span className="partograma-sidebar__button-label">
                Amostra do sangue fetal
              </span>
            </Paper>
          </div>
        )}

        {typePregnancy && (
          <div
            className="partograma-sidebar__button"
            onClick={() => setOnOpenDequitacao(true)}
          >
            <Paper className="partograma-sidebar__paper">
              <IconeSidebarDequitacao />

              <span className="partograma-sidebar__button-label">
                Dequitação
              </span>
            </Paper>
          </div>
        )}
      </div>
      <hr className="partograma-sidebar__hr-actions" />
      <PartogramaDequitacaoModal
        handleCloseModal={() => setOnOpenDequitacao(false)}
        isModalOpen={onOpenDequitacao}
      />

      <PartogramaFinishModal
        handleCloseModal={() => setOnOpenFinish(false)}
        isModalOpen={onOpenFinish}
      />
      <PartogramaDeliveryTime
        isModalOpen={timeOfChildbirth}
        handleCloseModal={() => setTimeOfChildbirth(false)}
        typePregnancy={typePregnancy}
      />
    </div>
  );
};

export default PartogramaSidebar;
