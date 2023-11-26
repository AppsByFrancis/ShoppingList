import './css/navbar.css'
import { useState, createContext } from 'react';
import CreateModal from './createModal';

export const CloseButtonContext = createContext();
const Navbar = () => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <CloseButtonContext.Provider value={[isCreating, setIsCreating]}>
            {isCreating && <CreateModal/>}
            <div className="navbar">
                <div className='logo'>logo</div>
                <button className='createList' onClick={() => setIsCreating(true)}>
                    Create Button
                </button>
            </div>
        </CloseButtonContext.Provider>
    );
}

export default Navbar;