enum collectType {
    ADD_COLLECT = 'addCollection',
    DELETE_COLLECT = 'deleteCollection',
  }
  
  
  /*初始化*/
  const initialState = {
    collectionList:[]
  };
  

  
  export default (state = initialState, action: {type: any; value: any}) => {
    /*判断执行哪个方法*/
    switch (action.type) {
      case collectType.ADD_COLLECT:
        return {
          collectionList:[...state.collectionList,...action.value]
        };
      case collectType.DELETE_COLLECT:
          console.log(state.collectionList);
          
        return {
          collectionList:state.collectionList.filter((item:any)=>{
              return item.postId!==action.value
          })
        };
      default:
        return state;
    }
  };
