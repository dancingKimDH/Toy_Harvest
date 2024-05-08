import { Fragment, useContext, useEffect, useState } from 'react'
import Header from 'components/Utils/Header'
import AuthContext from 'context/AuthContext';
import { PhoneAuthProvider, RecaptchaVerifier, getAuth, signInWithPhoneNumber, updateCurrentUser, updatePhoneNumber, updateProfile } from 'firebase/auth';
import firebase, { app, db } from 'firebaseApp';
import { MdOutlineEmail } from 'react-icons/md';
import { IoMdClose, IoMdPerson } from 'react-icons/io';
import { GiPlayButton } from "react-icons/gi";
import { Tab } from '@headlessui/react'
import { FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { collection, doc, getDocs, limitToLast, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { CommentProps, PostProps } from 'interface';
import { useNavigate } from 'react-router-dom';
import Pagination from 'components/Utils/Pagination';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: string;
  }
}

export default function ProfileDetail() {

  const { user } = useContext(AuthContext);
  const auth = getAuth(app);
  auth.languageCode = "ko";

  const categories: Array<string> = ["My Info", "My Posts", "My Comments"];
  const [category, setCategory] = useState(categories[0]);

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [comments, setComments] = useState<CommentProps[]>([]);

  const [displayName, setDisplayName] = useState<string>("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = e;
    if (name === "displayName") {
      setDisplayName(value);
    }
  }

  const handleNameUpdate = (e: any) => {
    e.preventDefault();
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
      toast.success("성공적으로 이름을 수정하였습니다");
    }
    else {
      return
    }
  }

  useEffect(() => {
    const currentUser = auth.currentUser;
    const postRef = collection(db, "posts");
    const commentRef = collection(db, "comments");
    const postQuery = query(postRef, where("uid", "==", currentUser?.uid));
    const commentQuery = query(commentRef, where("uid", "==", currentUser?.uid))

    onSnapshot(postQuery, (snapshot) => {
      let postObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id
      }))
      setPosts(postObj as PostProps[]);
    })
    onSnapshot(commentQuery, (snapshot) => {
      let commentObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id
      }))
      setComments(commentObj as CommentProps[]);
    })
  }, [user]);

  return (

    <>
      <Header />
      <div className='body'>
        <div className='w-full h-full pb-[50px] overflow-auto absolute top-[100px] bottom-0 lg:top-[180px] bg-black'>
          <div className='flex items-center justify-between text-black rounded-lg font-semibold w-[80%] max-w-[800px] mx-auto mt-[50px] bg-primaryBlue p-4'>
            <span className='text-[1.5rem]'>마이 페이지</span>
            <span className='underline hover:text-gray-500 hover:cursor-pointer'>로그아웃</span>
          </div>
          <div className='bg-white rounded-lg mt-9 w-[90%] max-w-[1000px] mx-auto p-4'>
            <Tab.Group onChange={(index) => { setCategory(categories[index]) }}>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-5">
                {categories.map((category: string, index: number) => (
                  <Tab className="w-full p-3 rounded-lg text-xl font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" key={index} value={category}>
                    {category}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="rounded-xl text-lg bg-white p-3">
                  <div className='flex justify-center overflow-hidden'>
                    <table className='mypage__table w-full'>
                      <thead className='mypage__table-thead'>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className='mypage__table-tr border-b-4'>
                          <td className='mypage__table-td'>
                            <MdOutlineEmail className='w-6 h-6 mx-auto' />
                          </td>
                          <td className='mypage__table-td'>
                            {user?.email}
                          </td>
                          <td className='mypage__table-td'>
                          </td>
                        </tr>
                        <tr className='mypage__table-tr border-b-4'>
                          <td className='mypage__table-td'>
                            <IoMdPerson className='w-6 h-6 mx-auto' />
                          </td>
                          <td className='mypage__table-td'>
                            <input name='displayName' onChange={onChange} className='text-center font-semibold border border-black rounded-lg p-1' type="text" placeholder={user?.displayName ?? ""} />
                          </td>
                          <td className='mypage__table-td'>
                            <button onClick={handleNameUpdate} type="button" className='mypage__table-td-btn'>수정</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='flex justify-center overflow-hidden'>
                    <table className='mypage__table w-full mt-6'>
                      <thead className='mypage__table-thead'>
                        <tr className=''>
                          <th>작성일</th>
                          <th>제목</th>
                          <th>바로가기</th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {posts?.map((post) => (
                          <tr className='mypage__table-tr border-b-4'>
                            <td className='mypage__table-td'>
                              {post?.createdAt}
                            </td>
                            <td className='mypage__table-td'>
                              {post?.title}
                            </td>
                            <td className='mypage__table-td'>
                              <button type="button" onClick={() => navigate(`/community/${post?.id}`)}><GiPlayButton /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='flex flex-col justify-center overflow-hidden'>
                    <table className='mypage__table w-full mt-6'>
                      <thead className='mypage__table-thead'>
                        <tr className=''>
                          <th>작성일</th>
                          <th>댓글</th>
                          <th>바로가기</th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {comments?.map((comment) => (
                          <tr className='mypage__table-tr border-b-4'>
                            <td className='mypage__table-td'>
                              {comment?.createdAt}
                            </td>
                            <td className='mypage__table-td'>
                              {comment?.comment}
                            </td>
                            <td className='mypage__table-td'>
                              <button type="button" onClick={() => navigate(`/community/${comment?.postId}`)}><GiPlayButton /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='flex justify-center my-6'>
                      <Pagination total={3} limit={3} page={3} setPage={() => { }} />
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  )
}
