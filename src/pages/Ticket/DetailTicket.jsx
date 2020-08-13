import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import { fetchTicketById, deleteTicket, updateTicket, getUserByUserName, getTicketAttachment } from '../../redux/'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';

import TicketOwnerDetails from '../../components/Ticket/TicketOwnerDetails'

function DetailTicket() {
    const { ticketId } = useParams();
    const dispatch = useDispatch();



    const useStyles = makeStyles({
        table: {

        },
    });
    const classes = useStyles();
    const history = useHistory()

    const selectedTicket = useSelector(state => {
        if (state.ticket.tickets.length !== 0) {
            return state.ticket.tickets.filter(tkt => tkt.ticketId == ticketId)[0];
        } else {
            return null
        }
    })

    const _userReducer = useSelector(state => state.user)
    const ticketOwnerDetailsRef = useRef();

    useEffect(() => {
        dispatch(fetchTicketById(ticketId));
        if (_userReducer.user == null && localStorage.getItem("Token") != null) {
            dispatch(getUserByUserName(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName))
        }
    }, []);

    const updateTkt = (e, selectedTicket) => {

        selectedTicket.tktStatus = e.target.value;

        dispatch(updateTicket(selectedTicket))
    }

    const getAttachment = () => {
        dispatch(getTicketAttachment(selectedTicket.ticketId, selectedTicket.tktAttachment));
    }

    function StatusDropdownComponent() {
        if (selectedTicket != null) {
            if (JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserType == "HelpDesk") {
                return (
                    <FormControl fullWidth variant="outlined" className={ classes.formControl }>
                        <Select native onChange={ (e) => { updateTkt(e, selectedTicket) } } >
                            <option value="Open" selected={ selectedTicket.tktStatus == "Open" ? true : false } >Open</option>
                            <option value="Closed" selected={ selectedTicket.tktStatus == "Closed" ? true : false } >Close</option>
                            <option value="in-progress" selected={ selectedTicket.tktStatus == "in-progress" ? true : false } >in-progress</option>
                        </Select>
                    </FormControl>
                )
            } else {
                return (
                    <>
                        { selectedTicket != null ? selectedTicket.tktStatus : 'Loading ... !' }
                    </>
                )
            }
        } else {
            return (<p> Loading ... ! </p>)
        }
    }

    function AttachmentGetComponent() {
        if (selectedTicket != null && selectedTicket.tktAttachment != null) {
            return (
                <TableCell align="left"><Button onClick={ getAttachment }>Download</Button></TableCell>
            );
        }
        else {
            return (
                <TableCell align="left">None</TableCell>
            );
        }
    }



    const deletePermission = () => {
        if (localStorage.getItem("Token") == null) return false;
        else
            if (selectedTicket != null && _userReducer.user != null)
                if (_userReducer.user.userName == selectedTicket.tktCreatedBy && _userReducer.user.companyId == selectedTicket.tktCreatedByCompany) return true;
                else return false;
            else return false;
    }


    return (
        <div>

            <Grid container spacing={ 2 }>
                <Grid item md={ 12 }>
                    <Typography >
                        <Box mb={ 5 } >
                            <Grid container spacing={ 3 }>
                                <Grid item xs={ 12 }> <Box component="h1" display="inline" >   { selectedTicket != null ? selectedTicket.tktSubject : 'Loading ... !' }  </Box >  </Grid>
                                <Grid item xs={ 5 }>
                                    <Box component="h3" display="inline" >   Ticket no :   </Box >
                                    <Box component="p" display="inline" >   { selectedTicket != null ? JSON.stringify(selectedTicket.ticketCode) : 'Loading ... !' }  </Box >
                                </Grid>
                                <Grid item xs={ 7 }>
                                    <Box display="inline" mx={ 2 } >   { false ? <>Reassignment</> : null }  </Box >
                                    <Box display="inline" mx={ 2 } >   { false ? <>Transferring</> : null }  </Box >
                                    <Box display="inline" mx={ 2 } >   { false ? <>Conversation</> : null }  </Box >

                                    <Box display="inline" mx={ 2 } >
                                        <Link onClick={ () => { ticketOwnerDetailsRef.current.handleClickOpen(selectedTicket.tktCreatedBy) } } >Ticket Owner Details</Link>
                                    </Box >
                                    <Box display="inline" mx={ 2 } >
                                        { deletePermission() ? (<><Button variant="contained" color="secondary" onClick={ () => {
                                            dispatch(deleteTicket(ticketId));
                                            history.push({ pathname: "/Tickets" })
                                        } } >
                                            Delete Ticket
                                        </Button></>) : null }

                                    </Box >
                                </Grid>

                            </Grid>
                        </Box >
                    </Typography>
                </Grid>
                <Grid container item spacing={ 2 } xs={ 4 } direction="column">

                    <TableContainer component={ Paper }>
                        <Table className={ classes.table } aria-label="simple table">

                            <TableBody>
                                <TableRow >
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">
                                        <StatusDropdownComponent />
                                    </TableCell>
                                </TableRow>
                                <TableRow >

                                    <TableCell align="left">Priority</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.tktPriority : 'Loading ... !' }</TableCell>

                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Company</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.companyName : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.categoryName : 'Loading ... !' }</TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell align="left">Product</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.productName : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Module</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.moduleName : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Brand</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.brandId : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Created by</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.tktCreatedBy : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Created on</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.tktCreatedDate : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Created on</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.tktCreatedDate : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Assigned to</TableCell>
                                    <TableCell align="left">{ selectedTicket != null ? selectedTicket.tktAssignedTo : 'Loading ... !' }</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="left">Attachment</TableCell>
                                    <AttachmentGetComponent />
                                </TableRow>

                            </TableBody>

                        </Table>
                    </TableContainer>

                </Grid>


                <Grid item xs={ 8 }>

                    {/* <Box display="inline" mx={2} >  { selectedTicket.tktContent } </Box >  */ }


                    <Grid container spacing={ 3 }>
                        <Grid item xs={ 12 }> <Box component="p" mx={ 5 } >   { selectedTicket != null ? selectedTicket.tktContent : 'Loading ... !' }  </Box >  </Grid>
                        <Grid item xs={ 12 }>
                            {/* Ref Link Here */ }
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <>
                <TicketOwnerDetails ref={ ticketOwnerDetailsRef } />
            </>
        </div >
    );
}


export default DetailTicket;