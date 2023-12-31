import './css/navbar.css';
import { useState, createContext } from 'react';
import { Dropdown, CreateModal } from './index.js';
import { logo } from '../assets';
import { buttons } from '../constants';

export const CloseButtonContext = createContext();
const Navbar = ({language, setLanguage}) => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <CloseButtonContext.Provider value={[isCreating, setIsCreating]}>
            {isCreating && <CreateModal language={language} />}
            <div className="navbar">
                <img className="logo" src={logo}/>
                <Dropdown language={language} setLanguage={setLanguage} />
                <button className='createList' onClick={() => setIsCreating(true)}>
                    {language === "english" ? buttons.create.english : buttons.create.czech}
                </button>
            </div>
        </CloseButtonContext.Provider>
    );
}

export default Navbar;