import type { ComponentProps, CSSProperties } from "react";
import type { ICapIconName } from "@core/models/icap-icons.generated.models.ts";

const assetUrls: Record<string, string> = Object.fromEntries(
	Object.entries(
		import.meta.glob<string>("/src/assets/**/*.{svg,png,jpg,jpeg,webp,gif}", {
			eager: true,
			query: "?url",
			import: "default"
		})
	).map(([path, url]) => [path.replace("/src/assets/", ""), url])
);

export type IcapIconProps = Omit<ComponentProps<"span">, "color"> & {
	/** Icon file name (without extension) inside `parentPath`. */
	icon: ICapIconName;
	/** When true, no icon styling is applied — renders a plain span. */
	keepDefault?: boolean;
	/** Folder under `src/assets` that holds the icon. */
	parentPath?: string;
	/** Icon file extension. */
	extension?: string;
	/** Applied to both width and height. */
	size?: string;
	/**
	 * Tint color (`#rgb`, `#rrggbb`, `rgb(...)`, CSS var, ...).
	 * Defaults to `currentColor`, so the icon follows the parent's text color.
	 */
	color?: string;
};

/**
 * Renders an icon as a `<span>` painted with `color` and clipped to the icon's
 * shape via CSS mask — gives a pixel-exact tint regardless of the source colors.
 */
export const IcapIcon = ({
	icon,
	keepDefault = false,
	parentPath = "icons",
	extension = "svg",
	size = "24px",
	color,
	style,
	...props
}: IcapIconProps) => {
	const decorative = !props["aria-label"] && !props["aria-labelledby"];

	if (keepDefault) {
		return <span style={ style } aria-hidden={ decorative || undefined } { ...props } />;
	}

	const assetPath = `${ parentPath }/${ icon }.${ extension }`;
	const url = assetUrls[assetPath];
	if (!url && import.meta.env.DEV) {
		console.warn(`[IcapIcon] Asset not found: src/assets/${ assetPath }`);
	}

	const mask = url ? `url("${ url }") no-repeat center / contain` : undefined;
	const iconStyle: CSSProperties = {
		display        : "inline-block",
		flexShrink     : 0,
		width          : size,
		height         : size,
		backgroundColor: color ?? "currentColor",
		mask,
		WebkitMask     : mask,
		...style
	};

	return (
		<span
			role={ decorative ? undefined : "img" }
			aria-hidden={ decorative || undefined }
			style={ iconStyle }
			{ ...props }
		/>
	);
};
