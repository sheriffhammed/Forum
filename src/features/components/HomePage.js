import * as React from 'react';
import { useSelector } from "react-redux";
import { loginDetails } from '../login/loginSlice';
import PostLists from '../posts/components/postLists';

export default function HomePage() {
  const loginDetail = useSelector(loginDetails);
  const {userId} = loginDetail
  
  
  return (
    <>    
    <PostLists userId = {userId}/>
       
    
  </>
  );
}