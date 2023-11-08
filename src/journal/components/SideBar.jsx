import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({isActive, toggleSidebar }) => {
  const {displayName} = useSelector(state => state.auth);
  const {notes} = useSelector(state => state.journal);
  return (
    <Box 
      component='nav'
    >
        <Drawer
         onClick={toggleSidebar}
         open={isActive}
         sx={{
              display:{xs: 'block'}, 
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }}}
        >
          <Toolbar>
            <Typography 
                variant='h6' 
                noWrap component='div'>{displayName}</Typography>
          </Toolbar>
          <Divider />
        <List>
           { 
             notes.map( note => (
                <SideBarItem key={note.id} {...note}/>
             ))
           }
        </List>
        </Drawer>

    </Box>
    )
}
