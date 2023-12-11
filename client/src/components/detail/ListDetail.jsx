import '../css/detail.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { back } from '../../assets';

const ListDetail = ({items, shoppingList, setShoppingList, route}) => {
    const [item, setItem] = useState([]);
    const [itemInput, setItemInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [isEditting, setIsEditting] = useState(false);
    
    const locationUrl = useLocation()
    const url = locationUrl.pathname;
    const urlId = url.match(/\d+/g);
    let selectedItem = shoppingList.find(i => i.id === Number(urlId));


    useEffect(() => {
        setItem(prev => [...selectedItem.listItems])
        const getListItem = async() => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/shoppingLists/:${urlId}`); 
                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (jsonResponse.status === 'success') {
                        const listData = JSON.parse(jsonResponse.data);
                        setItem(listData.listItems);
                    }
                } else {
                    console.error('Server responded with an error:', response.status);
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };
        

        getListItem()
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
            };

            const assignedPath = Object.assign({locationUrl}, newItem)
            
            await fetch('http://127.0.0.1:8000/items/',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(assignedPath),
                metadata: "none"
                
            })
            setItem(prevItems => [...prevItems, newItem]);
        }
    };

    const handleInputChange = (event) => {
        setItemInput(event.target.value)
    };
    
    const removeItem = async(itemId) => {

        await fetch(`http://127.0.0.1:8000/items/:${itemId}`, 
        {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(locationUrl)
          })
        
        let newArr = item.filter(i => i.id !== itemId)
        setItem([...newArr])
        
    }
    
    const handleEdit = async() => {
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
                    <div className='item-and-button' key={`it-${el.id}`}>
                        <li className='listItem'>{el.item}</li>
                        <button className='removeButton2' onClick={() => removeItem(el.id)}>
                            remove
                        </button>
                    </div>
                ))}
                </div>
            </ul>
        </section>
    )
}

export default ListDetail;
