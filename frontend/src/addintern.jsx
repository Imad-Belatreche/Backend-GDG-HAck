const ADDIN = () => {
    return ( <>
        <div className=" text-white min-h-screen">
     
     
     <div className="flex justify-center items-center min-h-screen px-8">
       <div className="bg-white text-black w-150 max-w-4xl grid md:grid-cols-1 shadow-lg rounded-lg overflow-hidden">
       
          
            <form method="post" className="p-8">
              <h2 className="text-3xl font-bold mb-2">ADD INTERNSHIP</h2>
              <p className="text-gray-600 mb-6">Share your power</p>
              <input type="text" placeholder="Title" className="w-full p-3 border border-gray-300 rounded mb-4" />
              <input type="text" placeholder="Company" className="w-full p-3 border border-gray-300 rounded mb-4" />
             
              <textarea placeholder="Description" className="  w-full p-3 border border-gray-300 rounded mb-4" />
              <input type="text" placeholder="Link" className="  w-full p-3 border border-gray-300 rounded mb-4" ></input>
              
            
          
       
              

              
              <button type="submit" className="w-full cursor-pointer bg-[#CB1EDBD9] text-white p-3 rounded-lg hover:bg-purple-600">Submit</button>
              
              <div className="mt-2 text-center text-sm">
       
              </div>
            </form>


       </div>
     </div>
    </div>
    
          
        </> );
}
 
export default ADDIN;