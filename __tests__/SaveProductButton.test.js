import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveProductButton from './SaveProductButton';

describe('SaveProductButton', () => {
    test('renders the Save button', () => {
        render(<SaveProductButton onSave={() => {}} />);
        const saveButton = screen.getByText(/Save/i);
        expect(saveButton).toBeInTheDocument();
    });

    test('calls the onSave function when clicked', () => {
        const mockOnSave = jest.fn(); // Create a mock function
        render(<SaveProductButton onSave={mockOnSave} />);

        const saveButton = screen.getByText(/Save/i);
        fireEvent.click(saveButton);

        expect(mockOnSave).toHaveBeenCalledTimes(1); // Ensure the onSave function is called once
    });
});
