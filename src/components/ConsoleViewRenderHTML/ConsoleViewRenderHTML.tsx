import React from "react";

// react component that takes in a string and returns that string as rendered html
interface Props {
    htmlString: string;
}

const ConsoleViewRenderHTML: React.FC<Props> = ({ htmlString }) => {
	return /*#__PURE__*/React.createElement("pre", {
		dangerouslySetInnerHTML: {
			__html: htmlString
		},
		className: "overflow-auto px-6 py-4 console-custom-scroll"
	});
};

export default ConsoleViewRenderHTML;
