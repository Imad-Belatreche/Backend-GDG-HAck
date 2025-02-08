import { Link } from "react-router-dom";

const FORG = () => {
    return ( <>

        <div className="bg-black text-white min-h-screen">
         
         
         <div className="flex justify-center items-center min-h-screen px-8">
           <div className="bg-white text-black w-full max-w-4xl grid md:grid-cols-2 shadow-lg rounded-lg overflow-hidden">
           
             <form method="post" className="p-8">
               <h2 className="text-2xl font-bold mb-2">RESTORE PASSWORD</h2>
               <p className="text-gray-600 mb-6">Hope You Find your Weapon</p>
               <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded mb-4" />
    
               
               <button type="submit" className="w-full cursor-pointer bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600">Send Mail</button>
               
  
               
               <div className="mt-4 text-center text-sm">
           
               </div>
               <div className="mt-2 text-center text-sm">
                 Don't have an account? <Link to="/signup" className="text-purple-500 hover:underline">Sign Up</Link>
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
 
export default FORG;