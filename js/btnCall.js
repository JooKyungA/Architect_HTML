const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');

btnCall.onclick = function (e) {
	e.preventDefault();
	menuActive();
};
menuMo.onclick = function () {
	menuActive();
};
function menuActive() {
	btnCall.classList.toggle('on');
	menuMo.classList.toggle('on');
}
