import React, { useState } from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';
import EditMenu from './EditMenu';

const initialColor = {
	color: '',
	code: { hex: '' },
	id: '',
};

const ColorList = ({ colors, updateColors, getColorList }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	const saveEdit = (e) => {
		e.preventDefault();
		// ?? Use axiosWithAuth
		axiosWithAuth()
			.put(
				// ?? put - path to colorToEdit.id
				`http://localhost:5000/api/colors/${colorToEdit.id}`,
				colorToEdit
			)
			.then((res) => {
				// ?? call getColorList function
				getColorList();
			})
			.catch((err) =>
				console.error(`unable to edit color: ${colorToEdit}`)
			);
	};

	const deleteColor = (color) => {
		// ?? Use axiosWithAuth
		axiosWithAuth()
			// ?? delete - path to color.id
			.delete(`http://localhost:5000/api/colors/${color.id}`)
			.then((res) => {
				// ?? Call getColorList function
				getColorList();
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
