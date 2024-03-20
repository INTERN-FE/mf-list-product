/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Wednesday, March 20th 2024, 8:01:55 am
 * Author: Annisa Nailiya Zahrah, Abdul Raihan & Rizki Rifani
 *
 */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "react-simple-loading";

const API_URL = "https://fakestoreapi.com/products";

export const DetailProduct = ({ cartItem, dispatch }) => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`${API_URL}/${id}`);
				const data = await response.json();
				setProduct(data);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();
	}, [id]);

	if (!product) {
		return (
			<div className="flex justify-center items-center h-screen ">
				<Loading />
			</div>
		);
	}

	// Rest of the component code goes here

	const addToCart = (product) => {
		dispatch({
			type: "ADD",
			payload: product,
		});
	};

	const decreaseItem = (id) => {
		dispatch({
			type: "DECREASE",
			payload: id,
		});
	};

	const removeItem = (id) => {
		dispatch({
			type: "REMOVE",
			payload: id,
		});
	};

	const getCheckoutURL = () => {
		const searchParam = new URLSearchParams();
		const stringifiedProducts = JSON.stringify(cartItem);
		searchParam.set("items", stringifiedProducts);
		return `/payment?${searchParam.toString()}`;
	};

	return (
		<div className="container mx-auto flex flex-col sm:flex-row justify-center h-screen px-6 mt-10 mb-30 gap-10 font-poppins">
			<div className="flex-1">
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
				<div className="flex flex-col sm:flex-row mt-10 gap-4">
					<div className="basis-1/2">
						<h1 className="text-2xl font-semibold">{product?.title}</h1>
						<p className="text-sm font-normal pt-1">{product?.category}</p>
						<p className="text-xl font-bold text-red-500 my-2">${product?.price}</p>
						<p className="text-sm mt-2">{product?.description}</p>
					</div>
					<div className="basis-1/2">
						<button
							onClick={() => {
								dispatch({
									type: "ADD",
									payload: product,
								});
							}}
							className="w-full h-12 sm:w-52 rounded-md bg-btnList text-white font-semibold text-base"
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-col flex-none md:w-80 py-10 gap-2">
				<h3 className="font-bold text-lg">Cart Item</h3>
				{cartItem
					? cartItem.map((item) => (
							<CartItem
								key={item.id}
								product={item}
								addToCart={addToCart}
								decreaseItem={decreaseItem}
								removeItem={removeItem}
							/>
					  ))
					: null}

				<Link
					to={getCheckoutURL()}
					className="mx-auto w-full h-12 mt-2 rounded-md bg-btnList flex items-center justify-center text-white font-semibold text-base"
				>
					Checkout items
				</Link>
			</div>
		</div>
	);
};

export function CartItem({ product, addToCart, decreaseItem, removeItem }) {
	return (
		<article className="border rounded-xl p-2 flex gap-5">
			<img src={product.image} className="w-16 h-16 object-contain" />

			<div className="flex flex-col gap-2">
				<p className="text-sm font-medium truncate overflow-hidden w-52">{product.title}</p>

				<div className="flex gap-4 items-center">
					<button onClick={() => removeItem(product.id)} className="border text-xs font-medium p-2 rounded">
						Remove
					</button>

					<button
						onClick={() => decreaseItem(product.id)}
						className="border text-xs font-medium w-6 h-6 flex items-center justify-center rounded"
					>
						-
					</button>

					<p className="text-xs">{product.qty}</p>

					<button
						onClick={() => addToCart(product)}
						className="border text-xs font-medium w-6 h-6 flex items-center justify-center rounded"
					>
						+
					</button>
				</div>
			</div>
		</article>
	);
}
