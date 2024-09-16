import React, { useState, useEffect } from "react";
import axios from "axios";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import {
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
    Pie,
    PieChart,
    Tooltip,
    Legend,
    CartesianGrid,
    Cell
  } from "recharts";

export default function Graphs() {
  const [chartData, setChartData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/total-by-category');
        setChartData(response.data.map(item => ({
          name: item.category,  // Category name
          total: item.total     // Total amount
        })));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = [
    'rgba(29, 78, 216, 1)',   // Azul intenso (Tailwind blue-700)
    'rgba(59, 130, 246, 1)',  // Azul vibrante (Tailwind blue-500)
    'rgba(2, 132, 199, 1)',   // Azul oceánico profundo (Tailwind sky-600)
    'rgba(75, 85, 99, 1)',    // Gris oscuro elegante (Tailwind gray-700)
    'rgba(147, 197, 253, 1)', // Azul cielo claro (Tailwind sky-300)
    'rgba(107, 114, 128, 1)', // Gris medio elegante (Tailwind gray-500)
    'rgba(209, 213, 219, 1)'  // Gris claro suave (Tailwind gray-300)
];



const handlePieClick = (_, index) => {
  setActiveIndex(index === activeIndex ? null : index); // Toggle active index
};

const getColor = (index) => {
  if (activeIndex === null) {
    // Todos los colores son normales si no hay selección
    return COLORS[index % COLORS.length];
  } else if (index === activeIndex) {
    // Color normal para el segmento activo
    return COLORS[index % COLORS.length];
  } else {
    // Color muy claro para los no activos
    return COLORS[index % COLORS.length].replace('1)', '0.2)');
  }
};





  return (
    <>
    <div className="barchart py-2 h-[full]">
      <Card className="py-4 ">
      <CardContent className="h-[full]">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
           
            <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#000000" fontSize={12} />
            <YAxis tickLine={false} axisLine={false} stroke="#09090b" fontSize={12} tickFormatter={(value) => `$${value}`} />
            
            <Bar dataKey="total" radius={[12, 12, 12,12]} fill="#1d4ed8" background={{ fill: '#eee' }} />
            <Tooltip />

          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      </Card>

      </div>
      <Card>
      <div className="piechart ">
        <ResponsiveContainer width="100%" height={185}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              innerRadius={55}
              fill="#8884d8"
              onClick={handlePieClick} // Agrega el manejador de clics aquí

              
              >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} 
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`$${value}`, name]} />
            <Legend/>  
          </PieChart>
        </ResponsiveContainer>
    </div>
    </Card>
    </>
  );
}
