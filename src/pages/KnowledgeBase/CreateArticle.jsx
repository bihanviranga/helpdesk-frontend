import React , {useState , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { createArticle } from '../../redux'


function CreateArticle() {

    const dispatch = useDispatch()

    const initArticle = {
        ArticleTitle : null,
        ArticleContent:null
    }

    const [article , setArticle] = useState(initArticle);

    return (
        <div>
            <h3>Create Article</h3>
            <form>
                <input name="ArticleTitle" onChange={ e=>  setArticle({ ...article , ArticleTitle : e.target.value }) } type="text"/>
                 <br/>
                 <textarea name="ArticleContent" onChange={ e=>  setArticle({ ...article , ArticleContent : e.target.value }) } type="text" ></textarea>
                <br />
                <br/>
                <button onClick={
                    (e)=>{
                        e.preventDefault();
                        dispatch(createArticle(article))
                    }
                }>publish</button>     
            </form> 
        </div>
    )
}

export default CreateArticle
