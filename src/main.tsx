import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './i18n.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* Translations load over HTTP; useTranslation() suspends until they arrive. */ }
		<Suspense fallback={ null }>
			<App/>
		</Suspense>
	</StrictMode>
)
