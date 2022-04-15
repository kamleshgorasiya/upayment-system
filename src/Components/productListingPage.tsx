import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productService } from "../Services/product";
import {
  GetProductResponse,
  getProductCategoryResponse,
} from "../Interfaces/product";
import ProductAdd from "./productAddButton";
import placeholderImage from "../Assets/images/placeholder-img.jpg";
import ProductHeader from "./productHeader";
import swal from "sweetalert";

const ProductListingPage = () => {
  const [productList, setProductList] = useState<GetProductResponse[]>([]);
  const [filterArray, setFilterArray] = useState<GetProductResponse[]>([]);

  const [categoryList, setCategoryList] = useState<
    getProductCategoryResponse[]
  >([]);
  let navigate = useNavigate();

  useEffect(() => {
    getProductList();
    getCategoryList();
  }, []);

  // Get product list
  const getProductList = () => {
    productService
      .getProductListAPI()
      .then((data: GetProductResponse[]) => {
        setProductList(data);
        setFilterArray(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Get category list
  const getCategoryList = () => {
    productService
      .getProductCategory()
      .then((data: getProductCategoryResponse[]) => {
        setCategoryList(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Delete one product from list
  const deleteProduct = (id: string, event: any) => {
    event.stopPropagation();
    swal({
      title: "Delete",
      text: "Are you sure you want to delete this product!",
      icon: "warning",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
      closeOnClickOutside: false,
      closeOnEsc: false,
    }).then((willDelete) => {
      if (willDelete) {
        productService
          .deleteProductById(id)
          .then((data: getProductCategoryResponse[]) => {
            swal("Product has been deleted!", {
              icon: "success",
              timer: 3000,
            });
            setProductList(productList.filter((item) => item.id != id));
            setFilterArray(productList.filter((item) => item.id != id));
          })
          .catch((error) => {
            console.log("Error", error);
          });
      }
    });
  };

  // Navigate to particular product detail page
  const navigateDetail = (id: string) => {
    navigate(`/${id}`, { replace: true });
  };

  // filter using product name
  const filterProduct = (query: string) => {
    return filterArray.filter(function (el) {
      return (
        el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        el.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
  };

  // handle input event
  const inputChange = (event: any) => {
    if (event.target.value == "") {
      getProductList();
    }
    setProductList(filterProduct(event.target.value));
  };

  // category list option
  let categoryDefaultOption = <option value="">All</option>;
  let categoryListOption =
    categoryList.length > 0 ? (
      categoryList.map((category) => {
        return (
          <option value={category.name} key={category.id}>
            {category.name}
          </option>
        );
      })
    ) : (
      <option>No Category found...</option>
    );
  return (
    <div className="max-w-5xl m-auto">
      <ProductHeader />
      <div className="mt-8 flex lg:justify-between flex-wrap sm:justify-center ">
        <div className="col-span-6 sm:col-span-3 mr-2 mb-2">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by product name
          </label>
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="search"
            className="block w-80 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm border border-gray-300 rounded-md py-2 px-3 bg-white"
            placeholder="Apple Watch, Samsung S21, Macbook Pro..."
            onChange={(e) => inputChange(e)}
          />
        </div>
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Filter by category name
          </label>
          <select
            id="category"
            name="category"
            autoComplete="category"
            className="block w-80 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            onChange={(e) => inputChange(e)}
          >
            {categoryDefaultOption}
            {categoryListOption}
          </select>
        </div>
      </div>

      <div className="max-w-2xl mx-auto py-16 sm:py-12 lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productList.length > 0 ? (
            productList.map((product) => (
              <a
                key={product.id}
                className="group relative cursor-pointer bg-white rounded-lg p-2 shadow-md"
                onClick={() => navigateDetail(product.id)}
              >
                <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden xl:aspect-w-7 xl:aspect-h-8 w-52 h-52 p-2 m-auto">
                  <img
                    src={product.avatar ? product.avatar : placeholderImage}
                    alt={product.avatar}
                    className="w-full h-full object-center object-contain group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 font-bold font-black">
                  {product.name ? product.name : "Product Name"}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  $ {product.price ? product.price : "00.00"}
                </p>
                <button
                  className="absolute top-0 right-0 w-10 h-10 hover:bg-gray-400 bg-white rounded-full"
                  onClick={(e) => deleteProduct(product.id, e)}
                >
                  <svg
                    className="m-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#494c4e"
                      d="M20 2h-4v-.85C16 .52 15.48 0 14.85 0h-5.7C8.52 0 8 .52 8 1.15V2H4c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.73v14.02C3 22.09 4.91 24 7.25 24h9.5c2.34 0 4.25-1.91 4.25-4.25V5.73c.6-.35 1-.99 1-1.73 0-1.1-.9-2-2-2zm-1 17.75c0 1.24-1.01 2.25-2.25 2.25h-9.5C6.01 22 5 20.99 5 19.75V6h14v13.75z"
                    />
                    <path
                      fill="#494c4e"
                      d="M8 20.022c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm8 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm-4 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1z"
                    />
                  </svg>
                </button>
              </a>
            ))
          ) : (
            <p className="text-center w-full">No product....</p>
          )}
        </div>
      </div>
      <ProductAdd />
    </div>
  );
};
export default ProductListingPage;
