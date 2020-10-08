import React, { useEffect, useRef  } from 'react';
import { useParams } from 'react-router-dom';
import {fetchArticleById} from '../../redux'
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ArticleImage from '../../components/KnowledgeBase/ArticleImage'

import { 
    More
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

    const _knowledgebaseReducer = useSelector(state=>state.knowledgebase)
    const [article, setArticle] = React.useState(null);
 
    useEffect(() => {
        dispatch(fetchArticleById(articleId))
    }, []);

    useEffect(() => {
       setArticle(_knowledgebaseReducer.article)
    }, [_knowledgebaseReducer]);

  return (
    <div className={classes.root}>
      <Box m={10}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* <Paper className={classes.paper}>{JSON.stringify(article)}</Paper> */}
            </Grid>
            <Grid item xs={9}>

                 <h2> { article != null ? (<>{article.articleTitle}</>) : null } </h2>

            </Grid>
            <Grid item xs={3}> 
                    <Box mt={2}> <Button variant="contained" size="small" color="primary" className={classes.margin}>  More Informations <Box mt={1} ml={2}> <More /> </Box> </Button> </Box>
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

