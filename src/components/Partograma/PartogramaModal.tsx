import React, { SyntheticEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SelectChangeEvent } from "@mui/material/Select";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";

import PartogramaDilatacaoTab from "./PartogramaModalTabs/PartogramaDilatacaoTab";
import PartogramaPositionTab from "./PartogramaModalTabs/PartogramaPositionTab";
import PartogramaBloodTab from "./PartogramaModalTabs/PartogramaBloodTab";
import PartogramaRuptureTab from "./PartogramaModalTabs/PartogramaRuptureTab";
import { DadosPartograma } from "../../types/partograma";

import "./PartogramaModal.css";
import { selectTab } from "../../store/modules/partogramaChart/actions";

interface TabTitleProps {
  title: string;
}
function TabTitle({ title }: TabTitleProps) {
  return (
    <Typography className="partograma-modal__tab-title">{title}</Typography>
  );
}

interface PartogramaModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaModal = ({
  isModalOpen,
  handleCloseModal,
}: PartogramaModalProps) => {
  const dispatch = useDispatch();
  const { tabIndex } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(selectTab(newValue));
  };


  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box className="partograma-modal__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="partograma tabs"
        >
          <Tab label={<TabTitle title="Ruptura da bolsa" />} id="tab-ruptura" />
          <Tab label={<TabTitle title="Dilatação" />} id="tab-dilatacao" />
          <Tab label={<TabTitle title="Posição fetal" />} id="tab-posicao" />
          <Tab
            label={<TabTitle title="Sangue fetal" />}
            id="tab-sangue-fetal"
          />
        </Tabs>

        <PartogramaRuptureTab
          selectedTabIndex={tabIndex}
          handleCloseModal={handleCloseModal}
        />

        <PartogramaDilatacaoTab
          selectedTabIndex={tabIndex}
          handleCloseModal={handleCloseModal}
        />

        <PartogramaPositionTab
          selectedTabIndex={tabIndex}
          handleCloseModal={handleCloseModal}
        />

        <PartogramaBloodTab
          selectedTabIndex={tabIndex}
          handleCloseModal={handleCloseModal}
        />
      </Box>
    </Modal>
  );
};

export default PartogramaModal;
