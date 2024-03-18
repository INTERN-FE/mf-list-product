import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailProduct = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`https://fakestoreapi.com/products/${id}`);
				const data = await response.json();
				setProduct(data);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();
	}, [id]);

	if (!product) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container mx-auto flex justify-center h-screen px-6 my-10">
			<div className="w-8/12">
				<div className="flex justify-center items-center">
					<img src={product?.image} alt={product?.title} className="rounded-md w-80 h-96" />
				</div>
				<div className="flex flex-row mt-10 gap-4">
					<div className="basis-1/2">
						<h1 className="text-2xl font-bold">{product?.title}</h1>
						<p className="text-sm font-semibol">{product?.category}</p>
						<p className="text-lg font-semibold text-red-500 my-2">${product?.price}</p>
						<p className="text-base mt-2">{product?.description}</p>
					</div>
					<div className="basis-1/2">
						<button className="w-52 h-12 rounded-md bg-btnList text-white font-semibold text-base">Add to Cart</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;
