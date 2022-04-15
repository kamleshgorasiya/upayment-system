import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../Services/product";
import ProductHeader from "./productHeader";
import placeholderImage from "../Assets/images/placeholder-img.jpg";
import { useNavigate } from "react-router-dom";

const ProductDetailsPage = () => {
  const [productDetail, setProductDetails] = useState<any>([]);
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductDetails(id);
  }, []);

  // get product detail by product ID
  const getProductDetails = (id: any) => {
    productService
      .getProductById(id)
      .then((data: any) => {
        setProductDetails(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const brokenImage = () => {
    return placeholderImage;
  };
  return (
    <div className="max-w-5xl m-auto">
      <ProductHeader />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol role="list" className="mx-auto flex items-center space-x-2">
          <li>
            <div className="flex items-center">
              <a
                className="mr-2 text-sm font-medium text-gray-900 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.526 6.10576C15.0265 6.33917 15.2667 6.88343 15.0625 7.3214L9.88541 18.4237C9.68118 18.8616 9.10985 19.0275 8.60931 18.7941C8.10877 18.5607 7.86857 18.0164 8.0728 17.5784L13.2499 6.47616C13.4541 6.03819 14.0254 5.87235 14.526 6.10576Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </li>
          <li className="text-sm">
            <a
              aria-current="page"
              className="font-medium text-gray-500 hover:text-gray-600 cursor-pointer"
            >
              {productDetail.name}
            </a>
          </li>
        </ol>
      </nav>
      <div className="w-full relative flex items-center pt-8 pb-8 overflow-hidden">
        <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
          <div className="aspect-w-2 aspect-h-3 rounded-lg bg-white overflow-hidden sm:col-span-4 lg:col-span-5 p-2">
            <img
              onError={() => brokenImage()}
              src={
                productDetail.avatar ? productDetail.avatar : placeholderImage
              }
              alt={productDetail.avatar}
              className="object-center object-cover w-full h-full"
            />
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
              {productDetail.name ? productDetail.name : "Product Title"}
            </h2>

            <section aria-labelledby="information-heading" className="mt-2">
              <p className="text-2xl text-gray-900">
                {" "}
                $ {productDetail.price ? productDetail.price : "00.00"}
              </p>
            </section>
          </div>
          <div className="border-b-4 border-gray-700 w-full lg:col-span-12 sm:col-span-12"></div>
          <h3 className="text-3xl">Description</h3>
          <p className="lg:col-span-12 sm:col-span-12">
            {productDetail.description
              ? productDetail.description
              : "No Description..."}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
