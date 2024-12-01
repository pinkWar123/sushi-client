import './Dashboard.css';
import Header from '../../layouts/ClientLayout/Header';
import Footer from '../../layouts/ClientLayout/Footer';
import BackToTop from '../../layouts/ClientLayout/BackToTop';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Booking from './components/Booking'

function Dashboard() {
    return (
        <>
        <Header></Header>
            <div className="Dashboard">
                <Home />
                <About />
                <Menu />
                <Booking />
            </div>
            <Footer></Footer>
            <BackToTop></BackToTop>
        </>
    );
}

export default Dashboard;
