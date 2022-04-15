import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  let navigate = useNavigate();

  // navigate product create form
  const navigateAddProduct = () => {
    navigate(`/add-product`, { replace: true });
  };
  return (
    <div className="fixed bottom-0 right-0">
      <button
        className="bottom-0 m-8 float-right"
        data-testid="productAddButton"
        onClick={() => navigateAddProduct()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          viewBox="0 0 24 24"
          width="70px"
          height="70px"
        >
          {" "}
          <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z" />
        </svg>
      </button>
    </div>
  );
};
export default ProductAdd;
