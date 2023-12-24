import { JSDOM } from "jsdom";

declare global {
  let navigator: Navigator;
  let window: Window & typeof globalThis;
  let document: Document;
}

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src: object, target: object): void {
	Object.defineProperties(target, {
		...Object.getOwnPropertyDescriptors(src),
		...Object.getOwnPropertyDescriptors(target),
	});
}

global.window = window;
global.document = window.document;
global.navigator = window.navigator;
copyProps(window, global);
