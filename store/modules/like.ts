enum likeType {
    ADD_LIKE = 'addLike',
    DELETE_LIKE = 'deleteLike',
  }
  
  
  /*初始化*/
  const initialState = {
    myLikeList:[]
  };
  

  
  /*like*/
  export default (state = initialState, action: {type: any; value: any}) => {
    /*判断执行哪个方法*/
    switch (action.type) {
      case likeType.ADD_LIKE:
        return {
          myLikeList:[...state.myLikeList,...action.value]
        };
      case likeType.DELETE_LIKE:
        return {
          myLikeList:state.myLikeList.filter((item:any)=>{
              return item._id !==action.value._id
          })
        };
      default:
        return state;
    }
  };
