import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
    return (
        <div className="flex flex-col h-full px-4 md:px-14 lg:px-28 xl:px-44 2xl:px-72">
            <Header />
            <div className="flex-1 pt-[70px] mb-10">
                <Home />
            </div>
            <Footer />
        </div>
    );
}

export default App;
