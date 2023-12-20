import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import LogIn from "../pages/login";
import NewsPost from "../pages/news";
import NewsPostDetail from "../pages/news/details";
import NewsPostNew from "../pages/news/new";
import NewsPostEdit from "../pages/news/edit";
import ProfileDetail from "../pages/profile/details";
import ProfileEdit from "../pages/profile/edit";
import SignUp from "../pages/signup";
import CommunityPost from "../pages/community";
import CommunityPostDetail from "../pages/community/details";
import CommunityPostEdit from "../pages/community/edit";
import CommunityPostNew from "../pages/community/new";

interface RouterProps {
    isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
    return (
        <Routes>

            {isAuthenticated ? (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<NewsPost />} />
                    <Route path="/news/:id" element={<NewsPostDetail />} />
                    <Route path="/news/new" element={<NewsPostNew />} />
                    <Route path="/news/edit/:id" element={<NewsPostEdit />} />

                    <Route path="/community" element={<CommunityPost />} />
                    <Route path="/community/:id" element={<CommunityPostDetail />} />
                    <Route path="/community/edit/:id" element={<CommunityPostEdit />} />
                    <Route path="/community/new" element={<CommunityPostNew />} />

                    <Route path="/profile" element={<ProfileDetail />} />
                    <Route path="/profile/edit/:id" element={<ProfileEdit />} />
                    <Route path="*" element={<Navigate replace to="/" />} />

                    <Route path="/mypage" element={<ProfileDetail />} />
                    <Route path="/login" element={<LogIn />} />
                </>

            )
                : (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/*" element={<LogIn />} />
                        <Route path="/community" element={<CommunityPost />} />
                    </>
                )}



        </Routes>
    )
}