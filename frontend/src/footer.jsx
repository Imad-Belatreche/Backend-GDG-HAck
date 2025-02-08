import im1 from "./assets/cartes.png"
import im3 from "./assets/courrier.png"
import im2 from "./assets/appel.png"
const FOOT = () => {
    return (
        <>
        <footer className="bg-white py-3 flex justify-center">
<div className="text-black flex flex-col">
    <div className="font-bold text-2xl flex  justify-center"><p>Contact Us</p></div>
    <div className="gap-10 flex flex-row my-5">
        <div className="text-center"><h1 className="font-bold text-2xl flex justify-center items-center"><span ><img src={im1} alt="" /></span>Office</h1>
        123 Sample St, Sydney NSW 2000 AU
        </div>
        <div className="text-center"><h1 className="font-bold text-2xl flex justify-center items-center"><span ><img src={im2} alt="" /></span>Phone</h1>
        hello@relume.io ,+1 (555) 000-0000
        </div>
        <div className="text-center"><h1 className="font-bold text-2xl flex justify-center items-center"><span ><img src={im3} alt="" /></span>Email</h1>
        Reach out anytime , hello@relume.io
        </div>
    </div>

</div>

        </footer>
        
        </>
      );
}
 
export default FOOT;