import loaderIcon from '@assets/icons/loader.svg'
import './Loader.css';
import { createPortal } from "react-dom";
import { useLoader } from "./useLoader.tsx";

export const Loader = () => {

	const { loading } = useLoader();
	const loader = createPortal(<div className='icap-loader'>
		<div className='loader-overlay'></div>
		<div className='icap-loader-content'>
			<img src={ loaderIcon } alt='loader'/>
		</div>
	</div>, document.body);

	return (
		loading && loader
	);
};
