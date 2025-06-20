import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAuth } from "../GetAuth";

const Sidebar = () => {
  const queryClient= useQueryClient();
  
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || " Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["authUser"]})
    },
	onError: () => {
		toast.error("Logout failed");
	}
  });

 const { data : authUser} = useQuery({ queryKey: ['authUser'], queryFn:getAuth})

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 flex flex-col w-20 h-screen border-r border-gray-700 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          <XSvg className="w-12 h-12 px-2 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer hover:bg-stone-900 max-w-fit"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="hidden text-lg md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer hover:bg-stone-900 max-w-fit"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="hidden text-lg md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex items-center gap-3 py-2 pl-2 pr-4 transition-all duration-300 rounded-full cursor-pointer hover:bg-stone-900 max-w-fit"
            >
              <FaUser className="w-6 h-6" />
              <span className="hidden text-lg md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="hidden avatar md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="w-20 text-sm font-bold text-white truncate">
                  {authUser?.fullName}
                </p>
                <p className="text-sm text-slate-500">@{authUser?.username}</p>
              </div>
              <BiLogOut
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
