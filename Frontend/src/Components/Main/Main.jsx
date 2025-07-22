import React, { useRef, useContext, useState, useReducer, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpeg";
import { Button } from "@material-tailwind/react";
import live from "../../assets/images/live.png";
import smile from "../../assets/images/smile.png";
import addImage from "../../assets/images/addImage.png";
import { AuthContext } from "../AppContext/AppContext";
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  PostReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";

const Main = () => {
  const { user, userData } = useContext(AuthContext);

  const text = useRef("");
  const scrollRef=useRef("")
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postsRef = doc(collection(db, "posts"));
  const document = postsRef.id;
  const [progressBar, setProgressBar] = useState(0);
  const [state, dispatch ] = useReducer(PostReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;


const handleUpload=(e)=>{
  setFile(e.target.files[0])
}


  const handleSubmitPost = async (e) => {
    if (text.current.value !== "") {
      try {
        await setDoc(postsRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };
  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    console.log("file", file);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `image/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot, ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };
  useEffect(()=>{
    const postData = async ()=>{
      const q= query(collectionRef,orderBy("timestamp","asc"))
      await onSnapshot(q,(doc)=>{
        dispatch({
          type:SUBMIT_POST,
          posts:doc?.docs?.map((item) => item?.data())
        })
      })
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
      setImage(null)
      setFile(null)
      setProgressBar(0)
    }
    return () => postData()
  },[])

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar
            src={avatar}
            size="sm"
            variant="circular"
            alt="Avatar"
          ></Avatar>
          <form className="w-full " onSubmit={handleSubmitPost}>
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <input
                  type="text"
                  name="text"
                  className="outline-none w-full bg-white rounded-md"
                  placeholder={`Whats on your mind ${
                    user?.displayName?.split(" ")[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                      
                  }`}
                  ref={text}
                ></input>
              </div>
              <div className="mx-4">{image && <img src={image} alt="previewImage" className="h-24 rounded-xl" />}</div>
              <div className="mr-4">
                <Button variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span style={{width: `${progressBar}%`}} className="bg-blue-700 py-1 rounded-md">{/*put Progress bar*/}</span>
        <div className=" flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
            >
              <img className="h-10 mr-4" src={addImage} alt="addImage"></img>
            
            <input
              id="addImage"
              type="file"
              style={{ display: "none" }}
              onChange={handleUpload}
            ></input>
            </label>
            {file && (
              <Button variant="text" onClick={submitImage}>
                UPLOAD
              </Button>
            )}
            
          </div>
          <div className="flex items-center">
            <img className="h-10 mr-4" src={live} alt="live"></img>
            <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Live
            </p>
          </div>
          <div className="flex items-center">
            <img className="h-10 mr-4" src={smile} alt="smile"></img>
            <p className="font-medium text-md text-gray-700 no-underline tracking-normal leading-none">
              Feeling
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full ">{/* Posts */}</div>
      <div ref={scrollRef}>{/*Reference for later*/}</div>
    </div>
  );
};

export default Main;
