import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

function knowledgeBase_index() {
    return (
        <div>
           <h3>Knowledge Base</h3>
           <input type='text' placeholder="search" />
           <button>search</button>
           <br />
           <hr />
           <Button component={Link}  to='/CreateArticle'>Create</Button>
           <Button component={Link}  to='/'>Manage</Button>
        </div>
    )
}

export default knowledgeBase_index
