import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import { mockProduct } from './testData'; // Import mock data

jest.mock('axios'); // Mock axios for testing

describe('ProductForm', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({ data: [] }); // Mock empty categories for simplicity
    });

    test('handles form submission with API error', async () => {
        axios.post.mockRejectedValueOnce(new Error('API Error')); // Mock API error

        render(<ProductForm />);
        
        // Simulate user input
        fireEvent.change(screen.getByLabelText(/Product name/i), { target: { value: mockProduct.title } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: mockProduct.description } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: mockProduct.price } });
        
        // Submit the form
        fireEvent.click(screen.getByText(/Save/i));
        
        // Wait for asynchronous actions to complete
        await waitFor(() => {
            // Assert error message is displayed
            expect(screen.getByText(/An error occurred while saving the product./i)).toBeInTheDocument();
            
            // Assert that the error message is visible and red
            const errorMessage = screen.getByText(/An error occurred while saving the product./i);
            expect(errorMessage).toBeInTheDocument();
            expect(errorMessage).toHaveStyle('color: red');
        });
    });

    test('removes error message after correcting form and resubmitting', async () => {
        axios.post.mockRejectedValueOnce(new Error('API Error')); // Mock API error

        render(<ProductForm />);
        
        // Simulate user input
        fireEvent.change(screen.getByLabelText(/Product name/i), { target: { value: mockProduct.title } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: mockProduct.description } });
        fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: mockProduct.price } });
        
        // Submit the form
        fireEvent.click(screen.getByText(/Save/i));
        
        // Wait for asynchronous actions to complete
        await waitFor(() => {
            // Assert error message is displayed
            expect(screen.getByText(/An error occurred while saving the product./i)).toBeInTheDocument();
            
            // Correct the form input
            fireEvent.change(screen.getByLabelText(/Product name/i), { target: { value: 'Corrected Product Name' } });
            
            // Resubmit the form
            fireEvent.click(screen.getByText(/Save/i));
        });
        
        // Wait for asynchronous actions to complete
        await waitFor(() => {
            // Assert error message is no longer displayed
            expect(screen.queryByText(/An error occurred while saving the product./i)).toBeNull();
        });
    });
    
    // ... add more test cases for different error scenarios
});
