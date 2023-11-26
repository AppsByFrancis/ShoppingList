import './css/modal.css';
import { useState, useContext, useEffect } from 'react';
import { CloseButtonContext } from './Navbar.jsx';
import { ShoppingListContext } from '../App.jsx';


const CreateModal = () => {
    const [isCreating, setIsCreating] = useContext(CloseButtonContext);
    const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
    const [listNameInput, setListNameInput] = useState("");
    const [opacity, setOpacity] = useState(0);
    const [top, setTop] = useState(0);

    const createList = (event) => {
      event.preventDefault();
      
        if(!listNameInput){
            alert("Please, enter an item")
            return
        }
        let list = {
            id: Math.floor(Math.random() * 1000),
            name: listNameInput,
            index: Math.floor(Math.random() * 9)
          };
        setShoppingList((oldList) => [...oldList, list]);
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
                close
            </button>
            <form onSubmit={createList} id="searchBar" className="searchBar">
              <input
                id="searchQueryInput"
                name="searchQueryInput"
                type="text"
                value={listNameInput}
                onChange={handleInputChangeName}
                placeholder="Christmas list..."
                className="pr-8"
              />
              <button
                id="searchQuerySubmit"
                className="submitButton"
                type="submit"
                name="searchQuerySubmit"
              >
                Submit
              </button>
          </form>
        </div>
    );
}

export default CreateModal;