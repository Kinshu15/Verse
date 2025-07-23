import React, {
  useRef,
  useContext,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpeg";
import { Button } from "@material-tailwind/react";
import live from "../../assets/images/live.png";
import smile from "../../assets/images/smile.png";
import addImage from "../../assets/images/addImage.png";
import { AuthContext } from "../AppContext/AppContext";
import { supaBase, uploadFileToSupabase } from "../supaBase/supaBase";
import { Alert, Spinner } from "@material-tailwind/react";
import {
  PostReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import PostCard from "./postCard";

const Main = () => {
  const { user, userData } = useContext(AuthContext);

  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(PostReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [localLikes, setLocalLikes] = useState({});
  const [localComments, setLocalComments] = useState({});

  // Function to fetch user's liked posts
  const fetchLikedPosts = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supaBase
        .from('post_likes')
        .select('post_id')
        .eq('user_id', user.uid);

      if (error) throw error;

      if (data) {
        // setLikedPosts(new Set(data.map(like => like.post_id))); // This line was removed
      }
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    }
  }, [user]);

  // Handle post likes
  const handleLike = (postId, isLiking) => {
    setLocalLikes(prev => ({
      ...prev,
      [postId]: isLiking ? 1 : 0
    }));
  };

  // Handle post comments
  const handleComment = (postId, commentText) => {
    if (!commentText?.trim()) return;
    setLocalComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentText.trim()]
    }));
  };

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    const postText = text.current.value.trim();
    
    if (postText === "") {
      dispatch({ type: HANDLE_ERROR });
      return;
    }

    if (file && !image) {
      alert("Please wait for image to finish uploading");
      return;
    }

    try {
      console.log('Attempting to insert post with data:', {
        user_id: user?.uid ?? null,
        user_name: user?.displayName ?? userData?.name ?? null,
        content: postText,
      });

      const { error } = await supaBase.from("social_posts").insert([
        {
          user_id: user?.uid ?? null,
          user_logo: user?.photoURL ?? null,
          user_name: user?.displayName ?? userData?.name ?? null,
          user_email: user?.email ?? userData?.email ?? null,
          content: postText,
          image_url: image ?? null,
          created_at: new Date().toISOString(),
          likes: 0,
          comments: 0
        },
      ]);

      if (error) {
        dispatch({ type: HANDLE_ERROR });
        console.error("Post submission error:", error);
        return;
      }

      text.current.value = "";
      setImage(null);
      setFile(null);
      setProgressBar(0);
      await fetchPosts();
      
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      console.error("Post submission error:", err);
    }
  };

  const submitImage = async () => {
    if (!file) return;

    try {
      const url = await uploadFileToSupabase(file, "image/", "user.uploads");
      if (url) {
        setImage(url);
      } else {
        dispatch({ type: HANDLE_ERROR });
        alert("Upload failed");
      }
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert("Something went wrong");
      console.error(err.message);
    }
  };

  const fetchPosts = useCallback(async () => {
    try {
      // Fetch all posts with complete data
      console.log('Fetching posts...');
      const { data, error } = await supaBase
        .from("social_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message, error.details, error.hint);
        dispatch({ type: HANDLE_ERROR });
        return;
      }
      
      console.log('Fetched posts:', data);

      if (!data) {
        dispatch({
          type: SUBMIT_POST,
          posts: [],
        });
        return;
      }

      // Update the posts in state
      dispatch({
        type: SUBMIT_POST,
        posts: data,
      });
    } catch (error) {
      console.error("Error in fetchPosts:", error);
      dispatch({ type: HANDLE_ERROR });
    }
  }, [dispatch, HANDLE_ERROR, SUBMIT_POST]);

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchPosts(),
          user && fetchLikedPosts()
        ]);
      } finally {
        setLoading(false);
      }
    };

    initializeData();

    // Set up real-time subscription for posts
    const postsSubscription = supaBase
      .channel('social_posts_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'social_posts'
        },
        async (payload) => {
          await fetchPosts();
          if (payload.eventType === 'INSERT') {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }
      )
      .subscribe();

    // Set up real-time subscription for likes
    const likesSubscription = supaBase
      .channel('post_likes_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_likes'
        },
        async () => {
          if (user) {
            await fetchLikedPosts();
          }
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      postsSubscription.unsubscribe();
      likesSubscription.unsubscribe();
      setImage(null);
      setFile(null);
      setProgressBar(0);
    };
  }, [fetchPosts, fetchLikedPosts, user]);

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <Avatar
            src={user?.photoURL || avatar}
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
              <div className="mx-4">
                {image && (
                  <img
                    src={image}
                    alt="previewImage"
                    className="h-24 rounded-xl"
                  />
                )}
              </div>
              <div className="mr-4">
                <Button variant="text" type="submit">
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-blue-700 py-1 rounded-md"
        >
          {/*put Progress bar*/}
        </span>
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
      <div className="flex flex-col py-4 w-full">
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <Spinner className="h-8 w-8" />
          </div>
        ) : state.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">
              Something went wrong please try again later....
            </Alert>
          </div>
        ) : (
          <div>
            {state.posts?.length > 0 ? (
              state.posts.map((post, index) => (
                <PostCard
                  key={post.id || index}
                  id={post.id}
                  logo={post.user_logo}
                  uid={post.user_id}
                  name={post.user_name}
                  email={post.user_email}
                  image={post.image_url}
                  text={post.content}
                  timestamp={new Date(post.created_at).toLocaleString()}
                  likes={localLikes[post.id] || 0}
                  comments={(localComments[post.id] || []).length}
                  onLike={handleLike}
                  onComment={handleComment}
                  isLiked={!!localLikes[post.id]}
                />
              ))
            ) : (
              <div className="flex justify-center items-center p-4">
                <p className="text-gray-500">No posts yet. Be the first to post!</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/*Reference for later*/}</div>
    </div>
  );
};

export default Main;
