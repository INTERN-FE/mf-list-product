import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.scss";
import DetailProduct from "./components/detail-product";
import ListProduct from "./components/list-product";

const App = () => (
	<div className="">
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<ListProduct />} />
					<Route path="detail/:id" element={<DetailProduct />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</div>
);
ReactDOM.render(<App />, document.getElementById("app"));

