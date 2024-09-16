import axios from "axios";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { Input } from "@/components/ui/input";
import { format, startOfDay } from 'date-fns';
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';


import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface Category {
  id: number;
  description: string;
  emoji: string;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: string; 
  category: Category
  }


interface AddEditTransactionsProps {
  editTransaction?: Transaction | null;
}

// Creation of a schema for the transaction

const transactionSchema = z.object({
  description: z.string().min(4, { message: "Description is required" }),
  amount: z.number().min(0.01, { message: "Amount must be greater than zero" }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),

  type: z.string(),
  
});



export default function AddEditTransactions({ editTransaction }: AddEditTransactionsProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  const[menuDate,setMenuDate] = useState(false);
  const[selectedOption,setSelectedOption]=useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | String>(editTransaction ? editTransaction.date : "Pick a date");
  const navigate = useNavigate();




  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data); // Asumiendo que `data` es un array de categorías
      })
      .catch((error) => {
        console.error("Error al cargar las categorías:", error);
      });
  }, []);

  const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
    const formattedData = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"), // Format date to match LocalDate in the backend
        ca:{
          id:selectedOption.value
        }
    };

    console.log("Formatted data being sent:", formattedData);
    const url = editTransaction ? `http://localhost:8080/api/transaction/${editTransaction.id}` : `http://localhost:8080/api/transaction`;
    const method = editTransaction ? axios.put : axios.post;
    try {
    
            const response = await method(url, formattedData);

      console.log(response.data);
    } catch (error) {
      console.error("Hubo un error al enviar la transacción:", error);
    }

    navigate("/login" );


  };

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),   
     mode: 'onChange'  ,

    defaultValues: {
      description: editTransaction ? editTransaction.description : '',
      amount: editTransaction ? editTransaction.amount : 0,
      date: editTransaction ? new Date(editTransaction.date) : undefined,
      type: editTransaction ? editTransaction.type : 'EXPENSE',
    }
  }
  );
  
  const options =categories.map((category) => ({
    value:category.id , 
    label: `${category.emoji} ${category.description}`,}



  ))


  



  return (
    <>
      <h2 className="text-center font-semibold text-lg m-4">{editTransaction? "Edit Transaction" : "Add Transaction"}</h2>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          {" "}
          {/* Elemento form nativo para manejo de submit */}
          <FormField   
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FormItem className="focus:outline-none " >
                <FormLabel>Description</FormLabel>
                <FormControl >
                  <Input 
                    placeholder="Enter transaction description"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
         <Select options={options} 
          value={selectedOption}
          onChange={ (selectedValue)=> setSelectedOption(selectedValue)}/>
 



          <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuDate(!menuDate)}
              className="w-full p-[5px] flex items-center justify-start gap-1 text-base  border border-gray-300 bg-card text-card-foreground shadow-sm rounded-md text-gray-900"
            >
          <CalendarIcon className="mr-2 h-4 w-4" />

            
              {selectedDate instanceof Date ? selectedDate.toLocaleDateString() : selectedDate}
              </button>

            {menuDate && (
              <div className="absolute -top-[315px] bg-white rounded-lg border bg-card text-card-foreground shadow-sm">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setSelectedDate(date.toLocaleDateString()  ); // Use null if date is undefined
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </div>
            )}
          </div>
        </FormItem>
      )}
    />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Transaction Type</FormLabel>
                <select {...field}>
                  <option value="INCOME">Income</option>
                  <option value="EXPENSE">Expense</option>
                </select>
                {/* Agregar aquí cualquier mensaje de error si es necesario */}
              </FormItem>
            )}
          />
          {/* Continúa agregando otros campos del formulario */}
          <Button type="submit" className="w-full bg-blue-700 mb-11">Submit </Button>
        </form>
      </Form>
    </>
  );
}
