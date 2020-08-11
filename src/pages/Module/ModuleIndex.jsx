import React , {useState , useEffect , useRef} from 'react';
import {useSelector , useDispatch} from 'react-redux'
import {fetchModules} from '../../redux/'

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


import ModuleCreate from '../../components/Module/ModuleCreate'
import ModuleView from '../../components/Module/ModuleView'


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

export default function ModuleIndex() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const moduleCreateRef = useRef();
  const moduleViewRef = useRef();

  useEffect(() => {
    dispatch(fetchModules())
  }, [ ]);

  const _moduleReducer = useSelector(state=>state.module)

  //component
  var ModuleListComponent = () => {
    
    if(_moduleReducer.moduleslength == 0){
        
        return (<>
            <StyledTableRow>
                <StyledTableCell align="right">Loading ...!</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
        </>)
    }else{
        return (<>
            {_moduleReducer.modules.map((row) => (
                <StyledTableRow key={row.moduleId}>
                    <StyledTableCell component="th" scope="row"> <Link onClick={ ()=>{ moduleViewRef.current.handleClickOpen(row) } } >{row.moduleId}</Link> </StyledTableCell>
                    <StyledTableCell align="right">{row.moduleName}</StyledTableCell>
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
                    <Link onClick={() => moduleCreateRef.current.handleClickOpen()}> Add Module </Link>
                </Box>
            </div>
            <div>
            <CssBaseline />
                <Container maxWidth="md" >
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Module ID</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Company</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <ModuleListComponent />
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        </Box >

        
        <div>
          <div>
            <ModuleCreate ref={moduleCreateRef} />
            
            <ModuleView ref={moduleViewRef} />
             
          </div>
        </div>

    </>
  );
}
