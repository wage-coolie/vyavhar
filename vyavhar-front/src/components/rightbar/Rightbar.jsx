import {React,useEffect,useState,useContext} from 'react'
import axios from 'axios'
import './rightbar.css'
import { Users } from '../../dummy_data' 
import Online from '../online/Online'
import {Link} from 'react-router-dom'
import { Add, Remove } from "@material-ui/icons";

import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends] = useState([])
  const { user: currentUser,dispatch} = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );
  const [usersall,setUsersall] = useState([]);

const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

    useEffect(() => {
        const getallusers = async () => {
            try {
                const allusers = await axios.get('/users/all')
                setUsersall(allusers.data)
            } catch (e) {
                console.log(e)
            }
        }
        getallusers();
        console.log(usersall)
    }, []);


  useEffect(() => {
    const getFriends = async () => {
      try{
        const friendlist = await axios.get('/users/friends/'+currentUser._id)
        setFriends(friendlist.data)
    }catch(e){
      console.log(e)
    }
    }
    getFriends();
    console.log(friends)
    }, [currentUser]);

  const HomeRightBar = () => {
      return ( 
        <>
          <div className='birthdayContainer'>
          <img src={PF+"/Birthday.png"} alt="" className='birthdayImg' />
          <span><b>Utkarsh</b> and <b>3</b> other friends have birthdays today</span>
        </div>


          <img src = {PF+"/nature.jpg"}
          alt = 'advertisement'
          className = 'rightbarAd' />
          <h4 className='rightbarTitle'>All Users</h4> {
              usersall.map(u => (
                  <Online key = {u.id} user = {u}/>
              ))
          } 
          </>
      )
  }
  const ProfileRightBar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
       <h4 className="rightbarTitle"><b>User information</b></h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
             {(() => {
                switch (currentUser.relationship) {
          case 1 :   return "Single";
          case 2: return "In relationship";
          case 3:  return "Married";
          default:      return "We don't know!!";
        }
      })()}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle"><b>User friends</b></h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/"+friend.username}>
            <div className="rightbarFollowing">
            <img
              src={friend.profilePicture? PF+friend.profilePicture : PF+'no_avatar/image_proxy.jpeg'}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
          </Link>
            )
          )}
          
          
        </div>
      </>
      )
  }

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightBar/>:<HomeRightBar/>}
      </div>
          
    </div>

    )
}