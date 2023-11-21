import React from 'react';
import Typography from '@mui/material/Typography';
import { selectUsers } from '../../users/userSlice';
import { useSelector } from 'react-redux';

function PostAuthor({userId}) {
    const AllUsers = useSelector(selectUsers)
    
    const user = AllUsers.users.filter(user => user.id === Number(userId))
    const { firstName , surName} = user[0]
    
    return (
        <div>
            
            <Typography>{firstName + " " + surName}</Typography>
        </div>
    );
}


export default PostAuthor;