import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTicketById } from '../../redux/Ticket/TicketAction'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function DetailTicket() {
    const { ticketId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTicketById(ticketId));
    }, []);

    const selectedTicket = useSelector(state => {
        return state.ticket.tickets.filter(tkt => tkt.ticketId == ticketId)[0];
    }) || { tktSubject: "Loading" }

    return (
        <div>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 12 }>
                    <Typography variant="h3">
                        { selectedTicket.tktSubject }
                    </Typography>
                </Grid>
                <Grid container item spacing={ 2 } xs={ 4 } direction="column">
                    <Grid item>
                        <TicketDetailLabel caption="Category" value={ selectedTicket.categoryId } />
                        <TicketDetailLabel caption="Status" value={ selectedTicket.tktStatus } />
                        <TicketDetailLabel caption="Priority" value={ selectedTicket.tktPriority } />
                    </Grid>
                    <Grid item>
                        <TicketDetailLabel caption="Company" value={ selectedTicket.companyId } />
                        <TicketDetailLabel caption="Product" value={ selectedTicket.productId } />
                        <TicketDetailLabel caption="Module" value={ selectedTicket.moduleId } />
                        <TicketDetailLabel caption="Brand" value={ selectedTicket.brandId } />
                    </Grid>
                    <Grid item>
                        <TicketDetailLabel caption="Created by" value={ selectedTicket.tktCreatedBy } />
                        <TicketDetailLabel caption="Created on" value={ selectedTicket.tktCreatedDate } />
                        <TicketDetailLabel caption="Assigned to" value={ selectedTicket.tktAssignedTo } />
                    </Grid>
                </Grid>
                <Grid item xs={ 8 }>
                    <div>
                        { selectedTicket.tktContent }
                    </div>
                </Grid>
            </Grid>
        </div >
    );
}

function TicketDetailLabel({ caption, value }) {
    return (
        <div>
            <Typography variant="caption">{ caption }</Typography>
            <Typography>{ value }</Typography>
        </div>
    );
}

export default DetailTicket;