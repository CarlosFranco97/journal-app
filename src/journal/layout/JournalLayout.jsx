import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components";
import { SideBar } from "../components";
export const JournalLayout = ({children}) => {
  
    const  drawerWith = 240;
  
    return (
    <Box sx={{display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>
      
      <NavBar drawerWith={drawerWith}/>

      <SideBar drawerWith={drawerWith}/>

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
