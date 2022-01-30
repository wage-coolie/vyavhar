import {React , useContext,useRef,useState} from 'react'
import './share.css'
import {PermMedia, Label,Room, EmojiEmotions} from "@material-ui/icons"
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios'

export default function Share() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef()
    const [file,setFile] = useState(null)
    const submitHandler = async (e) => {
        e.preventDefault();
        const post = {
            userId:user._id,
            desc:desc.current.value
        };
        if (file) {
            const fileName = Date.now() + file.name;
            const data = new FormData();
            data.append("name", fileName);
            data.append("file", file);
            post.img = fileName;
            // console.log(newPost);
            try{
                await axios.post("/upload",data)
            }catch(e){
                console.log(e)
            }
            }
        try{
            await axios.post('/posts',post)
            window.location.reload()
        }catch(e){
            console.log(e)
        }
    }
	return (
		 <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"no_avatar/image_proxy.jpeg"} alt="" />
          <input
            placeholder={"What's in your mind "+ user.username+"?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        <form className="shareBottom" onSubmit={submitHandler} >
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}}  type="file" id="file" acceptable=".png,.jpeg,.jpg" onChange={(e) =>setFile(e.target.files[0])} />
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button type="submit" className="shareButton">Share</button>
        </form>
      </div>
    </div>
	)
}