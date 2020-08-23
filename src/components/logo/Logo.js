import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
	return (
		<div className='center ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
 				<div className="Tilt-inner">
 					<img style= {{paddingTop: '5px', height: '100%', width: '100%'}} alt='logo-brain' src={brain}/>
 				</div>
			</Tilt>
		</div>
	)
}

export default Logo;