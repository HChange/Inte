/*初始化*/
type State = {
  update: 0;
};
const initialState: State = {
  update: 0,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case 'update':
      return {
        update: state.update + 1,
      };

    default:
      return state;
  }
};
