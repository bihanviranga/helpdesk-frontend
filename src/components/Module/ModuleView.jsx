import React , {useState , useEffect ,forwardRef, useRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { deleteModule , updateModule } from '../../redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer'; 
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
 
const ModuleView = forwardRef( (props , ref) => {
  useImperativeHandle(ref, () => ({

    handleClickOpen(row) {
      setModule(row)
      setModuleUpdateData(row)
      setOpen(true);
     }

  }));

  const useStyles = makeStyles({
    table: {
      minWidth: 450,
    },
  });



  const classes = useStyles();
  const dispatch = useDispatch();
  
  const initModule = {
     moduleName : null,
     moduletId : null ,
     companyName : null,
     companyId : null
   }
  const [open, setOpen] = React.useState(false);
  const [updateState , setUpdateState] = React.useState(false);
  const [module, setModule] = React.useState(initModule);

  const [moduleUpdateData, setModuleUpdateData] = React.useState(initModule);

  const handleClose = () => { setOpen(false); }

  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogTitle id="alert-dialog-title">{"View Module"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
          
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                 
                    <TableRow >
                     
                      <TableCell component="th" scope="row"> <b> Module Id </b> </TableCell>
                      <TableCell align="left">  {  module.moduleId  }  </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row"> <b> Module Name </b> </TableCell>
                      <TableCell align="left">  {   updateState == false ? (<>{ module.moduleName }</>) :
                       ( <> <TextField variant="outlined" required   fullWidth name="moduleName"   label="module Name"
                            onChange={e=>  setModuleUpdateData({ ...moduleUpdateData , moduleName : e.target.value })}   
                          /> </> ) }   </TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell component="th" scope="row"> <b> Company </b> </TableCell>
                      <TableCell align="left">  {     module.companyName   }  </TableCell>
                    </TableRow> 
                
                </TableBody>
              </Table>
          </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          
          { updateState == false ? 
            (<Button   size="small" onClick={ ()=>{ setUpdateState(true) } } color="primary"> Update </Button>) :
            ( <>
                <Button   size="small" onClick={ ()=>{ setUpdateState(false) } } color="primary" autoFocus> Close </Button>
                <Button  size="small" onClick={ ()=>{ 
                  setModule({...module , moduleName : moduleUpdateData.moduleName })
                  setUpdateState(false); 
                  dispatch(updateModule(moduleUpdateData)) } } color="primary" autoFocus>  Update </Button>
              </>
              
            )
           }

          {  updateState == false ? 
            (<Button onClick={handleClose}  size="small" color="primary" autoFocus> Close </Button>) :
            null
          }
          
          { updateState == false ?
            (<Button  size="small" onClick={ ()=>{ 
              dispatch(deleteModule(module.moduleId , module.companyId ))
              handleClose()
             } } color="secondary" autoFocus>  Delete </Button>) :
             null
          }

        </DialogActions>
      </Dialog>
    </div>
  );
} )

export default ModuleView;
