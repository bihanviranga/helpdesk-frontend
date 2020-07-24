import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router";
import { fetchTicketById , deleteTicket } from '../../redux/'
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

function DetailTicket() {
    const { ticketId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTicketById(ticketId));
    }, []);

    const useStyles = makeStyles({
        table: {
          
        },
      });
    const classes = useStyles();
    const history =  useHistory()

    const selectedTicket = useSelector(state => {
        return state.ticket.tickets.filter(tkt => tkt.ticketId == ticketId)[0];
    }) || { tktSubject: "Loading" }

    return (
        <div>
            
            <Grid container spacing={ 2 }>
                <Grid item md={ 12 }>
                    <Typography >
                        <Box  mb={5} >     
                            <Grid container spacing={3}>
                                <Grid item xs={12}> <Box component="h1" display="inline" >   { selectedTicket.tktSubject }  </Box >  </Grid>
                                <Grid item xs={5}>  
                                    <Box component="h3" display="inline" >   Ticket no :   </Box > 
                                    <Box component="p" display="inline" >   { ticketId }  </Box > 
                                </Grid>
                                <Grid item xs={7}>
                                    <Box display="inline" mx={2} >   Reassignment  </Box > 
                                    <Box display="inline" mx={2} >   Transferring  </Box > 
                                    <Box display="inline" mx={2} >   Conversation  </Box > 
                                    <Box display="inline" mx={2} >   User Details  </Box > 
                                    <Box display="inline" mx={2} onClick={ ()=>{
                                        dispatch(deleteTicket(ticketId));
                                        history.push({ pathname:  "/Tickets" })
                                    } } >   Delete Ticket  </Box > 
                                </Grid>
                                
                            </Grid>
                        </Box > 
                    </Typography>
                </Grid>
                <Grid container item spacing={ 2 } xs={ 4 } direction="column">

                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        
                        <TableBody>
                       
                            <TableRow >
                                <TableCell align="left">Category</TableCell>
                                <TableCell align="left">{ selectedTicket.categoryId }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">{ selectedTicket.tktStatus }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Product</TableCell>
                                <TableCell align="left">{ selectedTicket.productId }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Module</TableCell>
                                <TableCell align="left">{ selectedTicket.moduleId }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Brand</TableCell>
                                <TableCell align="left">{ selectedTicket.brandId }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Created by</TableCell>
                                <TableCell align="left">{ selectedTicket.tktCreatedBy }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Created on</TableCell>
                                <TableCell align="left">{ selectedTicket.tktCreatedDate }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Created on</TableCell>
                                <TableCell align="left">{ selectedTicket.tktCreatedDate }</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell align="left">Assigned to</TableCell>
                                <TableCell align="left">{ selectedTicket.tktAssignedTo }</TableCell>
                            </TableRow>
                   
                        </TableBody>
                        
                    </Table>
                    </TableContainer>

                </Grid>


                <Grid item xs={ 8 }>
                    
                        {/* <Box display="inline" mx={2} >  { selectedTicket.tktContent } </Box >  */}

                        
                        <Grid container spacing={3}>
                            <Grid item xs={12}> <Box component="p" mx={5} >   { selectedTicket.tktContent }  </Box >  </Grid>
                            <Grid item xs={12}>  
                                {/* Ref Link Here */}
                            </Grid>
                        </Grid>

                </Grid>
            </Grid>
        </div >
    );
}


export default DetailTicket;