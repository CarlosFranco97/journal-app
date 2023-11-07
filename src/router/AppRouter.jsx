import { Routes, Route, Navigate } from "react-router-dom"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  
   //extraigo el status del custom hook, useCheckAuth
   const status = useCheckAuth();

   if(status === 'checking') {
     return <CheckingAuth />
   }
   return (
   <Routes>
      {
         (status === 'authenticated') 
         ? <Route path="/*" element={<JournalRoutes />}/>    
         : <Route path="/auth/*" element={<AuthRoutes />}/>

      }
   
      <Route path="/*" element={<Navigate to='/auth/login'/>} />
     
      {/* <Route path="/auth/*" element={<AuthRoutes />}/>

      <Route path="/*" element={<JournalRoutes />}/> */}
   
   </Routes>    
   )
}
