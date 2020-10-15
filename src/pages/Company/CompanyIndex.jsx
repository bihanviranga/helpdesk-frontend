import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createCompany , fetchAllCompanies , deleteCompany } from '../../redux'

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// table component
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

// dialogBox component
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// icons
import { 
    Delete , CloudUpload
  } from '@material-ui/icons';

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


function CompanyIndex() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const _companyReducer = useSelector(state=>state.company)

   
    const initSelectedCompany = {
        companyId : '',
        companyName : ''
    }
    const [createDialogBoxOpen, setCreateDialogBoxOpen] = useState(false);
    const [viewCompanyDialogBoxOpen, setViewCompanyDialogBoxOpen] = useState(false);

    const [newCompany , setNewCompany] = useState('');
    const [selectedCompany , setSelectedCompany] = useState(initSelectedCompany);

    useEffect(() => {
        dispatch(fetchAllCompanies())
    }, [ ]);

    //components

    function ComapanyListComponent(){
        
        if(_companyReducer.companies.length == 0){
            return (<p> Loading Companies ... ! </p>)
        }
        else{
            
            return ( _companyReducer.companies.map((row)=>(
                <TableRow key={row.companyId} >
                    <StyledTableCell align="left" component="th" scope="row"> 
                        <Link variant="outlined" color="primary" onClick={()=>{
                            // setSelectedUser(row)
                            setSelectedCompany(row)
                            setViewCompanyDialogBoxOpen(true)
                        }}>
                            {row.companyName}
                        </Link>
                    </StyledTableCell> 
                    <StyledTableCell align="right">{row.numOfTickets}</StyledTableCell>
                    <StyledTableCell align="right">{row.numOfProducts}</StyledTableCell>
                    <StyledTableCell align="right">{row.numOfCategories}</StyledTableCell>
                    <StyledTableCell align="right">{row.numOfModules}</StyledTableCell>
                    <StyledTableCell align="right">{row.numOfBrands}</StyledTableCell>
                </TableRow>
                )
            ) )
        }
    }


    return (
        <div>
            <h3>Company List</h3>

            <div>
               <Box mb={3}>  <Link variant="outlined" color="primary" onClick={()=>{ setCreateDialogBoxOpen(true)}}>New Company</Link> </Box> 
            </div>
            <div>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow> 
                                <StyledTableCell align="left"><b>Company Name</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Num of Tickets</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Num of Products</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Num of Categories</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Num of Modules</b></StyledTableCell>
                                <StyledTableCell align="right"><b>Num of Brands</b></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {ComapanyListComponent()}
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


            {/* create company dialog box */}
            <div>
                
                <Dialog
                    open={createDialogBoxOpen}
                    onClose={()=>{setCreateDialogBoxOpen(false)}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Creat new Company"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <input type="text" name="CompanyName" placeholder="Enter Company Name" onChange={e=>  setNewCompany( e.target.value )} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{ 
                            if(newCompany.length > 0){dispatch(createCompany(newCompany))}
                            setCreateDialogBoxOpen(false)
                        }} color="primary">
                            Create
                        </Button>
                        <Button onClick={()=>{setCreateDialogBoxOpen(false)}} color="primary" autoFocus>  Close </Button>
                    </DialogActions>
                </Dialog>
            </div>


            {/* View Selected company dialog box */}
            <div>
                
                <Dialog
                    open={viewCompanyDialogBoxOpen}
                    onClose={()=>{setViewCompanyDialogBoxOpen(false)}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`View Company - ${ selectedCompany.companyName}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        <Button mr={5} aria-label="delete" className={classes.margin} color="secondary" onClick={ async (e) => {
                               
                                await dispatch(deleteCompany(selectedCompany.companyId))
                                setViewCompanyDialogBoxOpen(false)
                            } }> 
                                <Delete /> Delete 
                        </Button> 
                        <Button aria-label="delete" className={classes.margin}>
                                <CloudUpload  /> Update
                        </Button> 
                           
                        </DialogContentText>
                    </DialogContent>
                    
                </Dialog>
            </div>
        </div>
    )
}

export default CompanyIndex
