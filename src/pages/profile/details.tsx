import { Fragment, useContext, useState } from 'react'
import Header from 'components/Utils/Header'
import AuthContext from 'context/AuthContext';
import { getAuth } from 'firebase/auth';
import { app } from 'firebaseApp';
import { MdOutlineEmail } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { Tab } from '@headlessui/react'
import { FaPhone } from 'react-icons/fa';


export default function ProfileDetail() {

  const { user } = useContext(AuthContext);
  const auth = getAuth(app);

  console.log(user);

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
          <Tab.Group onChange={(index) => { setCategory(categories[index]) }}>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              {categories.map((category: string, index: number) => (
                <Tab className="w-full rounded-lg py-2.5 text-sm font-medium leading-5, ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2" key={index} value={category}>
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
                          {user?.displayName}
                        </td>
                        <td className='mypage__table-td'>
                          <button type="button" className='mypage__table-td-btn'>수정</button>
                        </td>
                      </tr>
                      <tr className='mypage__table-tr border-b-4'>
                        <td className='mypage__table-td'>
                          <FaPhone className='w-6 h-6 mx-auto' />
                        </td>
                        <td className='mypage__table-td'>
                          {user?.phoneNumber ?? "전화번호 없음"}
                        </td>
                        <td className='mypage__table-td'>
                          <button type="button" className='mypage__table-td-btn'>수정</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}
