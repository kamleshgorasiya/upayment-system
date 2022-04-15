import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { productService } from "../Services/product";
import {
  AddProductRequest,
  GetProductResponse,
  getProductCategoryResponse,
} from "../Interfaces/product";
import { useNavigate } from "react-router-dom";
import ProductHeader from "./productHeader";
const ProductAddForm = () => {
  const [categoryList, setCategoryList] = useState<
    getProductCategoryResponse[]
  >([]);
  let navigate = useNavigate();

  // validate product create form
  const validate = (values: AddProductRequest) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Product name is required";
    }

    if (!values.description) {
      errors.description = "Product description is Required";
    }

    if (!values.developerEmail) {
      errors.developerEmail = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.developerEmail)
    ) {
      errors.developerEmail = "Invalid email address";
    }

    if (!values.avatar) {
      errors.avatar = "Product image url Required";
    }

    if (!values.price) {
      errors.price = "Product price is Required";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      developerEmail: "",
      avatar: "",
      category: "",
      price: "",
    },
    validate,
    onSubmit: (values) => {
      productService
        .addProduct(values)
        .then((data: GetProductResponse[]) => {
          navigate(`/`, { replace: true });
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  });
  useEffect(() => {
    getCategoryList();
  }, []);

  // get category list
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
  return (
    <>
      <ProductHeader />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create Product
          </h2>
          <form
            className="mt-8 space-y-6"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <div
              className="rounded-md shadow-sm"
              data-testid="createproductForm"
            >
              <div className="mt-2">
                <input
                  id="product-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Product name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name ? (
                  <p className="text-xs font-bold text-red-500 border-0 border-transparent p-1">
                    {formik.errors.name}
                  </p>
                ) : null}
              </div>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                ></textarea>
                {formik.errors.description ? (
                  <p className="text-xs font-bold text-red-500 border-0 border-transparent p-1">
                    {formik.errors.description}
                  </p>
                ) : null}
              </div>
              <div className="mt-2">
                <input
                  id="developer-email"
                  name="developerEmail"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.developerEmail}
                />
                {formik.errors.developerEmail ? (
                  <p className="text-xs font-bold text-red-500 border-0 border-transparent p-1">
                    {formik.errors.developerEmail}
                  </p>
                ) : null}
              </div>
              <div className="mt-2">
                <input
                  id="product-image"
                  name="avatar"
                  type="text"
                  autoComplete="avatar"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Image URL"
                  onChange={formik.handleChange}
                  value={formik.values.avatar}
                />
                {formik.errors.avatar ? (
                  <p className="text-xs	font-bold	text-red-500 border-0 border-transparent">
                    {formik.errors.avatar}
                  </p>
                ) : null}
              </div>
              <div className="mt-4">
                <select
                  id="category"
                  name="category"
                  autoComplete="category"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  onChange={formik.handleChange}
                >
                  {categoryList.length > 0 ? (
                    categoryList.map((category) => {
                      return (
                        <option value={category.name} key={category.id}>
                          {category.name}
                        </option>
                      );
                    })
                  ) : (
                    <option>No Category found...</option>
                  )}
                </select>
              </div>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="price"
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                {formik.errors.price ? (
                  <p className="text-xs font-bold text-red-500 border-0 border-transparent p-1">
                    {formik.errors.price}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-4">
              <button
                data-testid="productSubmit"
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black uppercase"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default ProductAddForm;
