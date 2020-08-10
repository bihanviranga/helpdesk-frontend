import React , {useState , useEffect }from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { 
    createTicket  , fetchAllCompanies ,
     fetchProductsByComapnyId , fetchCategoriesByComapnyId,
     fetchModulesByComapnyId , fetchBrandsByComapnyId 
} from '../../redux'

import { useHistory } from "react-router";


import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


//custom style
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function CreateTicket() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const _companyReducer = useSelector(state=>state.company)
    const _productReducer = useSelector(state=>state.product)
    const _categoryReducer = useSelector(state=>state.category)
    const _moduleReducer = useSelector(state=>state.module)
    const _brandReducer = useSelector(state=>state.brand)

    useEffect(()=>{
        dispatch(fetchAllCompanies())
        return ()=>{}
    },[])

    const history =  useHistory()
    
    

    const initTicket = {
        CompanyId : "",
        ProductId : "",
        ModuleId : "",
        BrandId : "",
        CategoryId : "",
        TktSubject : null,
        TktContent : null,
        TktStatus : "Open",
        TktCreatedBy : JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserName,
        TktCreatedByCompany : JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).CompanyId,
        TktCreatedDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
        TktAttachment : null,
    }

    const [ticket , setTicket] = useState(initTicket);


    // custom function

    const SelectCompany = (e) => {
        if(e.target.value.length > 0){
            dispatch(fetchProductsByComapnyId(e.target.value))
            dispatch(fetchCategoriesByComapnyId(e.target.value))
            dispatch(fetchModulesByComapnyId(e.target.value))
            dispatch(fetchBrandsByComapnyId(e.target.value))
        }  

        setTicket({ ...ticket , CompanyId : e.target.value })
    } 

    return (
        <div>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                    <div className={classes.paper}>
                        
                        <Typography component="h1" variant="h5"> Create A New Ticket </Typography>
                        <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel  >Company</InputLabel>
                                    <Select  native  label="CompanyName" name="CompanyName" onChange={ (e)=>{ SelectCompany(e) } } >
                                        <option value=""></option>
                                        {_companyReducer.companies.map((company)=>(
                                            <option key={company.companyId} value={company.companyId}>{ company.companyName }</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel  >Product Name</InputLabel>
                                    <Select  native  label="product Name Name" name="productName" onChange={ (e)=>{ setTicket({ ...ticket , productId : e.target.value }) } } >
                                        <option value=""></option>
                                        {_productReducer.productsOfSelectedCompany.map((product)=>(
                                            <option key={product.productId} value={product.productId}>{ product.productName }</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel  >categoryName</InputLabel>
                                    <Select  native  label="category Name" name="categoryName" onChange={ (e)=>{ setTicket({ ...ticket , categoryId : e.target.value }) } }  >
                                        <option value=""></option>
                                        {_categoryReducer.categoriesOfSelectedCompany.map((category)=>(
                                            <option key={category.categoryId} value={category.categoryId}>{ category.categoryName }</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel  >Module Name</InputLabel>
                                    <Select  native  label="module Name" name="moduleName" onChange={ (e)=>{ setTicket({ ...ticket , moduleId : e.target.value }) } }  >
                                        <option value=""></option>
                                        {_moduleReducer.modulesOfSelectedCompany.map((module)=>(
                                            <option key={module.moduleId} value={module.moduleId}>{ module.moduleName }</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel  >Module Name</InputLabel>
                                    <Select  native  label="module Name" name="moduleName" onChange={ (e)=>{ setTicket({ ...ticket , BrandId : e.target.value }) } }  >
                                        <option value=""></option>
                                        {_brandReducer.brandsOfSelectedCompany.map((brand , index)=>(
                                            <option key={index} value={brand.brandId}>{ brand.brandName }</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                           
                            <Grid item xs={12} >
                                <TextField
                                    variant="outlined" required fullWidth  label="Subject" autoFocus
                                    onChange={e=>  setTicket({ ...ticket , TktSubject : e.target.value })}
                                />
                            </Grid>
                    
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth label="Content"
                                multiline
                                rows={10}
                                    onChange={e=>  setTicket({ ...ticket , TktContent : e.target.value })}   
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" required fullWidth 
                                    type="file" onChange={e=>  setTicket({ ...ticket , TktAttachment : e.target.value })}
                                />
                            </Grid>
                                
                        </Grid>
                        <Button
                            type="submit" fullWidth  variant="contained" color="primary"
                            className={classes.submit} onClick={(e)=>{
                                e.preventDefault();
                               if(localStorage.getItem("Token") != null) {
                                    dispatch(createTicket(ticket))
                                    history.push({ pathname:  "/Tickets" })

                                }else{
                                    alert("logFirst")
                                }
                            }} > Create </Button>
                        </form>
                    </div>
                    
                </Container>
                );
        </div>
    )
}

export default CreateTicket
