import { Home, ListDetail } from "./components";
import './App.css'
import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const ShoppingListContext = createContext();
const App = () => {
  const [shoppingList, setShoppingList] = useState([]);

  return(
    <BrowserRouter>
        <ShoppingListContext.Provider value={[shoppingList, setShoppingList]}>
          <div className="app">
            <Routes>
              <Route path="/" element={
                  <Home/>
                } />
              {shoppingList.map(item => {
                return(
                  <Route key={item.id} path={`/list/${item.id}`}  element={<ListDetail value={shoppingList} route={`/list/${item.id}`}/>} />
                  )
                })}
            </Routes>
          </div>
        </ShoppingListContext.Provider>
    </BrowserRouter>
  )
}

export default App;