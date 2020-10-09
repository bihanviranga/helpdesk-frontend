import Axios from "axios"
import API_PATH from '../api'

export const createArticle = (article ) => {
  // article.ArticleAttachment = articleAttachment
  console.log(article)
  return dispatch => {

      dispatch({
          type: "CREATE_ARTICLE",
          payload: new Promise((resolve, reject) => {
            Axios.post(`${API_PATH}/Article/`, article , {
              headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("Token") , 
            }
            })
            .then(response => { 
              resolve(response.data )
            })
            .catch(err => {
              const errMzg = err.message
            })
          })
      })
  }
}



export const fetchArticles = () => {
  return dispatch => {
      dispatch({
          type: "FETCH_ARTICLES",
          payload: new Promise((resolve, reject) => {
            Axios.get(`${API_PATH}/Article/` )
              .then(response => {
                  resolve( response.data ) 
                  
              })
              .catch(err => {
                  const errMzg = err.message
              })
        })
      })
  }
}

export const fetchArticleById = (articleId) => {
  return dispatch => {
    dispatch({
      type : "FETCH_ARTICLE_BY_ID",
      payload : new Promise((resolve , reject) => {
        Axios.get(`${API_PATH}/Article/${articleId}`)
        .then( response => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch(err =>{
          const errMzg = err.message
        })
      })
    })
  }
}