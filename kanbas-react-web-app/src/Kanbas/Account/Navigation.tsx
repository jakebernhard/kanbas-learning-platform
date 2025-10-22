import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  return (
    <div id="wd-account-navigation">
      {links.map((link) => (
        <>
          <Link to={`/Kanbas/Account/${link}`}>{link}</Link>
          <br />
        </>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kanbas/Account/Users`} className={`list-group-item`}>
          {" "}
          Users{" "}
        </Link>
      )}
    </div>
  );
}
