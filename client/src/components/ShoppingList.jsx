import { useContext} from 'react';
import { ShoppingListContext } from '../App';
import { Link } from 'react-router-dom';
import './css/shoppingList.css'

const ShoppingList = () => {
    const [shoppingList] = useContext(ShoppingListContext);
    const colors = ["red", "blue", "green", "orange", "dark-blue", "teal", "pink", "yellow", "purple"]


    return(
        <section className='shoppingListSection'> 
           {shoppingList && shoppingList.map( item => {
                return(
                    <Link to={`/list/${item.id}`} className={`shoppingList ${colors[item.index]}`} key={item.id}>
                        <h1>{item.name}</h1>
                    </Link>
                )
           })}
        </section>
    )
}

export default ShoppingList;