enum likeType {
    ADD_LIKE = 'addLike',
    DELETE_LIKE = 'deleteLike',
    CLEAR_LIKE='clearLike'
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
          myLikeList: [...state.myLikeList, ...action.value],
        };
      case likeType.DELETE_LIKE:
        return {
          myLikeList: state.myLikeList.filter((item: any) => {
            return item !== action.value;
          }),
        };
      case likeType.CLEAR_LIKE:
        return {
          ...state,
          myLikeList: [],
        };
      default:
        return state;
    }
  };
