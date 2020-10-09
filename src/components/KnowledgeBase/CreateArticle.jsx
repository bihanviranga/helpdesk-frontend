import React , {useState , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createArticle } from '../../redux'
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

    const initArticle = {
        ArticleTitle : null,
        ArticleContent:null, 
        ArticleAttachment:null
    }

    const [article , setArticle] = useState(initArticle);
    const [image , setImage] = useState( null );
    const [imageFile , setImageFile] = useState( null );
    const [imageInclued , setImageInclued] = useState( false );


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


    
    var uploadArticle =  () =>{

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
                            <Button variant="contained" size="small" color="primary" className={classes.margin} 
                            onClick={
                                uploadArticle
                            }>  publish <Box ml={1}> <PostAdd /> </Box> </Button>  
                        </Grid>
                        
                    </Grid>
                </Box>
                
            </div>
        </div>
    )
}

export default CreateArticle
