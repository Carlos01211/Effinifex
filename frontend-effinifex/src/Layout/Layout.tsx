
import { useEffect, useState } from 'react'
import { LifeBuoy,Receipt,Boxes,Package,UserCircle,BarChart3,LayoutDashboard
  ,Settings,
  Section,  
 } from 'lucide-react'
 import SideBar, { SidebarItem } from './SideBar'
import Dashboard from '../Dashboard/Dashboard'
import CommandSearch from '@/header/CommandSearch'
import AvatarProfile from '../header/avatar'
import NotificationIcon from '../header/NotificationIcon'
import PlaidWidget from '@/Plaid/PlaidWidget'
import balance from "@/assets/bankBalance.svg"
import axios from 'axios'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DashboardGeneral({onLogout}){

    const[openWidget,setOpenWidget]=useState("perro");
    const[token,setToken]=useState("");


    
  useEffect(() => {
   
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/getCreateTokenPlaid");
      console.log('Full Response:', result.data); // Verifica toda la respuesta
      console.log('Link Token:', result.data.link_token); // Verifica solo el link_token
      setToken(result.data.link_token); // Ajusta según la estructura real
    } catch (error) {
      console.error('Error loading:', error);
    }
  };
  


    return(
   <div className="app-grid">
    <div className='header flex  items-center justify-between px-4'>  
        <h1 className=' font-medium text-3xl'>
          Dashboard 
        </h1>
        <Card className='border'>
        <button className="flex gap-2  p-2 text-lg  font-semibold hover:scale-105 duration-300 rounded-md hover:bg-gray-100" onClick={()=>setOpenWidget("gato")}>  
         Connect your Bank <img  className="w-[25px]"src={balance}></img>
       </button>
       </Card>
       <PlaidWidget token={token} openWidget={openWidget}  >


       </PlaidWidget>
        
        <div className='flex gap-4'>
    <CommandSearch className="s2"></CommandSearch>
    <div className='flex flex-row gap-4'>
    <NotificationIcon/>  
    
    <AvatarProfile/>    
    <button  className='bg-blue-700 text-white text-md font-medium p-2 rounded-lg ' onClick={onLogout}> Exit</button>

    </div>
    </div> 

    </div>
            
            <SideBar>
                <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active />
                <SidebarItem icon={<Receipt />} text="Transactions" />
                <SidebarItem icon={<Boxes />} text="Categories" />
                <SidebarItem icon={<Package />} text="Budgets" />
                <SidebarItem icon={<UserCircle />} text="Accounts" />
                <SidebarItem icon={<BarChart3 />} text="Reports" />
                <SidebarItem icon={<Settings />} text="Settings" />
                <SidebarItem icon={<LifeBuoy />} text="Help" />
            </SideBar> 
           
          <Dashboard />    

            
        </div>
    )
        



}

export default DashboardGeneral;