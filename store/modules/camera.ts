/*初始化*/
type State = {
  imgList: string[];
};
const initialState: State = {
  imgList: [],
};

export const addImg = (type: string, value: string) => ({
  type,
  value,
});

export const deleteImg = (type: string, value: string) => ({
  type,
  value,
});
export default (state = initialState, action: any) => {
  let newImgList = state.imgList;
  /*判断执行哪个方法*/
  switch (action.type) {
    case 'addImg':
      newImgList.push(action.value);
      return {
        ...state,
        imgList: newImgList,
      };
    case 'deleteImg':
      newImgList = state.imgList.filter((item:any) => {
        return item.uri !== action.value;
      });
      return {
        imgList: newImgList,
      };
    case 'clearImg':
      return {
        ...state,
        imgList: [],
      };
    default:
      return state;
  }
};
