import { useState } from "react";

import axios from "axios";
import { Description } from "@radix-ui/react-dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { min } from "date-fns";
import { Button } from "@/components/ui/button";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useNavigate } from 'react-router-dom';



import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

  import { Input } from "@/components/ui/input";
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  


  




interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: Date;
    type: string;
    category: {
        id: number;
    };
}


interface Props{

    item:string;
    transaction:Transaction;

}

const categorySchema =z.object({
    description:z.string().min(2,{message: "Description is required"}),
})







const AddCategory = ({item,transaction}: Props)=>{

  const[visibility, setVisibility] = useState(false);
  const[selectedEmoji,setSelectedEmoji] = useState("💸")
  const navigate = useNavigate();


  
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),   
         mode: 'onChange'  ,
    
        defaultValues: {
          description:   'Cash',
        }
      }
      );


    const onSubmit = async (data: z.infer<typeof categorySchema>) =>{
      
    
      const newCategory={
        description:data.description,
        emoji:selectedEmoji


      }

        const result=await axios.post("http://localhost:8080/api/category",newCategory);
        const json= result.data;
        console.log(json);

    const updatedTransaction = {
        id:transaction.id,
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
      ca: {
       id: json.id,
      },
    }

    

      const result2= await axios.put(`http://localhost:8080/api/transaction/${transaction.id}`, updatedTransaction);

    
     console.log(result2.data);

     navigate("/login" );




    }

   const handleClickPickerEmoji = ()=> {
    setVisibility(!visibility);

   }

    

return (

    item && 
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">

  <div className="rounded-md shadow-md w-[400px] bg-white  " >
  <h2 className="text-[10px]  text-gray-600 text-center font-bold p-2">NEW CATEGORY</h2>



        <Form {...form}  >
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center mt-2">
      {" "}

      
      <button   type="button" 
 className="relative  z-50 text-xl" onClick={handleClickPickerEmoji}>
      {selectedEmoji}

      {visibility && <div className="absolute -left-[600%] h-[320px] overflow-auto custom-emoji-picker "><Picker emojiSize={20}     style={{
     
    }}

  data={data} onEmojiSelect={(d)=> {setSelectedEmoji(d.native)} } /></div> }


      </button>




      <FormField 
        control={form.control}
        name="description"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
             
            <Input
  style={{ outline: 'none', boxShadow: '0 0 0 2px white' }}
  className="text-2xl border-none text-center text-blue-700"
  {...field}
/>


            </FormControl>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        )}
      />
                  <h2 className="text-xl  text-black ">${transaction.amount}</h2>

     
  <Button type="submit" className="w-full bg-blue-700 mt-6 rounded-none rounded-b-md">SAVE </Button>

</form>
      </Form>



      </div>
      </div>



);



}

export default AddCategory;