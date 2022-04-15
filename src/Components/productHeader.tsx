import { useNavigate } from "react-router-dom";

const ProductHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl">
      <div className="max-w-8xl mx-auto px-2 shadow-2xl rounded-xl">
        <p
          className="ml-3 font-medium text-black cursor-pointer py-2 text-center"
          onClick={() => navigate("/")}
        >
          <span className="italic text-black font-bold">UPayments Store</span>
        </p>
      </div>
    </div>
  );
};
export default ProductHeader;
