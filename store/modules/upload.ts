/*初始化*/
type State = {
  imgList: string[];
  clearKey: number;
};
const initialState: State = {
  imgList: [],
  clearKey: 0,
};

export const addUploadImg = (type: string, value: string) => ({
  type,
  value,
});

export const deleteUploadImg = (type: string, value: string) => ({
  type,
  value,
});
export default (state = initialState, action: any) => {
  let newImgList = state.imgList;
  /*判断执行哪个方法*/
  switch (action.type) {
    case 'addUploadImg':
      //   console.log("add");

      newImgList.push(action.value);
      return {
        ...state,
        imgList: newImgList,
      };
    case 'deleteUploadImg':
      newImgList = state.imgList.filter((item: any) => {
        return item !== action.value;
      });
      return {
        ...state,
        imgList: newImgList,
      };
    case 'clearUploadImg':
      return {
        ...state,
        imgList: [],
        clearKey: 0,
      };
    case 'clearKey':
      return {
        ...state,
        clearKey: state.clearKey + 1,
      };
    default:
      return state;
  }
};
