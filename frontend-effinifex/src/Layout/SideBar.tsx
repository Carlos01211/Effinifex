
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState,useEffect } from "react"
import chase from '@/assets/chase (2).png'; // Ajusta la ruta según donde guardaste la imagen
import x from '@/assets/x-2.svg'; // Asegúrate de poner la ruta correcta al archivo
import logout from '@/assets/logout-svg.svg'; // Asegúrate de poner la ruta correcta al archivo

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




const SidebarContext = createContext()

export default function SideBar({ children }) {
  const [expanded, setExpanded] = useState(true)

    // Actualiza el ancho del sidebar en el CSS root
    useEffect(() => {
      const newWidth = expanded ? '200px' : '75px'; // Ajusta estos valores según tus necesidades
      document.documentElement.style.setProperty('--sidebar-width', newWidth);
    }, [expanded]);
  
  return (
    <div className="sidebar  ">
    <aside className="h-full" >
      <nav className="h-full flex flex-col  bg-white border-r  shadow-sm py-3  ">
        <div className="p-4 pb-5 flex justify-between items-center">
          <div className="flex items-center ">
          <h2 className={`overflow-hidden transition-all font-orbitron  ${
              expanded ? "text-xl font-medium" : "w-0"
            }`}>EFFINIFE</h2>
          <img
            src={x}
            className={`overflow-hidden transition-all  ${
              expanded ? " h-6 w-[25px]" : "w-0"
            }`}
            alt=""
          />
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t  w-[200px] fixed bottom-0 py-1 px-[22px]">
  <div className="flex items-center">
    {/* SVG del ícono de logout */}
    <img src={logout} className="w-[14px]"></img>
    
    {/* Contenedor del texto "Logout" */}
    <div
      className={`
        overflow-hidden transition-all  ${expanded ? "w-20 ml-2" : "w-0"}
      `}
    >
      <span className="font-medium text-gray-700 ">Sign Out</span>
    </div>
  </div>
</div>

      </nav>
    </aside>
    </div>
    
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-blue-300 to-blue-700 text-white"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}
