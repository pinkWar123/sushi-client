import './Dashboard.css';
import Home from './components/Home';
import Menu from './components/Menu';
import About from './components/About';
import Booking from './components/Booking'

function Dashboard() {
    return (
        <div className="Dashboard">
            <Home />
            <About />
            <Menu />
            <Booking />
        </div>
        
    );
}

export default Dashboard;
