
import im from "./assets/down.jpg"
const CHEM = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#CB1EDB] text-white flex flex-col items-center justify-center py-10">
      
      <div className="bg-black/80 p-10 rounded-3xl shadow-2xl w-96 text-center border border-[#CB1EDB]">
        <img
          src={im}
          alt="Mail Icon"
          className="w-28 h-28 mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold">Check Your Mail</h2>
        <p className="text-gray-400 text-lg mt-3">
          We have sent a confirmation email to your inbox. Please check your mail
          and follow the instructions to verify your account.
        </p>
        <button  className="mt-6 bg-[#CB1EDB] hover:bg-[#CB1ED1] text-white px-8 py-3 rounded-sm transition-transform transform hover:scale-105 shadow-lg">
          <a href="https://mail.google.com" target="_blank">Open Mail App</a>
        </button>
      </div>
    </div>
 

    
);
}
 
export default CHEM;