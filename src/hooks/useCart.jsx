import { useReducer } from "react";

export function useCart_() {
	const [cartItem, setCartItem] = useState([]);

	useEffect(() => {
		const urlSearchParam = new URLSearchParams(window.location.search);
		const cartFromURL = urlSearchParam.get("cart");
		setCartItem(JSON.parse(cartFromURL));
	});

	return {
		cartItem,
	};
}
const reducer = (state, action) => {
	const { products } = state;
	switch (action.type) {
		case "ADD":
			if (products?.length && state.products !== null) {
				//Find the item in array
				const found = products.findIndex((prod) => prod.id === action.payload.id);

				//If found then update the array
				if (found >= 0) {
					return {
						products: products.map((pro, i) => {
							if (i === found) {
								return { ...pro, ...action.payload };
							}
							return pro;
						}),
					};
				}
				return {
					products: [...products, { ...action.payload, qty: 1 }],
				};
			}
			return {
				products: [{ ...action.payload, qty: 1 }],
			};
		case "DECREASE":
			if (!products) return state;
			//Find the product in array
			const findProd = products.find((prod) => prod.id === action.payload);
			if (!findProd) return state;

			//Check if the product qty is 1, if yes then remove it
			if (findProd.qty === 1) {
				return {
					products: products.filter((prod) => prod.id !== findProd.id),
				};
			}

			return {
				prevUrl,
				products: products.map((prod) => {
					if (prod === findProd) {
						return {
							...findProd,
							qty: findProd.qty - 1,
						};
					}
					return prod;
				}),
			};

		case "REMOVE":
			if (!products?.length) return state;
			return {
				products: products.filter((product) => product.id !== action.payload),
			};

		default:
			return state;
	}
};

const initialState = {
	products: [],
};

export function useCart() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return {
		state,
		dispatch,
	};
}
