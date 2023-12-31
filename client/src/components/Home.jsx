import { ShoppingList, Navbar } from "./index.js";
import './css/home.css';

const Home = ({ language, setLanguage, dark, setDark }) => {
    return (
        <div className="home" style={dark ? { backgroundColor: "#0A192F", border: "solid #112D4E" } : null}>
            <Navbar language={language} setLanguage={setLanguage} dark={dark} setDark={setDark} />
            <ShoppingList language={language} dark={dark} />
        </div>
    );
};

export default Home;
