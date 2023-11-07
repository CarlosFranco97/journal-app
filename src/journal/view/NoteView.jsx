import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingToNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import 'sweetalert2/dist/sweetalert2.css';
import Swal from "sweetalert2"

export const NoteView = () => {
   const dispatch = useDispatch();
   const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);
   

   const { body, title, onInputChange, date, formState  } = useForm(note); 
   
   useEffect(() => {
      dispatch(setActiveNote(formState))
   }, [formState]);

   useEffect(() => {
      if(messageSaved.length > 0) {
         Swal.fire('Nota Actualizada', messageSaved, 'success')
      }
   }, [messageSaved])

   const dateString = useMemo(() => {
      const newDate = new Date(date)
      return newDate.toUTCString();
   }, [date]);
   
   const fileInputRef = useRef();
   
   const onSaveNote = () => {
      dispatch(startSaveNote())
   };

   const onDelete = () => {
      dispatch(startDeletingToNote())
   }

   const onFileInputChange = ({target}) => {
      //condicion por si abre el selector y lo cancela 
      if(target.files === 0) return; 
      dispatch(startUploadingFiles(target.files))
   }
   return (
     <Grid 
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{mb: 1}}
        className='animate__animated animate__fadeIn animate__faster'
     >
        <Grid item>
          <Typography fontSize={39} fontWeight='light'>
             {dateString}
          </Typography>
        </Grid>
        
        <Grid item>
            <input
               type="file"
               multiple
               onChange={onFileInputChange}
               ref={fileInputRef}
               style={{display: 'none'}}
            />

            <IconButton
               color="primary"
               disabled={isSaving}
               onClick={ () => fileInputRef.current.click()}
            >
               <UploadOutlined/>
            </IconButton>

            <Button 
               disabled={isSaving}
               onClick={onSaveNote}
               color="primary" sx={{padding: 2}}>
              <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
              Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField 
             type="text"
             fullWidth
             variant="filled"
             placeholder="Ingrese un titulo"
             label='Titulo'
             sx={{border: 'none', mb: 1}}
             name="title"
             value={title}
             onChange={onInputChange}
            />
            <TextField 
             type="text"
             variant="filled"
             fullWidth
             multiline
             placeholder="¿Que sucedió el día de hoy?"
             minRows={6}
             sx={{border: 'none', mb: 1}}
             name="body"
             value={body}
             onChange={onInputChange}
            />
        </Grid>
        <Grid container justifyContent='end'>
            <Button 
            onClick={onDelete}
            sx={{mt: 2}} color="error"
            >
               <DeleteOutline />
               Borrar
            </Button>
        </Grid>
        
        <ImageGallery 
         images={note.imageUrls}/>
     </Grid>
    )
}
