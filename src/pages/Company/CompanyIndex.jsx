import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createCompany , fetchAllCompanies , deleteCompany } from '../../redux'

import Button from '@material-ui/core/Button';

// table component
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// dialogBox component
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function CompanyIndex() {

    const dispatch = useDispatch();
    const _companyReducer = useSelector(state=>state.company)

    const initCreateCompany = {
        companyName : ''
    }
    const initSelectedCompany = {
        companyId : '',
        companyName : ''
    }
    const [createDialogBoxOpen, setCreateDialogBoxOpen] = useState(false);
    const [viewCompanyDialogBoxOpen, setViewCompanyDialogBoxOpen] = useState(false);

    const [company , setCompany] = useState(initCreateCompany);
    const [selectedCompany , setSelectedCompany] = useState(initSelectedCompany);


    //components

    function ComapanyListComponent(){
        if(_companyReducer.companies.length == 0){
            dispatch(fetchAllCompanies())
            return (<p> Loading Companies ... ! </p>)
        }
        else{
            return ( _companyReducer.companies.map((row)=>(
                <TableRow key={row.companyId} >
                    <TableCell component="th" scope="row"> 
                        <Button variant="outlined" color="primary" onClick={()=>{
                            // setSelectedUser(row)
                            setSelectedCompany(row)
                            setViewCompanyDialogBoxOpen(true)
                        }}>
                            {row.companyId}
                        </Button>
                    </TableCell>
                    <TableCell align="right">{row.companyName} </TableCell>
                    <TableCell align="right">#</TableCell>
                    <TableCell align="right">#</TableCell>
                    <TableCell align="right">#</TableCell>
                </TableRow>
                )
            ) )
        }
    }


    return (
        <div>
            <h3>Company List</h3>

            <div>
                <Button variant="outlined" color="primary" onClick={()=>{ setCreateDialogBoxOpen(true)}}>New Company</Button>
            </div>
            <div>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Company ID</b></TableCell>
                                <TableCell align="right"><b>Company Name</b></TableCell>
                                <TableCell align="right"><b>Num of Pro</b></TableCell>
                                <TableCell align="right"><b>Num of Tkt</b></TableCell>
                                <TableCell align="right"><b>Num of Brand</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <ComapanyListComponent />
                            
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
                            <input type="text" name="CompanyName" placeholder="Enter Company Name" onChange={e=>  setCompany({ ...company , CompanyName : e.target.value })} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{ 
                            if(company.companyName.length > 0){dispatch(createCompany(company))}
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
                    <DialogTitle id="alert-dialog-title">{"View Company"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {JSON.stringify(selectedCompany)}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{ 
                            dispatch(deleteCompany(selectedCompany.companyId))
                            setViewCompanyDialogBoxOpen(false)
                        }} color="primary">
                            Delete
                        </Button>
                        <Button onClick={()=>{setViewCompanyDialogBoxOpen(false)}} color="primary" autoFocus>  Edit </Button>
                        <Button onClick={()=>{setViewCompanyDialogBoxOpen(false)}} color="primary" autoFocus>  Close </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default CompanyIndex
