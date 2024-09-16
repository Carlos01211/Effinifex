import { useState, useEffect } from "react";
import axios from "axios";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

import DropdownMenu from "./DropDownMenu";
import AddOrEditCategories from "@/Category/AddorEditCategories";
import AddCategory from "@/Category/AddCategory";
import AddEditTransactions from "./AddEditTransactions";
import { Search } from 'lucide-react'; // Asegúrate de tener este ícono importado




interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  ca?: {
    id: number;
    description: string;
    emoji: string;
  };
}
const defaultCategory = {
  id: 0,
  description: 'Other',
  emoji: '📁'
};

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<string | null>(null);
  const[search,setSearch]= useState("")

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/transactions");
      setTransactions(result.data);
      setFilteredTransactions(result.data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const removeTransaction = async (transactionID: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/transaction/${transactionID}`);
      loadTransactions();
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  };

  const handleClickCategorice = (transactionId: string) => {
    if (selectedTransactionId === transactionId) {
      setSelectedTransactionId(null);
    } else {
      setSelectedTransactionId(transactionId);
      setNewCategory(null); // Close new category if another transaction is selected
    }
  };

  const handleNewCategoryClick = (transactionId: string) => {
    if (newCategory === transactionId) {
      setNewCategory(null);
    } else {
      setNewCategory(transactionId);
      setSelectedTransactionId(null); // Close AddOrEditCategories if new category is selected
    }
  };

  const handleCloseAddOrEditCategories = () => {
    setSelectedTransactionId(null);
  };

  const handleCloseAddCategory = () => {
    setNewCategory(null);
  };

  return (
    <>
      <div className="transactions h-[full] rounded-lg border bg-card text-card-foreground shadow-md">
        <div className="px-5 py-4 flex justify-between">
          <p className="text-lg font-semibold text-black">Transactions</p>
          <div className="flex items-center gap-4">
          <div className="relative  border border-gray-300 rounded-full pr-8 py-[2px] pl-3">         
       
        <input className="bg-transparent focus:outline-none w-[140px] " placeholder="   Type to search.." onChange={(e) => setSearch(e.target.value)}></input>
        <div className="absolute  top-1/2  -right-1 -translate-y-1/2" >     

          
          <Search color="#4F46E5" size={20} className="mr-3 text-blue-700" /> 
          </div>
          </div>
          <Drawer>
            <DrawerTrigger>
              <button className="h-8 p-2 w-full flex items-center text-blue-700">Add  </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <AddEditTransactions />
              </div>
            </DrawerContent>
          </Drawer>
          </div>

        </div>
        <div className=" overflow-y-auto h-[80%]" >
          <table className=" w-full ">
            <thead>
              <tr className="text-sm rounded-lg leading-none text-gray-600 bg-gray-100 border-b border-t border-gray-200">
                <th className="font-medium py-2 px-6 text-left">Description</th>
                <th className="font-medium py-2 px-6 text-left">Amount</th>
                <th className="font-medium py-2 px-6 text-left">Date</th>
                <th className="font-medium py-2 px-6 text-left">Type</th>
                <th className="font-medium py-2 px-5 text-left">Category</th>
                <th className="font-medium py-2 px-6 text-left">Actions</th>
              </tr>
            
            </thead>
            <tbody className=" text-sm font-medium text-zinc-900 relative">
              {filteredTransactions.filter((transaction)=>{
                 
                 const searchLower= search.toLowerCase().trim();

                  return searchLower === " " ? transaction : transaction.description.toLowerCase().includes(searchLower) || transaction.type.toLowerCase().includes(searchLower) 

              }).map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gradient-to-tr from-blue-100 to-blue-700">
                  <td className="py-4 px-7 text-left whitespace-nowrap">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-6">
                    <div className="text-blue-600 inline-block rounded-full px-2 py-1 text-center">
                      {transaction.amount}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-6">
                    {transaction.type}
                  </td>
                  <td className="relative py-4 px-6 cursor-pointer">
                    <div onClick={() => handleClickCategorice(transaction.id)}>
                  {(transaction.ca || defaultCategory).emoji}   {(transaction.ca || defaultCategory).description} 
                    {selectedTransactionId === transaction.id && (
                        <div className="absolute top-4  right-8 z-30 bg-blue-700-70 shadow-lg rounded-sm m-0 ">
                        <input className=' bg-transparent border-b border-gray-300 p-2 placeholder-gray-300 ' placeholder=' Search..'>
                        </input> 
                          <AddOrEditCategories
                            transaction={transaction}
                            onClose={handleCloseAddOrEditCategories}
                          />
                          <button
                            className=" text-left py-2 px-4 text-xs text-white border-t border-gray-300 hover:bg-gray-300 hover:scale-105 duration-300 m-0 w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNewCategoryClick(transaction.id);
                            }}
                          >
                             New Category
                          </button>
                        </div>
                      )}
                    </div>
                    {newCategory === transaction.id && (
                        <AddCategory
                          item={newCategory}
                          transaction={transaction}
                          onClose={handleCloseAddCategory}
                        />
                    )}
                  </td>
                  <td className="py-4 px-10">
                    <DropdownMenu transaction={transaction} removeTransaction={removeTransaction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
