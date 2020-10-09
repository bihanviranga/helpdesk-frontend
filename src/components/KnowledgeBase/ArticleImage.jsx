import React , {useState , useEffect ,forwardRef, useRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { deleteProduct , updateProduct } from '../../redux';

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
 
const ArticleImage = forwardRef( (props , ref) => {
  useImperativeHandle(ref, () => ({

    handleClickOpen(imageUrl) {
      setImageUrl(imageUrl)
      // setProductUpdateData(row)
      setOpen(true);
     }

  }));

  const useStyles = makeStyles({
     
    image:{
      // maxWidth : "530px",
      maxHeight	 : "460px"
    }
  });



  const classes = useStyles();
 
  const [open, setOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(false);

  const handleClose = () => { setOpen(false); }

  return (
    <div>
      
      <Dialog maxWidth={"xl"} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
          
            <TableContainer component={Paper}> 
            { imageUrl != null ? (<>  <img className={classes.image} src={imageUrl} alt="" srcset=""/> </>) : null }
            
          </TableContainer>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
    </div>
  );
} )

export default ArticleImage;
