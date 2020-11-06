import React from "react";
import './Instruction.css';

const Instruction = () => {
	return (
		<div className='center pa3'>
			<div className='f3 fw9 tc' style={{width: 900}} >
				To use the search bar, please copy a <span style={{color: 'white'}}> face image PNG link </span> from any search engine and paste it in the search bar. After that click 'detect' button for the application to work.
			</div>
		</div>
		)
}

export default Instruction;