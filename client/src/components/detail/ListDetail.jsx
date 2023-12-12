import '../css/detail.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { back } from '../../assets';

const ListDetail = ({items, shoppingList, setShoppingList, route}) => {
    const [item, setItem] = useState([]);
    const [itemInput, setItemInput] = useState("");
    const [itemNewName, setItemNewName] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [isEditting, setIsEditting] = useState(false);
    const [isEdittingItem, setIsEdittingItem] = useState(null);
    
    const locationUrl = useLocation()
    const url = locationUrl.pathname;
    const urlId = url.match(/\d+/g);
    let selectedItem = shoppingList.find(i => i.id === Number(urlId));


    useEffect(() => {
        setItem(prev => [...selectedItem.listItems])
    }, []);

    const addItemToList = async (event) => {
        if(!itemInput){
            event.preventDefault();
            alert("Please, enter an Item!")
            return
        } else {
            event.preventDefault();

            const newItem = {
                id: item.length,
                item: itemInput,
                listId: Number(urlId)
            };
            
            await fetch('http://127.0.0.1:8000/items/',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newItem)
            })
            setItem(prevItems => [...prevItems, newItem]);
        }
    };

    const handleInputChange = (event) => {
        setItemInput(event.target.value)
    };
    
    const handleItemNameChange = (event) => {
        setItemNewName(event.target.value)
    };

    
    const removeItem = async (itemId) => {
        try {
            await fetch(`http://127.0.0.1:8000/items/${itemId}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
            });
    
            let newArr = item.filter(i => i.id !== itemId);
            setItem(newArr);
        } catch (err) {
            console.error('Error removing item:', err);
        }
    };
    
    
    const handleEdit = async() => {
        try {
            if(isEditting && nameInput){
                await fetch(`http://127.0.0.1:8000/shoppingLists/:${urlId}`,
               {
                   method: 'PATCH',
                   headers: {
                       'Content-type' : 'application/json'
                   },
                   body: nameInput && JSON.stringify({ name: nameInput })
               })
   
               setShoppingList(prev => {
                   return prev.map(obj => {
                       if (obj.id === Number(urlId)) {
                           return { ...obj, name: nameInput };
                       }
                       return obj;
                   });
               });
               setIsEditting(false)
           } else if(isEditting){
               setIsEditting(false)
           } else {
               setIsEditting(true)
           }
        } catch (err) {
            console.error('Error editting item:', err);
        }
    }

    const changeItemName = async(id, event) => {
        if(itemNewName){
            event.preventDefault();

            setItem(prev => {
                return prev.map(obj => {
                    if (obj.id === id) {
                        return { ...obj, item: itemNewName };
                    }
                    return obj;
                });
            });
            setIsEdittingItem(false)
            await fetch(`http://127.0.0.1:8000/items/:${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: itemNewName && JSON.stringify({ 
                    name: itemNewName,
                    listId: urlId
                 })
            })
        } else if(isEdittingItem){
            setIsEdittingItem(false)
        } else {
            setIsEdittingItem(true)
        }
    }

    const handleNameChange = (event) => {
        setNameInput(event.target.value)
    }

    return(
        <section className="detailSection">
            <Link to='/'><img className='backButton' src={back}/></Link>
            <ul className="detailList">
                <div className='nameAndInputItem'>
                    <div style={{display: 'flex'}}>
                    <button onClick={handleEdit} className='editButton'>{!isEditting ? "Edit" : "Change"}</button>
                    {!isEditting ? <h2>{selectedItem ? selectedItem.name : 'Item not found'}</h2> : <input onChange={handleNameChange} value={nameInput} placeholder="Select a new Name..."/>}
                    </div>
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
                {selectedItem && item.map(el => (
                    <div key={`it-${el.id}`}>
                        { isEdittingItem !== el.id ?
                            <div className='item-and-button'>
                                <li className='listItem'>{el.item}</li>
                                <button className='removeButton2' onClick={() => removeItem(el.id)} style={{marginLeft: "auto", marginRight: "8px"}}>
                                    remove
                                </button>
                                <button className="editButton" onClick={() => {
                                    setIsEdittingItem(el.id);
                                }}>edit</button>
                            </div>
                            : 
                                <div key={`it-${el.id}`}>
                                     <form onSubmit={() => {changeItemName(el.id, event)}} className="form name" >
                                        <input
                                            id="searchQueryInput"
                                            name="searchQueryInput"
                                            type="text"
                                            value={itemNewName}
                                            onChange={handleItemNameChange}
                                            placeholder="Edit item..."
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
                        }
                    </div>
                ))}

                </div>
            </ul>
        </section>
    )
}

export default ListDetail;
