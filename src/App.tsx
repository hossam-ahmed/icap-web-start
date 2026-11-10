import "./App.css";
import { IcapClientProvider } from "@core/IcapClient/IcapClientProvider.tsx";
import { Loader, LoaderProvider } from "@shared/components/Loader";
import { AuthProvider } from "@core/AuthGate/AuthContext.tsx";
import { AuthGate } from "@core/AuthGate/AuthGate.tsx";
import { ICapRouter } from "@core/IcapRouter/ICapRouter.tsx";

function App() {

	return (
		<IcapClientProvider>
			<LoaderProvider>
				<AuthProvider>
					<Loader/>
					<ICapRouter />
					<AuthGate/>
				</AuthProvider>
			</LoaderProvider>
		</IcapClientProvider>
	)
}

export default App;
