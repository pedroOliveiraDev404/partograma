import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PersistGate } from "redux-persist/integration/react";

import { persistor } from "./store";

import PartogramaPage from "./pages/Partograma/PartogramaPage";
import PacientesPage from "./pages/Pacientes/PacientesPage";
import ExportPdf from "./pages/ExportPdf/ExportPdf";

import "dayjs/locale/pt-br";
import { store } from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  { path: "/partograma/:idPaciente", element: <PartogramaPage /> },
  { path: "/", element: <PacientesPage /> },
  { path: "/pdf/:idPaciente", element: <ExportPdf /> },
]);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <RouterProvider router={router} />
          </LocalizationProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
