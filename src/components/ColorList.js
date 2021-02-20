import React, { useState } from 'react';
// import axios from 'axios';
import axiosWithAuth from '../helpers/axiosWithAuth';
import EditMenu from './EditMenu';
// import { useParams, useHistory } from 'react-router-dom';

const initialColor = {
	color: '',
	code: { hex: '' },
	id: '',
};

const ColorList = ({ colors, updateColors, getColorList }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	// const { id } = useParams();
	// const history = useHistory();

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.put(
				`http://localhost:5000/api/colors/${colorToEdit.id}`,
				colorToEdit
			)
			.then((res) => {
				// updateColors();
				getColorList();
				// history.push('/colors');

				// return colors;
			})
			.catch((err) =>
				console.error(`unable to edit color: ${colorToEdit}`)
			);
	};

	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${color.id}`)
			.then((res) => {
				// updateColors();
				getColorList();
				// history.push('/colors');
				// return colors;
			});
	};
	console.log('colorList =====> ', colors);
	return (
		<div className="colors-wrap">
			<p>colors</p>
			<ul>
				{colors.map((color) => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className="delete"
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className="color-box"
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
			</ul>
			{editing && (
				<EditMenu
					colorToEdit={colorToEdit}
					saveEdit={saveEdit}
					setColorToEdit={setColorToEdit}
					setEditing={setEditing}
				/>
			)}
		</div>
	);
};

export default ColorList;

// * Task List:
// * 1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
// * 2. Complete the deleteColor functions by making a delete request for deleting colors.
