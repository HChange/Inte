import React, {useState, useEffect, useCallback} from 'react';
import {ToastAndroid} from 'react-native';
import {TextareaItem} from '@ant-design/react-native';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from 'react-native-dialog';
import api from '../../config/api';
import {post} from '../../common/useRequest';
interface Props{
    visible:boolean,
    postId:string,
    userId:string,
    onClose:()=>any,
    onBack?:(status:boolean)=>any
}
const ReplyDialog: React.FC<Props> = (props) => {
  let { visible,postId, userId,onClose,onBack} = props;
  const dispatch = useDispatch();
  const update = useSelector((state: any) => state.update.update);
  const [reply, setReply] = useState<string>("");
  const [editFouce, setEditFouce] = useState(false);

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>添加评论</Dialog.Title>
      <TextareaItem
        // rows={4}
        editable={true}
        style={[
          {
            width: '100%',
            backgroundColor: '#f0f0f0',
            flexWrap: 'wrap',
            borderStyle: 'solid',
            borderRadius: 3,
            borderColor: '#f0f0f0',
            borderWidth: 1,
            padding: 13,
            fontSize: 16,
            maxWidth: 270,
          },
          editFouce && {borderColor: '#3897f0'},
        ]}
        value={reply}
        onChangeText={value => {
          setReply(value);
        }}
        onFocus={() => {
          setEditFouce(true);
        }}
        count={200}
        numberOfLines={3}
        placeholder="添加您的评论..."
      />
      <Dialog.Button
        label="取消"
        style={{color: '#3897f0'}}
        onPress={() => {
          onClose()
          setReply("")
        }}
      />
      <Dialog.Button
        style={{color: '#3897f0'}}
        label="确定"
        onPress={async () => {
          onClose();
          let result = await post(api.ADD_REPLY,{
            userId:userId,
            postId:postId,
            content:reply
          });
          
          if (result && result.code === 0) {
              setReply('');
              onBack&&onBack(true);
            ToastAndroid.show('评论成功', 500);
          } else {
              setReply('');
              onBack && onBack(false);
            ToastAndroid.show('评论失败', 500);
          }
        }}
      />
    </Dialog.Container>
  );
};

export default ReplyDialog;
