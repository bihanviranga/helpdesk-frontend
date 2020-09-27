import React , {useState , useEffect ,forwardRef, useImperativeHandle}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {useSelector , useDispatch} from 'react-redux'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
 
const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));

function DashboardMainInformation() {

        const classes = useStyles();
        const dispatch = useDispatch();
        const _dashboardReducer = useSelector(state=>state.dashboard)
    
        useEffect(() => {
            
        }, [ ]);

    return (
        <div>
            
            <Box m={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <h1>Master Dashboard</h1>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Box >
                                <h3>Total Tickets</h3>
                                <h2> {_dashboardReducer.totalTickets}</h2>
                            </Box> 
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Box >
                                <h3>Open Tickets</h3>
                                <h2> {_dashboardReducer.openTickets}</h2>
                            </Box> 
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Box >
                                <h3>Closed Tickets</h3>
                                <h2> {_dashboardReducer.closedTickets}</h2>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Box >
                                <h3>Inprogress Tickets</h3>
                                <h2> {_dashboardReducer.inprogressTickets}</h2>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default DashboardMainInformation
