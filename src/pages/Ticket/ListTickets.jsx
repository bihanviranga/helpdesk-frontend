import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTickets } from '../../redux';

import TicketListCard from '../../components/Ticket/TicketListCard';

// TODO: delete this testing data
const tktObject = {
    tktSubject: 'Ticket subject goes here',
    tktStatus: 'STATUS',
    tktPriority: 'PRIORITY',
    tktCategory: 'Ticket Category',
}

function ListTickets() {
    const dispatch = useDispatch();
    const _ticketReducer = useSelector(state => state.ticket);
    dispatch(fetchAllTickets());

    return (
        <div>
            <h1>Tickets</h1>
            { _ticketReducer.tickets.map((tkt, index) => (
                <TicketListCard key={ index } tktData={ tkt } />
            )) }
        </div>
    );
}

export default ListTickets;
