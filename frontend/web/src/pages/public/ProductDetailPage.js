import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { useLoading } from "../../context/LoadingContext";

import Narvbar from "./components/Navbar";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const formatted = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return formatted;
};

const thClass = "text-left p-3 border-b border-[#cbcbcb]";
const tdClass = "text-left p-3 border-b border-[#cbcbcb]";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { isLoading, showLoading, hideLoading } = useLoading();

  const sortByPrice = (stores) => {
    return stores.sort((a, b) => a.price - b.price);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      showLoading("Fetching product...");
      try {
        const response = await axios.get(
          `http://localhost:5000/products/${id}`
        );

        // Sort stores by price
        if (response.data.stores.length > 0) {
          response.data.stores = sortByPrice(response.data.stores);
        }
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        hideLoading();
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return null;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="min-h-screen max-w-screen flex flex-col items-center bg-[#f2f2f2] font-sans">
      <Narvbar />
      <div className="w-full min-h-[100px] flex justify-center items-center p-5 bg-[#8675b3] text-white">
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>
      <div className="flex flex-row flex-1 w-4/5 my-10 gap-[50px] px-0 max-[950px]:w-full max-[950px]:px-[10px] max-[950px]:gap-[15px] max-[750px]:flex-col max-[750px]:gap-[20px]">
        <div className="w-fit h-fit p-5 border border-[#ccc] rounded-md shadow-[0_2px_5px_rgba(0,0,0,0.3)] max-[750px]:mx-auto">
          <img
            className="max-w-[300px] w-full h-auto"
            src={product.imageUrl}
            alt={product.query}
          />
        </div>
        <div className="flex-1 h-fit">
          <p className="text-[16px] mb-[10px] text-[#666]">
            Last Scraped at: {formatDate(product.scrapedAt)}
          </p>
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#e0e0e0] font-bold">
                  <th className={thClass}>Store</th>
                  <th className={thClass}>Availability</th>
                  <th className={thClass}>Price</th>
                  <th className={thClass}></th>
                </tr>
              </thead>

              <tbody>
                {product.stores.map((store) => (
                  <tr key={store.storeName}>
                    <td className={tdClass + " capitalize"}>
                      {store.storeName}
                    </td>
                    <td className={tdClass}>Available</td>
                    <td className={tdClass}>${store.price}</td>
                    <td className={tdClass}>
                      <a
                        className="text-blue-500 hover:underline"
                        href={store.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy Now
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
