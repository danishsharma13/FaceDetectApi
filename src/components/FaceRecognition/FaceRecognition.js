import React from "react";
import FaceBox  from './FaceBox';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	const faceArr = box.map((user,i) => <FaceBox key={i} box={ box[i] } />);
	return (
		<div className='center'>
			<div className='absolute mt2'>
				<img id="inputImg" alt='' src={imageUrl} width="500px" heigh='auto' />
				<div> {faceArr} </div>
			</div>
		</div>
	);
}

export default FaceRecognition;