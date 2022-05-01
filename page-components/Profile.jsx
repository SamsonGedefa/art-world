import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Hero from "../page-components/UserPost/Hero"

export default function Profile ({user}) {
    const router = useRouter();
    const [editProfile, setEditProfile] = useState(false)
    const [data, setData] = useState({
      username: user.username,
      password: "",
      bio: user.bio,
      email: user.email
    });

    function handleEdit()  {
      if (editProfile) {
        setEditProfile(false)
      } else {
        setEditProfile(true)
      }
    }

    const handleChange = (e) => {
      const value = e.target.value;
      if (value !== "") {
        setData({
          ...data,
          [e.target.name]: value
        });
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userData = ({
        id : user._id,
        username: data.username,
        password: data.password,
        bio: data.bio,
        email: data.email
      });
        try {
          toast('Making changes ...', { autoClose: 1000 });
          await axios.post("api/update", userData)
        } catch (e) {
          toast.error(e.message, { autoClose: 1000 });
        } finally {
          toast('Returning home ...', { autoClose: 1000 });
          router.push("/login"); 
        }
    };

    return (
      <div className="flex flex-col h-full">
      <Hero user={user} />
      <div className="flex-grow h-full px-10 ">
      <div className="my-10 space-y-4">
        <h2 className="text-5xl text-white">Edit Account</h2>
        {editProfile ? <div>
          <form className="flex"  onSubmit={handleSubmit}>
            <div className="flex flex-col text-white">
              <label className="uppercase m-2" htmlFor="user">
              Username
              </label>
              <label className="uppercase m-2" htmlFor="password">
              Password
              </label>
              <label className="uppercase m-2" htmlFor="email">
              Email
              </label>
              <label className="uppercase m-2" htmlFor="bio">
              Bio
              </label>
            </div> 
            <div className="flex flex-col text-black ">
              <input 
                className="m-2 rounded-lg"
                type="username"
                name="username"


                onChange={handleChange}
              />
              <input 
                className="m-2 rounded-lg"
                type="password"
                name="password"

                onChange={handleChange}
              />
              <input
                className="m-2 rounded-lg"
                type="email"
                name="email"

                onChange={handleChange}
              />
              <textarea
                className="m-2 rounded-lg"
                type="bio"
                name="bio"
                placeholder="Tell me about yourself"

                onChange={handleChange}
              />

            </div>

          </form>
          
          <div className="flex m-2">
              <button onClick={handleSubmit}
                className="bg-[#5dec9e]  text-white rounded-xl px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"
              >
                Submit
              </button>
              <button onClick={handleEdit}
                className="bg-[#5f9ea0]  text-white rounded-xl px-4 py-1.5 font-bold shadow-md hover:bg-[#5f9ea0]"
              >
                Cancel
              </button>
            </div>

        </div> 
        : <div className="flex flex-col text-white">
            <label className="p-2 " htmlFor="user">Username: {user.username}</label>
            <label className="p-2" htmlFor="user">Email: {user.email}</label>
            <label className="p-2" htmlFor="user">Bio: {user.bio}</label>
            <div className="flex justify-around p-2">
              <button onClick={handleEdit}
                className="bg-[#5dec9e] flex-auto  text-white rounded-xl px-4 py-1.5 font-bold shadow-md hover:bg-[#47f093]"
              >
                Edit
              </button>
            </div>

        </div>
        }


          </div>
        </div>
        
      </div>
    );
}