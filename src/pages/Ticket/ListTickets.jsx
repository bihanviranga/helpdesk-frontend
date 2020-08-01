import React, { useEffect ,useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { fetchAllTickets , fetchAllCompanies , fetchProductsByComapnyId , fetchCategoriesByComapnyId,
    fetchModulesByComapnyId} from '../../redux';

import TicketListCard from '../../components/Ticket/TicketListCard';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

function ListTickets() {

    const useStyles = makeStyles({
        table: {
          
        },
      });
    
    const classes = useStyles();

    const dispatch = useDispatch();

    const _companyReducer = useSelector(state=>state.company)
    const _ticketStore = useSelector(state => state.ticket);
    const _productReducer = useSelector(state=>state.product)
    const _categoryReducer = useSelector(state=>state.category)
    const _moduleReducer = useSelector(state=>state.module)
    

    useEffect(() => {
        dispatch(fetchAllTickets());
        dispatch(fetchAllCompanies())
    }, []);

    var initFilters = {
        state : 'Open',
        Priority : 'All',
        Company : 'All',
        Category : 'All',   
        Product : 'All',
        Module : 'All',
        Brand : 'All',
    }
    const [init , setInit] = useState(initFilters);
    const tkts = _ticketStore.tickets

    const selectCompany = (e) => {

        if(e.target.value !== "All"){
            dispatch(fetchProductsByComapnyId(e.target.value ))
            dispatch(fetchCategoriesByComapnyId(e.target.value ))
            dispatch(fetchModulesByComapnyId(e.target.value ))
        }
        
        _companyReducer.companies.forEach(element => {
            if( e.target.value == "All"){
                setInit({ ...init , Company : e.target.value , Category : 'All', Product : 'All',  Module : 'All', Brand : 'All',})
                return 0;
            }else if(element.companyId == e.target.value){ 
                setInit({ ...init , Company : element.companyName , Category : 'All', Product : 'All',  Module : 'All', Brand : 'All',})
                return 0;
            }
        });  
    }
    
    function TicketList(){
        return(
            <Box component="p" mx={5} > 
                { tkts.map((tkt, index) => (

                    init.Company == "All" ?
                        init.state  == tkt.tktStatus ?
                            <TicketListCard key={ index } tktData={ tkt } />
                        : init.state  == 'All' ?
                            <TicketListCard key={ index } tktData={ tkt } />   
                        : null
                    : init.Company == tkt.companyName ?
                        init.Module == tkt.moduleName ? 
                            init.Category == tkt.categoryName ? 
                                init.Product == tkt.productName ? 
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null 
                                : init.Product == 'All' ?
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null 
                                : null 
                            : init.Category == 'All' ?
                                init.Product == tkt.productName ? 
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null 
                                : init.Product == 'All' ?
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null 
                                : null 
                            : null
                        : init.Module == 'All' ? 
                            init.Category == tkt.categoryName ? 
                                init.Product == tkt.productName ? 
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null 
                                : init.Product == 'All' ?
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null 
                                : null 
                            : init.Category == 'All' ?
                                init.Product == tkt.productName ? 
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null 
                                : init.Product == 'All' ?
                                    init.state  == tkt.tktStatus ?
                                        <TicketListCard key={ index } tktData={ tkt } />
                                    : init.state  == 'All' ?
                                        <TicketListCard key={ index } tktData={ tkt } />   
                                    : null
                                : null 
                            : null
                        : null
                    : null
                         
                )) }                                
            </Box >
        );
    }

    function MoreFilterOptions(){
        if(init.Company != "All"){
            return(
                <>
                    <TableRow >
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">
                            
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <Select  native   onChange={ (e)=>{ setInit({ ...init , Category : e.target.value }) } } >
                                    <option value="All">All Categories</option>
                                        {_categoryReducer.categoriesOfSelectedCompany.map((category)=>(
                                            <option key={category.categoryId} value={category.categoryName}>{ category.categoryName }</option>
                                        ))}
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell align="left">Product</TableCell>
                        <TableCell align="left">
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <Select  native   onChange={ (e)=>{ setInit({ ...init , Product : e.target.value }) } } >
                                    <option value="All">All Products</option>
                                    {_productReducer.productsOfSelectedCompany.map((product)=>(
                                        <option key={product.productId} value={product.productName}>{ product.productName }</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell align="left">Module</TableCell>
                        <TableCell align="left">
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <Select  native   onChange={ (e)=>{ setInit({ ...init , Module : e.target.value }) } }  >
                                    <option value="All">All Modules</option>
                                    {_moduleReducer.modulesOfSelectedCompany.map((module)=>(
                                        <option key={module.moduleId} value={module.moduleName}>{ module.moduleName }</option>
                                    ))}
                                </Select>
                            </FormControl>
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell align="left">Brand</TableCell>
                        <TableCell align="left">Not Dev yet</TableCell>
                    </TableRow>
                </>
            );
        }else{
            return null;
        }
        
    }

    return (
        <>
        
            <Grid container spacing={ 2 }>
                <Grid item md={ 12 }>
                    <Typography >
                        <Box  mb={5} >     
                            <Grid container spacing={3}>
                                <Grid item xs={12}> <Box component="h1" display="inline" > List of Tickets </Box >  </Grid>
                                

                                <Grid item xs={5}>  
                                    {/* <Box component="h3" display="inline" >   Ticket no :   </Box >  */}
                                    <Box component="p" display="inline" >  {/* { ticketId } */}   </Box > 
                                    
                                </Grid>
                                <Grid item xs={7}>
                                    {/* <Box display="inline" mx={2} >   Reassignment  </Box > 
                                    <Box display="inline" mx={2} >   Transferring  </Box >
                                     */}

                                     {/* {JSON.stringify(init)} */}
                                </Grid>
                                
                            </Grid>
                        </Box > 
                    </Typography>
                </Grid>
                <Grid container item spacing={ 2 } xs={ 4 } direction="column">

                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        
                        <TableBody>
                       
                            <TableRow >
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">
                                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                        <Select native  onChange={ (e) => { setInit({ ...init , state : e.target.value }) } } >
                                            <option value="Open">Open</option>
                                            <option value="Closed">Close</option>
                                            <option value="in-progress">in-progress</option>
                                            <option value="All">All tickets</option>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                                <TableRow >
                                    <TableCell align="left">Company</TableCell>
                                    <TableCell align="left">
                                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                            <Select  native   onChange={ (e)=>{ selectCompany(e) } } >
                                                <option value="All">All Comapnies</option>
                                                {_companyReducer.companies.map((company ,index)=>(

                                                    <option key={index} value={company.companyId}>{ company.companyName }</option>
                                                    
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <MoreFilterOptions />
                             
                        </TableBody>
                        
                    </Table>
                    </TableContainer>

                </Grid>


                <Grid item xs={ 8 }>
                    
                        {/* <Box display="inline" mx={2} >  { selectedTicket.tktContent } </Box >  */}

                        
                        <Grid container spacing={3}>
                            <Grid item xs={12}> 
                                <TicketList />
                            </Grid>
                            <Grid item xs={12}>  
                                {/* Ref Link Here */}
                            </Grid>
                        </Grid>

                </Grid>
            </Grid>
        </>


    );
}

export default ListTickets;
