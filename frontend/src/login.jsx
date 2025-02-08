import im1 from "./assets/chercher.png"
import im2 from "./assets/logo-apple.png"
import im3 from "./assets/facebook.png"
import { Link } from "react-router-dom";
import api from "../config/axios.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await api.post('/auth/login', { email, password });
      if(result.data.token) {
        localStorage.setItem('token', result.data.token)
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
    return (
<>

<div className=" text-white min-h-screen">
 
 
 <div className="flex justify-center items-center min-h-screen px-8">
   <div className="bg-white text-black w-full max-w-4xl grid md:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
   
     <form className="p-8" onSubmit={handleSubmit}>
       <h2 className="text-2xl font-bold mb-2">LOG IN</h2>
       <p className="text-gray-600 mb-6">Welcome Back Warrior</p>
       <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded mb-4" value={email} onChange={(e) => { setEmail(e.target.value) }}/>
       <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded mb-4" value={password} onChange={(e) => { setPassword(e.target.value) }}/>
       
       <button type="submit" className="w-full cursor-pointer bg-[#CB1EDBD9] text-white p-3 rounded-lg hover:bg-purple-600">Log in</button>
       
       <div className="mt-4 space-y-2">
         <button className="w-full flex cursor-pointer items-center justify-center p-3 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200">
           <span className="mr-2"><img/><img src={im1}/></span> Log in with Google
         </button>
         <button className="w-full flex cursor-pointer items-center justify-center p-3 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200">
           <span className="mr-2"><img/><img src={im3} /></span> Log in with Facebook
         </button>
         <button className="w-full cursor-pointer flex items-center justify-center p-3 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200">
           <span className="mr-2"><img src={im2}/> </span> Log in with Apple
         </button>
       </div>
       
       <div className="mt-4 text-center text-sm">
         <Link to="/forgot">Forgot your password?</Link>
       </div>
       <div className="mt-2 text-center text-sm">
         Don&apos;t have an account? <Link to="/signup" className="text-purple-500 hover:underline">Sign Up</Link>
       </div>
     </form>
     
    
     <div className="bg-gray-200 flex items-center justify-center">
       <span className="text-gray-400 text-3xl"></span>
     </div>
   </div>
 </div>
</div>
</>

      );
}
 
export default LOGIN;
