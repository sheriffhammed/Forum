import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress} from '@mui/material';
import { postStatus, selectAllPosts , postError , postIslosding } from '../postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../middleware/fetchPosts';
import { postByUserId } from '../postSlice';
import PostAuthor from './PostAuthor';
import ActionButtons from './ActionButtons';
//import LikeAction from '../../likes/components/LikeAction'
//import LikeButton from './LikeButton';
import LikeButton from '../../likes/components/LikeButton';
import PostLinks from './PostLinks';
import Copyright from '../../components/Copyright';
import TimeAgo from "./TimeAgo";


const Root = styled('div')(({ theme }) => ({
  width: '50%',
  justifyContent: "center",
  alignItems: "center",
  ...theme.typography.body2,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function PostLists({userId}) {
  const dispatch = useDispatch()  
  const allPosts = useSelector(selectAllPosts)
  const retreiveByUserId = useSelector(state => postByUserId(state, Number(userId)))
  const error = useSelector(postError)
  const isLoading = useSelector(postIslosding)
  const status = useSelector(postStatus)

  // console.log('All Posts :', allPosts)
  // console.log('retreiveByUserId :', retreiveByUserId.userId)
  // console.log('retreiveByUser :', retreiveByUserId)
  useEffect ( () =>{
    dispatch(fetchPosts())}, []
    
  )
 
  let contents;
  if (status === 'loading') {
    contents = <CircularProgress />
  } 
  else if (status === 'succeeded') {
    const orderedPosts = allPosts.slice().sort((a, b) => b.date.localeCompare(a.date))
    contents = orderedPosts.map(post => {
      //contents = allPosts.map(post => {
          return(
            <>
              
              <Root>
                  <Divider textAlign='left'>
                  <br />
                      {/* <Chip label={post.title} /> */}
                      <Chip label={<PostAuthor userId={post.userId} />} />
                  </Divider>
                  
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<TimeAgo timestamp={post.date} />
                  <br/>
                  {post.body}
                  {userId === post.userId ?
                    <>
                      <LikeButton 
                      postId = {post.id}
                      userId = {post.userId}
                      />
                      <ActionButtons 
                          postId = {post.id}
                          userId = {post.userId}
                      />
                    </>
                  : 
                    <LikeButton 
                      postId = {post.id}
                      userId = {post.userId}
                    />
                  }
                  
                  
              </Root>
              </>
          )
        } )
    }
    else if (status === 'failed') {
      contents = <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> {error} </Typography>;
  }
            
            
   

  return (
    <>
    <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <PostLinks postUserId = {userId}/>
            {/* {isLoading && <CircularProgress />}
            {contents.length > 1 ? contents : "" }
            {error && <h1>Error: {error}</h1>} */}
            {contents}
            <br/><br/>
            <Copyright />
    </Box>
   
    </>
  );
}
