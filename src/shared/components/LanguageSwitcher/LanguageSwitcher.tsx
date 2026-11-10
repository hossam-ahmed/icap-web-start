import { useTranslation } from "react-i18next";
import { type Language, LANGUAGES } from "../../../i18n.ts";

/** Dropdown that switches the app language (persisted in localStorage). */
export const LanguageSwitcher = ({ className }: { className?: string }) => {
	const { t, i18n } = useTranslation();

	return (
		<label className={ `inline-flex items-center gap-2 ${ className ?? "" }` }>
			<span>{ t("language.label") }</span>
			<select
				className='border border-neutral-300 rounded-md px-2 py-1'
				value={ i18n.resolvedLanguage }
				onChange={ e => i18n.changeLanguage(e.target.value) }>
				{ (Object.keys(LANGUAGES) as Language[]).map(code => (
					<option key={ code } value={ code }>{ LANGUAGES[code].label }</option>
				)) }
			</select>
		</label>
	);
};
