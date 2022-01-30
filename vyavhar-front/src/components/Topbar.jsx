import {React,useContext} from 'react'
import './topbar.css'
import { Search,Person,Chat,Notifications } from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Topbar() {
	const {user} = useContext(AuthContext)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER
	return (
		<div>
			<div className='topbarContainer'>	
				<div className='topbarLeft'>
					<Link to="/" style={{textDecoration:'none'}} >
						<span className="logo">Vyahvhar</span>
					</Link>
				</div>
				<div className='topbarCenter'>
					<div className='searchbar'>
						<Search />
						<input placeholder="Searh for Friends or Posts or Videos" className="searchInput"/>
					</div>
				</div>
				<div className="topbarRight">
					<div className="topbarLinks">
						<span className="topbarLink">HomePage</span>
						<span className="topbarLink">Timeline</span>
					</div>
					<div className='topbarIcons'>
						<div className='topbarIconItems'>
							<Person />
							<span className='topbarIconBadge'>1</span>
						</div>
						<div className='topbarIconItems'>
							<Chat />
							<span className='topbarIconBadge'>3</span>
						</div>
						<div className='topbarIconItems'>
							<Notifications />
							<span className='topbarIconBadge'>4</span>
						</div>
					</div>
					<Link to={`profile/${user.username}`}>
					<img src={user.profilePicture ? PF + user.profilePicture : PF+'no_avatar/image_proxy.jpeg'} alt="Dougla" className='topbarImg' />
					</Link>
				</div>
			</div>
			
		</div>
	)
}