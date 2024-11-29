import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:1111";

const DataBaseProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  console.log("product", products);

  // This is a GetAllProducts useEffect
  useEffect(() => {
    const GetAllProducts = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(
          `${API_BASE_URL}/api/admin/product/get-All-Product`,
          { headers }
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    GetAllProducts();
  }, []);

  const getImageUrl = (images) => {
    if (images && images.length > 0) {
      return `${API_BASE_URL}/${images[0]}`;
    }
    return "default-image-url.jpg";
  };

  // ADD TO CART PRODUCT FUNCTION
  const addToCart = async (product) => {
    console.log("productdata is ===>>> ", product);
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.post(
        `${API_BASE_URL}/api/user/cart/add-cart`,
        {
          productId: product._id,
          quantity: 1,
        },
        { headers }
      );
      console.log("react response add to cart", response);

      setMessage("Product added to cart successfully!");
      console.log(response.data);

      // Redirect to cart page
      navigate("/addtocart");
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response ? error.response.data : error.message
      );
      setMessage("Please try again!!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid pb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
      {products.length > 0 ? (
        products.map((products) => {
          return (
            <div
              key={products._id}
              className="relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-full"
            >
              <a
                href="#"
                className="relative mx-3 mt-3 flex h-64 overflow-hidden rounded-xl"
              >
                <img
                  src={getImageUrl(products.productImage)}
                  alt={products.title}
                  className="w-full h-full object-cover"
                />
                {products.discount && (
                  <span className="absolute m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
                    {products.discount}% OFF
                  </span>
                )}
              </a>
              <div className="mt-4 px-5 pb-5 flex-grow">
                <a href="#">
                  <h5 className="text-xl tracking-tight text-slate-900">
                    {products.title}
                  </h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-3xl font-bold text-slate-900">
                      ${products.price}
                    </span>
                    {products.slashPrice && (
                      <span className="text-xl text-slate-900 line-through ml-2">
                        ${products.slashPrice}
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <button
                    className="bg-[#000] hover:bg-[#ff0000] text-nowrap duration-500 text-white py-2 px-4 rounded-full flex items-center"
                    onClick={() => addToCart(products._id)}
                    disabled={loading}
                  >
                    <FaShoppingCart className="mr-2" />
                    {loading ? "Adding..." : "Add To Cart"}
                  </button>

                  {/* Display success or error message */}
                  {message && <p>{message}</p>}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-[#ff0000] text-3xl font-serif">
          No products found...
        </p>
      )}
    </div>
  );
};

export default DataBaseProduct;
