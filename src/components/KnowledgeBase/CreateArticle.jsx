import React , {useState , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createArticle , fetchAllCompanies,
    fetchProductsByComapnyId, fetchCategoriesByComapnyId,
    fetchModulesByComapnyId, fetchBrandsByComapnyId
 } from '../../redux'
import axios from 'axios';


import { useHistory } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select'; 
import InputLabel from '@material-ui/core/InputLabel';


import { 
    PostAdd
  } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
     
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  image:{
    maxWidth:"350px"
  }
}));


function CreateArticle() {

    const dispatch = useDispatch()
    const classes = useStyles();
    const history = useHistory();

    const _companyReducer = useSelector(state => state.company)
    const _productReducer = useSelector(state => state.product)
    const _categoryReducer = useSelector(state => state.category)
    const _moduleReducer = useSelector(state => state.module)
    const _brandReducer = useSelector(state => state.brand)

    const initArticle = {
        ArticleTitle : null,
        ArticleContent:null, 
        ArticleAttachment:null,
        CompanyId: "",
        ProductId: "",
        ModuleId: "",
        BrandId: "",
        CategoryId: "",

    }

    const [article , setArticle] = useState(initArticle);
    const [image , setImage] = useState( null );
    const [imageFile , setImageFile] = useState( null );
    const [imageInclued , setImageInclued] = useState( false );
    const [moreSpecific , setMoreSpecific] = useState( false );
    const [uploadingProcessing , setUploadingProcessing] = useState( false );


    var imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setImage(reader.result)
            }
        }
        setImageFile(e.target.files[0])
        reader.readAsDataURL(e.target.files[0])
    }

    var imageIncluedHandle = () =>{
        setImageInclued(!imageInclued)
    }

    const MoreSpecificArticle = async () => {
        if(_companyReducer.companies.length == 0){
           await dispatch(fetchAllCompanies()) 
        }
            
        setMoreSpecific( !moreSpecific )
    }

    const SelectCompany = (e) => {
        if (e.target.value.length > 0) {
            dispatch(fetchProductsByComapnyId(e.target.value))
            dispatch(fetchCategoriesByComapnyId(e.target.value))
            dispatch(fetchModulesByComapnyId(e.target.value))
            dispatch(fetchBrandsByComapnyId(e.target.value))
        }

        setArticle({ ...article, CompanyId: e.target.value })
    }


    
    var uploadArticle =  () =>{
        setUploadingProcessing(true)

        if(imageInclued != false ){
            const file = imageFile
            const formData = new FormData();
            formData.append("upload_preset" ,"helpDesk" )
            formData.append("file" , file) 

    
         axios.post("https://api.cloudinary.com/v1_1/dj8a0phpt/image/upload" , formData)
            .then(async (res) => { // use async await for asing data of return
                
                // after uploading file create the fill article 

                //useState set method not reflecting change immediately
                if(article.ArticleAttachment != res.data.secure_url) { 
                    await setArticle({...article , ArticleAttachment : res.data.secure_url })
                } 
            } ) 
        }  else{
            dispatch(createArticle(article))
            history.push({ pathname: "/KnowledgeBase_index" })
        }   
    }
    
    // because useState set method not reflecting change immediately
    useEffect(() => { 
        if( article.ArticleAttachment != null){
            dispatch(createArticle(article))
            history.push({ pathname: "/KnowledgeBase_index" })
        }
        
    }, [article.ArticleAttachment])
 

    return (
        <div> 

            <div className={classes.root}>
                <Box mx={12} >
                    {/* {JSON.stringify(_companyReducer.companies)} */}

                    <Grid container spacing={3}>
                        <Grid item xs={8}> <h2> Create Article </h2> </Grid>
                        <Grid item xs={8}>
                            <TextField id="outlined-basic" label="Article Title" variant="outlined" fullWidth
                                name="ArticleTitle"
                                onChange={ e=>  {
                                    
                                    setArticle({ ...article , ArticleTitle : e.target.value })
                                    
                                } }
                            />
                            
                        </Grid>
                        <Grid item sm={ 4 }>

                        <FormControlLabel
                                label="Want More Specific  "
                                control={
                                    <Checkbox
                                    onChange={()=> MoreSpecificArticle() }
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                }
                            />
                            
                        </Grid> 

                        {/*  more specifize  */}

                        {moreSpecific ? (
                        <>
                            <Grid item sm={ 3 }>
                            <FormControl fullWidth variant="outlined" className={ classes.formControl }>
                                <InputLabel  >Company</InputLabel>
                                <Select native label="CompanyName" name="CompanyName" onChange={ (e) => { SelectCompany(e) } } >
                                    <option value=""></option>
                                    { _companyReducer.companies.map((company) => (
                                        <option key={ company.companyId } value={ company.companyId }>{ company.companyName }</option>
                                    )) }
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        { article.CompanyId ? (<>
                        
                            <Grid item sm={ 2 }>
                                <FormControl fullWidth variant="outlined" className={ classes.formControl }>
                                    <InputLabel  >Product Name</InputLabel>
                                    {/* In the setArticle call, be sure to put a capital letter. CategoryId, not categoryId */ }
                                    <Select native label="product Name Name" name="productName" onChange={ (e) => { setArticle({ ...article, ProductId: e.target.value }) } } >
                                        <option value=""></option>
                                        { _productReducer.productsOfSelectedCompany.map((product) => (
                                            <option key={ product.productId } value={ product.productId }>{ product.productName }</option>
                                        )) }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item  sm={ 2 }>
                                <FormControl fullWidth variant="outlined" className={ classes.formControl }>
                                    <InputLabel  >categoryName</InputLabel>
                                    <Select native label="category Name" name="categoryName" onChange={ (e) => { setArticle({ ...article, CategoryId: e.target.value }) } }  >
                                        <option value=""></option>
                                        { _categoryReducer.categoriesOfSelectedCompany.map((category) => (
                                            <option key={ category.categoryId } value={ category.categoryId }>{ category.categoryName }</option>
                                        )) }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item  sm={ 2 }>
                                <FormControl fullWidth variant="outlined" className={ classes.formControl }>
                                    <InputLabel  >Module Name</InputLabel>
                                    <Select native label="module Name" name="moduleName" onChange={ (e) => { setArticle({ ...article, ModuleId: e.target.value }) } }  >
                                        <option value=""></option>
                                        { _moduleReducer.modulesOfSelectedCompany.map((module) => (
                                            <option key={ module.moduleId } value={ module.moduleId }>{ module.moduleName }</option>
                                        )) }
                                    </Select>
                                </FormControl>
                            </Grid>


                           
                            <Grid item xs={ 12 } sm={ 2 }>
                                <FormControl fullWidth variant="outlined" className={ classes.formControl }>
                                    <InputLabel  >Brand Name</InputLabel>
                                    <Select native label="brand Name" name="brandName" onChange={ (e) => { setArticle({ ...article, BrandId: e.target.value }) } }  >
                                        <option value=""></option>
                                        { _brandReducer.brandsOfSelectedCompany.map((brand, index) => (
                                            <option key={ index } value={ brand.brandId }>{ brand.brandName }</option>
                                        )) }
                                    </Select>
                                </FormControl>
                            </Grid>
                        
                        </>) : (<> <Grid item xs={ 12 } sm={ 7 }></Grid> </>) }
                            
                        </>) : null  }

                        {/*  */}

                        <Grid item xs={7}>
                            <TextField
                                label="Content"
                                multiline
                                rows={8}
                                variant="outlined"
                                fullWidth
                                name="ArticleContent"
                                onChange={ e=>  setArticle({ ...article , ArticleContent : e.target.value }) } type="text" 
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <FormControlLabel
                                label="Want to inclued image "
                                control={
                                <Checkbox
                                    checked={imageInclued}
                                    onChange={imageIncluedHandle}
                                    color="primary"
                                />
                                }
                            />
                            <Box m={1}>
                                { imageInclued == true ? (
                                    <>
                                        { image != null ? (<> <img className={classes.image} src={image} /> </>) : (<><img className={classes.image} src={require('../../static/photos/image-plus.png')} /></>) } 
                                        <br/>
                                        <input type="file" onChange={imageHandler} name="image-upload"/>    
                                    </>
                                ) : (<></>) }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>

                            {uploadingProcessing == true ? (<>
                                <Button variant="contained" size="small" className={classes.margin} disabled
                                >  Uploading ... <Box ml={1}> <PostAdd /> </Box> </Button> 
                            </>) : (<>
                                <Button variant="contained" size="small" color="primary" className={classes.margin} 
                                onClick={
                                    
                                    uploadArticle
                                }>  publish <Box ml={1}> <PostAdd /> </Box> </Button> 
                            </>)}
                             
                        </Grid>
                        
                    </Grid>
                </Box>
                
            </div>
        </div>
    )
}

export default CreateArticle
