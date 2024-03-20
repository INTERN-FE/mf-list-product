import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { DetailProduct, CartItem } from "../components/detail-product";

// Mocking the useParams hook
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({
		id: 1,
	}),
}));

// Mocking the fetch function
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve({
				id: 1,
				title: "Test Product",
				price: 100,
				image: "test.jpg",
				description: "Test Description",
				category: "Test Category",
			}),
	})
);

describe("DetailProduct", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders DetailProduct component", async () => {
		render(
			<Router>
				<DetailProduct />
			</Router>
		);

		// Wait for the product to be fetched
		await waitFor(() => screen.getByText("Test Product"));

		expect(screen.getByText("Test Product")).toBeInTheDocument();
		expect(screen.getByText("Test Description")).toBeInTheDocument();
		expect(screen.getByText("Test Category")).toBeInTheDocument();
		expect(screen.getByText("$100")).toBeInTheDocument();
	});

	test("add to cart button dispatches action", async () => {
		const dispatch = jest.fn();
		render(
			<Router>
				<DetailProduct dispatch={dispatch} />
			</Router>
		);

		// Wait for the product to be fetched
		await waitFor(() => screen.getByText("Test Product"));

		fireEvent.click(screen.getByText("Add to Cart"));

		expect(dispatch).toHaveBeenCalledWith({
			type: "ADD",
			payload: {
				id: 1,
				title: "Test Product",
				price: 100,
				image: "test.jpg",
				description: "Test Description",
				category: "Test Category",
			},
		});
	});
});

describe("CartItem", () => {
	test("CartItem component renders correctly", () => {
		const product = {
			id: 1,
			title: "Test Product",
			price: 100,
			image: "test.jpg",
			description: "Test Description",
			category: "Test Category",
			qty: 1,
		};
		const { getByText } = render(<CartItem product={product} />);

		expect(getByText("Test Product")).toBeInTheDocument();
	});

	test("CartItem buttons dispatch actions", () => {
		const product = {
			id: 1,
			title: "Test Product",
			price: 100,
			image: "test.jpg",
			description: "Test Description",
			category: "Test Category",
			qty: 1,
		};
		const addToCart = jest.fn();
		const decreaseItem = jest.fn();
		const removeItem = jest.fn();

		const { getByText } = render(
			<CartItem product={product} addToCart={addToCart} decreaseItem={decreaseItem} removeItem={removeItem} />
		);

		fireEvent.click(getByText("Remove"));
		expect(removeItem).toHaveBeenCalledWith(1);

		fireEvent.click(getByText("-"));
		expect(decreaseItem).toHaveBeenCalledWith(1);

		fireEvent.click(getByText("+"));
		expect(addToCart).toHaveBeenCalledWith(product);
	});
});
