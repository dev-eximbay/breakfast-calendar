import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4 text-lg">여긴 아무것도 없는데용</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        집으로 가기
      </Link>
    </div>
  );
};
