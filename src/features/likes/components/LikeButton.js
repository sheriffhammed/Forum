import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { addLike } from '../../likes/middleware/addLike';
import { loginDetails } from '../../login/loginSlice';
import { likesByPostID } from '../likeSlice';
import { fetchLikes } from '../middleware/fetchLike';
import { disLike } from '../middleware/disLike';

export default function LikeButton({postId}) {   
  const dispatch = useDispatch()
  
  const {userId} = useSelector(loginDetails)
  
  const selectLikesByPostId = useSelector(state => likesByPostID(state , postId))
  //console.log('selectLikesByPostId :', selectLikesByPostId)

  const isUserLiked = selectLikesByPostId.find(like => like.userId === userId)
 
  useEffect(() => {
    dispatch(fetchLikes())}
    , []
  )

    //Like Post
    const onLikePostClicked = () => {
      //console.log(postId, userId)
      dispatch(addLike({
        userId,
        postId
      }))
    }


    //Dislike Post
    const onDisLikePost = (id) => {
      dispatch(disLike(id))
    }

 
 
return (
        // {likeButtonType}
        <>
        {isUserLiked ?
          <Stack direction="row" spacing={1}>
            <Tooltip title="DisLike Post" arrow>
            <IconButton aria-label="delete" color="primary" onClick={() => onDisLikePost(Number(isUserLiked.id))}>
                                                            
              <ThumbUpAltIcon />
            </IconButton></Tooltip>  {selectLikesByPostId.length}
          </Stack>
        :
            <Stack direction="row" spacing={1}>
              <Tooltip title="Like Post" arrow>
              <IconButton aria-label="delete" onClick={onLikePostClicked}>
                <ThumbUpAltIcon />
              </IconButton> </Tooltip> {selectLikesByPostId.length}
            </Stack>
        }
        </>
       
  );
}
