import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategory from "@/Category/AddCategory";
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';



interface Category {
    id: number;
    description: string;
    emoji: string;
}

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

interface AddOrEditCategoriesProps {
    transaction: Transaction;

}

const AddOrEditCategories: React.FC<AddOrEditCategoriesProps> = ({ transaction}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const[newCategory,setNewCategory]= useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    const handleRecategoriceClick = async (category: Category) => {
      
        const updatedTransaction = {
            id:transaction.id,
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
          type: transaction.type,
          ca: {
           id: category.id,
          },

        
        };
    
        console.log(updatedTransaction);

        try {
            const response = await axios.put(`http://localhost:8080/api/transaction/${transaction.id}`, updatedTransaction);
            console.log(response.data);
        } catch (error) {
            console.error("Error updating transaction:", error);
        }
        navigate("/login" );

    };





    return (
        <>

        <div className='relative  rounded-md  w-full '>




            <div className='px-1 py-2 w-full  '>
            


            <ul> 
                {categories.map((category) =>
                    <li
                        key={category.id}
                        className=" cursor-pointer m-0 p-2 text-white text-sm font-medium hover:bg-gray-300 w-full"
                        onClick={() => handleRecategoriceClick(category)}
                    >
                        {category.emoji} {category.description}
                    </li>
                )}
            </ul>
          
            </div>  
            </div>      
           
           
            </>
            
        );
}

export default AddOrEditCategories;
