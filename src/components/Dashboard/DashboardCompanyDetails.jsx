import React , {useState , useEffect ,forwardRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box'; 
import Grid from '@material-ui/core/Grid'; 

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 700,
      },
  }));



function DashboardCompanyDetails() {

    const CompanyDetailsComponent = () =>{
        if(_dashboardReducer.companyDetails == null){
            return(
                <>
                    <StyledTableRow>
                        <StyledTableCell align="right">Loading ...!</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </StyledTableRow>
                </>
            )
        }else{
            return(
            <>
                {_dashboardReducer.companyDetails.map((row) => (
                    <StyledTableRow key={row.name}>
                    
                    <StyledTableCell component="th" scope="row">{row.companyName}</StyledTableCell>
                    <StyledTableCell align="right">{row.totalTickets}</StyledTableCell>
                    <StyledTableCell align="right">{row.totalOpenTickets}</StyledTableCell>
                    <StyledTableCell align="right">{row.totalInprogressTickets}</StyledTableCell>
                    <StyledTableCell align="right">{row.totalClosedTickets}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </>
            )
        }
    }

    const classes = useStyles();

    const _dashboardReducer = useSelector(state=>state.dashboard)
    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
            <Box m={5}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Company Name</StyledTableCell>
                            <StyledTableCell align="right">Total Tickets</StyledTableCell>
                            <StyledTableCell align="right">Open Tickets</StyledTableCell>
                            <StyledTableCell align="right">Inprogress Tickets</StyledTableCell>
                            <StyledTableCell align="right">Closed Tickets</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {CompanyDetailsComponent()}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                Avarage time and other parts inclute here.... ( not dev yet)
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
}

export default DashboardCompanyDetails
