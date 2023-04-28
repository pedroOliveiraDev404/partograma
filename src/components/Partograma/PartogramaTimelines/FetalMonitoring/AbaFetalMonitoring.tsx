import { useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";

import TimelineOxytocinChart from "../TimelineOxytocinChart";
import TimelinePharmacologicalChart from "../TimelinePharmacologicalChart";
import PartogramaMonitoringChart from "./PartogramaMonitoringChart";
import PartogramaMonitoringMenu from "./PartogramaMonitoringMenu";
import { TabPanel } from "../../PartogramaModalTabs/utils";

import "../TimelineLiquidoAmniotico.css";

interface AbaMonitotingrops {
  index: number;
}

const AbaFetalMonitoring = ({ index }: AbaMonitotingrops) => {
  const { fetalMonitoringData } = useSelector(
    (state: Store.State) => state.fetalMonitoring.data
  );

  const { typePregnancy } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const [offChartBeatsOpen, setOffChartBeatsOpen] = useState(false);
  const [offChartBeats, setOffChartBeats] = useState<any[]>([]);

  const goToEdit = (e: any, index: number) => {
    setEdit({ ...e, index });
    setIsModalAddOpen(true);
  };

  const handleOffChartBeats = () => {
    const aux = fetalMonitoringData.filter(
      (item: any) =>
        item?.frequencyOne > 210 ||
        item?.frequencyTwo > 210 ||
        item?.frequencyMother > 210 ||
        item?.frequencyOne < 60 ||
        item?.frequencyMother < 60 ||
        item?.frequencyTwo < 60
    );
    setOffChartBeats(aux);
    setOffChartBeatsOpen(!offChartBeatsOpen);
  };

  const handleCloseModal = () => {
    setEdit(null);
    setIsModalAddOpen(false);
  };

  const FrequencyAboveDotOne = (gemelar: boolean) => {
    return (
      <g
        onClick={handleOffChartBeats}
        style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
      >
        <svg
          fill={
            typePregnancy !== "Múltipla"
              ? "red"
              : gemelar
              ? "#B874C6"
              : "#002471"
          }
          width="16px"
          height="16px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          x={4}
          fill={
            typePregnancy !== "Múltipla"
              ? "red"
              : gemelar
              ? "#B874C6"
              : "#002471"
          }
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </g>
    );
  };
  const FrequencyBelowDotOne = (gemelar: boolean) => {
    return (
      <g
        onClick={handleOffChartBeats}
        style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
      >
        <svg
          fill={
            typePregnancy !== "Múltipla"
              ? "red"
              : gemelar
              ? "#B874C6"
              : "#002471"
          }
          width="16px"
          height="16px"
          viewBox="0 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill={
            typePregnancy !== "Múltipla"
              ? "red"
              : gemelar
              ? "#B874C6"
              : "#002471"
          }
          viewBox="0 0 16 16"
          x={4}
        >
          <path
            fill-rule="evenodd"
            d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
          />
        </svg>
      </g>
    );
  };

  const FrequencyMotherDot = (above: boolean) => {
    return (
      <g
        style={{
          display: "flex",
          flexDirection: "row",
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <svg
          width="13"
          height="12"
          viewBox="0 0 11 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.199219" width="10" height="10" rx="5" fill="red" />
        </svg>
        {above ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            x={4}
            fill="red"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="red"
            viewBox="0 0 16 16"
            x={4}
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
            />
          </svg>
        )}
      </g>
    );
  };

  return (
    <TabPanel value={index} index={0}>
      <div
        style={{
          borderBottom: "1px solid #666666",
          width: "537px",
          transform: "translate(5px, 4px)",
        }}
      ></div>
      <TimelineOxytocinChart onEdit={console.log} />
      <div
        style={{
          borderTop: "1px solid #666666",
          width: "537px",
          height: "1px",
          transform: "translate(5px, -35px)",
          backgroundColor: "#fff",
        }}
      ></div>
      <div
        style={{
          width: "545px",
          transform: "translate(0px, -34px)",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "537px",
            transform: "translate(5px, 4px)",
          }}
        ></div>
        <TimelinePharmacologicalChart
          onEdit={console.log}
          onStop={console.log}
        />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "537px",
            height: "1px",
            transform: "translate(5px, -35px)",
            backgroundColor: "#fff",
          }}
        ></div>
      </div>
      <div
        style={{
          width: "545px",
          transform: "translate(-59px, -88px)",
        }}
      >
        <div
          style={{
            transform: "translate(40px, 10px)",
          }}
        >
          <IconeTimelinePlusSign
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOffChartBeatsOpen(false);
              setIsModalAddOpen(true);
            }}
          />
        </div>

        <PartogramaMonitoringChart
          onEdit={goToEdit}
          handleOffChartBeats={handleOffChartBeats}
        />

        {offChartBeatsOpen && (
          <div
            style={{
              width: "100%",
              marginLeft: "88px",
              alignSelf: "center",
              marginTop: "24px",
            }}
          >
            {offChartBeats.map((item: any) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: "40px",
                  alignItems: "center",
                }}
              >
                <span
                  onClick={() => {
                    setOffChartBeatsOpen(false);
                    goToEdit(
                      item,
                      item?.frequencyMother
                        ? 0
                        : item?.frequencyTwo && typePregnancy === "Múltipla"
                        ? 2
                        : 1
                    );
                  }}
                >
                  {item?.frequencyOne < 60 ||
                  item?.frequencyTwo < 60 ||
                  item?.frequencyMother < 60 ? (
                    <>
                      {item?.frequencyMother ? (
                        <>{FrequencyMotherDot(false)}</>
                      ) : (
                        <>
                          {FrequencyBelowDotOne(
                            item?.frequencyOne && item?.frequencyOne
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {item?.frequencyMother ? (
                        <>{FrequencyMotherDot(true)}</>
                      ) : (
                        <>
                          {FrequencyAboveDotOne(
                            item?.frequencyOne && item?.frequencyOne
                          )}
                        </>
                      )}
                    </>
                  )}
                </span>
                <span className="partograma-page__fetal-monitoring-item-beats">
                  {typePregnancy === "Múltipla" ? (
                    <>
                      {item?.frequencyOne && <span>1° Gemelar</span>}
                      {item?.frequencyTwo && <span>2° Gemelar</span>}
                      {item?.frequencyMother && <span>Paciente</span>}
                    </>
                  ) : (
                    <>
                      {item?.frequencyOne ? (
                        <span>Bebê</span>
                      ) : (
                        <span>Paciente</span>
                      )}
                    </>
                  )}
                </span>
                {item?.frequencyOne && (
                  <span className="partograma-page__fetal-monitoring-item-beats">
                    {item?.frequencyOne} BPM
                  </span>
                )}
                {item?.frequencyTwo && (
                  <span className="partograma-page__fetal-monitoring-item-beats">
                    {item?.frequencyTwo} BPM
                  </span>
                )}
                {item?.frequencyMother && (
                  <span className="partograma-page__fetal-monitoring-item-beats">
                    {item?.frequencyMother} BPM
                  </span>
                )}
                <span className="partograma-page__fetal-monitoring-item-beats">
                  {item?.timeLegend}
                </span>
              </div>
            ))}
          </div>
        )}
        {isModalAddOpen && (
          <PartogramaMonitoringMenu
            isModalOpen={isModalAddOpen}
            handleCloseModal={handleCloseModal}
            edit={edit}
          />
        )}
      </div>
    </TabPanel>
  );
};

export default AbaFetalMonitoring;
