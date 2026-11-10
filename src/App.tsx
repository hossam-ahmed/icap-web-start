import "./App.css";
import { useEffect } from "react";
import { IcapClientProvider } from "@core/IcapClient/IcapClientProvider.tsx";
import { Loader, LoaderProvider } from "@shared/components/Loader";
import { AuthProvider } from "@core/AuthGate/AuthContext.tsx";
import { AuthGate } from "@core/AuthGate/AuthGate.tsx";
import { ICapRouter } from "@core/IcapRouter/ICapRouter.tsx";
import { useTranslation } from "react-i18next";

function App() {

	// Example: translate outside of JSX — re-runs whenever the language changes.
	const { t, i18n } = useTranslation();

	useEffect(() => {
		document.title = t("app.title");
	}, [t, i18n.resolvedLanguage]);

	return (
		<IcapClientProvider>
			<LoaderProvider>
				<AuthProvider>
					<Loader/>
					<ICapRouter/>
					<AuthGate/>
				</AuthProvider>
			</LoaderProvider>
		</IcapClientProvider>
	)
}

export default App;
