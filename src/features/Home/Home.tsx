import "./Home.css"
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@shared/components/Button";

export const Home = () => {

	const { t } = useTranslation();
	const [count, setCount] = useState(1);

	return (
		<div className='flex flex-col gap-4 p-6'>
			<h1>{ t("home.welcome") }</h1>

			<h2>{ t("home.greeting", { name: "Hossam" }) }</h2>
			<h3>{ t("home.dashboard") }</h3>

			<p>{ t("home.notifications", { count }) }</p>
			<div className='flex gap-2'>
				<Button className='text-white' onClick={ () => setCount(c => c + 1) }>+</Button>
				<Button className='text-white' onClick={ () => setCount(c => Math.max(0, c - 1)) }>−</Button>
			</div>

			<p>
				<Trans i18nKey='home.terms' components={ { bold: <strong/> } }/>
			</p>
		</div>
	)
}
