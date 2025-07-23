import React, { useContext } from 'react';
import { Avatar } from "@material-tailwind/react";
import avatar from "../../assets/images/avatar.jpeg"
import like from  "../../assets/images/like.png"
import comment from "../../assets/images/comment.png"

import { AuthContext } from '../AppContext/AppContext';
import {
  PostReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
const PostCard = ({uid, id, logo, name, text, email, image, timestamp, likes = 0, comments = 0, onLike, onComment, isLiked}) => {
    const { user } = useContext(AuthContext);
    const [showComments, setShowComments] = React.useState(false);
    const [commentText, setCommentText] = React.useState("");
    
    const handleLike = async () => {
        if (!user) return; // Ensure user is logged in
        try {
            if (onLike) {
                await onLike(id, !isLiked);
            }
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!user || !commentText.trim()) return;
        try {
            if (onComment) {
                await onComment(id, commentText.trim());
                setCommentText(""); // Clear input after posting
            }
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };

    const addUser = async () => {
        try {
            // Your existing addUser logic
        } catch (err) {
            alert(err.message);
            console.log(err.message);
        }
    }


  return (
    <div className="mb-4">
      <div className="flex flex-col py-4 bg-white rounded-t-3xl">
        <div className=" flex items-center pb-4 ml-2">
          <Avatar
            variant="circular"
            size="sm"
            src={logo || avatar}
            alt="avatar"
          ></Avatar>
          <div className="flex flex-col">
            <p className="ml-4 py-2 font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              {email}
            </p>
            <p className="ml-4 font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              Published:{timestamp}
            </p>
          </div>
          {/*addFriendImage*/}
        </div>
        <div>
          <p className="ml-4 pb-4 font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            {text}
          </p>
          {image && (
            <img 
              src={image} 
              alt="post" 
              className="w-full max-w-full h-auto object-contain rounded-xl mt-2"
              style={{ maxHeight: '500px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
          )}

          {/* Like and Comment Section */}
          <div className="flex items-center justify-between px-4 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <img src={like} alt="like" className="h-5 w-5" />
                <span>{likes}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-1 text-gray-600"
              >
                <img src={comment} alt="comment" className="h-5 w-5" />
                <span>{comments}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="px-4 pt-4">
              <form onSubmit={handleComment} className="flex space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Post
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="flex justify-around items-center pt-4">
        </div>
      </div>
    </div>
  );
}

export default PostCard
