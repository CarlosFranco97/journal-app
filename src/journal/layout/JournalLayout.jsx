import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components";
import { SideBar } from "../components";
import { useState } from "react";
export const JournalLayout = ({children}) => {
  const [isActive, setIsActive] = useState(false)
   
  const handleClickSidebar = () => {
    setIsActive(!isActive)
  }
    return (
    <Box sx={{display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>
      
      <NavBar toggleSidebar={handleClickSidebar}/>

      <SideBar toggleSidebar={handleClickSidebar} isActive={isActive}/>

        <Box
        component='main'
        sx={{flexGrow:1, p: 3}}
        >
            <Toolbar />
            {children}
        </Box>
        
    </Box>
  )
}
