enum collectType {
    ADD_COLLECT = 'addCollection',
    DELETE_COLLECT = 'deleteCollection',
    CLEAR_COLLECT = 'clearCollection'
  }
  
  
  /*初始化*/
  const initialState = {
    collectionList:[]
  };
  
  /**clear */

  
  export default (state = initialState, action: {type: any; value: any}) => {
    /*判断执行哪个方法*/
    switch (action.type) {
      case collectType.ADD_COLLECT:
        return {
          collectionList: [...state.collectionList, ...action.value],
        };
      case collectType.DELETE_COLLECT:
        return {
          collectionList: state.collectionList.filter((item: any) => {
            return item !== action.value;
          }),
        };
      case collectType.CLEAR_COLLECT:
        return {
          ...state,
          collectionList: [],
        };
      default:
        return state;
    }
  };
