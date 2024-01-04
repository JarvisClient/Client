import { IconProps } from "@/Interfaces/IIconProps";
import React from "react";


// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Search
export const IcoSearch = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill="none">
		<rect width="256" height="256" fill="none" />
		<circle cx="112" cy="112" r="80" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width={size} />
		<line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width={size} />
	</svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoBook = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill="none">
		<rect width="256" height="256" fill="none" />
		<path d="M48,208a24,24,0,0,1,24-24H208V32H72A24,24,0,0,0,48,56Z" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width={size} />
		<polyline points="48 208 48 224 192 224" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width={size} />	</svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoConsole = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill="none">
		<rect width="256" height="256" fill="none" /><polyline points="80 96 120 128 80 160" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width={size} />
		<line x1="144" y1="160" x2="176" y2="160" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width={size} />
		<rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width={size} />	</svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoGlobe = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212ZM163.27,77l-56,24a12,12,0,0,0-6.3,6.3l-24,56A12,12,0,0,0,92.73,179l56-24a12,12,0,0,0,6.3-6.3l24-56A12,12,0,0,0,163.27,77Zm-28.41,57.89-24,10.29,10.29-24,24-10.29Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoPinFilled = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill={color}>
		<path d="M235.33,104l-53.47,53.65c4.56,12.67,6.45,33.89-13.19,60A15.93,15.93,0,0,1,157,224c-.38,0-.75,0-1.13,0a16,16,0,0,1-11.32-4.69L96.29,171,53.66,213.66a8,8,0,0,1-11.32-11.32L85,159.71l-48.3-48.3A16,16,0,0,1,38,87.63c25.42-20.51,49.75-16.48,60.4-13.14L152,20.7a16,16,0,0,1,22.63,0l60.69,60.68A16,16,0,0,1,235.33,104Z">
		</path>
	</svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoPin = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill={color}>
		<path d="M238.15,78.54,177.46,17.86a20,20,0,0,0-28.3,0L97.2,70c-12.43-3.33-36.68-5.72-61.74,14.5a20,20,0,0,0-1.6,29.73l45.46,45.47-39.8,39.8a12,12,0,0,0,17,17l39.8-39.81,45.47,45.46A20,20,0,0,0,155.91,228c.46,0,.93,0,1.4-.05A20,20,0,0,0,171.87,220c4.69-6.23,11-16.13,14.44-28s3.45-22.88.16-33.4l51.7-51.87A20,20,0,0,0,238.15,78.54Zm-74.26,68.79a12,12,0,0,0-2.23,13.84c3.43,6.86,6.9,21-6.28,40.65L54.08,100.53c21.09-14.59,39.53-6.64,41-6a11.67,11.67,0,0,0,13.81-2.29l54.43-54.61,55,55Z">
		</path>
	</svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoUnpin = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill={color}>
		<path d="M56.88,31.93A12,12,0,1,0,39.12,48.07L60,71A76,76,0,0,0,35.46,84.51a20,20,0,0,0-1.6,29.73l45.46,45.47-39.8,39.8a12,12,0,0,0,17,17l39.8-39.81,45.47,45.46A20,20,0,0,0,155.9,228c.47,0,.94,0,1.41-.05A20,20,0,0,0,171.87,220a97.47,97.47,0,0,0,9.54-15.46l17.72,19.49a12,12,0,1,0,17.76-16.14Zm98.49,169.88L54.08,100.52C62,95,70.31,92.12,78.91,91.83l84.51,93A62,62,0,0,1,155.37,201.81Zm82.78-95-39,39.11a12,12,0,1,1-17-16.95l36.19-36.3-55-55L130.59,70.5a12,12,0,0,1-17-16.94l35.57-35.69a20,20,0,0,1,28.3,0l60.69,60.68A20,20,0,0,1,238.15,106.83Z">
		</path>
	</svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoWindow = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M220,32H76A20,20,0,0,0,56,52V72H36A20,20,0,0,0,16,92V204a20,20,0,0,0,20,20H180a20,20,0,0,0,20-20V184h20a20,20,0,0,0,20-20V52A20,20,0,0,0,220,32ZM176,96v16H40V96Zm0,104H40V136H176Zm40-40H200V92a20,20,0,0,0-20-20H80V56H216Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoArrowTriangleRight = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoTestTube = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M237.66,86.34l-60-60a8,8,0,0,0-11.32,0L37.11,155.57a44.77,44.77,0,0,0,63.32,63.32L212.32,107l22.21-7.4a8,8,0,0,0,3.13-13.25Zm-32.19,6.07a8,8,0,0,0-3.13,1.93l-39.57,39.57c-8.47,2.9-21.75,4-39.07-5-10.6-5.54-20.18-8-28.56-8.73L172,43.31,217.19,88.5Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoBell = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M225.29,165.93C216.61,151,212,129.57,212,104a84,84,0,0,0-168,0c0,25.58-4.59,47-13.27,61.93A20.08,20.08,0,0,0,30.66,186,19.77,19.77,0,0,0,48,196H84.18a44,44,0,0,0,87.64,0H208a19.77,19.77,0,0,0,17.31-10A20.08,20.08,0,0,0,225.29,165.93ZM128,212a20,20,0,0,1-19.6-16h39.2A20,20,0,0,1,128,212ZM54.66,172C63.51,154,68,131.14,68,104a60,60,0,0,1,120,0c0,27.13,4.48,50,13.33,68Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoBellFilled = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoCover = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M224,152v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H208A16,16,0,0,1,224,152ZM208,48H48A16,16,0,0,0,32,64v40a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V64A16,16,0,0,0,208,48Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Popup
export const IcoSuccess = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M176.49,95.51a12,12,0,0,1,0,17l-56,56a12,12,0,0,1-17,0l-24-24a12,12,0,1,1,17-17L112,143l47.51-47.52A12,12,0,0,1,176.49,95.51ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Popup
export const IcoError = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoStop = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M216,55.27V200.73A15.29,15.29,0,0,1,200.73,216H55.27A15.29,15.29,0,0,1,40,200.73V55.27A15.29,15.29,0,0,1,55.27,40H200.73A15.29,15.29,0,0,1,216,55.27Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoSettings = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoSliders = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M40,92H70.06a36,36,0,0,0,67.88,0H216a12,12,0,0,0,0-24H137.94a36,36,0,0,0-67.88,0H40a12,12,0,0,0,0,24Zm64-24A12,12,0,1,1,92,80,12,12,0,0,1,104,68Zm112,96H201.94a36,36,0,0,0-67.88,0H40a12,12,0,0,0,0,24h94.06a36,36,0,0,0,67.88,0H216a12,12,0,0,0,0-24Zm-48,24a12,12,0,1,1,12-12A12,12,0,0,1,168,188Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Project Swticher
export const IcoFavorite = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M178,28c-20.09,0-37.92,7.93-50,21.56C115.92,35.93,98.09,28,78,28A66.08,66.08,0,0,0,12,94c0,72.34,105.81,130.14,110.31,132.57a12,12,0,0,0,11.38,0C138.19,224.14,244,166.34,244,94A66.08,66.08,0,0,0,178,28Zm-5.49,142.36A328.69,328.69,0,0,1,128,202.16a328.69,328.69,0,0,1-44.51-31.8C61.82,151.77,36,123.42,36,94A42,42,0,0,1,78,52c17.8,0,32.7,9.4,38.89,24.54a12,12,0,0,0,22.22,0C145.3,61.4,160.2,52,178,52a42,42,0,0,1,42,42C220,123.42,194.18,151.77,172.51,170.36Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Project Swticher
export const IcoFavoriteFilled = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Project Swticher, (Project) Status View
export const IcotInformation = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Console View
export const IcoFile = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M216.49,79.52l-56-56A12,12,0,0,0,152,20H56A20,20,0,0,0,36,40V216a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V88A12,12,0,0,0,216.49,79.52ZM160,57l23,23H160ZM60,212V44h76V92a12,12,0,0,0,12,12h48V212Zm112-80a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,132Zm0,40a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,172Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Console View
export const IcoDownload = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,176H52V52H204ZM87.51,144.49a12,12,0,1,1,17-17L116,139V88a12,12,0,0,1,24,0v51l11.51-11.52a12,12,0,1,1,17,17l-32,32a12,12,0,0,1-17,0Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Console View
export const IcoLinear = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M128,96a32,32,0,1,0,32,32A32,32,0,0,0,128,96Zm0,40a8,8,0,1,1,8-8A8,8,0,0,1,128,136Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Console View
export const IcoArrowDown = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M235.09,131.41A12,12,0,0,0,224,124H188v-4a12,12,0,0,0-12-12H80a12,12,0,0,0-12,12v4H32a12,12,0,0,0-8.49,20.49l96,96a12,12,0,0,0,17,0l96-96A12,12,0,0,0,235.09,131.41ZM128,215,61,148H80a12,12,0,0,0,12-12v-4h72v4a12,12,0,0,0,12,12h19ZM68,40A12,12,0,0,1,80,28h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,40Zm0,40A12,12,0,0,1,80,68h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,80Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Symbol for Artifacts
export const IcoCube = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M225.6,62.64l-88-48.17a19.91,19.91,0,0,0-19.2,0l-88,48.17A20,20,0,0,0,20,80.19v95.62a20,20,0,0,0,10.4,17.55l88,48.17a19.89,19.89,0,0,0,19.2,0l88-48.17A20,20,0,0,0,236,175.81V80.19A20,20,0,0,0,225.6,62.64ZM128,36.57,200,76,128,115.4,56,76ZM44,96.79l72,39.4v76.67L44,173.44Zm96,116.07V136.19l72-39.4v76.65Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Symbol for Changes
export const IcoCodeBracket = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M71.68,97.22,34.74,128l36.94,30.78a12,12,0,1,1-15.36,18.44l-48-40a12,12,0,0,1,0-18.44l48-40A12,12,0,0,1,71.68,97.22Zm176,21.56-48-40a12,12,0,1,0-15.36,18.44L221.26,128l-36.94,30.78a12,12,0,1,0,15.36,18.44l48-40a12,12,0,0,0,0-18.44ZM164.1,28.72a12,12,0,0,0-15.38,7.18l-64,176a12,12,0,0,0,7.18,15.37A11.79,11.79,0,0,0,96,228a12,12,0,0,0,11.28-7.9l64-176A12,12,0,0,0,164.1,28.72Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Symbol for "Started by"
export const IcoPerson = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M234.38,210a123.36,123.36,0,0,0-60.78-53.23,76,76,0,1,0-91.2,0A123.36,123.36,0,0,0,21.62,210a12,12,0,1,0,20.77,12c18.12-31.32,50.12-50,85.61-50s67.49,18.69,85.61,50a12,12,0,0,0,20.77-12ZM76,96a52,52,0,1,1,52,52A52.06,52.06,0,0,1,76,96Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Test Results View
export const IcoSkip = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm64-84a12,12,0,0,1-4.63,9.47l-36,28A12,12,0,0,1,132,156V136.92c-.21.19-.41.38-.63.55l-36,28A12,12,0,0,1,76,156V100a12,12,0,0,1,19.37-9.47l36,28c.22.17.42.36.63.55V100a12,12,0,0,1,19.37-9.47l36,28A12,12,0,0,1,192,128Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Test Results View
export const IcoHash = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M224,84H180.2l7.61-41.85a12,12,0,0,0-23.62-4.3L155.8,84H116.2l7.61-41.85a12,12,0,1,0-23.62-4.3L91.8,84H48a12,12,0,0,0,0,24H87.44l-7.27,40H32a12,12,0,0,0,0,24H75.8l-7.61,41.85a12,12,0,0,0,9.66,14A11.43,11.43,0,0,0,80,228a12,12,0,0,0,11.8-9.86L100.2,172h39.6l-7.61,41.85a12,12,0,0,0,9.66,14,11.43,11.43,0,0,0,2.16.2,12,12,0,0,0,11.8-9.86L164.2,172H208a12,12,0,0,0,0-24H168.56l7.27-40H224a12,12,0,0,0,0-24Zm-79.83,64H104.56l7.27-40h39.61Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Params View
export const IcoCross = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Params View
export const IcoBool = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M176,52H80a76,76,0,0,0,0,152h96a76,76,0,0,0,0-152Zm0,128H80A52,52,0,0,1,80,76h96a52,52,0,0,1,0,104Zm0-88a36,36,0,1,0,36,36A36,36,0,0,0,176,92Zm0,48a12,12,0,1,1,12-12A12,12,0,0,1,176,140Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Params View
export const IcoCheckbox = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M79.51,144.49a12,12,0,1,1,17-17L112,143l47.51-47.52a12,12,0,0,1,17,17l-56,56a12,12,0,0,1-17,0ZM228,48V208a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28H208A20,20,0,0,1,228,48Zm-24,4H52V204H204Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Params View
export const IcoText = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M216,36H40A20,20,0,0,0,20,56V200a20,20,0,0,0,20,20H216a20,20,0,0,0,20-20V56A20,20,0,0,0,216,36Zm-4,160H44V60H212ZM68,92A12,12,0,0,1,80,80h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,92Zm0,36a12,12,0,0,1,12-12h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,128Zm0,36a12,12,0,0,1,12-12h96a12,12,0,0,1,0,24H80A12,12,0,0,1,68,164Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Params View
export const IcoQuote = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M90.86,50.89a12,12,0,0,0-21.72,0l-64,136a12,12,0,0,0,21.71,10.22L42.44,164h75.12l15.58,33.11a12,12,0,0,0,21.72-10.22ZM53.74,140,80,84.18,106.27,140ZM200,92c-13.85,0-24.77,3.86-32.45,11.48a12,12,0,1,0,16.9,17c3-3,8.26-4.52,15.55-4.52,9.34,0,17.19,5.16,19.37,12.1A47.32,47.32,0,0,0,200,124c-24.26,0-44,17.94-44,40s19.74,40,44,40a47.18,47.18,0,0,0,22-5.38A12,12,0,0,0,244,192V132C244,109.94,224.26,92,200,92Zm0,88c-11,0-20-7.18-20-16s9-16,20-16,20,7.18,20,16S211,180,200,180Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Params View
export const IcoQuestionmark = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z"></path></svg>
);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Params View
export const IcoPasskey = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M48,56V200a12,12,0,0,1-24,0V56a12,12,0,0,1,24,0Zm82.73,50.7L116,111.48V96a12,12,0,0,0-24,0v15.48L77.27,106.7a12,12,0,1,0-7.41,22.82l14.72,4.79-9.1,12.52A12,12,0,1,0,94.9,160.94l9.1-12.52,9.1,12.52a12,12,0,1,0,19.42-14.11l-9.1-12.52,14.72-4.79a12,12,0,1,0-7.41-22.82Zm111.12,7.7a12,12,0,0,0-15.12-7.7L212,111.48V96a12,12,0,0,0-24,0v15.48l-14.73-4.78a12,12,0,1,0-7.41,22.82l14.72,4.79-9.1,12.52a12,12,0,1,0,19.42,14.11l9.1-12.52,9.1,12.52a12,12,0,1,0,19.42-14.11l-9.1-12.52,14.72-4.79A12,12,0,0,0,241.85,114.4Z"></path></svg>
);