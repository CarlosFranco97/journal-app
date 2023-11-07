import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Grid, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({drawerWith = 240}) => {
  
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(startLogout())
  }

  return (
  <AppBar
    position='fixed'
    sx={{ width: {sm: `calc(100% - ${drawerWith}px)`},
          ml: {sm: `${drawerWith}px`}
     }}
  >
     
    <Toolbar>
      <IconButton
       color='inherit'
       edge='start'
       sx={{mr: 2, 
        display: {sm: 'none' }}}
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
