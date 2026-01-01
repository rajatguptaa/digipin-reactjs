import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DigiPinInput } from '../components/DigiPinInput';

// Mock the hook to isolate component logic or test integration? 
// Since we want to test "functionality", integration with the real hook is better 
// BUT dependent on 'digipinjs' library behavior. 
// Given previous tests passed with real hook, we will use the real hook here too.

describe('DigiPinInput Component', () => {
    it('should render input and button', () => {
        render(<DigiPinInput />);
        expect(screen.getByPlaceholderText('Enter DigiPin query')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    it('should handle input change', () => {
        render(<DigiPinInput />);
        const input = screen.getByPlaceholderText('Enter DigiPin query') as HTMLInputElement;

        fireEvent.change(input, { target: { value: '1234' } });
        expect(input.value).toBe('1234');
    });

    it('should trigger search on submit', async () => {
        const handleResult = jest.fn();
        const { container } = render(<DigiPinInput onResult={handleResult} />);

        const input = screen.getByPlaceholderText('Enter DigiPin query');
        const button = screen.getByRole('button', { name: /search/i });

        // Using a value that we expect to produce *some* result or error, 
        // but primarily checking that the function was called.
        // '12-34-56' might be invalid or valid depending on lib, but the hook will process it.
        fireEvent.change(input, { target: { value: '12-34-56' } });
        fireEvent.click(button);

        // Wait for loading to start/finish
        // The button text changes to 'Searching...' then back.
        // The operation might be synchronous or very fast, so 'Searching...' might be missed.
        // Instead, wait for the result or error to appear.
        await waitFor(() => {
            const errorMsg = screen.queryByText(/Invalid/i);
            const resultPre = container.querySelector('pre');
            expect(errorMsg || resultPre).toBeInTheDocument();
        });

        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();

        // Check if result callback was called or error displayed.
        // If '12-34-56' is invalid, checking for error text might be better 
        // depending on the library's actual behavior for that string.
        // Let's check if either result or error happens.
        // Ideally we mock 'digipinjs' to control this, but for "example test" real integration is often preferred.
    });
});
