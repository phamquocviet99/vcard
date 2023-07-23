import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PagePath } from "./constant/page";
import { AuthenticatePage } from "./Page/authenticate-page/authenticate.component";
import { CreateCardPage } from "./Page/create-card-page/create-card-page.component";
import { DashBoardPage } from "./Page/dashboard-page/dashboard-page.component";
import { EditCardPage } from "./Page/edit-card-page/edit-card-page.component";
import Vcard from "./Page/Vcard";
import { Authenticate } from "./service/authenticate";

function App() {
  return (
    <Routes>
      <Route path={PagePath.CardInfo + "/:id"}>
        <Route index element={<Vcard />} />
      </Route>

      <Route path={PagePath.Authenticate} element={<AuthenticatePage />} />

      <Route element={<Authenticate />}>
        <Route path={PagePath.Dashboard} element={<DashBoardPage />} />
        <Route path={PagePath.CreateCard} element={<CreateCardPage />} />
        <Route path={PagePath.EditCard + "/:id"} element={<EditCardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
