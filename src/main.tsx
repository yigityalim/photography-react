import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./i18n";

const root: HTMLElement = document.getElementById('root')!

ReactDOM.createRoot(root).render(<App />)
