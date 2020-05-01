
/*初始化*/
const initialState = {
  keyword: "",
};

/*keyword*/
export default (state = initialState, action: {type: any; value: any}) => {
  /*判断执行哪个方法*/
  switch (action.type) {
    case "setSearchKey":
      return {
        keyword:action.value,
      };
    default:
      return state;
  }
};
