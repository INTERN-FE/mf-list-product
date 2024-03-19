import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListProduct = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		

		const fetchProducts = async () => {
			const response = await fetch("https://fakestoreapi.com/products");
			const data = await response.json();
			setProducts(data);
		};

		fetchProducts();
	}, []);

	return (
		<div className="container mx-auto my-10">
			<p className="text-2xl font-semibold mb-4">List Products</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<div
						key={product.id}
						className="flex justify-between flex-col bg-white rounded-lg shadow-custom-dark p-4 relative h-72"
					>
						<div className="flex justify-center items-center h-full">
							<img src={product.image} alt={product.title} width={100} className="mb-4 " />
						</div>
						<div className="flex flex-col">
							<div className="">
								<p className="text-sm font-semibold mb-2 truncate ">{product.title}</p>
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
