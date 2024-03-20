import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.scss";
import { DetailProduct } from "./components/detail-product";
import ListProduct from "./components/list-product";
import { useCart } from "./hooks/useCart";

const App = () => {
	const { state, dispatch } = useCart();

	const cartItem = state.products;

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<ListProduct />} />
						<Route path="detail/:id" element={<DetailProduct dispatch={dispatch} cartItem={cartItem} />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
ReactDOM.render(<App />, document.getElementById("app"));
