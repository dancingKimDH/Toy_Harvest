import React, { useContext, useEffect, useState } from "react"
import { CiImageOn } from "react-icons/ci";
import AuthContext from "../../context/AuthContext";
import { FaAngleDown } from "react-icons/fa";
import { v4 as uuidv4, v4 } from 'uuid';
import { FiImage } from "react-icons/fi";
import { NEWS_CATEGORY_ARR } from "../data/data";
import { toast } from "react-toastify";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../../firebaseApp";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { PostProps } from "interface";
// yarn add --dev @types/uuid

interface PostFormProps {
    id?: string,
}

export default function NewsPostForm({ id }: PostFormProps) {

    const [post, setPost] = useState<PostProps | null>(null);

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const [inputKey, setInputKey] = useState(uuidv4());

    const [initialImage, setInitialImage] = useState<string | null>(null);

    const [imageFile, setImageFile] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [hashTag, setHashTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const inputPost = async () => {
        if (id && user) {
            let docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            setPost({ ...(docSnap.data() as PostProps) });
            if (docSnap.exists()) {
                const postData = docSnap.data() as PostProps
                setTags(postData?.hashTags ?? []);
                setTitle(postData?.title ?? "");
                setSummary(postData?.summary ?? "");
                setContent(postData?.content ?? "");
                setImageFile(postData?.imageUrl ?? null);
                setInitialImage(postData?.imageUrl ?? null);
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        inputPost();
    }, [id, user])

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const key = `${user?.uid}-${v4()}`;
        const storageRef = ref(storage, key);

        try {

            if (id) {

                if(id  && initialImage && initialImage.length > 1) {
                    let imageRef = ref(storage, initialImage);
                    await deleteObject(imageRef).catch((error) => console.log(error));
                }

                let imageUrl = "";
                if(imageFile && imageFile.length > 1) {
                    const data = await uploadString(storageRef, imageFile, "data_url");
                    imageUrl = await getDownloadURL(data?.ref);
                }

                let docRef = doc(db, "posts", id);

                await updateDoc(docRef, {
                    content: content,
                    hashTags: tags,
                    title: title,
                    sumamry: summary,
                    imageUrl: imageUrl,
                })
                toast.success("성공적으로 수정하였습니다");
                navigate("-1");

            } else {

                let imageUrl = "";
                if (imageFile) {
                    const data = await uploadString(storageRef, imageFile, "data_url")
                    imageUrl = await getDownloadURL(data?.ref);
                }

                await addDoc(collection(db, "posts"), {
                    title: title,
                    summary: summary,
                    content: content,
                    createdAt: new Date()?.toLocaleDateString("ko", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                    uid: user?.uid,
                    email: user?.email,
                    hashTags: tags,
                    imageUrl: imageUrl,
                })

                setTags([]);
                setHashTag("");
                setTitle("");
                setSummary("");
                setContent("");
                setImageFile(null);
                setIsSubmitting(false);

                toast.success("게시글을 성공적으로 등록하였습니다")
                navigate(-1);
            }

        } catch (error) {
            console.log(error);
            toast.error("문제가 발생하였습니다");
        }

    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {
            target: { name, value }
        } = e;

        if (name === "title") {
            setTitle(value);
        }
        if (name === "summary") {
            setSummary(value);
        }
        if (name === "category") {
            setCategory(value);
        }
        if (name === "content") {
            setContent(value);
        }
    }

    const onChangeHashTag = (e: any) => {
        setHashTag(e?.target.value?.trim());
    }

    const handleKeyUp = (e: any) => {
        if (e.keyCode === 32 && e.target.value.trim() !== "") {
            if (tags?.includes(e.target.value.trim())) {
                toast.error("동일한 태그가 있습니다");
            } else {
                setTags((prev) => (prev.length > 0 ? [...prev, hashTag] : [hashTag]));
                setHashTag("");
            }
        }
    }

    const removeHashTag = (tag: string) => {
        setTags(tags?.filter((val) => val !== tag));
    }

    const handleFileUpload = (e: any) => {
        // destructures the event object to extract files
        const { target: { files } } = e;
        const file = files?.[0];

        const fileReader = new FileReader();
        fileReader?.readAsDataURL(file);
        fileReader.onloadend = (e: any) => {
            // extracts result from e.currentTarget : fileReader Object
            const { result } = e?.currentTarget;
            setImageFile(result);
        }
    }

    const handleDeleteImage = async () => {
        setImageFile(null);
        // 동일 사진 업로드 다르게 취급
        setInputKey(uuidv4());
    }

    return (
        <>
            <div className="py-8 max-w-[800px] mx-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form action="" className="w-full" onSubmit={onSubmit}>
                                <div className="flex w-full">
                                    <div className="mb-4 w-full">
                                        <label htmlFor="" className="text-xl font-semibold block mb-3 text-gray-600">제목</label>
                                        <div className="flex gap-5 w-full">
                                            <input onChange={onChange} type="text" className="border-2 border-gray-300 p-2 w-full" value={title} name="title" id="title" maxLength={10} placeholder="10자 내로 입력해 주세요" required />
                                            <select onChange={onChange} name="" id="" className="border-2 border-gray-300 p-2">
                                                <option value="">카테고리</option>
                                                {NEWS_CATEGORY_ARR?.map((category) => (
                                                    <option value={category} key={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="" className="text-xl block mb-3 text-gray-600 font-semibold">요약</label>
                                    <input onChange={onChange} type="text" className="border-2 border-gray-300 p-2 w-full" value={summary} name="summary" id="summary" maxLength={15} placeholder="15자 내로 입력해 주세요" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="hashTag" className="text-xl block mb-3 text-gray-600 font-semibold">#태그</label>
                                    <div className="flex items-center border-2 border-gray-300 p-2 flex-wrap">
                                        {tags?.map((tag) => (
                                            <span onClick={() => removeHashTag(tag)}
                                                className="bg-primaryBlue rounded-xl font-semibold hover:cursor-pointer text-white gap-2 px-2 mx-2 my-1 flex-nowrap" key={tag}> {tag} </span>
                                        ))}
                                        <input onChange={onChangeHashTag} onKeyUp={handleKeyUp} type="text" className="outline-none px-2 my-1" value={hashTag} name="hashTag" id="hashTag" maxLength={15} placeholder="입력 후 스페이스" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="text-xl block mb-3 text-gray-600 font-semibold">내용</label>
                                    <textarea onChange={onChange} name="content" id="content" value={content} className="border-2 border-gray-300 w-full h-[300px] resize-none"></textarea>
                                </div>
                                <div className="mb-4 flex justify-between items-center px-5">
                                    <div className="flex items-center gap-5">
                                        <label htmlFor="file_input"><FiImage className="text-xl cursor-pointer" /></label>
                                        <input key={inputKey} type="file" onChange={handleFileUpload} accept="image/*" className="hidden" name="file_input" id="file_input" />
                                        {imageFile && (
                                            <img alt="image" src={imageFile} onClick={handleDeleteImage} className="cursor-pointer w-[100px] h-[100px]" />
                                        )}
                                    </div>
                                    <div>
                                        <button className="p-[5px] text-sm rounded-lg bg-primaryBlue text-white font-semibold" type="submit">새 글 등록하기</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}