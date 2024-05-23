import { Fragment, useContext, useEffect, useState } from 'react'
import Header from 'components/Utils/Header'
import AuthContext from 'context/AuthContext';
import { PhoneAuthProvider, RecaptchaVerifier, getAuth, signInWithPhoneNumber, updateCurrentUser, updatePhoneNumber, updateProfile } from 'firebase/auth';
import firebase, { app, db, storage } from 'firebaseApp';
import { v4 as uuidv4 } from "uuid";
import { MdOutlineEmail } from 'react-icons/md';
import { IoMdClose, IoMdPerson } from 'react-icons/io';
import { GiPlayButton } from "react-icons/gi";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { Combobox, Tab, Transition } from '@headlessui/react'
import { FaCalendarCheck, FaPhone } from 'react-icons/fa';
import { IoMdArrowForward } from "react-icons/io";
import { PiCaretUpDownBold } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { collection, doc, getDocs, limitToLast, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { CommentProps, PostProps, Region, UserProps } from 'interface';
import { useNavigate } from 'react-router-dom';
import Pagination from 'components/Utils/Pagination';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { GrLike } from 'react-icons/gr';

export default function ProfileDetail() {

  const { user } = useContext(AuthContext);
  const auth = getAuth(app);
  auth.languageCode = "ko";

  const categories: Array<string> = ["Info", "Posts", "Comments", "Likes"];
  const mobileCategories = [<IoMdPerson className='w-6 h-6 mx-auto' />, <BsFileEarmarkPost className='w-6 h-6 mx-auto' />, <FaRegCommentAlt className='w-6 h-6 mx-auto' />, <GrLike className='w-6 h-6 mx-auto' />];
  const [category, setCategory] = useState(categories[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [likedPosts, setLikedPosts] = useState<PostProps[]>([]);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [myUser, setMyUser] = useState<UserProps[]>([]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [postPage, setPostPage] = useState<number>(1);
  const [commentPage, setCommentPage] = useState<number>(1);
  const [likedPage, setLikedPage] = useState<number>(1);

  const [limit, setLimit] = useState<number>(5);

  let postOffset = (postPage - 1) * limit;
  let commentOffset = (commentPage - 1) * limit;
  let likesOffset = (likedPage - 1) * limit;

  const [displayName, setDisplayName] = useState<string>("");

  const [selectedRegion, setSelectedRegion] = useState("");
  const [regionQuery, setRegionQuery] = useState("");
  const filteredRegion = regionQuery === "" ? Region : Region.filter((region) => {
    return region.includes(regionQuery);
  })

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { target: { name, value } } = e;
    if (name === "displayName") {
      setDisplayName(value);
    }
    if (name === "region") {
      setSelectedRegion(value);
    }
  }

  const handleNameUpdate = async (e: any) => {
    e.preventDefault();
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("uid", "==", user?.uid));

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      })
      toast.success("성공적으로 이름을 수정하였습니다");

      const querySnapshot = await getDocs(userQuery);
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, {
          name: displayName
        })
      })
    }

    else {
      return
    }
  }

  const handleRegionUpdate = async (e: any) => {
    e.preventDefault();
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      await updateDoc(docRef, {
        region: selectedRegion
      })
    })
    toast.success("성공적으로 업데이트하였습니다");
  }

  useEffect(() => {
    const currentUser = auth.currentUser;
    const postRef = collection(db, "posts");
    const commentRef = collection(db, "comments");
    const userRef = collection(db, "users");
    const postQuery = query(postRef, where("uid", "==", currentUser?.uid));
    const commentQuery = query(commentRef, where("uid", "==", currentUser?.uid));
    const userQuery = query(userRef, where("uid", "==", currentUser?.uid));
    const likedPostsQuery = query(postRef, where("likes", "array-contains", user?.uid));

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
    onSnapshot(userQuery, (snapshot) => {
      let userObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id
      }))
      setMyUser(userObj as UserProps[]);
      if (myUser[0]?.region) {
        setSelectedRegion(myUser[0]?.region);
      }
    })
    onSnapshot(likedPostsQuery, (snapshot) => {
      let likedPostObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id
      }))
      setLikedPosts(likedPostObj as PostProps[]);
    })
    if (user?.photoURL) {
      setImageUrl(user?.photoURL);
    }
  }, [user]);

  const handleFileUpload = (e: any) => {
    const { target: { files } } = e;
    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageUrl(result);
    }
  }

  const handleDeleteImage = () => {
    setImageUrl(null);
  }

  const onImageSubmit = async (e: any) => {
    e.preventDefault();
    let newImageUrl: string | null = null;
    let key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    const photoUrl = myUser[0]?.imageUrl;

    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("uid", "==", user?.uid));

    try {
      if (photoUrl) {
        const imageRef = ref(storage, photoUrl);
        if (imageRef) {
          await deleteObject(imageRef).catch((error) => { console.log(error) });
        }
      }

      if (imageUrl) {
        const data = await uploadString(storageRef, imageUrl, "data_url");
        newImageUrl = await getDownloadURL(data?.ref);
      }

      if (user) {
        await updateProfile(user, {
          photoURL: newImageUrl || "",
        })

        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach(async (doc) => {
          const docRef = doc.ref;
          await updateDoc(docRef, {
            imageUrl: newImageUrl
          })
        })

        toast.success("성공적으로 업데이트하였습니다");
      }

    } catch (error) {
      console.log(error);
    }
  }

  console.log(selectedIndex);

  return (

    <>
      <Header />
      <div className='body'>
        <div className='mypage__container w-full h-full pb-[50px] overflow-auto absolute top-[100px] bottom-0 lg:top-[180px] bg-slate-500'>
          <div className='bg-white rounded-lg mt-9 w-[90%] max-w-[1000px] mx-auto p-4'>
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <div className='hidden sm:block'>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-5">
                  {categories.map((category: string, index: number) => (
                    <Tab name='' className="w-full p-3 rounded-lg text-xl font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" key={index} value={category}>
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <div className='block sm:hidden'>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-5">
                  {mobileCategories.map((category: any, index: number) => (
                    <Tab onClick={() => setSelectedIndex(index)} name='' className="w-full p-3 rounded-lg text-xl font-medium leading-5 ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" key={index} value={category}>
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels>

                {/* tablet and pc screen */}
                <Tab.Panel className="rounded-xl text-lg bg-white">
                  <div className='flex flex-col justify-center overflow-hidden'>
                    <div className='flex flex-col p-5 rounded-lg bg-slate-300 justify-center items-center my-3'>
                      <img className='hover:cursor-pointer rounded-full mx-auto' width="100px" height="100px" src={imageUrl ? imageUrl : "/images/0.jpg"} alt="" onClick={handleDeleteImage} />
                      <div className='flex gap-3'>
                        <label className='hover:cursor-pointer text-sm text-center font-semibold p-1 mt-3 w-[90px] h-[30px] mx-auto rounded-lg text-white bg-gray-500 hover:bg-gray-900 hover:bg-gray' htmlFor="file-input">사진선택</label>
                        <input className='hidden' type="file" name="file-input" id="file-input" accept='image/*' onChange={handleFileUpload} />
                        <button className='text-sm font-semibold p-1 mt-3 w-[90px] h-[30px] mx-auto rounded-lg text-white bg-gray-500 hover:bg-gray-900 hover:bg-gray' type="button" onClick={onImageSubmit}>변경하기</button>
                      </div>
                    </div>
                    <table className='mypage__table w-full table-fixed'>
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
                          <td colSpan={2} className='mypage__table-td'>
                            {user?.email}
                          </td>
                        </tr>
                        <tr className='mypage__table-tr border-b-4'>
                          <td className='mypage__table-td'>
                            <FaCalendarCheck className='w-6 h-6 mx-auto' />
                          </td>
                          <td colSpan={2} className='mypage__table-td'>
                            {myUser[0]?.createdAt}
                          </td>
                        </tr>
                        <tr className='mypage__table-tr border-b-4'>
                          <td className='mypage__table-td'>
                            <IoMdPerson className='w-6 h-6 mx-auto' />
                          </td>
                          <td className='mypage__table-td'>
                            <input name='displayName' onChange={onChange} className='text-center font-semibold border border-black rounded-lg p-1 w-[90%]' type="text" placeholder={user?.displayName ?? ""} />
                          </td>
                          <td className='mypage__table-td'>
                            <button onClick={handleNameUpdate} type="button" className='mypage__table-td-btn text-sm'>수정</button>
                          </td>
                        </tr>
                        <tr className='mypage__table-tr h-[70px] border-b-4'>
                          <td className='mypage__table-td'>
                            <FaLocationDot className='w-6 h-6 mx-auto' />
                          </td>
                          <td className='mypage__table-td'>
                            <div className='relative'>
                              <Combobox onChange={setSelectedRegion}>
                                <Combobox.Input placeholder={myUser[0]?.region ? myUser[0]?.region : "선택해주세요"} className="w-[90%] h-full border-none rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm p-2" onChange={(e) => { setRegionQuery(e.target.value) }} />
                                <Combobox.Button className="absolute inset-y-0 right-3 flex items-center pr-2">
                                  <PiCaretUpDownBold
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </Combobox.Button>
                                <Transition as={Fragment} leave='transition ease-in duriation-100' leaveFrom='opacity-100' leaveTo='opacity-0' afterLeave={() => { setRegionQuery("") }}>
                                  <Combobox.Options className="absolute z-999 mt-1 max-h-100 w-full overflow-auto rounded-md bg-white ring-1 ring-black/5 text-base shadow-lg sm:text-sm">
                                    {filteredRegion.map((region) => (
                                      <Combobox.Option className={`z-999 py-2 cursor-pointer pl-10 pr-4 ${selectedRegion === region ? 'bg-teal-600 text-white' : 'text-gray-900'}`} key={region} value={region}>
                                        {region}
                                      </Combobox.Option>
                                    ))}
                                  </Combobox.Options>
                                </Transition>
                              </Combobox>
                            </div>
                          </td>
                          <td className='mypage__table-td'>
                            <button onClick={handleRegionUpdate} type="button" className='mypage__table-td-btn text-sm'>수정</button>
                          </td>
                        </tr>
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
                          <th>제목</th>
                          <th>바로가기</th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {posts?.slice(postOffset, postOffset + limit).map((post) => (
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
                    <div className='flex justify-center my-6'>
                      <Pagination total={posts?.length} limit={limit} page={postPage} setPage={setPostPage} />
                    </div>
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
                        {comments?.slice(commentOffset, commentOffset + limit).map((comment, index) => (
                          <tr key={index} className='mypage__table-tr border-b-4'>
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
                      <Pagination total={comments?.length} limit={limit} page={commentPage} setPage={setCommentPage} />
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='flex flex-col justify-center overflow-hidden'>
                    <table className='mypage__table w-full mt-6'>
                      <thead className='mypage__table-thead'>
                        <tr className=''>
                          <th>작성일</th>
                          <th>제목</th>
                          <th>바로가기</th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {likedPosts?.slice(likesOffset, likesOffset + limit).map((post) => (
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
                    <div className='flex justify-center my-6'>
                      <Pagination total={likedPosts?.length} limit={limit} page={likedPage} setPage={setLikedPage} />
                    </div>
                  </div>
                </Tab.Panel>

                {/* mobile screen */}
                <Tab.Panel className="rounded-xl text-lg bg-white">
                  <div className='flex flex-col justify-center overflow-hidden'>
                    <div className='flex flex-col p-5 rounded-lg bg-slate-300 justify-center items-center my-3'>
                      <img className='hover:cursor-pointer rounded-full mx-auto' width="100px" height="100px" src={imageUrl ? imageUrl : "/images/0.jpg"} alt="" onClick={handleDeleteImage} />
                      <div className='flex gap-3'>
                        <label className='hover:cursor-pointer text-sm text-center font-semibold p-1 mt-3 w-[90px] h-[30px] mx-auto rounded-lg text-white bg-gray-500 hover:bg-gray-900 hover:bg-gray' htmlFor="file-input">사진선택</label>
                        <input className='hidden' type="file" name="file-input" id="file-input" accept='image/*' onChange={handleFileUpload} />
                        <button className='text-sm font-semibold p-1 mt-3 w-[90px] h-[30px] mx-auto rounded-lg text-white bg-gray-500 hover:bg-gray-900 hover:bg-gray' type="button" onClick={onImageSubmit}>변경하기</button>
                      </div>
                    </div>
                    <table className='mypage__table w-full table-fixed'>
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
                          <td className='mypage__table-td text-sm'>
                            {user?.email}
                          </td>
                          <td className='mypage__table-td'>
                          </td>
                        </tr>
                        <tr className='mypage__table-tr border-b-4'>
                          <td className='mypage__table-td'>
                            <FaCalendarCheck className='w-6 h-6 mx-auto' />
                          </td>
                          <td colSpan={2} className='mypage__table-td'>
                            {myUser[0]?.createdAt}
                          </td>
                        </tr>
                        <tr className='mypage__table-tr border-b-4'>
                          <td className='mypage__table-td'>
                            <IoMdPerson className='w-6 h-6 mx-auto' />
                          </td>
                          <td className='mypage__table-td'>
                            <input name='displayName' onChange={onChange} className='text-center font-semibold border border-black rounded-lg p-1 w-[90%]' type="text" placeholder={user?.displayName ?? ""} />
                          </td>
                          <td className='mypage__table-td'>
                            <button onClick={handleNameUpdate} type="button" className='mypage__table-td-btn text-sm'>수정</button>
                          </td>
                        </tr>
                        <tr className='mypage__table-tr h-[70px] border-b-4'>
                          <td className='mypage__table-td'>
                            <FaLocationDot className='w-6 h-6 mx-auto' />
                          </td>
                          <td className='mypage__table-td'>
                            <div className='relative'>
                              <Combobox onChange={setSelectedRegion}>
                                <Combobox.Input placeholder={myUser[0]?.region ? myUser[0]?.region : "선택해주세요"} className="w-[90%] h-full border-none rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm p-2" onChange={(e) => { setRegionQuery(e.target.value) }} />
                                <Combobox.Button className="absolute inset-y-0 right-3 flex items-center pr-2">
                                  <PiCaretUpDownBold
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                </Combobox.Button>
                                <Transition as={Fragment} leave='transition ease-in duriation-100' leaveFrom='opacity-100' leaveTo='opacity-0' afterLeave={() => { setRegionQuery("") }}>
                                  <Combobox.Options className="absolute z-999 mt-1 max-h-100 w-full overflow-auto rounded-md bg-white ring-1 ring-black/5 text-base shadow-lg sm:text-sm">
                                    {filteredRegion.map((region) => (
                                      <Combobox.Option className={`z-999 py-2 cursor-pointer pl-10 pr-4 ${selectedRegion === region ? 'bg-teal-600 text-white' : 'text-gray-900'}`} key={region} value={region}>
                                        {region}
                                      </Combobox.Option>
                                    ))}
                                  </Combobox.Options>
                                </Transition>
                              </Combobox>
                            </div>
                          </td>
                          <td className='mypage__table-td'>
                            <button onClick={handleRegionUpdate} type="button" className='mypage__table-td-btn text-sm'>수정</button>
                          </td>
                        </tr>
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
                          <th>제목</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {posts?.slice(postOffset, postOffset + limit).map((post) => (
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
                    <div className='flex justify-center my-6'>
                      <Pagination total={posts?.length} limit={limit} page={postPage} setPage={setPostPage} />
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='flex flex-col justify-center overflow-hidden'>
                    <table className='mypage__table w-full mt-6'>
                      <thead className='mypage__table-thead'>
                        <tr className=''>
                          <th>작성일</th>
                          <th>댓글</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {comments?.slice(commentOffset, commentOffset + limit).map((comment, index) => (
                          <tr key={index} className='mypage__table-tr border-b-4'>
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
                      <Pagination total={comments?.length} limit={limit} page={commentPage} setPage={setCommentPage} />
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className='flex flex-col justify-center overflow-hidden'>
                    <table className='mypage__table w-full mt-6'>
                      <thead className='mypage__table-thead'>
                        <tr className=''>
                          <th>작성일</th>
                          <th>제목</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {likedPosts?.slice(likesOffset, likesOffset + limit).map((post) => (
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
                    <div className='flex justify-center my-6'>
                      <Pagination total={likedPosts?.length} limit={limit} page={likedPage} setPage={setLikedPage} />
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


