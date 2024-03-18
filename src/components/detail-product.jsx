import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
				<Link to="/">
					<div className="flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 9">
							<path fill="currentColor" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5" />
							<path
								fill="currentColor"
								d="M6 8.5a.47.47 0 0 1-.35-.15l-3.5-3.5c-.2-.2-.2-.51 0-.71L5.65.65c.2-.2.51-.2.71 0c.2.2.2.51 0 .71L3.21 4.51l3.15 3.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
							/>
						</svg>
						<p className="my-2 text-lg font-medium">Home</p>
					</div>
				</Link>
				<div className="flex justify-center items-center border p-4 rounded-md">
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
