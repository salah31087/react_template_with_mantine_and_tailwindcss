import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthProvider.jsx';
import App from './App.jsx'
import '@mantine/core/styles.css';
import './index.css'

const theme = createTheme({
  fontFamily: 'inter, sans-serif',
  primaryColor: 'grape',
  fontSmoothing: true,
  colors: {
    dark: [
      '#dbdbdb',
      '#29262a',
      '#242021',
      '#1f1b1c',
      '#1a1717',
      '#151414',
      '#121212',
      '#0f0d0e',
      '#0c0b0c',
      '#110f12',
    ],
  },
});


createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme} defaultColorScheme='dark'>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MantineProvider>,
)
