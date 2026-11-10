import "i18next";
import type en from "../public/locales/en/translation.json";

/**
 * Makes `t()` keys type-safe and auto-completed, using the English file as the
 * source of truth. Add every new key to `en/translation.json` first.
 */
declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: "translation";
		resources: {
			translation: typeof en;
		};
	}
}
