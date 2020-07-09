import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { useHistory } from "react-router";
import { createTicket  , fetchAllCompanies} from '../../redux'



import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


//custom style
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function CreateTicket() {

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const _companyReducer = useSelector(state=>state.company)
    const initTicket = {
        CompanyId : "",
        ProductId : "csooxqs",
        ModuleId : "cwdokm",
        BrandId : "cwkj",
        CategoryId : "cwkom",
        TktSubject : null,
        TktContent : null,
        TktStatus : "New Ticket",
        TktCreatedBy : localStorage.getItem("Token") == null ? null : JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName,
        TktCreatedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktAttachment : null
    }

    const [ticket , setTicket] = useState(initTicket);

    
    useEffect(()=>{
        //validate if user log or not
        if(localStorage.getItem("Token") == undefined){
            history.push({
                pathname:  "/UserLogin"
            })  
        }else if(_companyReducer.companies.length == 0){
            dispatch(fetchAllCompanies())
        }
        return()=>{

        }
    },[])

    return (
        <div>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                    <div className={classes.paper}>
                        
                        <Typography component="h1" variant="h5"> Create New Ticket </Typography>
                        <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <InputLabel  >Company</InputLabel>
                                        <Select  native  label="CompanyName" name="CompanyName" onChange={e=>  setTicket({ ...ticket , CompanyId : e.target.value })} >
                                            <option value=""></option>
                                            {_companyReducer.companies.map((company)=>(
                                                <option value={company.companyId}>{ company.companyName }</option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    variant="outlined" required fullWidth  label="Subject" autoFocus
                                    onChange={e=>  setTicket({ ...ticket , TktSubject : e.target.value })}
                                />
                            </Grid>
                    
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth label="Content"
                                multiline
                                rows={10}
                                    onChange={e=>  setTicket({ ...ticket , TktContent : e.target.value })}   
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth 
                                    type="file" onChange={e=>  setTicket({ ...ticket , TktAttachment : e.target.value })}
                                />
                            </Grid>
                                
                        </Grid>
                        <Button
                            type="submit" fullWidth  variant="contained" color="primary"
                            className={classes.submit} onClick={(e)=>{
                                e.preventDefault();
                               if(localStorage.getItem("Token") != null) {
                                    dispatch(createTicket(ticket))
                                }else{
                                    alert("logFirst")
                                }
                            }} > Create </Button>
                        </form>
                    </div>
                    
                </Container>
                );
        </div>
    )
}

export default CreateTicket
