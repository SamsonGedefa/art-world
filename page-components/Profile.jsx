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

    const handleClick = (e) => {
      const value = e.target.value;
      if (value !== "") {
        console.log("not")
      } else {
        console.log("is empty")
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
      <div className="my-10 text-white space-y-4">
        <h2 className="text-5xl">Edit Account</h2>
        {editProfile ? <div>
          <form className="flex"  onSubmit={handleSubmit}>
            <div className="flex flex-col ">
              <label className=" m-2" htmlFor="user">
              Username
              </label>
              <label className=" m-2" htmlFor="password">
              Password
              </label>
              <label className="m-2" htmlFor="email">
              Email
              </label>
              <label className=" m-2" htmlFor="bio">
              Bio
              </label>
            </div> 
            <div className="flex flex-col text-black">
              <input 
                className="m-2 text-grey"
                type="username"
                name="username"
                placeholder={user.username}
                value={data.username}
                onChange={handleChange}
              />
              <input 
                className="m-2 text-black"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <input
                className="m-2 text-black"
                type="email"
                name="email"
                placeholder={user.email}
                value={data.email}
                onChange={handleChange}
              />
              <textarea
                className="m-2 text-black"
                type="bio"
                name="bio"
                placeholder="Tell me about yourself"
                value={data.bio}
                onChange={handleChange}
                onClick={handleClick}
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
        : <div className="flex flex-col">
            <label className="text-white" htmlFor="user">Username: {user.username}</label>
            <label className="text-white" htmlFor="user">Email: {user.email}</label>
            <label className="text-white" htmlFor="user">Bio: {user.bio}</label>
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
//   };
//     /// delete ALL anbove thiss
//     const router = useRouter();
//     const [editProfile, setEditProfile] = useState("False");
//     const [isLoading, setIsLoading] = useState(false);
//     const nameRef = useRef();

//     function onClick(event) {
//         event.preventDefault()
//         setEditProfile("True");
//     }

//     function cancel() {
//         setEditProfile("False");
//     }

//     async function makeGetRequest(e) {
//         e.preventDefault();
//         let payload = { name: nameRef.current.value, occupation: 'gardener' };
//         const axiosConfig = {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           };
    
//         const response = await axios.post("/api/auth/signup", payload, axiosConfig);
//         const user = await findUserByUsernameAndUpdate(session.user.username);
//       }
      

//     const onSubmit = useCallback(async (e) => {
//         e.preventDefault();
//         alert(nameRef.current.value)
//         const data = JSON.stringify({
//           name: nameRef.current.value,
//           email: user.email
//         });
        

//         const axiosConfig = {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         };
    
//         try {
//           setIsLoading(true);
//           let res = await axios.post('api/auth/update',data , axiosConfig);
//           console.log(res)
//         } catch (e) {
//           toast.error(e.message, { autoClose: 1000 });
//         } finally {
//           setIsLoading(false);
//           router.push("/profile");
//           setEditProfile("False");
//         }
//       }, []);

//     if (editProfile === "True") {
//         return (
//             <div className="flex h-full">
//             <form className="flex flex-col p-2 m-2 text-white" onSubmit={onSubmit}>

//             <label htmlFor="username">Pick your Username</label>
//             <input
//               type="text"
//               id="username"
//               ref={nameRef}
//             />

//                 <label>Avatar Selection:</label> 
                
//                 {/* <div className="flex flex-wrap p-2">
//                     <img className="flex p-2" src="https://picsum.photos/75/75" alt={ user.username + " avatar"} height={50} width={50}/> 
//                     <img className="flex p-2" src="https://picsum.photos/75/75" alt={ user.username + " avatar"} height={50} width={50}/> 
//                     <img className="flex p-2" src="https://picsum.photos/75/75" alt={ user.username + " avatar"} height={50} width={50}/> 
//                     <img className="flex p-2" src="https://picsum.photos/75/75" alt={ user.username + " avatar"} height={50} width={50}/> 
//                 </div> */}
//                 <button className="" >Upload Avatar</button> 
//                 <br/>
//                 <label>Bio:</label>
//                 <textarea placeholder="What about you?"></textarea>
//                 <br/>
//                 <label>Email: {user.email}</label>
//                 <input htmlFor="email"></input>


//             </form>
//         </div>
//         )

//     } else {
//         return (

//         )
//     }
// }