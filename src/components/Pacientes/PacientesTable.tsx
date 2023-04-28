import PacienteStatus from "./PacienteStatus";
import { useNavigate } from "react-router-dom";

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

interface TableInterface {
  columns: string[];
  dataTable: PacienteInterface[];
}

const PacientesTable = ({ columns, dataTable }: TableInterface) => {
  const history = useNavigate();
  return (
    <div className="pacientes-page__table">
      <thead>
        {columns.map((column) => (
          <th>{column}</th>
        ))}
      </thead>
      <tbody>
        {dataTable?.map((data: any, index: number) => (
          <tr>
            <td key={index} onClick={() => history(`/partograma/${index}`)}>
              <strong>{data.name}</strong>
            </td>
            <td key={index} onClick={() => history(`/partograma/${index}`)}>
              {data.owner}
            </td>
            <td key={index} onClick={() => history(`/partograma/${index}`)}>
              <div className="pacientes-page__container-date">
                <p className="pacientes-page__time">{data.hour}</p>
                <p className="pacientes-page__hour">{data.date}</p>
              </div>
            </td>
            <td>
              <PacienteStatus
                status={data.status}
                statusId={data.statusId}
                id={index}
              />
            </td>
            <td key={index} onClick={() => history(`/partograma/${index}`)}>
              {data.bed}
            </td>
            <td key={index} onClick={() => history(`/partograma/${index}`)}>
              {data.mv}
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default PacientesTable;
