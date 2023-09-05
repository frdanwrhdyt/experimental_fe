import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-6xl font-bold text-gray-800">404</div>
      <p className="text-xl text-gray-600">Page not found</p>
      <Link
        to="/"
        className="mt-4 px-6 py-3  hover:text-white text-blue-500 border border-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
