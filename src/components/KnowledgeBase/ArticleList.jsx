import React from 'react'
import {useSelector , useDispatch} from 'react-redux'

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

function ArticleList() {
    const classes = useStyles();
    const history = useHistory();
 
    const _knowledgebaseReducer = useSelector(state=>state.knowledgebase)
   

    return (
        <div>
           

           {_knowledgebaseReducer.articles.map((article ,index)=>(
               <>
                <Card variant="outlined" className={ classes.card }>
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
