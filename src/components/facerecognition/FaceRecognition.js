import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className='center ma' style={{padding: '10px'}}>
			<div style={{padding: '10px'}} className='absolute mt2 br3 pa20 shadow-1'>
 				<img id='inputimage' alt='Your upload' src={imageUrl} width='100%' height='auto' />
 				<div>
 					{
 						box.map((face, i) => {
 							return (
 								<div className='bounding-box' style={{top: box[i].topRow, right: box[i].rightCol, bottom: box[i].bottomRow, left: box[i].leftCol}}></div>
 							)
 						}
 					)}
				</div>
			</div>
		</div>
	)
}

export default FaceRecognition;