import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Grid, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({toggleSidebar}) => {
  
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(startLogout())
  }

  return (
  <AppBar
    position='fixed'
  >
     
    <Toolbar>
      <IconButton
       onClick={toggleSidebar}
       color='inherit'
      >
        <MenuOutlined />
      </IconButton>
      <Grid container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        >
          
          <Typography variant="h6" noWrap component='div'>JournalApp</Typography>
          <IconButton 
            onClick={onLogout}
            color='error'>
            <LogoutOutlined />
          </IconButton>
      </Grid>
    </Toolbar>
  </AppBar>
    )
}
