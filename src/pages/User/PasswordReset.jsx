import React , {useState , useEffect ,forwardRef, useRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { CheckResetPermissionAndUserAvailability , fetchAllCompanies , MakeNullResetUser , ResetPassword} from '../../redux'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'; 
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Avatar from '@material-ui/core/Avatar';
 
const PasswordReset = forwardRef( (props , ref) => {
  useImperativeHandle(ref, () => ({

    handleClickOpen() {
      setOpen(true);
     }

  }));

  const useStyles = makeStyles({
    table: {
      minWidth: 450,
    },
  });

  const _companyReducer = useSelector(state => state.company)
  const _userReducer = useSelector(state => state.user)


  const [updatedUser , setUpdatedUser] = React.useState({
    CompanyId : null,
    UserName : null,
    NewPassword : ''
  })
  useEffect(() => {
      dispatch(fetchAllCompanies())
      if( _userReducer.resetUser != null  ){
        setUpdatedUser({...updatedUser , CompanyId : _userReducer.resetUser.companyId , UserName : _userReducer.resetUser.userName })
      }
      
      return () => { }
  }, [])

  useEffect(() => {
    if( _userReducer.resetUser != null  ){
      setUpdatedUser({...updatedUser , CompanyId : _userReducer.resetUser.companyId , UserName : _userReducer.resetUser.userName })
    }
    return () => { }
}, [_userReducer.resetUser])

  const classes = useStyles();
  const dispatch = useDispatch();
  
 
  const [open, setOpen] = React.useState(false);
  const [searchUser , setSearchUser] = React.useState(false);
  const [userData , setUserData] = React.useState({
    CompanyId : null,
    UserName : null
  })

  function UserDetails(){
    if(_userReducer.resetUser == null ) {
      return (<>  </>)
    }else{
      return(
        <>
          <Container component="main" maxWidth="md">
                <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar> 
                        
                        <form className={classes.form} noValidate>
                        <Grid container  spacing={2}>
                            <Grid item xs={12} >
                                Full name : {  (_userReducer.resetUser != null ) ? (<> {_userReducer.resetUser.userName}</>) : null }
                            </Grid>
                        
                            <Grid item xs={12} sm={6}>
                                User Type : { (_userReducer.resetUser != null ) ? (<> {_userReducer.resetUser.userType}</>) : null }
                            </Grid>
                           
                            <Grid  item xs={12} sm={6}>
                                User Role : { (_userReducer.resetUser != null ) ? (<> {_userReducer.resetUser.userRole}</>) : null }
                            </Grid>
                            <Grid item xs={12} sm={6}> 
                                    User Name : { (_userReducer.resetUser != null ) ? (<> {_userReducer.resetUser.userName}</>) : null }
                                
                            </Grid>
                            <Grid item xs={12} sm={6}>
                               
                                    Phone : { (_userReducer.resetUser != null ) ? (<> {_userReducer.resetUser.phone}</>) : null }
                              
                            </Grid>
                            <Grid item xs={12} >
                                
                                    EMail : { (_userReducer.resetUser != null ) ? (<> {_userReducer.resetUser.email}</>) : null }
                                
                            </Grid>
                            <Grid item xs={12}>
                                Company : { (_userReducer.resetUser != null ) ? (<> {_userReducer.resetUser.companyName}</>) : null }
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                
                </Container>
        </>
      )
    }
  }

  

  const [ reenteredPassword , setReenteredPassword ] =  React.useState('')
  
  const handleClose = () => { setOpen(false); }

  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title">{"Reset Option"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
              { searchUser == false ? 
              (  <TextField variant="outlined" required fullWidth label="User Name" 
                onChange={ e => setUserData({ ...userData, UserName: e.target.value }) } /> ) : null }
              {
                searchUser == false ? 
                ( <FormControl fullWidth variant="outlined" className={ classes.formControl }>
                      <InputLabel  >Company</InputLabel>
                      <Select native label="CompanyName" name="CompanyName" onChange={ (e) => setUserData({ ...userData , CompanyId : e.target.value }) } >
                          <option value=""></option>
                          { _companyReducer.companies.map((company) => (
                              <option key={ company.companyId } value={ company.companyId }>{ company.companyName }</option>
                          )) }
                      </Select>
                  </FormControl> ) : null
              } 


              { (searchUser == true &&  _userReducer.resetUser != null ) ? (<> <UserDetails /> </>) : null }
              
              { (searchUser == true &&  _userReducer.resetUser != null ) ? ( <>
                <TextField variant="outlined" required fullWidth name="ConfirmPassword" label="Confirm Password" type="password"
                onChange={ e => setUpdatedUser({ ...updatedUser , NewPassword : e.target.value }) }  placeholder="new password" />
               <TextField variant="outlined" required fullWidth name="ConfirmPassword" label="Confirm Password" type="password"
                onChange={ e => setReenteredPassword( e.target.value) }  placeholder="re-enter password" />
              </> ) : ( (searchUser == !false) ?( <> User Not Found </> ) : null ) }

          </DialogContentText>
        </DialogContent>
        <DialogActions>
  

          {  (searchUser == false ) ?  ( ( userData.CompanyId !=null && userData.UserName != null  ) ? <Button type="submit" fullWidth variant="contained" color="primary"
                            className={ classes.submit }  onClick={()=> {
                              setSearchUser(true)
                              dispatch(CheckResetPermissionAndUserAvailability(userData))
                              }}  > Search User </Button> : null) : (
                                <>
                                  <Button type="submit" fullWidth variant="contained" color="primary"
                                    className={ classes.submit }  onClick={()=> {
                                      setSearchUser(false)
                                      setUserData({ ...userData , CompanyId : null , UserName : null })
                                      setUpdatedUser({ ...updatedUser , NewPassword : null , CompanyId : null , UserName : null }) 
                                      dispatch(MakeNullResetUser())
                                      }}  > Search again </Button>
                                      
                                  { (updatedUser.NewPassword ==  reenteredPassword  &&  updatedUser.NewPassword.length > 0) ? (<Button type="submit" fullWidth variant="contained" color="primary"
                                    className={ classes.submit }  onClick={()=> {
                                      setSearchUser(false)
                      
                                      dispatch(ResetPassword( updatedUser ))
                                      
                                      setUserData({ ...userData , CompanyId : null , UserName : null })
                                      setOpen(false)
                                      
                                      
                                      }}  > Reset Password now</Button>) : null}
                                </>
                              )}
          
        </DialogActions>
      </Dialog>
    </div>
  );
} )

export default PasswordReset;
