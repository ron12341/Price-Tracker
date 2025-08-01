import { useState, useEffect } from "react";
import TrackButton from "./TrackButton";

const ProductCard = ({ product, isTracked, onTrackingProduct }) => {
  const [lowestPriceStore, setLowestPriceStore] = useState(product.stores[0]);

  const findLowestPrice = () => {
    let lowestPriceStore = product.stores[0];
    for (let i = 1; i < product.stores.length; i++) {
      if (parseInt(product.stores[i].price) < parseInt(lowestPriceStore.price)) {
        lowestPriceStore = product.stores[i];
      }
    }
    return lowestPriceStore;
  };

  useEffect(() => {
    setLowestPriceStore(findLowestPrice());
  }, []);

  return (
    <div className="max-w-[300px] flex flex-col items-center justify-between p-5 border border-gray-300 rounded-md bg-white shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg cursor-pointer relative">
      <TrackButton
        productId={product._id}
        isTracked={isTracked}
        onClick={onTrackingProduct}
        className="absolute top-2 right-2"
      />

      <a href={`/products/${product._id}`} className="flex flex-1 flex-col items-center justify-between w-full">
        <img src={product.imageUrl} alt={product.name} className="max-w-full h-auto mb-2.5" />
        <p className="text-center w-full text-lg font-bold mb-1.5 line-clamp-2">{product.query}</p>
      </a>
      <div className="flex flex-row items-center justify-between w-full mt-2.5 text-lg font-bold">
        <p>
          <span className="mr-1.5">$</span>
          {lowestPriceStore.price}
        </p>
        <p className="capitalize text-center">{lowestPriceStore.storeName}</p>
      </div>
    </div>
  );
};

export default ProductCard;
