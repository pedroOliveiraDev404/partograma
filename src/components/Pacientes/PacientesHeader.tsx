const PacientesHeader = () => {
  return (
    <div className="pacientes-page__header">
      <div className="pacientes-page__header-container">
        <div className="pacientes-page__title">Partograma</div>
        <button className="pacientes-page__historic">
          <p className="pacientes-page__historic-text">
            Histórico de atendimentos
          </p>
        </button>
      </div>
    </div>
  );
};

export default PacientesHeader;
