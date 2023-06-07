import { Link } from "react-router-dom";

const HomeLink = () => {
  return (
    <Link to="/">
      <img src="/chess.ico" alt="To Home" height={24} width={24} />
    </Link>
  );
};

export default HomeLink;
