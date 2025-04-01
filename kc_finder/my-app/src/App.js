import "./App.css";

import Main from "./view/main";
import { Routes, Route } from "react-router-dom";
import Footer from "./layout/footer";
import Nav from "./layout/nav";
import Introduction from "./view/introduction";
import Location from "./view/location";
import FindKc from "./view/findKc";
import Notice from "./view/notice";
import AboutKc from "./view/aboutKc";
import Guide from "./view/guide";
import Login from "./view/login";
import SignUp from "./view/sign-up";
import NoticeDetail from "./view/notice_detail";
import AboutSameEquipment from "./view/aboutSameEquipment";

function App() {
  return (
    <div className="container">
      <header>
        <Nav />
      </header>
      <main className="main">
        <Routes>
          <Route path="/main" element={<Main />} />
          
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/sign-up" element={<SignUp />}></Route>

          <Route path="/introduction" element={<Introduction />}></Route>
          <Route path="/introduction/location" element={<Location />}></Route>

          <Route path="/services" element={<AboutKc />}></Route>
          <Route path="/services/same_equipment" element={<AboutSameEquipment />}></Route>
          <Route path="/services/finder" element={<FindKc />}></Route>
          <Route path="/services/guide" element={<Guide />}></Route>

          <Route path="/notice" element={<Notice />}></Route>
          <Route path="/notice/:id" element={<NoticeDetail />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
