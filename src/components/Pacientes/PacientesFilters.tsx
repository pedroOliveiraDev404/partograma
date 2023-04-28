import { ReactComponent as IconeSearchPacientes } from "../../assets/IconeSearchPacientes.svg";
import { ReactComponent as IconeAdicionarPacientes } from "../../assets/IconeAddPaciente.svg";

interface PacientesFiltersInterface {
  onFilter: (value: string) => void;
  openAddPaciente: () => void;
}

const PacientesFilters = ({
  onFilter,
  openAddPaciente,
}: PacientesFiltersInterface) => {
  return (
    <div className="pacientes-page__filters">
      <div className="pacientes-page__search-container">
        <input
          className="pacientes-page__search"
          placeholder="Pesquisa"
          onChange={(e) => onFilter(e.target.value)}
        ></input>
        <div className="pacientes-page__search-button">
          <IconeSearchPacientes />
        </div>
      </div>
      <button className="pacientes-page__add-button" onClick={openAddPaciente}>
        <IconeAdicionarPacientes />
        Adicionar paciente
      </button>
    </div>
  );
};

export default PacientesFilters;
