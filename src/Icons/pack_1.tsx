import { IconProps } from "@/Interfaces/IIconProps";
import React from "react";


// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Search
export const IcoSearch = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill="none">
		<rect width="256" height="256" fill="none" />
		<circle cx="112" cy="112" r="80" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={size} />
		<line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={size} />
	</svg>
);

// Icon Pack: Jarvis
// License: MIT - Copyright (c) 2024 JNSAPH
// Used in: Feature Buttons
export const IcoBook = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
		<path fillRule="evenodd" clipRule="evenodd" d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM6.7619 6.71429C6.20962 6.71429 5.7619 7.162 5.7619 7.71429C5.7619 8.26657 6.20962 8.71429 6.7619 8.71429H17.2381C17.7904 8.71429 18.2381 8.26657 18.2381 7.71429C18.2381 7.162 17.7904 6.71429 17.2381 6.71429H6.7619ZM5.7619 12.4762C5.7619 11.9239 6.20962 11.4762 6.7619 11.4762H17.2381C17.7904 11.4762 18.2381 11.9239 18.2381 12.4762C18.2381 13.0285 17.7904 13.4762 17.2381 13.4762H6.7619C6.20962 13.4762 5.7619 13.0285 5.7619 12.4762ZM6.7619 16.2381C6.20962 16.2381 5.7619 16.6858 5.7619 17.2381C5.7619 17.7904 6.20962 18.2381 6.7619 18.2381H13.4286C13.9809 18.2381 14.4286 17.7904 14.4286 17.2381C14.4286 16.6858 13.9809 16.2381 13.4286 16.2381H6.7619Z" fill={color}/>
	</svg>



);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoConsole = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 256 256" fill={color}>
		<path d="M120,137,48,201A12,12,0,1,1,32,183l61.91-55L32,73A12,12,0,1,1,48,55l72,64A12,12,0,0,1,120,137Zm96,43H120a12,12,0,0,0,0,24h96a12,12,0,0,0,0-24Z">
		</path>
	</svg>
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
	<svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
		<path d="M22.0622 9.75L17.4965 14.3311C17.2235 14.605 17.142 15.0101 17.2235 15.3881C17.4833 16.5948 17.3688 18.3361 15.8128 20.4047C15.684 20.5768 15.5196 20.7191 15.3308 20.8218C15.142 20.9246 14.9332 20.9854 14.7188 21C14.6831 21 14.6484 21 14.6128 21C14.4157 21 14.2205 20.9612 14.0384 20.8858C13.8563 20.8103 13.6909 20.6997 13.5516 20.5603L9.73455 16.7393C9.34399 16.3484 8.71035 16.3483 8.31972 16.7392L5.03063 20.0306C4.8899 20.1714 4.69903 20.2504 4.50001 20.2504C4.30098 20.2504 4.11011 20.1714 3.96938 20.0306C3.82865 19.8899 3.74959 19.699 3.74959 19.5C3.74959 19.301 3.82865 19.1101 3.96938 18.9694L7.26115 15.6799C7.65191 15.2894 7.65202 14.6561 7.2614 14.2655L3.44063 10.4447C3.29179 10.2957 3.17601 10.117 3.10081 9.92022C3.02561 9.72348 2.99269 9.51311 3.00419 9.30281C3.01569 9.0925 3.07134 8.88697 3.16754 8.6996C3.26373 8.51223 3.39831 8.34722 3.56251 8.21531C5.55584 6.607 7.47769 6.60826 8.63732 6.83495C9.00338 6.9065 9.39017 6.81768 9.65344 6.55348L14.25 1.94062C14.3893 1.8013 14.5547 1.69078 14.7367 1.61537C14.9187 1.53997 15.1138 1.50116 15.3108 1.50116C15.5078 1.50116 15.7029 1.53997 15.8849 1.61537C16.0669 1.69078 16.2323 1.8013 16.3716 1.94062L22.0613 7.62937C22.3425 7.91052 22.5005 8.29183 22.5007 8.68949C22.5009 9.08714 22.3432 9.4686 22.0622 9.75Z" fill={color}/>
	</svg>

);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoPin = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color}>
		<path d="M22.3266 7.36311L16.6369 1.67436C16.4627 1.50003 16.256 1.36173 16.0283 1.26738C15.8007 1.17302 15.5567 1.12445 15.3103 1.12445C15.0639 1.12445 14.8199 1.17302 14.5923 1.26738C14.3647 1.36173 14.1579 1.50003 13.9838 1.67436L9.52084 6.15274C9.26823 6.40623 8.90093 6.49928 8.54802 6.43997C7.29584 6.22955 5.338 6.29714 3.32438 7.92186C3.11922 8.08693 2.95112 8.29335 2.83104 8.52769C2.71096 8.76204 2.64159 9.01905 2.62743 9.28199C2.61328 9.54492 2.65467 9.80789 2.74891 10.0538C2.84315 10.2997 2.98812 10.5229 3.17438 10.7091L6.7293 14.2648C7.11975 14.6553 7.11972 15.2884 6.72922 15.6789L3.705 18.7031C3.49366 18.9145 3.37493 19.2011 3.37493 19.5C3.37493 19.7989 3.49366 20.0855 3.705 20.2969C3.91635 20.5082 4.20299 20.6269 4.50188 20.6269C4.80076 20.6269 5.08741 20.5082 5.29875 20.2969L8.32297 17.2719C8.71345 16.8813 9.34663 16.8812 9.7372 17.2717L13.2928 20.8266C13.6441 21.1774 14.1201 21.3746 14.6166 21.375C14.6597 21.375 14.7038 21.375 14.7478 21.3703C15.0154 21.351 15.2758 21.2744 15.5112 21.1458C15.7467 21.0173 15.9519 20.8396 16.1128 20.625C16.5525 20.0409 17.1441 19.1128 17.4666 18C17.7258 17.1054 17.7773 16.263 17.6273 15.4546C17.5595 15.0894 17.6458 14.704 17.908 14.4409L22.3284 10.0059C22.6771 9.65441 22.8726 9.17925 22.8723 8.68413C22.8719 8.18901 22.6757 7.71413 22.3266 7.36311ZM15.3647 13.8122C15.1982 13.9792 15.0885 14.1944 15.051 14.4272C15.0135 14.6601 15.0501 14.8988 15.1556 15.1097C15.4111 15.6206 15.669 16.5624 15.1445 17.8518C14.9071 18.4353 14.1522 18.506 13.7068 18.0606L5.91765 10.2722C5.47635 9.83098 5.54303 9.08447 6.1279 8.8668C7.62955 8.30796 8.8013 8.81322 8.91375 8.86218C9.12375 8.97121 9.36344 9.00922 9.59686 8.97051C9.83029 8.9318 10.0449 8.81846 10.2084 8.64749L14.6041 4.23724C14.9945 3.84562 15.6285 3.8451 16.0195 4.23608L19.7621 7.97869C20.152 8.36853 20.1528 9.00035 19.7639 9.39115L15.3647 13.8122Z" fill={color}/>
	</svg>

);

// Icon Pack: Phosphor Icons
// License: MIT - Copyright (c) 2023 Phosphor Icons
// Used in: Feature Buttons
export const IcoWindow = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 256 256"><path d="M220,32H76A20,20,0,0,0,56,52V72H36A20,20,0,0,0,16,92V204a20,20,0,0,0,20,20H180a20,20,0,0,0,20-20V184h20a20,20,0,0,0,20-20V52A20,20,0,0,0,220,32ZM176,96v16H40V96Zm0,104H40V136H176Zm40-40H200V92a20,20,0,0,0-20-20H80V56H216Z"></path></svg>
);

// Icon Pack: Jarvis
// License: MIT - Copyright (c) 2024 JNSAPH
// Used in: Feature Buttons
export const IcoArrowTriangleRight = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill={color} viewBox="0 0 24 24">
		<g clipPath="url(#clip0_655_73)">
			<path d="M19.6039 8.81427C21.8216 9.91805 21.8216 13.082 19.6039 14.1857L7.58673 20.1669C5.59236 21.1595 3.25 19.7089 3.25 17.4811L3.25 5.51887C3.25 3.29112 5.59235 1.84051 7.58673 2.83314L19.6039 8.81427Z" fill={color} />
		</g>
		<defs>
			<clipPath id="clip0_655_73">
				<rect width="24" height="24" fill={color} />
			</clipPath>
		</defs>
	</svg>
);

// Icon Pack: Jarvis
// License: MIT - Copyright (c) 2024 JNSAPH
// Used in: Feature Buttons
export const IcoTestTube = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<circle cx="20.9139" cy="6.63626" r="0.927271" fill={color} />
		<circle cx="19.523" cy="3.39091" r="1.39091" fill={color} />
		<path d="M14.8533 5.74206L19.3095 10.2595L9.12904 20.3018C7.88158 21.5323 5.87277 21.5186 4.64224 20.2711C3.41172 19.0237 3.42544 17.0149 4.6729 15.7843L14.8533 5.74206Z" stroke={color} strokeWidth="2" />
		<path d="M13.5518 4.31873L20.7146 11.5805" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path fillRule="evenodd" clipRule="evenodd" d="M17.473 12.8704L9.30645 20.9505C8.02915 22.2143 5.97278 22.1998 4.71341 20.9181C3.45405 19.6365 3.46858 17.5731 4.74588 16.3093L6.89845 14.1795L17.473 12.8704Z" fill={color} />
	</svg>

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

// Icon Pack: Jarvis
// License: MIT - Copyright (c) 2024 JNSAPH
// Used in: Feature Buttons
export const IcoCover = ({ size = 24, color = "currentColor", className }: IconProps) => (
	<svg className={className} width={size} height={size} fill="none" viewBox="0 0 24 24">
		<path d="M11.9412 18.5803V5.41976C11.9412 4.18388 13.0509 3.24379 14.27 3.44697L20.3288 4.45677C21.2932 4.6175 22 5.45188 22 6.42956V17.5705C22 18.5481 21.2932 19.3825 20.3288 19.5433L14.27 20.5531C13.0509 20.7562 11.9412 19.8161 11.9412 18.5803Z" stroke={color} strokeWidth="2" />
		<path d="M7.47058 4.17651L7.47058 19.8236" stroke={color} strokeWidth="2" strokeLinecap="round" />
		<path d="M3 5.29413L3 18.7059" stroke={color} strokeWidth="2" strokeLinecap="round" />
	</svg>

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