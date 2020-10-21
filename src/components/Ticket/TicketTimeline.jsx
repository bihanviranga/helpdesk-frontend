import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTicketTimeline } from '../../redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import LaunchIcon from '@material-ui/icons/Launch';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

const TicketTimeline = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [currentTicketId, setCurrentTicketId] = useState(null);

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
        handleClickOpen(ticketId) {
            dispatch(getTicketTimeline(ticketId));
            setCurrentTicketId(ticketId);
            setOpen(true);
        }
    }));

    const handleClose = () => {
        setOpen(false);
    }

    const currentTimeline = useSelector(state => {
        if (state.timeline.timelines.length !== 0) {
            const tl = state.timeline.timelines.filter(item => item.ticketId == currentTicketId);
            if (tl.length === 0) {
                return null;
            } else {
                return tl[0];
            }
        } else {
            return null;
        }
    })

    useEffect(() => {
        // update whenever currentTimeline is changed.
    }, [currentTimeline]);

    const TimelineComponent = () => {
        if (currentTimeline == null) {
            return (
                <p>Loading..</p>
            );
        }
        else {
            const getTimelineElement = (item, isLast) => {
                let itemName = null;
                let itemUser = null;
                let itemDate = item.txnDateTime.slice(0, 10);
                let itemTime = item.txnDateTime.slice(11, 16);
                let itemIcon = null;
                let itemIconTheme = "primary";

                if (item.tktEvent == "tktCreated") {
                    itemName = "Ticket created";
                    itemUser = `by ${item.txnUserId}`;
                    itemIcon = <AddIcon />;
                }
                else if (item.tktEvent == "tktDeleted") {
                    itemName = "Ticked deleted";
                    itemUser = `by ${item.txnUserId}`;
                    itemIcon = <DeleteIcon />;
                }
                else if (item.tktEvent == "tktStatusChanged") {
                    itemName = `Status changed to ${item.txnValues}`;
                    itemUser = `by ${item.txnUserId}`;
                    if (item.txnValues == "Open") {
                        itemIcon = <VisibilityIcon />;
                    } else if (item.txnValues == "Closed") {
                        itemIcon = <DoneIcon />;
                    } else if (item.txnValues == "in-progress") {
                        itemIcon = <LaunchIcon />;
                    } else {
                        itemIcon = <PriorityHighIcon />;
                    }
                    itemIconTheme = "secondary";
                }
                else if (item.tktEvent == "tktUserAssigned") {
                    itemName = `Assigned to ${item.txnValues}`;
                    itemUser = `by ${item.txnUserId}`;
                    itemIcon = <PersonAddIcon />;
                }
                else {
                    itemName = item.tktEvent;
                    itemUser = `by ${item.txnUserId}`
                    itemIcon = <PriorityHighIcon />;
                }
                return(
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography color="textPrimary">
                                {itemName}
                            </Typography>
                            <Typography color="textSecondary">
                                {itemUser}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color={itemIconTheme}>
                                {itemIcon}
                            </TimelineDot>
                            { !isLast && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography color="textSecondary">
                                {itemDate}
                            </Typography>
                            <Typography color="textSecondary">
                                {itemTime}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                );
            }

            const populateItems = (timeline) => {
                const items = [];
                for (let i=0; i < timeline.length; i++) {
                    const item = timeline[i];
                    const isLast = (i == timeline.length - 1) ? true : false;
                    const element = getTimelineElement(item, isLast);
                    items.push(element);
                }
                return items;
            }

            return (
                <Timeline>
                    {populateItems(currentTimeline.timeline)}
                </Timeline>
            );
        }
    }

    return (
        <div>
            <Dialog open={ open } scroll="paper" fullWidth="md" maxWidth="md" onClose={ handleClose } aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Ticket Timeline</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TimelineComponent />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose } size="small" color="primary" autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default TicketTimeline;
