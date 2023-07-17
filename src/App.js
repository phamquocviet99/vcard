import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateCardPage } from "./Page/create-card-page/create-card-page.component";
import { DashBoardPage } from "./Page/dashboard-page/dashboard-page.component";
import { EditCardPage } from "./Page/edit-card-page/edit-card-page.component";
import { LoginPage } from "./Page/login-page/login-page.component";
import Vcard from "./Page/Vcard";
import { Authenticate } from "./service/authenticate";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Vcard />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route element={<Authenticate />}>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/create-card" element={<CreateCardPage />} />
        <Route path="/edit-card/:id" element={<EditCardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
