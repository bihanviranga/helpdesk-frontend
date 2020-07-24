import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTickets } from '../../redux';

import TicketListCard from '../../components/Ticket/TicketListCard';

function ListTickets() {
    const dispatch = useDispatch();
    const _ticketStore = useSelector(state => state.ticket);

    useEffect(() => {
        dispatch(fetchAllTickets());
    }, []);

    return (
        <div>
            <h1>Tickets</h1>
            { _ticketStore.tickets.map((tkt, index) => (
                <TicketListCard key={ index } tktData={ tkt } />
            )) }
        </div>
    );
}

export default ListTickets;
