import { React , useState , useEffect,useContext } from 'react'
import './post.css'
import { MoreVert} from "@material-ui/icons";
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

import axios from 'axios'




export default function Post({post}) {

  const [like,setLike] = useState(post.likes.length)
  const [isliked,setIsLiked] = useState(false)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({});
  const {user:currentUser} = useContext(AuthContext)
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id,post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get( `/users?userId=${post.userId}`);
      setUser(res.data)
    }
    fetchUser();

  },[post.userId])

  const deletepost = () => {

    try{
      console.log(currentUser._id)
      axios.delete('/posts/'+post._id,{data:{userId:currentUser._id}}).then(()=>(window.location.reload() )) 
 
    }catch(e){
      console.log(e)
    }
  }
  const likehander = () => {
    try{
      axios.put('/posts/'+post._id+'/like',{userId:currentUser._id})

    }catch(e){
      console.log(e)
    }
    setIsLiked(!isliked)
    setLike(isliked?like-1:like+1)
  }
  return (
		 <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ? PF+user.profilePicture : PF+"no_avatar/image_proxy.jpeg"}
              alt=""
            />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          {
            (post.img&&((post.img).split('.')[1] === 'm4v' || (post.img).split('.')[1] === 'webm' || (post.img).split('.')[1] === 'mp4')) ?
                <video src={PF+post.img} width="750" height="500" controls />
                :
                <img className="postImg" src={PF+post.img} alt="" />
            
          }
          
          
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={PF+"like.png"} onClick={likehander} alt="" />
            <img className="likeIcon" src={PF+"heart.png"}  alt="" />
            <span className="postLikeCounter" >{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
          {user._id === currentUser._id?<button onClick={deletepost}>Delete</button>:<p></p>}
          
        </div>
      </div>
    </div>
	)
}