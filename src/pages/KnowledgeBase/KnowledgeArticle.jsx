import React, { useEffect, useRef  } from 'react';
import { useParams } from 'react-router-dom';
import {fetchArticleById , deleteArticle} from '../../redux'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ArticleImage from '../../components/KnowledgeBase/ArticleImage'

  // icons
import { 
  More , Delete , CloudUpload  , Redeem , Album,
  LocationCity , NoteAdd , CardMembership
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },

  writter: {
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary, 
  },
  image:{
    maxWidth : "340px",
     
  }
}));

export default function KnowledgeArticle() {
    const { articleId } = useParams();
    const articleImageRef = useRef() 


    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const _knowledgebaseReducer = useSelector(state=>state.knowledgebase)
    const [article, setArticle] = React.useState(null);
 
 
    useEffect(() => {
        dispatch(fetchArticleById(articleId))
    }, []);

    useEffect(() => {
       setArticle(_knowledgebaseReducer.article)
    }, [_knowledgebaseReducer]);


    //components

    const MoreInformations = () => {
      if(localStorage.getItem("Token") != null ){
        if(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserType == "HelpDesk" && JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserRole == "Manager"){
          return(
            <>
              {article != null ? (
                <>

                  <pre><Button startIcon={<Delete />} variant="contained" size="small"  color="secondary" className={classes.margin}
                        onClick={ ()=>{ 
                          if(article != null) dispatch(deleteArticle(article.articleId))
                          history.push({ pathname: "/KnowledgeBase_index" })
                        } }
                      >
                        Delete
                      </Button > &nbsp;          
                        <Button variant="contained" size="small"
                                color="default" 
                                startIcon={<CloudUpload />} className={classes.margin}>Update</Button > </pre>
                </>
              ): null}
            </>
          )
        }else return null
      }else return null
    }

  return (
    <div className={classes.root}>
      <Box m={10}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* <Paper className={classes.paper}>{JSON.stringify(article)}</Paper> */}
            </Grid>
            <Grid item xs={9}>

                 <h2> { article != null ? (<>{article.articleTitle}</>) : null } </h2>
                 <br/>
                <> { article != null ? 
                  (<> { article.companyName != null ? (<> <Button disabled size="small"  startIcon={<LocationCity />} > {article.companyName} </Button> | </>) : null } 
                      { article.productName != null ? (<> <Button disabled size="small"  startIcon={<Redeem />} > {article.productName} </Button> | </>) : null }
                      { article.moduleName != null ? (<> <Button disabled size="small"  startIcon={<CardMembership />} > {article.moduleName} </Button> | </>) : null }
                      { article.brandName != null ? (<> <Button disabled size="small"  startIcon={<Album />} > {article.brandName} </Button> | </>) : null }
                   </>)
                : null } </>

            </Grid>
            <Grid item xs={3}> 
                  <Box mt={2}> 
                    {MoreInformations()}
                  </Box>
            </Grid>
            <Grid item xs={12}> 
                <Divider />
            </Grid>
            
            <Grid position="fixed" item xs={4} fixed>
                <Paper className={classes.paper}>
                  {article !=  null ? (<><img
                  onClick={() => articleImageRef.current.handleClickOpen(article.articleAttachment)}
                  className={classes.image} src={article.articleAttachment} alt="" srcset=""/></>) : null}
                </Paper>
            </Grid>
            
            <Grid item xs={8}>
                <Paper className={classes.paper}>
                            { article != null ? (<>{article.articleContent}</>) : null }
                            <Divider />
                        < p className={classes.writter}> 
                            By : { article != null ? (<>{article.createdBy}</>) : null }  
                            < br />
                            { article != null ?  <>{ ( new Date( article.createdDate ) ).toString() }</>  : null }
                        </p> 
                </Paper>
            </Grid>
            <Grid>
                <ArticleImage ref={articleImageRef} /> 
            </Grid> 
        </Grid>
      </Box>
    </div>
  );
}

