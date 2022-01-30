import { React, useState , useEffect,useContext } from 'react'
import './feeds.css'
import Share from '../share/Share'
import { AuthContext } from '../../context/AuthContext'

import Post from '../post/Post'
import axios from 'axios'
// import { Posts } from '../../dummy_data' 

export default function Feeds({username}) {
	const [post,setPost] = useState([]); 
	const { user }= useContext(AuthContext)
	// fetching post of a user , either it can be profile or main timeline of logged in user
	useEffect(() => {
		const fetchPosts = async () => {
			const res = username 
			? await axios.get("/posts/profile/"+username)
			: await axios.get("/posts/timeline/"+user._id);
			setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }))
		}
		fetchPosts();
	},[username,user._id])

	

	return (
		<div className='feeds'>
			< div className='feedWrapper'>
				{(!username || username === user.username) && <Share />}
				{post.map((p) => (
					<Post key={p._id} post={p} />
				))}
				
			</div>
		</div>
	)
}