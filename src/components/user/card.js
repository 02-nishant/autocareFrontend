import React from 'react'

const Card =({title, src}) =>{
    return (
        <div className=" xl:px-12 h-auto xl:py-10 shadow-shadowOne  hover:bg-gradient-to-b hover:from-blue-200 hover:blue-200 transition-colors duration-1000" >
         
          <div >
            <img
              className=" h-80  cursor-pointer"
              src={src}
              alt="src"
            />
          </div>

          <div className="w-full mt-5 flex flex-col  gap-6">
           
              <div className="">
                <h3 style={{fontWeight:"bold" , color:"#007bff",textAlign:"center"}}>
                  {title}
                </h3>
              </div>

          </div>
        </div>
      );
};
export default Card;