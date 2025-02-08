
import { Link } from "react-router-dom";

const SIGNUP = () => {
    return (
<>

<div className=" text-white min-h-screen">
 
 
 <div className="flex justify-center items-center min-h-screen px-8">
   <div className="bg-white text-black w-full max-w-4xl grid md:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
   
     <form method="post" className="p-8">
       <h2 className="text-3xl font-bold mb-2">SIGN UP</h2>
       <p className="text-gray-600 mb-6">Be a part of our community</p>
       <input type="text" placeholder="Name" className="w-full p-3 border border-gray-300 rounded mb-4" />
       <input type="text" placeholder="University" className="w-full p-3 border border-gray-300 rounded mb-4" />
       <div className="w-full mb-4   flex max-sm:flex-col sm:flex-row justify-between">
       <input type="text" placeholder="Major" className=" max-sm:w-full max-sm:mb-3 w-5/12 py-3 pl-3 h-full border border-gray-300 rounded " />
       <input type="email" placeholder="Email" className="max-sm:w-full  w-5/12 py-3 pl-3 h-full border border-gray-300 rounded " ></input>
       
       </div>
       <fieldset className="flex gap-11 pl-3 py-3">
  <legend>Choose your Role:</legend>

  <label>
    <input type="radio" name="role" value="stu"></input>
    Student
  </label>

  <label>
    <input type="radio" name="role" value="alu"></input>
    Alumni
  </label>

  <label>
    <input type="radio" name="role" value="pro"></input>
    Proffesor
  </label>
 
</fieldset>

       
       <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded mb-4" />
       
       <button type="submit" className="w-full cursor-pointer bg-[#CB1EDBD9] text-white p-3 rounded-lg hover:bg-purple-600">Sign Up</button>
       
       <div className="mt-2 text-center text-sm">
         Do you have an account? <Link to="/login" className="text-purple-500 hover:underline">Log In</Link>
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
 
export default SIGNUP;
