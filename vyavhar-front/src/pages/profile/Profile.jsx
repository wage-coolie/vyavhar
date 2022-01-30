import {React ,useState , useEffect } from 'react'
import './profile.css'
import axios from 'axios'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feeds from '../../components/feeds/Feeds'
import {useParams} from 'react-router-dom'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const username = useParams().username;
  // console.log(params)
  // getting user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get( `/users?username=${username}`);
      setUser(res.data)
      console.log(user)
    }
    fetchUser();
  },[])

	return (
		<>
		 <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture?PF+user.coverPicture : PF+"no_avatar/void.jpg"}
                alt=""
              />
              <img
                className="profileUserImg"
                src=  {user.profilePicture?PF+user.profilePicture:PF+"no_avatar/image_proxy.jpeg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feeds username={username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>

	)
}