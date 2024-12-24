import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div>404 Not Found</div>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;
