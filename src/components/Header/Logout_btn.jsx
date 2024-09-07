import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../service/auth";
function Logout_btn() {
  const dispatch = useDispatch();
  const logout_handler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
      <button
        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg  px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
        onClick={logout_handler}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout_btn;
