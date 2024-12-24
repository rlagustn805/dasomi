import './App.css';

// 라이브러리
import { Route, Routes } from 'react-router-dom';

// 컴포넌트
import Header from './components/Header';
import Footer from './components/Footer';

// 페이지
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import MyProfile from './pages/MyProfile';
import MyRoomMate from './pages/MyRoomMate';
import RoomMateList from './pages/RoomMateList';
import NotFound from './pages/NotFound';
import Help from './pages/Help';

// Context
import { AuthProvider } from './contexts/AuthContext';

// useQuery
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className="flex flex-col h-full px-4 md:px-14 lg:px-28 xl:px-44 2xl:px-72">
                    <Header />
                    <div className="flex-1 pt-[70px] mb-10 mt-5">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="forgot" element={<Forgot />}></Route>
                            <Route
                                path="/profile"
                                element={<MyProfile />}
                            ></Route>
                            <Route
                                path="/roommate"
                                element={<MyRoomMate />}
                            ></Route>
                            <Route
                                path="/dormitory/:dormitory"
                                element={<RoomMateList />}
                            ></Route>
                            <Route path="/help" element={<Help />}></Route>
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
