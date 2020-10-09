import React , {forwardRef, useRef, useImperativeHandle}from 'react'
import {deleteArticle} from '../../redux'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

 
const ArticleMoreOperations = forwardRef( (props , ref) => {
  useImperativeHandle(ref, () => ({

    handleClickOpen(article) {
      setArticle(article)
      // setProductUpdateData(row)
      setOpen(true);
     }

  }));

  const useStyles = makeStyles({
     
    image:{
      // maxWidth : "530px",
      maxHeight	 : "460px"
    },
    table: {
      minWidth: 650,
    },
  });



  const classes = useStyles();
  
 
  const [open, setOpen] = React.useState(false);
  const [article, setArticle] = React.useState(null);

  const handleClose = () => { setOpen(false); }
  const dispatch = useDispatch();
  const history = useHistory();

  // const classes = useStyles();
  return (
    <div>
      
      
      <Dialog maxWidth={"md"} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"  >
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
          
            
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
               
                  <TableRow  >
                    <TableCell component="th" scope="row">
                      <h3>Actions</h3>
                    </TableCell>
                    <TableCell align="right"> 
                      <Button startIcon={<DeleteIcon />} variant="contained"   color="secondary" className={classes.margin}
                        onClick={ ()=>{ 
                          if(article != null) dispatch(deleteArticle(article.articleId))
                          history.push({ pathname: "/KnowledgeBase_index" })
                        } }
                      >
                        Delete
                      </Button >
                                           
                        <Button variant="contained"
                                color="default" 
                                startIcon={<CloudUploadIcon />} className={classes.margin}>Update</Button >
                      
                    </TableCell>
                  </TableRow>

                  <TableRow  >
                    <TableCell component="th" scope="row">
                      <h3>ID</h3>
                    </TableCell>
                    <TableCell align="right"> { (article != null) ? JSON.stringify(article.articleId) : null } </TableCell>
                  </TableRow>

                  <TableRow  >
                    <TableCell component="th" scope="row">
                      <h3>Creater</h3>
                    </TableCell>
                    <TableCell align="right"> { (article != null) ? JSON.stringify(article.createdBy) : null  } </TableCell>
                  </TableRow>

                  <TableRow  >
                    <TableCell component="th" scope="row">
                      <h3>Product</h3>
                    </TableCell>
                    <TableCell align="right"> {(article != null) ? article.productId : null } </TableCell>
                  </TableRow>

                  <TableRow  >
                    <TableCell component="th" scope="row">
                      <h3>Created Date</h3>
                    </TableCell>
                    <TableCell align="right"> {(article != null) ? article.createdDate : null } </TableCell>
                  </TableRow>
        
              </TableBody>
            </Table>
          </TableContainer>

            
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
    </div>
  );
} )

export default ArticleMoreOperations;
