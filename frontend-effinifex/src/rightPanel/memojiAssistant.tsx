import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  
import memojiImage from '@/assets/memoji.png'; // Ajusta la ruta según donde guardaste la imagen
import axios from "axios";
import send from "@/assets/send-logo.svg"
import message from "@/assets/message-icon.svg"

import Stocks from "./stocks";
import { useState,useEffect } from "react";



function Memoji(){

    const[text,setText]=useState("")
    const [isRotating, setIsRotating] = useState(false);



    const onSubmit =  async ()=>{

        const response = await axios.get("http://localhost:8080/api/gemini")
        setText(response.data);




    }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating((prev) => !prev);
    }, 2500);

    return () => clearInterval(interval);
  }, []);



    return(
    <>
    
    <Card className="memoji h-[140px] flex flex-col justify-center items-center ">
 
    <img className="w-[80px] " src={memojiImage} alt="Memoji Avatar"/>
    <h1 className="text-xl font-semibold ">
    Welcome back,Carlos!👋🏻
        </h1> 
        <Drawer>
  <DrawerTrigger>
  <Card className={`mb-1   bg-gradient-to-tr from-blue-300 to-blue-700   ${isRotating ? 'rotate' : ''}`}><div className="text-sm  text-gray-100 font-semibold p-1 flex gap-1">
  Ask Carlos your AI assistant   <img src={message} className="h-[20px]"></img>
  </div>
  </Card></DrawerTrigger>
  <DrawerContent>
  <div className="memoji  flex flex-col justify-center items-center mx-auto w-full max-w-6xl  shadow-L m-1 ">
 
 <img className="w-[200px] " src={memojiImage} alt="Memoji Avatar"/>


    
    <div className=" flex flex-col justify-between  mx-auto w-full max-w-2xl h-[330px]  ">
        <div className="mb-6" >
        <h2 className=" text-3xl text-center font-semibold"> How can I help you today?</h2>
        <h2 className=" text-lg text-center font-medium text-gray-800"> Your AI Assistant,Carlos Gómez 👋🏻</h2>
        </div>
        <p  className="border flex-1 my-1 p-2 overflow-y-auto ">
            {text}

        </p>

       <Card className="h-[15%] flex px-2 py-1">
<input  className="text-lg w-full outline-none" type="text"   placeholder="Ask Carlos your AI assistant.." />
<button  className="flex items-center  p-2  hover:bg-gray-300 rounded-full   " onClick={onSubmit}>
<img src={send} className="w-[20px] " ></img> 
</button>

</Card > 



    </div>

    
 </div>

    
  </DrawerContent>
</Drawer>

        


        </Card>

       </>
    );


}

export default Memoji;