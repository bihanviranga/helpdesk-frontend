import React, { useEffect ,useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    card: {
        padding: '1em',
        margin: '1em',
        height : '100px'
    },
    tktSubject: {
        fontWeight: 'bold',
        textDecoration: 'none'
    }
})

function ArticleList( props ) {
    const classes = useStyles();
    const history = useHistory();
 
    const _knowledgebaseReducer = useSelector(state=>state.knowledgebase)
    const[articles , setArticles] = useState([])
    const[searchedArticles , setSearchedArticles] = useState([])

    useEffect(()=>{

        if(props.search != null){
            if(props.search.length == 0){
                 
                    setArticles(_knowledgebaseReducer.articles)
                
            }else if(props.search.length != 0){
                if(searchedArticles.length != 0){
                    setArticles(searchedArticles)
                }else{
                    setArticles(searchedArticles)
                }   
            }
        }else{
            if(_knowledgebaseReducer.articles != null){ 
                setArticles(_knowledgebaseReducer.articles)
            }   
        }
         
    //    if(_knowledgebaseReducer.articles != null)
    //      setArticles(_knowledgebaseReducer.articles)
    },[_knowledgebaseReducer.articles , props.search ])

    // searching algorithm 

    useEffect(()=>{
        if(props.search != null ){

            if(props.search.length != 0){
                setSearchedArticles([]) 
                articles.forEach( element  => {
                    var title = element.articleTitle
                    var content = element.articleContent

                    // check item 
                    if( title.indexOf(props.search) != -1 || content.indexOf(props.search) != -1 ){
                        
                            setSearchedArticles(oldArray=>[ ...oldArray ,  element ])                      
                    }
                });  
            }else if(props.search.length == 0){
                setSearchedArticles([])
            }
            
        } else { setSearchedArticles([]) }
    } , [props.search])
    
   

    return (
        <div>
           
{/* {JSON.stringify(searchedArticles.length)} */}
           {articles.map((article ,index)=>(
               <>
               
                <Card variant="outlined" key={index} className={ classes.card }>
                      
                    <a className={ classes.tktSubject } href="#" onClick={ () => history.push({ pathname: `/article/${article.articleId}` }) }>{article.articleTitle}</a>
                    <div>{ article.articleContent }</div>
                    {/* <Chip label={ "Status: " + tktData.tktStatus } size="small" />
                    <Chip label={ "Priority: " + tktData.tktPriority } size="small" /> */}
                </Card>
               </>
            ))}
           
        </div>
    )
}

export default ArticleList
