import React, { useState, forwardRef, useImperativeHandle } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import Button from '@material-ui/core/Button';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';

const TicketTimeline = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleClickOpen(ticketId) {
      // dispatch(getTicketTimeline(ticketId));
      setOpen(true);
    }
  }));

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={ open } onClose={ handleClose } aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Ticket Timeline</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h4>This is the ticket timeline</h4>
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Item 1</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Item 2</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>Item 3</TimelineContent>
              </TimelineItem>
            </Timeline>
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
