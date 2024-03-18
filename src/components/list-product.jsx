import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
		<div className="container mx-auto">
			<p className="text-2xl font-semibold mb-4">List Products</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products.map((product) => (
					<div key={product.id} className="bg-white rounded-lg shadow-md p-4 relative">
						<div className="flex justify-center items-center">
							<img src={product.image} alt={product.title} width={100} className="mb-4 " />
						</div>
						<div className="flex flex-col justify-between h-full">
							<div className="">
								<p className="text-sm font-semibold mb-2">{product.title}</p>
								<p className="text-red-500">${product.price}</p>
							</div>
						</div>
						<Link to={`/detail/${product.id}`} className="absolute inset-0 w-full h-full" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ListProduct;
