import React , {useState , useEffect ,forwardRef, useImperativeHandle}from 'react'
import {useSelector , useDispatch} from 'react-redux'

import { fetchArticles } from '../../redux';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router";


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core'; 

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Button from '@material-ui/core/Button';

import ArticleList from '../../components/KnowledgeBase/ArticleList'


import { 
    AddCircle
  } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
   
}));

const useStylesSearch = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
     
  }));

export default function KnowledgebaseIndex() {
  const classes = useStyles();
  const classesSearch = useStylesSearch();
  const history = useHistory();
  const dispatch = useDispatch();

  const [search , setSearch] = useState(null);


  
  const _knowledgebaseReducer = useSelector(state=>state.knowledgebase)

  useEffect(() => {
    if(_knowledgebaseReducer.articles.length == 0){
      dispatch(fetchArticles())
    }
  }, [ ]);

  const CreateNewArticle = () => {
    if(localStorage.getItem("Token") != null ){
      if(JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserType == "HelpDesk" && JSON.parse(atob(localStorage.getItem("Token").split('.')[1])).UserRole == "Manager"){
        return(
          <>
            <Box>
                <Button variant="contained" size="small" color="primary" className={classes.margin}
                  onClick={()=> history.push({ pathname: "/CreateArticle" })  }
                >  <Box mt={1} mr={2}> <AddCircle /> </Box> Create New Knowleged </Button>
            </Box>
          </>
        )
      }else return null
    }else return null
  }

  return (
    <div >
      <Box className={classes.root} m={4}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                 <h3>Knowledge Base</h3> 
            </Grid>
             
        </Grid>
      </Box>
      <Box m={4}>
        <Grid container  >
            <Grid item xs={4}>
                {CreateNewArticle()}
            </Grid>
            <Grid item xs={8}> 
                <Paper component="form" className={classesSearch.root}>
                    <IconButton className={classesSearch.iconButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    
                    <InputBase
                        className={classesSearch.input}
                        placeholder="Search Here !" 
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <Divider className={classesSearch.divider} orientation="vertical" />
                    <IconButton type="submit" className={classesSearch.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton> 
                </Paper>
            </Grid>
        </Grid>
            
      </Box>

      <Box className={classes.root} m={4}>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Paper className={classes.paper}>3</Paper>
            </Grid>
            <Grid item xs={9}>
                <Paper className={classes.paper}><ArticleList search={search}  />  </Paper>
            </Grid>
        </Grid>
      </Box>
    </div>
  );
}
