import { useState } from "react";

import PacientesHeader from "../../components/Pacientes/PacientesHeader";
import PacientesFilters from "../../components/Pacientes/PacientesFilters";
import PacientesTable from "../../components/Pacientes/PacientesTable";
import "./PacientesPage.css";
import { columns, dataTable } from "./mock";
import PacienteAddModal from "../../components/Pacientes/PacienteAddModal";

interface PacienteInterface {
  name: string;
  owner: string;
  hour: string;
  date: string;
  status: string;
  statusId: string;
  bed: string;
  mv: string;
}

const Pacientespage = () => {
  const [pacientes, setPacientes] = useState<PacienteInterface[]>(dataTable);
  const [isModalOpen, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const onFilterPacientes = (value: string) => {
    const dataFiltered: PacienteInterface[] = [];
    dataTable.forEach((item) => {
      let valueItem = item.name.toLowerCase();
      if (valueItem.includes(value.toLowerCase())) {
        dataFiltered.push(item);
      }
    });
    setPacientes(dataFiltered);
  };
  return (
    <div className="pacientes-page__container">
      <PacientesHeader />
      <PacientesFilters
        onFilter={onFilterPacientes}
        openAddPaciente={handleOpenModal}
      />
      <PacientesTable dataTable={pacientes} columns={columns} />
      {isModalOpen && (
        <PacienteAddModal
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Pacientespage;
