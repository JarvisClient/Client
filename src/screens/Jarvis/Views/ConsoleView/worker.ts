import { IStylingDict } from "../../../../Interfaces/StylingDict";
import Logger from "../../../../helpers/Logger";

self.addEventListener("message", (e) => {
	const { data, stylingDict } = e.data;

	const applyStyles = (text: string, styles: string[]) => styles.reduce((result, style) => `<span class="${style}">${result}</span>`, text);

	// Modified function to apply styles
	const applyStyledText = (text: string, stylingDict: IStylingDict) => {
		try {
			let styledText: string = text;

			for (const key in stylingDict) {
				if (stylingDict.hasOwnProperty(key)) {
					const styles = stylingDict[key];
					const regex = new RegExp(`(?<!<[^>]*)${key}(?![^<]*>)`, "g");

					styledText = styledText.replace(regex, (match: string) => applyStyles(match, styles));
				}
			}

			self.postMessage(styledText);
		} catch (error) {
			Logger.error(error);
			return text;
		}
	};
	applyStyledText(data, stylingDict);
});
