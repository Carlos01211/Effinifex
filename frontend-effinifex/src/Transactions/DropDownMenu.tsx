import { useState } from "react";
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

  import AddEditTransactions from "./AddEditTransactions";

 
interface Transaction {
    id: number;
    description: string;
    amount: number;
    date: Date;
    type: string; 
    category: {
        id: number;
        description: string;
        emoji: string;
      }
    }





      
  

function DropdownMenu({transaction ,removeTransaction}){

    const [dropdownButton,setDropDownButton] = useState(false);






    return(


        <div className="relative ">
            <button
            className=" text-gray-200 bg-blue-700 rounded-full  w-5 flex items-center justify-center  hover:bg-gray-300  hover:scale-125 duration-200 mr-4"
           onClick={()=>setDropDownButton(!dropdownButton)}
            style={{ boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.7), 0 0 20px rgba(59, 130, 246, 0.9)' }}
        >
          +
        </button>

        {dropdownButton && <div className="text-xs font-medium w-24 px-1 py-2 absolute  top-6 -left-11   rounded-lg border bg-card text-card-foreground shadow-sm   z-20"> 
            <Drawer >
  <DrawerTrigger className="w-full">
  <button className=" w-full h-8  flex items-center justify-start gap-1 hover:bg-slate-300"
        >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="15" viewBox="0 0 30 30">
<path d="M24,11l2.414-2.414c0.781-0.781,0.781-2.047,0-2.828l-2.172-2.172c-0.781-0.781-2.047-0.781-2.828,0L19,6L24,11z M17,8	L5.26,19.74c0,0,0.918-0.082,1.26,0.26c0.342,0.342,0.06,2.58,0.48,3s2.644,0.124,2.963,0.443c0.319,0.319,0.297,1.297,0.297,1.297	L22,13L17,8z M4.328,26.944l-0.015-0.007C4.213,26.97,4.111,27,4,27c-0.552,0-1-0.448-1-1c0-0.111,0.03-0.213,0.063-0.313	l-0.007-0.015L4,23l1.5,1.5L7,26L4.328,26.944z"></path>
</svg>   Edit
            
        </button>
  </DrawerTrigger>
  <DrawerContent>
    
  <div className="mx-auto w-full max-w-sm">
  <AddEditTransactions editTransaction={transaction}/>

    </div>    
    </DrawerContent>
    </Drawer>
    <button
            onClick={() => removeTransaction(transaction.id)}
            className=" w-full text-black font-medium  text-left hover:bg-gray-200  h-8   flex items-center gap-1"
        >
           <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 24 24">
<path d="M 9.5 2 A 1.0001 1.0001 0 0 0 8.5136719 2.8359375 L 8.1523438 5 L 8 5 L 3.6582031 5 A 1.0001 1.0001 0 0 0 3.3359375 5 L 2 5 A 1.0001 1.0001 0 1 0 2 7 L 2.5605469 7 L 3.3320312 19.175781 C 3.4258551 20.751425 4.747814 22 6.3261719 22 L 17.673828 22 C 19.252186 22 20.574145 20.751425 20.667969 19.175781 L 21.439453 7 L 22 7 A 1.0001 1.0001 0 1 0 22 5 L 20.667969 5 A 1.0001 1.0001 0 0 0 20.339844 5 L 16 5 L 15.847656 5 L 15.486328 2.8359375 A 1.0001 1.0001 0 0 0 14.5 2 L 9.5 2 z M 10.347656 4 L 13.652344 4 L 13.818359 5 L 10.181641 5 L 10.347656 4 z M 4.5644531 7 L 8 7 L 9 7 L 14.994141 7 L 16 7 L 19.435547 7 L 18.671875 19.054688 A 1.0001 1.0001 0 0 0 18.671875 19.056641 C 18.639699 19.59695 18.21347 20 17.673828 20 L 6.3261719 20 C 5.7865298 20 5.3603012 19.596997 5.328125 19.056641 A 1.0001 1.0001 0 0 0 5.328125 19.054688 L 4.5644531 7 z M 8.0117188 8.9863281 A 1.0001 1.0001 0 0 0 7.0019531 10.070312 L 7.5019531 17.070312 A 1.0005206 1.0005206 0 1 0 9.4980469 16.929688 L 8.9980469 9.9296875 A 1.0001 1.0001 0 0 0 8.0117188 8.9863281 z M 11.984375 8.9863281 A 1.0001 1.0001 0 0 0 11 10 L 11 17 A 1.0001 1.0001 0 1 0 13 17 L 13 10 A 1.0001 1.0001 0 0 0 11.984375 8.9863281 z M 15.957031 8.9863281 A 1.0001 1.0001 0 0 0 15.001953 9.9296875 L 14.501953 16.929688 A 1.0005207 1.0005207 0 1 0 16.498047 17.070312 L 16.998047 10.070312 A 1.0001 1.0001 0 0 0 15.957031 8.9863281 z"></path>
</svg> Delete
        </button>


        </div>  }







        </div>
    )
    
    ;


}

export default DropdownMenu;