import React from "react";
import { useState, useEffect } from "react";

const ListProduct = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch("https://fakestoreapi.com/products");
			const json = await response.json();
			setProducts(json);
		};

		fetchProducts();
	}, []);

	return (
		<div>
			<p>List Product</p>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						{product.title} - {product.price}
						<img src={product.image} alt="" width={100} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default ListProduct;
