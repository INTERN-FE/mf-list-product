import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

import { useCart } from "../hooks/useCart";

describe("useCart", () => {
  test("adds a product to the cart", () => {
    const { result } = renderHook(() => useCart());
    const { dispatch } = result.current;

    act(() => {
      dispatch({ type: "ADD", payload: { id: 1, name: "Product A" } });
    });

    expect(result.current.state.products).toEqual([
      { id: 1, name: "Product A", qty: 1 },
    ]);
  });

  test("decreases the quantity of a product in the cart", () => {
    const { result } = renderHook(() => useCart());
    const { dispatch } = result.current;

    act(() => {
      dispatch({ type: "ADD", payload: { id: 1, name: "Product A" } });
      dispatch({ type: "ADD", payload: { id: 2, name: "Product B" } });
      dispatch({ type: "DECREASE", payload: 1 });
    });

    expect(result.current.state.products).toEqual([
      { id: 2, name: "Product B", qty: 1 },
    ]);
  });

  test("removes a product from the cart", () => {
    const { result } = renderHook(() => useCart());
    const { dispatch } = result.current;

    act(() => {
      dispatch({ type: "ADD", payload: { id: 1, name: "Product A" } });
      dispatch({ type: "ADD", payload: { id: 2, name: "Product B" } });
      dispatch({ type: "REMOVE", payload: 1 });
    });

    expect(result.current.state.products).toEqual([
      { id: 2, name: "Product B", qty: 1 },
    ]);
  });
});
