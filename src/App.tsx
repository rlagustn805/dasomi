import './App.css';

// 라이브러리
import { Route, Routes } from 'react-router-dom';

// 컴포넌트
import Header from './components/Header';
import Footer from './components/Footer';

// 페이지
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    return (
        <div className="flex flex-col h-full px-4 md:px-14 lg:px-28 xl:px-44 2xl:px-72">
            <Header />
            <div className="flex-1 pt-[70px] mb-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
