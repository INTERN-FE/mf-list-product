import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ListProduct from "../components/list-product";

// Mock fetch API
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{
					id: 1,
					title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
					price: 109.95,
					description:
						"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
					category: "men's clothing",
					image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
					rating: {
						rate: 3.9,
						count: 120,
					},
				},
				// Add more products as needed
			]),
	})
);

test("renders ListProduct component with product details", async () => {
	render(
		<Router>
			<ListProduct />
		</Router>
	);

	// Wait for the products to be fetched
	await waitFor(() => screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"));

	// Check if the correct product details are rendered
	expect(screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).toBeInTheDocument();
	expect(screen.getByText("$109.95")).toBeInTheDocument();
});
