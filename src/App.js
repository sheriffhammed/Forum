import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Login from './features/login/components/Login';
import HomePage from './features/components/HomePage';
import SignUpForm from './features/users/components/SignUpForm';
import ForgotPassword from './features/users/components/ForgotPassword';
import MyPosts from './features/posts/components/MyPosts';
import Header from './features/components/Header';
import PostLists from './features/posts/components/postLists';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route index element={<Login />} />
          <Route  path="/" element={<Header />} >
            <Route index element={<HomePage />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="mypost/:userId" element={<MyPosts />} />
                      
          </Route>
        <Route path="login" element={<Login />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="*" element={"Page Not Found"} />
      </Routes>
    </Router> 
  );
}

export default App;
