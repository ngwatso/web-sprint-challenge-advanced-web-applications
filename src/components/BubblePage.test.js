import React from 'react';
import { render, screen } from '@testing-library/react';
import BubblePage from './BubblePage';

//  * ========== TEST 1 ========== *  //

test('Renders BubblePage without errors', () => {
	// ?? mockColors
	const mockColors = jest.fn();
	console.log('mockColors =====> ', mockColors.mock.results);

	render(<BubblePage colors={mockColors.mock.results} />);
	// * Finish this test
});

//  * ========== TEST 2 ========== *  //

test('Fetches data and renders the bubbles on mounting', () => {
	const { rerender } = render(<BubblePage colors={{}} />);

	// ?? mockColorData
	const mockColorData = {
		color: 'wowAwesomwColor',
		code: { hex: '#123456' },
		id: '7',
	};

	// ?? rerender
	rerender(<BubblePage colors={mockColorData} />);

	expect(() => screen.getByTestId('test-2').toBeVisible);

	// * Finish this test
});

// * Task List
// * 1. Setup test for basic rendering of component
// * 2. Setup test for initial rendering of bubbles on loading
