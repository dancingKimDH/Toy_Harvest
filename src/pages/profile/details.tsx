import { Fragment, useContext, useState } from 'react'
import Header from 'components/Utils/Header'
import AuthContext from 'context/AuthContext';
import { getAuth } from 'firebase/auth';
import { app } from 'firebaseApp';
import { MdOutlineEmail } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { Tab } from '@headlessui/react'

export default function ProfileDetail() {

  const { user } = useContext(AuthContext);
  const auth = getAuth(app);

  const [email, setEmail] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  const categories: Array<string> = ["My Info", "My Posts", "My Comments"];
  const [category, setCategory] = useState(categories[0]);

  console.log(category);

  return (

    <>
      <Header />
      <div className='w-full h-full absolute top-[100px] lg:top-[160px] bg-black'>
        <div className='flex items-center justify-between text-black rounded-lg font-semibold w-[80%] max-w-[600px] mx-auto mt-9 bg-primaryBlue p-4'>
          <span className='text-[1.5rem]'>마이 페이지</span>
          <span className='underline hover:text-gray-500 hover:cursor-pointer'>로그아웃</span>
        </div>
        <div className='bg-white rounded-lg mt-9 w-[90%] max-w-[800px] mx-auto p-4'>
          <Tab.Group onChange={(index) => {setCategory(categories[index])}}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                {categories.map((category: string, index: number) => (
                  <Tab key={index} value={category}>
                      {category}
                  </Tab>
                ))}
            </Tab.List>
          </Tab.Group>
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
