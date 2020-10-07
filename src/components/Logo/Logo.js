import React from "react";
import Tilt from 'react-tilt';
import face from "./faceicon.png"

const Logo = () => {
	return (
		<div>
			<div className='center ma4 mt0'>
				<Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
	 				<div className="Tilt-inner pa2"> <img src={face} alt="reload"></img></div>
				</Tilt>
			</div>
			<p className='f3 center'> 
				Face Detection App
			</p>
		</div>
	);
}

export default Logo;