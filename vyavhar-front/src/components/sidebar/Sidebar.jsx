import React from 'react'
import './sidebar.css'
import { RssFeed,Message,VideoLibrary,Group,Book,LiveHelp } from '@material-ui/icons'
import { Users } from '../../dummy_data' 
import  CloseFriends from '../closefriends/CloseFriends'


export default function Sidebar() {
	return (
		<div className='sidebar'>
		<div className='sidebarWrapper'>	
			<ul className='sidebarList'>
				<li className='sidebarItem'>
					<RssFeed className='sidebarIcon' />
					<span className='sidebarListItemText'>Feed</span>
				</li>
				<li className='sidebarItem'>
					<Message className='sidebarIcon' />
					<span className='sidebarListItemText'>Messages</span>
				</li>
				<li className='sidebarItem'>
					<VideoLibrary className='sidebarIcon' />
					<span className='sidebarListItemText'>Videos</span>
				</li>
				<li className='sidebarItem'>
					<Group className='sidebarIcon' />
					<span className='sidebarListItemText'>Groups</span>
				</li>
				<li className='sidebarItem'>
					<Book className='sidebarIcon' />
					<span className='sidebarListItemText'>Bookmark</span>
				</li>
				<li className='sidebarItem'>
					<LiveHelp className='sidebarIcon' />
					<span className='sidebarListItemText'>Question</span>
				</li>
			</ul>
			<button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
            {Users.map(u => (
            	<CloseFriends key = {u.id} user={u} />
            	))}
        </ul>
		</div>
		</div>
	)
}