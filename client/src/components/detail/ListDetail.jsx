import '../css/detail.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ListDetail = ({value, route}) => {
    const [itemInput, setItemInput] = useState("");
    const [item, setItem] = useState([]);

    const addItemToList = (event) => {
        event.preventDefault();
        const item = {
            id: Math.floor(Math.random() * 1000),
            item: itemInput,
        };

        setItem(prevItems => [...prevItems, item]);
    };

    const handleInputChange = (event) => {
        setItemInput(event.target.value)
    };
    const selectedItem = value.find(item => `/list/${item.id}` === route);

    const removeItem = (itemId) => {
        let newArr = item.filter(i => i.id !== itemId)
        setItem(newArr)

    }

    return(
        <section className="detailSection">
            <Link to='/'>back</Link>
            <ul className="detailList">
                <div className='nameAndInputItem'>
                    <h2>{selectedItem ? selectedItem.name : 'Item not found'}</h2>
                    <form onSubmit={addItemToList} id="searchBar" className="name">
                        <input
                            id="searchQueryInput"
                            name="searchQueryInput"
                            type="text"
                            value={itemInput}
                            onChange={handleInputChange}
                            placeholder="Select a new Name..."
                            className="pr-8"
                        />
                        <button
                            id="searchQuerySubmit"
                            className="button"
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
                            <div key={i.id}>
                                <li>{i.item}</li>
                                <button onClick={() => {
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