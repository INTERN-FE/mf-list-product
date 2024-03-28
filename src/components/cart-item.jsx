const CartItem = ({ product, addToCart, decreaseItem, removeItem }) => {
  return (
    <article className="border rounded-xl p-2 flex gap-5">
      <img src={product.image} className="w-16 h-16 object-contain" />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium truncate overflow-hidden w-52">
          {product.title}
        </p>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => removeItem(product.id)}
            className="border text-xs font-medium p-2 rounded"
          >
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
};

export default CartItem;
