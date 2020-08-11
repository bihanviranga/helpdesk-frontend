import React , {useState , useEffect , useRef} from 'react';
import {useSelector , useDispatch} from 'react-redux'
import {fetchBrands} from '../../redux/'

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


import BrandCreate from '../../components/Brand/BrandCreate'
import BrandView from '../../components/Brand/BrandView'


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

export default function BrandIndex() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const brandCreateRef = useRef();
  const brandViewRef = useRef();

  useEffect(() => {
    dispatch(fetchBrands())
  }, [ ]);

  const _brandReducer = useSelector(state=>state.brand)

  //component
  var BrandListComponent = () => {
    
    if(_brandReducer.brands.length == 0){
        
        return (<>
            <StyledTableRow>
                <StyledTableCell align="right">Loading ...!</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
        </>)
    }else{
        return (<>
            {_brandReducer.brands.map((row) => (
                <StyledTableRow key={row.brandId}>
                    <StyledTableCell component="th" scope="row"> <Link onClick={ ()=>{ brandViewRef.current.handleClickOpen(row) } } >{row.brandId}</Link> </StyledTableCell>
                    <StyledTableCell align="right">{row.brandName}</StyledTableCell>
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
                    <Link onClick={() => brandCreateRef.current.handleClickOpen()}> Add Brand </Link>
                </Box>
            </div>
            <div>
            <CssBaseline />
                <Container maxWidth="md" >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Brand ID</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Company</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <BrandListComponent />
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </Box >

        
        <div>
          <div>
            <BrandCreate ref={brandCreateRef} />
            
            <BrandView ref={brandViewRef} />
             
          </div>
        </div>

    </>
  );
}
