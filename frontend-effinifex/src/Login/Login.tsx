import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState,useEffect } from "react";
import openEye from"@/assets/eye-open.svg";
import  closedEye from "@/assets/eye-close.svg";
import effinifex from "@/assets/effinifex-ss.png";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import x from '@/assets/x-2.svg'; // Asegúrate de poner la ruta correcta al archivo




const signUpSchema = z.object({
    username: z.string()
      .email({ message: "Por favor, introduce un correo electrónico válido." }),
    password: z.string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .max(50, { message: "La contraseña no puede tener más de 50 caracteres." })
      .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula." })  // Validación de al menos una letra mayúscula
      .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
      .regex(/[^a-zA-Z0-9]/, { message: "La contraseña debe contener al menos un carácter especial." }),
  });


  const signInSchema = z.object({
    username: z.string()
    .email({ message: "Por favor, introduce un correo electrónico válido." }),
    password: z.string(),
  });

 
function Login({ onLogin }){

const [isSignIn, setIsSignIn] = useState(true);
const [errorMessage, setErrorMessage] = useState('');
const [visiblePwd, setVisiblePwd] = useState(false);


const schema = isSignIn? signInSchema : signUpSchema

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const fromGoogle = urlParams.get('fromGoogle');

  if (fromGoogle) {
    const token = getCookie('token');

    if (token) {
      onLogin(token);
    }
    window.history.replaceState(null, null, window.location.pathname);  // Limpia la URL
  }
}, []);


const loginGoogle = () => {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};



const{ register, handleSubmit, formState: { errors } }= useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'

}
);





const onSubmit = async (data) => {
  const url = isSignIn ? "login" : "register";  // Determina el endpoint correcto
  console.log(data);

 
  try {
      const response = await axios.post(`http://localhost:8080/auth/${url}`, data);
      if (response.data.token) {
          onLogin(response.data.token);
      } else {
          setErrorMessage('Invalido,intente de nuevo.');
      }
  } catch (error) {
      if (error.response) {
          if (error.response.data) {             
                  setErrorMessage(error.response.data);

          }
          else{
                 setErrorMessage("Error con la conexion o en el servidor.Intente mas tarde");
          }
      } else {
          setErrorMessage('No se pudo conectar al servidor. Por favor intente más tarde.');
      }
  }
};












    return(
        
      <section
      className="relative  min-h-screen flex items-center justify-center login "
     
    >
     <h1 className="fixed top-4 w-full left-0 border-b py-1 px-6  font-orbitron text-2xl font-medium flex items-center">EFFINIFE
     <img src={x} className="h-6 w-[30px]"
            
          />
      </h1> 
      <div className="w-full  h-full  flex items-center  bg-white mt-20  ">
      <div className='w-[45%] h-full bg-white flex flex-col items-center justify-center gap-2 m-3 px-[50px] rounded-xl'>
          <div className="w-[90%]">
            <h2 className=' font-helvetica-new font-medium text-3xl text-left mb-8 mx-1 text-black'> {isSignIn ? "Sign In" :"Sign Up"}
       </h2>
       </div>
          

          <form className="flex flex-col gap-3  w-[90%]" onSubmit={handleSubmit(onSubmit)}>
            <input className=' h-[50px] p-2  border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700  ' {...register("username")} placeholder='Email address' type="email"             
            >
            </input>
            { errors.username && <p className="text-red-500">{errors.username.message}</p>}
            <div className="relative ">
            <input   className='h-[50px]  w-full p-2  border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-700'{...register("password")} placeholder='Password' type={visiblePwd?"text": "password"}>
            </input>
            <img  src={visiblePwd? openEye : closedEye} className="w-[20px] absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
              onClick={() => setVisiblePwd(!visiblePwd)} ></img>
            </div>
            { errors.password && <p className="text-red-500">{errors.password.message}</p>}
            { errorMessage && <p className="text-red-500">{errorMessage}</p>}


           


            <div className='flex justify-between items-center  text-sm my-2 '><label className=' flex align-center gap-1 text-gray-800' ><input type="checkbox"></input>Remember me
            </label>
              <a  className='text-blue-600'> Forgot password?</a>

            </div>
            <button className='bg-blue-700 text-white font-semibold p-2 rounded hover:scale-105 duration-300'>{isSignIn? "Sign In" :"Sign up"}</button>
            <div className="my-2 flex items-center gap-2 text-gray-200 ">
              <hr className="flex-grow border-t border-gray-300" />
              <p >or</p>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
           
            
          </form>
          <button  onClick={loginGoogle} className='flex justify-center items-center w-[90%] gap-1 py-2 mb-1 border border-gray-400 rounded text-sm font-semibold text-gray-700 hover:scale-105 duration-300 '>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="25" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg> Continue with Google
            </button>
            <p className='flex justify-center gap-1 mb-4'>{isSignIn ? "New to Gcash?" :"Have an account?"} <a className='text-blue-600 cursor-pointer' onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? " Sign up today." : " Sign In."}
          </a></p>
        
        </div>
        
        <div className=" w-[60%] h-[550px] " >
       
          
        <img className="h-full w rounded-xl" src={effinifex}>
         </img>
       

        
        </div>
        
        </div>
      </section>
    );

}

export default Login;