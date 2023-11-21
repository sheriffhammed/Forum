import * as React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {selectUsers } from '../../users/userSlice'
import {useSelector ,useDispatch} from 'react-redux'
import { updateUser } from '../../users/userSlice';
import { ErrorSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export default function EditProfile({ isOpen, handleClose, userId }) {
    const navigate = useNavigate()
    const users = useSelector(selectUsers)
    const dispatch = useDispatch()
             
    const currentUser = users.users.filter(user => user.id === Number(userId))
     
    const { firstName, surName, email, phone } = currentUser[0]
    
    // console.log('Current User Id', userId)
    // console.log('Current User Details', currentUser[0])

    const onSubmit = (data, e) => {
      e.preventDefault();
      const requestBody = {
        ...currentUser[0],
        ...data
      }
      dispatch(updateUser( requestBody))
      alert("Record Updated Succesfully, You have to Re-Login to see changes")
      navigate("../../login"); 

      reset({
        firstName: "",
        surName: "",
        phone: "",
        email: ""
      })
            //console.log("Form Update Record :" , requestBody)
    }

      const schema = yup.object().shape({
        firstName: yup.string().required("First Name Required!"),
        surName: yup.string().required("Surname Required!"),
        email: yup.string().email().required(),
        phone: yup.number().positive().integer().required(),
        
      });
    
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
  return (
    <div>
      
      <Dialog  open={ isOpen } onClose={handleClose} >
        <DialogTitle>Edit My Profile</DialogTitle>
        <DialogContent style={{width:"500px",margin:"auto"}}>
        <DialogContentText>
        </DialogContentText>
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  defaultValue={firstName}
                  {...register("firstName")}
                />
                
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.firstName?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="surName"
                  label="Surname"
                  {...register("surName")}
                  defaultValue={surName}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {ErrorSharp.surName?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  type="number"
                  {...register("phone")}
                  defaultValue={phone}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.phone?.message}</Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  defaultValue={email}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="red"> {errors.email?.message}</Typography>
              </Grid>             
            </Grid>
        </Box>

        </DialogContent>
        <DialogActions>
        <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleClose()} 
          >
            Close
          </Button>
          <Button 
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}