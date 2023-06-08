import { Route, Routes } from "react-router-dom";
import "./App.css";
import Vcard from "./Page/Vcard";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Vcard />} />
      </Route>
    </Routes>
  );
}

export default App;
