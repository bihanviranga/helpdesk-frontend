import Axios from "axios"

export  const createArticle = (article) => {
    // those things should be from automatically in future
    article.ArticleId = "979"
    article.CreatedBy = "hu"
    article.AcceptedBy="67892s"
    article.CreatedDate="2016-09-09"
    article.AcceptedDate="2016-09-09"
    article.LastEditedDate = "2016-09-09"
    article.LastEditedBy = "heycq567"
    article.ProductID = "yuhcsa778878"
    console.log(article)
  return () =>{
    Axios.post('https://localhost:44351/Article/',article)
    .then(response => {
        const posts = response.data
        console.log(posts)
    })
    .catch(err => {
        const errMzg = err.message
    })
  }
}