import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
	brand: {
		100: '#FF3c00',
	},
	fonts: {
		body: 'Open Sans, sans-serif',
	},
	styles: {
		global: () => ({
			body: {
				bg: 'gray.200',
			},
		}),
	},
	components: {
		// Button
	},
});
