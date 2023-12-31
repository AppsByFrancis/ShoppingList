import './css/modal.css';
import { useState, useContext, useEffect } from 'react';
import { CloseButtonContext } from './Navbar.jsx';
import { ShoppingListContext } from '../App.jsx';
import { buttons } from '../constants';


const CreateModal = ({language}) => {
    const [isCreating, setIsCreating] = useContext(CloseButtonContext);
    const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
    const [listNameInput, setListNameInput] = useState("");
    const [opacity, setOpacity] = useState(0);
    const [top, setTop] = useState(0);

    const createList = async(event) => {
      event.preventDefault();
      
        if(!listNameInput){
            alert("Please, enter an item")
            return
        }
        let newList = {
            id: shoppingList.length,
            name: listNameInput,
            colorIndex: Math.floor(Math.random() * 9),
            listItems: []

          };
        
          
        await fetch('http://127.0.0.1:8000/shoppingLists',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newList)
        }
        )
        setShoppingList((oldList) => [...oldList, newList]);
        setIsCreating(false)
    }

    useEffect(() => {
      if(isCreating){
        setOpacity(1);
        setTop(120);
      } 
    }, [isCreating])

    const handleInputChangeName = (event) => {
        setListNameInput(event.target.value);
      };
    return(
        <div className='modal' style={{opacity: opacity, top: top}}>
            <button onClick={() => setIsCreating(false)} className='closeModal'>
              {language === "english" ? buttons.close.english : buttons.close.czech}
            </button>
            <form onSubmit={createList} id="searchBar" className="searchBar">
              <input
                id="searchQueryInput"
                name="searchQueryInput"
                type="text"
                value={listNameInput}
                onChange={handleInputChangeName}
                placeholder= {language === "english" ? "Christmas list..." : "Vánoční seznam..."}
                className="pr-8"
              />
              <button
                id="searchQuerySubmit"
                className="submitButton"
                type="submit"
                name="searchQuerySubmit"
              >
                {language === "english" ? buttons.submit.english : buttons.submit.czech}
              </button>
          </form>
        </div>
    );
}

export default CreateModal;