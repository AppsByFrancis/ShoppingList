import { useContext} from 'react';
import { ShoppingListContext } from '../App';
import { Link } from 'react-router-dom';
import './css/shoppingList.css'


const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
    const colors = ["red", "blue", "green", "orange", "dark-blue", "teal", "pink", "yellow", "purple"]

    const removeItem = (itemId) => {
        const filteredList = shoppingList.filter(item => item.id !== itemId);

        setShoppingList(filteredList);
    };
    return(
        <section className='shoppingListSection'> 
           {shoppingList && shoppingList.map( item => {
                return(
                    <div key={item.id} className={`shoppingList ${colors[item.index]}`}>
                        <button onClick={() => {removeItem(item.id)}}>Remove</button>
                        <Link to={`/list/${item.id}`} key={item.id}>
                            <h1>{item.name}</h1>
                        </Link>
                    </div>
                )
           })}
        </section>
    )
}

export default ShoppingList;