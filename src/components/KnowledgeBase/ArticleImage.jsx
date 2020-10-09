import React , {forwardRef, useRef, useImperativeHandle}from 'react'

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import { makeStyles } from '@material-ui/core/styles';

import TableContainer from '@material-ui/core/TableContainer'; 
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'

 
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
