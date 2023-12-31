import { useContext, useEffect } from "react";
import { ShoppingListContext } from "../App";
import { Link } from "react-router-dom";
import "./css/shoppingList.css";
import { buttons } from "../constants";

const ShoppingList = ({language}) => {
	const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
	const colors = ["red", "blue", "green", "orange", "dark-blue", "teal", "pink", "yellow", "purple"];


	useEffect(() => {
		const getShoppingLists = async () => {
			try {
				const response = await fetch("http://127.0.0.1:8000/ShoppingLists"); // Ensure the URL is correct
				if (response.ok) {
					const data = await response.json(); // Parse the JSON data
					setShoppingList(data.data.shoppingLists);
				} else {
					console.error("Server responded with an error:", response.status);
				}
			} catch (err) {
				console.error("Failed to fetch data:", err);
			}
		};

		getShoppingLists();
	}, []);

	

	const removeItem = async (itemId) => {
		let filteredList = shoppingList.filter((item) => item.id !== itemId);

		await fetch(`http://127.0.0.1:8000/shoppingLists/:${itemId}`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
		});
		setShoppingList(filteredList);
	};
	return (
		<section className={`shoppingListSection`}>
			{shoppingList &&
				shoppingList.map((item) => {
					return (
						<Link to={`/list/:${item.id}`} key={`${item.id}-shopL`} className={`shoppingList ${colors[item.colorIndex]} listName`}>
							<button
								className="removeButton"
								onClick={() => {
									removeItem(item.id);
								}}
							>
								{language === "english" ? buttons.remove.english : buttons.remove.czech}
							</button>
								<h1>{item.name}</h1>
						</Link>
					);
				})}
		</section>
	);
};

export default ShoppingList;
