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

   

    // searching algorithm 

    useEffect(()=>{
        if(props.search != null ){

            if(props.search.length != 0){
                    setArticles([])

                    const filteredEmployees = articles.filter(el => {
                        return (
                            el.articleTitle.toLowerCase().includes(props.search) ||
                            el.articleContent.toLowerCase().includes(props.search) ||
                            el.createdBy.toLowerCase().includes(props.search)
                            );
                      });

                      setArticles(filteredEmployees);
               
            }else if(props.search.length == 0){
                setArticles(_knowledgebaseReducer.articles)
            }
            
        } else { setArticles(_knowledgebaseReducer.articles) }
    } , [_knowledgebaseReducer.articles , props.search])
    
   

    return (
        <div>
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
