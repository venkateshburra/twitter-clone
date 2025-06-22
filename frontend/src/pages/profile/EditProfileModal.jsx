import { useEffect, useState } from "react";
import useUpdatedUserProfile from "../../hooks/useUpdatedUserProfile";

const EditProfileModal = ({ authUser }) => {

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  const { updateProfile, isUpdatingProfile } = useUpdatedUserProfile();

  // const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
  //   mutationFn: async () => {
  //     try {
  //       const res = await fetch("/api/users/update", {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });
  //       const data = await res.json();
  //       if (!res.ok) {
  //         throw new Error(data.error || "Something went wrong");
  //       }
  //       return data;
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   },
  //   onSuccess: () => {
  //     toast.success("Profile updated successfully");
      // document.getElementById("edit_profile_modal").close();
  //     Promise.all([
  //       queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  //       queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
  //     ]);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        currentPassword: authUser.currentPassword,
        newPassword: authUser.newPassword,

      })
    }
  }, [authUser])

  return (
    <>
      <button
        className="rounded-full btn btn-outline btn-sm"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="bg-black border border-gray-700 rounded-md shadow-md modal-box">
          <h3 className="my-3 text-lg font-bold">Update Profile</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile(formData);
            }}
          >
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 p-2 bg-black border border-gray-700 rounded input input-md"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 p-2 bg-black border border-gray-700 rounded input input-md"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 p-2 bg-black border border-gray-700 rounded input input-md"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Bio"
                className="flex-1 p-2 bg-black border border-gray-700 rounded input input-md"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 p-2 bg-black border border-gray-700 rounded input input-md"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 p-2 bg-black border border-gray-700 rounded input input-md"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              placeholder="Link"
              className="flex-1 p-2 bg-black border border-gray-700 rounded input input-md"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />
            <button className="text-white rounded-full btn btn-primary btn-sm">
              {isUpdatingProfile ? "Updating" : " Update"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};
export default EditProfileModal;
