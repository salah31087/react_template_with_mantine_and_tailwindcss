import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthProvider.jsx';
import App from './App.jsx'
import '@mantine/core/styles.css';
import './index.css'

const theme = createTheme({
  fontFamily: 'inter, sans-serif',
  primaryColor: 'blue',
});

createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme} defaultColorScheme='dark'>
    <AuthProvider>
      <App />
    </AuthProvider>
  </MantineProvider>,
)
