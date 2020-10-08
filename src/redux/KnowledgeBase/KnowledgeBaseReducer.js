const initialState = {
    articles : [],
    article : null,
    imageUrl : null
}

const knowledgebaseReducer = (state = initialState, action) => {
    if(action.type == "CREATE_ARTICLE_FULFILLED"){
       
        return{
            ...state,
            articles : [ ...state.articles ,  
                action.payload
              ]
        }
    }else if(action.type == "FETCH_ARTICLES_FULFILLED"){
        return {
            ...state , 
            articles :   action.payload  
        }
    }else if(action.type == "FETCH_ARTICLE_BY_ID_FULFILLED"){

        var blob = new Blob([action.payload.articleAttachmentFile], {type: 'application/octet-binary'});
          var url = URL.createObjectURL(blob);

        return{
            ...state,
            article : action.payload,
            imageUrl : url
        }
    }else{
        return state
    }

}

export default knowledgebaseReducer