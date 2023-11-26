import { ShoppingList, Navbar } from "./index.js";
import './css/home.css';

const Home = () => {
    return(
        <div className="home">
            <Navbar/>
            <ShoppingList/>
        </div>
    )
}

export default Home;