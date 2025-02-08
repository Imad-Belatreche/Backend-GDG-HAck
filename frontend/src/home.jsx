import { Link } from "react-router-dom";
import im1 from "./assets/im1.jpg"
import im2 from "./assets/im2.jpg"
const HOME = () => {
    const token = localStorage.getItem('token');
    return token ? (
        <>



               <div className="pb-15  text-white min-h-screen">
               <div className="grid md:grid-cols-2 gap-6 px-8 py-12">
                 <div>
                   <img src={im1} alt="Handshake" className="w-full rounded-lg max-md:hidden" />
                 </div>
                 <div>
                   <img src={im2} alt="build" className="w-full rounded-lg" />
                 </div>
               </div>
         
             
               <div className="text-center px-6 md:px-20">
                 <h2 className="text-3xl font-bold mb-4">Unlock Your Global Opportunities Today</h2>
                 <p className="text-gray-300 max-w-2xl mx-auto">
                   Welcome to our platform, where your journey to exciting internships and study opportunities abroad begins.
                 </p>
                 <div className="mt-6 space-x-4">
                   <Link  className="bg-[#CB1EDBD9] px-6 py-3 rounded-lg hover:bg-purple-600">Learn More</Link>
                 </div>
               </div>
             </div>


        
        
        </>
      ) : 
      (
        <>



               <div className="pb-15  text-white min-h-screen">
               <div className="grid md:grid-cols-2 gap-6 px-8 py-12">
                 <div>
                   <img src={im1} alt="Handshake" className="w-full rounded-lg max-md:hidden" />
                 </div>
                 <div>
                   <img src={im2} alt="build" className="w-full rounded-lg" />
                 </div>
               </div>
         
             
               <div className="text-center px-6 md:px-20">
                 <h2 className="text-3xl font-bold mb-4">Unlock Your Global Opportunities Today</h2>
                 <p className="text-gray-300 max-w-2xl mx-auto">
                   Welcome to our platform, where your journey to exciting internships and study opportunities abroad begins.
                 </p>
                 <div className="mt-6 space-x-4">
                    <Link to="/signup" className="bg-[#CB1EDBD9] px-6 py-3 rounded-lg hover:bg-[#CB1EDBD8">Get Started</Link>
                   <Link  className="bg-[#CB1EDBD9] px-6 py-3 rounded-lg hover:bg-purple-600">Learn More</Link>
                 </div>
               </div>
             </div>


        
        
        </>
      );
}
 
export default HOME;