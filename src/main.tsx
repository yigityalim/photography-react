import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./i18n";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient: QueryClient = new QueryClient();

const root: HTMLElement = document.getElementById('root')!

ReactDOM.createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
)
