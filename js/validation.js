const form = document.querySelector('form');

const btnSubmit_join = form.querySelector('#join_submit');
const btnSubmit_contact = form.querySelector('#contact_submit');

if (btnSubmit_join != null) {
	btnSubmit_join.addEventListener('click', (e) => {
		if (!isAgree('agree')) e.preventDefault();
		if (!isTxt('userName', 1)) e.preventDefault();
		if (!isTxt('userid', 5)) e.preventDefault();
		if (!isTel('phone')) e.preventDefault();
		if (!isEmail1('email', 'company')) e.preventDefault();
		if (!isCheck('memberType')) e.preventDefault();
		if (!isPwd('pwd1', 5)) e.preventDefault();
		if (!isPwd2('pwd1', 'pwd2', 5)) e.preventDefault();
	});
}
if (btnSubmit_contact != null) {
	btnSubmit_contact.addEventListener('click', (e) => {
		if (!isTxt('contact_name')) e.preventDefault();
		if (!isTxt('contact_message', 10)) e.preventDefault();
		if (!isEmail2('contact_email')) e.preventDefault();
		if (!isSelect('sel_branch')) e.preventDefault();
	});
}

function isAgree(el) {
	let inputs = form.querySelectorAll(`[name=${el}]`);
	let isCheck = false;

	for (let el of inputs) {
		if (el.checked) isCheck = true;
	}

	if (isCheck) {
		const errMsgs = inputs[0].closest('.agreement').querySelectorAll('p');

		if (errMsgs.length > 0) inputs[0].closest('.agreement').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].closest('.agreement').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('약관에 동의해주세요');
		inputs[0].closest('.agreement').append(errMsg);

		return false;
	}
}
function isTxt(el, len) {
	if (len === undefined) len = 1;
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;
	if (txt.length >= len) {
		const errMsgs = input.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) input.parentElement.querySelector('p').remove();
		return true;
	} else {
		const errMsgs = input.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
		input.parentElement.append(errMsg);
		return false;
	}
}
function isTel(el, len) {
	if (len === undefined) len = 11;
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	const num = /^[0-9]+$/;
	if (txt.length == len && num.test(txt)) {
		const errMsgs = input.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) input.parentElement.querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append(`휴대폰번호 하이픈(-)을 제외하고 입력해주세요 `);
		input.parentElement.append(errMsg);
		return false;
	}
}
function isEmail1(el1, el2, len) {
	if (len === undefined) len = 1;
	let emailId = form.querySelector(`[name=${el1}]`);
	let emailSel = form.querySelector(`[name=${el2}]`);
	let emailSel_index = emailSel.options.selectedIndex;

	let txt = emailId.value;
	let val = emailSel[emailSel_index].value;

	if (txt.length >= len && val !== '') {
		const errMsgs = emailId.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) emailId.parentElement.querySelector('p').remove();

		return true;
	} else {
		const errMsgs = emailId.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append(`이메일을 ${len}글자 이상 입력하고 항목을 선택해주세요.`);
		emailId.parentElement.append(errMsg);
		return false;
	}
}

function isEmail2(el) {
	let input = form.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (/@/.test(txt)) {
		const errMsgs = input.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) input.parentElement.querySelector('p').remove();
		return true;
	} else {
		const errMsgs = input.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('@를 포함한 전체 이메일 주소를 입력하세요');
		input.parentElement.append(errMsg);
		return false;
	}
}

function isCheck(el) {
	let inputs = form.querySelectorAll(`[name=${el}]`);
	let isCheck = false;

	for (let el of inputs) {
		if (el.checked) isCheck = true;
	}

	if (isCheck) {
		const errMsgs = inputs[0].parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) inputs[0].parentElement.querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('필수 입력항목을 체크해주세요');
		inputs[0].parentElement.append(errMsg);

		return false;
	}
}

function isPwd(el1, len) {
	let pwd1 = form.querySelector(`[name=${el1}]`);
	// let pwd2 = form.querySelector(`[name=${el2}]`);
	let pwd1_val = pwd1.value;
	// let pwd2_val = pwd2.value;

	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[~!@#$%^&*()_+?><]/;

	if (
		// pwd1_val === pwd2_val &&
		pwd1_val.length >= len &&
		num.test(pwd1_val) &&
		eng.test(pwd1_val) &&
		spc.test(pwd1_val)
	) {
		const errMsgs = pwd1.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) pwd1.parentElement.querySelector('p').remove();
		return true;
	} else {
		const errMsgs = pwd1.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append(
			`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요`
		);
		pwd1.parentElement.append(errMsg);
		return false;
	}
}

function isPwd2(el1, el2, len) {
	let pwd1 = form.querySelector(`[name=${el1}]`);
	let pwd2 = form.querySelector(`[name=${el2}]`);
	let pwd1_val = pwd1.value;
	let pwd2_val = pwd2.value;

	if (pwd1_val === pwd2_val && pwd2_val.length >= len) {
		const errMsgs = pwd2.parentElement.querySelectorAll('p');

		if (errMsgs.length > 0) pwd2.parentElement.querySelector('p').remove();
		return true;
	} else {
		const errMsgs = pwd2.parentElement.querySelectorAll('p');

		if (errMsgs.length > 0) return false;
		const errMsg = document.createElement('p');
		errMsg.append(`비밀번호를 동일하게 입력해주세요`);
		pwd2.parentElement.append(errMsg);
		return false;
	}
}

function isSelect(el) {
	let sel = form.querySelector(`[name=${el}]`);
	let sel_index = sel.options.selectedIndex;
	console.log(sel.parentElement);
	let val = sel[sel_index].value;

	if (val !== '') {
		const errMsgs = sel.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) sel.parentElement.querySelector('p').remove();

		return true;
	} else {
		const errMsgs = sel.parentElement.querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		const errMsg = document.createElement('p');
		errMsg.append('항목을 선택해 주세요');
		sel.parentElement.append(errMsg);

		return false;
	}
}
