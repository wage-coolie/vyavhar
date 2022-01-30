
import React from 'react'
import './online.css'
import {Link} from 'react-router-dom'

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
	
	return (
		<div>
			<ul className='rightbarFriendList'>
					<Link to={"/profile/"+user.username}>
						<li className='rightbarFriend'>
							<div className='rightbarProfileImgContainer'>
								<img src={user.profilePicture?PF+user.profilePicture:PF+"no_avatar/image_proxy.jpeg"} className='rightbarProfileImg' alt="" />
								<span className='rightbarOnline'>-</span>
								<span className='rightbarUsername'>{user.username}</span>
							</div>
							
						</li>
						</Link>
					</ul>
		</div>
	)
}