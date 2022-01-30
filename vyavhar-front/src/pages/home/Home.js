import React from 'react'
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feeds from '../../components/feeds/Feeds'
import './home.css'

import {Person} from '@material-ui/icons'
export default function home() {
	return (
		<>
			<Topbar/>
			<div className='homeConatiner'>
				<Sidebar />
				<Feeds />
				<Rightbar/>
			</div>
		</>
	)
}