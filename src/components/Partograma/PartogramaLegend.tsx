import Paper from "@mui/material/Paper";

import { ReactComponent as IconeSidebarNascimento } from "../../assets/IconeSidebarNascimento.svg";

import { ReactComponent as IconeSidebarRuptura } from "../../assets/IconeSidebarRuptura.svg";

import { ReactComponent as IconeGraficoDilatacao } from "../../assets/IconeGraficoDilatacao.svg";
import { ReactComponent as IconeGraficoRotacao } from "../../assets/IconeGraficoRotacao.svg";
import { ReactComponent as IconeSidebarAmostra } from "../../assets/IconeSidebarAmostra.svg";
import { ReactComponent as IconeSidebarDequitacao } from "../../assets/IconeSidebarDequitacao.svg";



const PartogramaLegend = () => {
  return (
    <>
      <div className="partograma-legend__container">
        <div className="partograma-legend__actions">
          <div className="partograma-legend__button">
            <Paper className="partograma-legend__paper">
              <IconeSidebarNascimento />
              <span className="partograma-legend__button-label">
                Nascimento do bebê
              </span>
            </Paper>
          </div>

          <div className="partograma-legend__variables">
            <div className="partograma-legend__button">
              <Paper className="partograma-legend__paper">
                <IconeSidebarRuptura />

                <span className="partograma-legend__button-label">
                  Ruptura da bolsa
                </span>
              </Paper>
            </div>
          </div>

          <div className="partograma-legend__button">
            <Paper className="partograma-legend__paper">
              <IconeGraficoDilatacao />
              <span className="partograma-legend__button-label">
                Cervicodilatação
              </span>
            </Paper>
          </div>
        </div>
      </div>
      <div className="partograma-legend__container">
        <div className="partograma-legend__actions">
          <div className="partograma-legend__button">
            <Paper className="partograma-legend__paper">
              <IconeGraficoRotacao />
              <span className="partograma-legend__button-label">Rotação</span>
            </Paper>
          </div>

          <div className="partograma-legend__button">
            <Paper className="partograma-legend__paper">
              <IconeSidebarAmostra />

              <span className="partograma-legend__button-label">
                Amostra do sangue fetal
              </span>
            </Paper>
          </div>

          <div className="partograma-legend__button">
            <Paper className="partograma-legend__paper">
              <IconeSidebarDequitacao />

              <span className="partograma-legend__button-label">
                Dequitação
              </span>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartogramaLegend;
