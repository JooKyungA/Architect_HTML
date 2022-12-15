const form = document.querySelector("#member");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", (e) => {
  if (!isTxt("userid", 5)) e.preventDefault();
  if (!isTxt("comments", 20)) e.preventDefault();
  if (!isEmail("email")) e.preventDefault();
  if (!isCheck("gender")) e.preventDefault();
  if (!isCheck("hobby")) e.preventDefault();
  if (!isSelect("edu")) e.preventDefault();
  if (!isPwd("pwd1", "pwd2", 5)) e.preventDefault();
})

function isTxt(el, len) {
  if (len === undefined) len = 5;
  let input = form.querySelector(`[name=${el}]`);
  let txt = input.value;
  if (txt.length >= len) {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();

    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
    input.closest("td").append(errMsg);
    return false;
  }
}