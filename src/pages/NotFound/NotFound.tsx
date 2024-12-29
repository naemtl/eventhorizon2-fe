import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div>You have discovered a liminal space that leads nowhere</div>
      <Link to="/">Turn back</Link>
    </div>
  );
}

export default NotFound;
