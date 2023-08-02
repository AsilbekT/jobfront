import { useContext } from "react";
import { UserContext } from "../../pages/context/UserContext";

const BreadCrumb = ({ title = "" }) => {
  const user = useContext(UserContext);

  return (
    <div className="upper-title-box">
      <h3>
        {!user ? 'You are not logged in, please login to interact with the page' : title}
      </h3>
      <div className="text">Ready to jump back in?</div>
    </div>
  );
};

export default BreadCrumb;
