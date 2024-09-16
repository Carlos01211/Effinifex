import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CardContent,
    CardFooter,
    CardHeader,
    Card,
    CardTitle
} from "@/components/ui/card";
import { ResponsiveContainer } from 'recharts';
import {CountUp} from "@/components/ui/count-up";

interface CardProps {
    className: string;
    title: string;
    apiUrl: string;
    footerText: string;
  }

function GenericCard({className, title, apiUrl, footerText,icon}:CardProps) {
  const [dataValue, setDataValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${apiUrl}`);

      setDataValue(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className={className}>
      <ResponsiveContainer>
      <Card className='h-[140px] flex flex-col items-center justify-center '>
      <div className='h-[100px] w-[215px] flex flex-col gap-4   '>   
     <div className='flex justify-between items-center color-blue-700'>
      <h3 className=' leading-none font-normal '>
        {title}
      </h3>
      <img className=" w-[30px] leading-none" src={icon}  alt=""></img>
     </div>
      <div className=" flex flex-col ">
       <h3 className="text-3xl font-semibold ">
        <CountUp
        preserveValue
        prefix="$"
        start={0}
        end={dataValue}
        
        decimalPlaces={2}/>
       </h3>
        <p className="text-xs text-gray-500   ">{footerText}</p>
        </div>
      </div>
      
      </Card>
      </ResponsiveContainer>
      </div>
      
    
  );
}

export default GenericCard;
