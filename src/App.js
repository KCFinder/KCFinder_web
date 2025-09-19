import Login from './view/Login';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Main from './view/Main';
import SignUp from './view/SignUp';
import GlobalLayout from './layout/GlobalLayout';
import Services from './view/Services';
import Introduction from './view/Introduction';
import Location from './view/Location';
import SameEquipment from './view/SameEquipment';
import FindKc from './view/FindKc';
import MyKc from './view/MyKc';
import Notice from './view/Notice';
import Guide from './view/Guide';
import Header from './layout/header/Header';
import NoticeDetail from './view/NoticeDetail';

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <GlobalLayout>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Main />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/services' element={<Services />} />
          <Route path='/introduction' element={<Introduction />} />
          <Route path='/introduction/location' element={<Location />} />
          <Route path='/services/same_equipment' element={<SameEquipment />} />
          <Route path='/services/finder' element={<FindKc />} />
          <Route path='/my/finder' element={<MyKc />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/services/guide' element={<Guide />} />
          <Route path='/notice/:id' element={<NoticeDetail />} />
        </Routes>
      </GlobalLayout>
    </AuthProvider>
  );
}
