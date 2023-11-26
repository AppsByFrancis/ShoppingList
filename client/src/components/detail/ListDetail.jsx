import '../css/detail.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { back } from '../../assets';

const ListDetail = ({value, setShoppingList, route}) => {
    const [itemInput, setItemInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [item, setItem] = useState([]);
    const [isEditting, setIsEditting] = useState(false);

    const addItemToList = (event) => {
        if(!itemInput){
            event.preventDefault();
            alert("Please, enter an Item!")
            return
        } else {
            event.preventDefault();
            const item = {
                id: Math.floor(Math.random() * 1000),
                item: itemInput,
            };
    
            setItem(prevItems => [...prevItems, item]);
        }
    };

    const handleInputChange = (event) => {
        setItemInput(event.target.value)
    };
    const selectedItem = value.find(item => `/list/${item.id}` === route);

    const removeItem = (itemId) => {
        let newArr = item.filter(i => i.id !== itemId)
        setItem(newArr)

    }

    const handleEdit = () => {
        if(isEditting && nameInput){
            setIsEditting(false)
            let newArr = item.filter(i => `/list/${i.id}` !== route)
            let selectedItem = value.find(item => `/list/${item.id}` === route);
            selectedItem.name = nameInput
            setShoppingList([...newArr, selectedItem])
        } else if(isEditting){
            setIsEditting(false)
        } else {
            setIsEditting(true)
        }
    }

    const handleNameChange = (event) => {
        setNameInput(event.target.value)
    }

    return(
        <section className="detailSection">
            <Link to='/'><img src={back}/></Link>
            <ul className="detailList">
                <div className='nameAndInputItem'>
                    <button onClick={handleEdit} className='editButton'>{!isEditting ? "Edit" : "Change"}</button>
                    {!isEditting ? <h2>{selectedItem ? selectedItem.name : 'Item not found'}</h2> : <input onChange={handleNameChange} value={nameInput} placeholder="Select a new Name..."/>}
                    <form onSubmit={addItemToList} className="form name" >
                        <input
                            id="searchQueryInput"
                            name="searchQueryInput"
                            type="text"
                            value={itemInput}
                            onChange={handleInputChange}
                            placeholder="Add an item..."
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
                {item.length === 0 && <h3>Add an item to your shopping list</h3>}
                <div>
                    {item.map(i => {
                        return(
                            <div className='item-and-button' key={i.id}>
                                <li className='listItem'>{i.item}</li>
                                <button className='removeButton' onClick={() => {
                                    removeItem(i.id)
                                }}>remove</button>
                            </div>
                        )
                    })}
                </div>
            </ul>
        </section>
    )
}

export default ListDetail;