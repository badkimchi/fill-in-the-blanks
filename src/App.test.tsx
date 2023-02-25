import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {MemoryRouter} from "react-router-dom";

test('renders page', () => {
    render(<MemoryRouter>
        <App/>
    </MemoryRouter>);
    const linkElement = screen.getByText(/Fill In The Blanks/i);
    expect(linkElement).toBeInTheDocument();
});
