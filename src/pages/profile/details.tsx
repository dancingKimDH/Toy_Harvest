import { Fragment, useContext } from 'react'
import Header from 'components/Utils/Header'
import AuthContext from 'context/AuthContext';
import { getAuth } from 'firebase/auth';
import { app } from 'firebaseApp';
import { MdOutlineEmail } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';

export default function ProfileDetail() {

  const {user} = useContext(AuthContext);
  const auth = getAuth(app);

  console.log(user?.email);

  

  return (

    <>
      <Header />
      <div className='w-full h-full absolute top-[100px] lg:top-[160px] bg-black'>
        <div className='flex items-center justify-between text-black rounded-lg font-semibold w-[80%] max-w-[600px] mx-auto mt-9 bg-primaryBlue p-4'>
          <span className='text-[1.5rem]'>마이 페이지</span>
          <span className='underline hover:text-gray-500 hover:cursor-pointer'>로그아웃</span>
        </div>
        <div className='bg-white rounded-lg mt-9 w-[90%] max-w-[800px] mx-auto p-4'>
            <span className='font-semibold underline'>나의 정보</span>
            <div className='mt-3 flex items-center justify-between'>
              <span className=''><MdOutlineEmail /></span>
              <textarea name="" id="" className='w-[80%] border border-black resize-none'>{user?.email}</textarea>
            </div>
            <div className='mt-3 flex items-center justify-between'>
              <span className=''><IoMdPerson /></span>
              <span>{user?.displayName}</span>
            </div>
        </div>
        <div className='bg-white rounded-lg mt-9 w-[90%] max-w-[800px] mx-auto p-4'>
          <span className='font-semibold underline'>
            내가 쓴 글
          </span>

        </div>
      </div>
    </>
  )
}
