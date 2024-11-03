import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

test('renders app', () => {
	render(
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
);
	const linkElement = screen.getByText(/All about cakes/i);
	expect(linkElement).toBeInTheDocument();
});
