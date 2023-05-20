import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AboutPage from './basis/AboutPage';
import FooterPage from './basis/FooterPage';
import HeaderPage from './basis/HeaderPage';
import HomePage from './basis/HomePage';
import EventPage from './event/EventPage';

import LoginPage from './login/LoginPage';
import MyPage from './my-page/MyPage';
import NoticePage from './notice/NoticePage';
import ProductBoardPage from './product-board/ProductBoardPage';


function App() {
  return (
      <div className="App">
        <HeaderPage />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/productBoard/*" element={<ProductBoardPage/>} />
          <Route path="/login/*" element={<LoginPage/>} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/my/*" element={<MyPage/>} />
          <Route path="/event/*" element={<EventPage/>} />
          <Route path="/notice/*" element={<NoticePage/>} />
        </Routes>
        <FooterPage />
      </div>
  );
}

export default App;
