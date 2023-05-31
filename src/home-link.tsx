import { Link } from "react-router-dom";

const HomeLink = () => {
  return (
    <Link to="/">
      <img src="/chess.ico" alt="To Home" />
    </Link>
  );
};

export default HomeLink;
