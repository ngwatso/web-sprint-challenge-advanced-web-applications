import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axiosWithAuth from '../helpers/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);

	useEffect(() => {
		getColorList();
	}, []);

	const getColorList = () => {
		axiosWithAuth()
			.get('http://localhost:5000/api/colors')
			.then((res) => {
				console.log('BubblePage.js: colors =====> ', res.data);
				setColorList(res.data);
			})
			.catch((err) =>
				console.error('unable to get color data ', err.message)
			);
	};

	return (
		<>
			<ColorList
				data-testId="test-2"
				colors={colorList}
				updateColors={setColorList}
				getColorList={getColorList}
			/>
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;

// * Task List:
// * 1. Make an axios call to retrieve all color data and push to state on mounting.
