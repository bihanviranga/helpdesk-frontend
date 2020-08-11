import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    card: {
        padding: '1em',
        margin: '1em'
    },
    tktSubject: {
        fontWeight: 'bold',
        textDecoration: 'none'
    }
})

export default function TicketListCard({ tktData }) {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Card variant="outlined" className={ classes.card }>
            <a className={ classes.tktSubject } href="#" onClick={ () => history.push({ pathname: `/tickets/${tktData.ticketId}` }) }>{ tktData.tktSubject }</a>
            <div>{ tktData.categoryId }</div>
            <Chip label={ "Status: " + tktData.tktStatus } size="small" />
            <Chip label={ "Priority: " + tktData.tktPriority } size="small" />
        </Card>
    );
}
