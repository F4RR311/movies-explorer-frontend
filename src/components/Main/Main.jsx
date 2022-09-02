import './Main.css';
import Promo from '../Promo/Promo.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import Techs from '../Techs/Techs.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Main() {
    return (
        <main className="main">
            <Header />
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Footer />
        </main>
    );
}
