import im from "./assets/download.jpg"
 const PRO =()=>{
  return (
    <div className="min-h-screen  text-white flex flex-col items-center py-10">

      <div className="bg-black/80 p-10 rounded-3xl shadow-2xl w-96 text-center border border-[#CB1EDB]">
        <img
          src={im}
          alt="Profile Picture"
          className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 shadow-md"
        />
        <h2 className="text-3xl font-bold mt-5">John Doe</h2>
        <p className="text-gray-400 text-lg">Web Developer | Designer</p>
      </div>


      <div className="mt-12 max-w-2xl text-center px-6">
        <h3 className="text-2xl font-semibold border-b-2 border-purple-500 pb-2 inline-block">About Me</h3>
        <p className="text-gray-300 mt-4 text-lg leading-relaxed">
          Passionate web developer with experience in building user-friendly,
          visually appealing, and high-performance websites. Always eager to
          learn and innovate in the field of front-end and UI/UX design.
        </p>
      </div>
    </div>
  );
}


export default PRO; 

    