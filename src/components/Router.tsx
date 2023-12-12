import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import LogIn from "../pages/login";
import Post from "../pages/posts";
import PostDetail from "../pages/posts/details";
import PostNew from "../pages/posts/new";
import PostEdit from "../pages/posts/edit";
import ProfileDetail from "../pages/profile/details";
import ProfileEdit from "../pages/profile/edit";
import SignUp from "../pages/signup";

interface RouterProps {
    isAuthenticated: boolean;
}

export default function Router({isAuthenticated} : RouterProps) {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/posts" element={<Post/>} />
            <Route path="/posts/:id" element={<PostDetail/>} />
            <Route path="/posts/new" element={<PostNew/>} />
            <Route path="/posts/edit/:id" element={<PostEdit/>} />
            <Route path="/profile" element={<ProfileDetail/>} />
            <Route path="/profile/edit/:id" element={<ProfileEdit/>} />
            <Route path="*" element={<Navigate replace to = "/"/>} />
            
            <Route path="/login" element={<LogIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="*" element={<LogIn/>} />

        </Routes>
    )
}