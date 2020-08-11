import React , {useState , useEffect ,forwardRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { fetchAllCompanies , createModule } from '../../redux';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import Avatar from '@material-ui/core/Avatar';


import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';

const ProductCreate = forwardRef( (props , ref) => {
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({

    handleClickOpen() {  setOpen(true); }

  }));

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
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
    },
  }));

  const _companyReducer = useSelector(state=>state.company)

  const handleClose = () => { setOpen(false); }
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCompanies())
  }, [ ]);
  

  const initNewModule = {
    ModuleName : '',
    ModuleId : '',
    CompanyId : ''
  }

  const [newModule , setNewModule] = useState(initNewModule);

  const cretaeModule = () =>{
    dispatch(createModule(newModule))
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title">{"Create New Module"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth name="ModuleId" label="ModuleId"
                      onChange={e=>  setNewModule({ ...newModule , ModuleId : e.target.value })}   
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField variant="outlined" required fullWidth name="ModuleName" label="ModuleName"
                       onChange={e=>  setNewModule({ ...newModule , ModuleName : e.target.value })}
                  />
                  </Grid>
                  <Grid item xs={12}>
                    
                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <Select  native    onChange={e=>  setNewModule({ ...newModule , CompanyId : e.target.value })}  >
                            <option value=""></option>
                            {_companyReducer.companies.map((company ,index)=>( 
                              <option key={index} value={company.companyId}>{ company.companyName }</option>
                            ))}
                        </Select>
                    </FormControl>
                  </Grid>
              </Grid>
              <Box my={3}>
                <Button
                  type="submit" fullWidth  variant="contained" color="primary"
                  className={classes.submit} onClick={(e)=>{
                      cretaeModule()
                      e.preventDefault();
                  }} > Create </Button>
              </Box>
              
              </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"> Cancel  </Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
} )

export default ProductCreate;
