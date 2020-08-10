import React , {useState , useEffect , useRef} from 'react';
import {useSelector , useDispatch} from 'react-redux'
import {fetchProducts} from '../../redux/'

// import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import Button from '@material-ui/core/Button';


import ProductCreate from '../../components/Product/ProductCreate'
import ProductView from '../../components/Product/ProductView'


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ProductIndex() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const productCreateRef = useRef();
  const productViewRef = useRef();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [ ]);

  const _productReducer = useSelector(state=>state.product)

  //component
  var ProductListComponent = () => {
    
    if(_productReducer.products.length == 0){
        
        return (<>
            <StyledTableRow>
                <StyledTableCell align="right">Loading ...!</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
        </>)
    }else{
        return (<>
            {_productReducer.products.map((row) => (
                <StyledTableRow key={row.productId}>
                    <StyledTableCell component="th" scope="row"> <Link onClick={ ()=>{ productViewRef.current.handleClickOpen(row) } } >{row.productId}</Link> </StyledTableCell>
                    <StyledTableCell align="right">{row.productName}</StyledTableCell>
                    <StyledTableCell align="right">{row.companyName}</StyledTableCell>
                </StyledTableRow>
            ))}
        </>)
    }
  }


  
  return (
    <>
        <Box m={5}>
            <div>
                <Box mb={3}>
                    <Link onClick={() => productCreateRef.current.handleClickOpen()}> Add Product </Link>
                </Box>
            </div>
            <div>
            <CssBaseline />
                <Container maxWidth="md" >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Product ID</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Company</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <ProductListComponent />
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </Box >

        
        <div>
          <div>
            <ProductCreate ref={productCreateRef} />
            
            <ProductView ref={productViewRef} />
             
          </div>
        </div>

    </>
  );
}
