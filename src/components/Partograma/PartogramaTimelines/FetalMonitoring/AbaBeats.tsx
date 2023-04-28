import { useState } from "react";
import { TabPanel } from "../../PartogramaModalTabs/utils";
import TimelinePharmacologicalChart from "../TimelinePharmacologicalChart";

import "../TimelineLiquidoAmniotico.css";

interface AbaMonitotingrops {
  index: number;
}

const AbaBeats = ({ index }: AbaMonitotingrops) => {
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);

  const goToEdit = (e: any, index: number) => {
    setEdit({ ...e, index });
    setIsModalAddOpen(true);
  };

  return (
    <TabPanel value={index} index={1}>
      <div
        style={{
          borderBottom: "1px solid #666666",
          width: "537px",
          transform: "translate(5px, 4px)",
        }}
      ></div>
      <TimelinePharmacologicalChart onEdit={console.log} onStop={console.log} />
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
      ></div>
    </TabPanel>
  );
};

export default AbaBeats;
