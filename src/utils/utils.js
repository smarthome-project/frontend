
export const addEventUserActive = (handler) => {
	window.document.addEventListener('mousemove', handler)
	window.document.addEventListener('mousedown', handler)
	window.document.addEventListener('keypress', handler)
	window.document.addEventListener('DOMMouseScroll', handler)
	window.document.addEventListener('mousewheel', handler)
	window.document.addEventListener('touchmove', handler)
	window.document.addEventListener('MSPointerMove', handler)
}

export const delEventUserActive = (handler) => {
	window.document.removeEventListener('mousemove', handler)
	window.document.removeEventListener('mousedown', handler)
	window.document.removeEventListener('keypress', handler)
	window.document.removeEventListener('DOMMouseScroll', handler)
	window.document.removeEventListener('mousewheel', handler)
	window.document.removeEventListener('touchmove', handler)
	window.document.removeEventListener('MSPointerMove', handler)
}