import { Home, ListDetail } from "./components";
import './App.css'
import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const ShoppingListContext = createContext();
const App = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [language, setLanguage] = useState("czech");
  const [dark, setDark] = useState(false);

  useEffect(() => {
        const getShoppingLists = async() => {
            try {
                const response = await fetch('http://127.0.0.1:8000/ShoppingLists'); // Ensure the URL is correct
                if (response.ok) {
                    const data = await response.json(); // Parse the JSON data
                    setShoppingList(data.data.shoppingLists);
                } else {
                    console.error('Server responded with an error:', response.status);
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };
        

        getShoppingLists()
    }, []);

  
  return(
    <BrowserRouter>
        <ShoppingListContext.Provider value={[shoppingList, setShoppingList]}>
          <div className="app">
            <Routes>
              <Route path="/" element={<Home language={language} setLanguage={setLanguage} dark={dark} setDark={setDark} />} />
              {shoppingList && shoppingList.map(items => (
                <Route key={items.id} path={`/list/:${items.id}`} element={
                  <ListDetail shoppingList={shoppingList} setShoppingList={setShoppingList} language={language} dark={dark} />
                } />
              ))}
            </Routes>
          </div>
        </ShoppingListContext.Provider>
    </BrowserRouter>
  );
};

export default App;
