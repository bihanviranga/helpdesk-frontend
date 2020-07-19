import React from 'react';

import TicketListCard from '../../components/TicketListCard';

const tktObject = {
    tktSubject: 'Ticket subject goes here',
    tktStatus: 'STATUS',
    tktPriority: 'PRIORITY',
    tktCategory: 'Ticket Category',
}

function ListTickets() {
    return (
        <div>
            <h1>Tickets</h1>
            <TicketListCard tktData={ tktObject } />
            <TicketListCard tktData={ tktObject } />
        </div>
    )
}

export default ListTickets;
