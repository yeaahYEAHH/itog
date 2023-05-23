// Title_bar кнопки
let btnClose = document.querySelector('.win__btn-close'),
	btnMin = document.querySelector('.win__btn-min'),
	btnMax = document.querySelector('.win__btn-max'),
	flagWin = false;

btnClose.addEventListener('click', () => {
	window.electronAPI.quit()
})

btnMin.addEventListener('click', () => {
	window.electronAPI.min()
})

btnMax.addEventListener('click', () => {
	if (!flagWin) {
		window.electronAPI.winMax();
		document.querySelector('#winbtn').classList.remove('fa-window-maximize');
		document.querySelector('#winbtn').classList.add('fa-window-restore');
		flagWin = !flagWin;
	} else {
		window.electronAPI.winMin();
		document.querySelector('#winbtn').classList.remove('fa-window-restore');
		document.querySelector('#winbtn').classList.add('fa-window-maximize');
		flagWin = !flagWin;
	}
})