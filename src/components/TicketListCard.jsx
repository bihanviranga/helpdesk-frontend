import React from 'react';

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
    }
})

export default function TicketListCard({ tktData }) {
    const classes = useStyles();
    return (
        <Card variant="outlined" className={ classes.card }>
            <div className={ classes.tktSubject }>{ tktData.tktSubject }</div>
            <div>{ tktData.tktCategory }</div>
            <Chip label={ "Status: " + tktData.tktStatus } size="small" />
            <Chip label={ "Priority: " + tktData.tktPriority } size="small" />
        </Card>
    );
}
