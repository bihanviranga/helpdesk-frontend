import React , {useState , useEffect ,forwardRef, useImperativeHandle}from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {useSelector , useDispatch} from 'react-redux'
import { fetchDashboard } from '../../redux';
import DashboardMainInformation from '../../components/Dashboard/DashboardMainInformation'
import DashboardCompanyDetails from '../../components/Dashboard/DashboardCompanyDetails'

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

function DashboardIndex() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const _dashboardReducer = useSelector(state=>state.dashboard)

    useEffect(() => {
        dispatch(fetchDashboard())
    }, [ ]);

    return (
        <div className={classes.root}>
            <DashboardMainInformation />
            <DashboardCompanyDetails />
        </div>
    )
}

export default DashboardIndex
