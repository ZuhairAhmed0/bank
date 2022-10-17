let report = localStorage.getItem("report")
  ? JSON.parse(localStorage.getItem("report"))
  : [];

let electric = document.getElementById("electric");
let comunication = document.getElementById("comunication");
let university = document.getElementById("university");

let electricPayment = document.querySelector(".electricPayment");
let comunicationPayment = document.querySelector(".comunicationPayment");
let universityPayment = document.querySelector(".universityPayment");

let usersInfo = localStorage.getItem("coustomerInformations")
  ? JSON.parse(localStorage.getItem("coustomerInformations"))
  : [];
let selectId = document.querySelector(".account");
let creditNow = document.querySelector(".creditNow");
let numberOfServ = document.querySelector(".eleNumber");
let price = document.querySelector(".price");
let creditUpdate = document.querySelector(".credit");
let confirmBtn = document.querySelector(".confirmBtn");

// <<<<<<<<<<<<<<<<<< Authentication login >>>>>>>>>>>>>>>>>>>>>>>//
if (
  !localStorage.getItem("username") ||
  localStorage.getItem("username") == 0
) {
  setTimeout(() => {
    alert("يجب علي تسجيل الدخول أولاً");
    window.location = "../index.html";
  }, 1000);
}

function SelectAcount() {
  let userSelected = usersInfo.map((item) => {
    return `
        <option  hidden value="0">رقم الحساب</option>
        <option value=${item.id}>${item.id} | ${item.uName}</option>`;
  });
  selectId.innerHTML = userSelected;
}

SelectAcount(usersInfo);

price.addEventListener("keyup", Pricebill);

function Pricebill(e) {
  MountNeed = e.target.value;
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  console.log(user.balance);
  if (MountNeed > 99) {
    confirmBtn.style.display = "block";
    localStorage.setItem("Mount", JSON.stringify(MountNeed));
  }
}

selectId.addEventListener("change", getIdValue);

function getIdValue(e) {
  let idSelected = e.target.value;
  localStorage.setItem("id", JSON.stringify(idSelected));
  let id = localStorage.getItem("id")
    ? JSON.parse(localStorage.getItem("id"))
    : [];
  e.preventDefault();
  let Mount = localStorage.getItem("Mount")
    ? JSON.parse(localStorage.getItem("Mount"))
    : [];
  // console.log(Mount , 546546546);
  var userSelect = usersInfo.find((user) => user.id == id);
  localStorage.setItem("user", JSON.stringify(userSelect));

  console.log(userSelect.balance);
  let existMount = userSelect.balance;
  localStorage.setItem("existing", JSON.stringify(existMount));
  let existing = localStorage.getItem("existing")
    ? JSON.parse(localStorage.getItem("existing"))
    : [];

  console.log(userSelect, 12313);

  creditNow.value = userSelect.balance;
  increseMount.value = Mount;
  let mountInt = parseInt(Mount);

  let sumition = [existing, mountInt];
  let z = sumition.reduce((a, b) => a + b);

  localStorage.setItem("lastMount", JSON.stringify(z));
}

confirmBtn.addEventListener("click", confirmPayment);

function confirmPayment(e) {
  e.preventDefault();
  let id = localStorage.getItem("id")
    ? JSON.parse(localStorage.getItem("id"))
    : [];
  let user = usersInfo.find((item) => item.id == id);
  let mount = parseInt(
    localStorage.getItem("Mount")
      ? JSON.parse(localStorage.getItem("Mount"))
      : []
  );
  let balancebefor = user.balance;
  if (mount > user.balance) {
    setTimeout(() => {
      alert("رصيد العميل اقل من قيمة الشراء");
    }, 1000);
  } else {
    let updateMount = user.balance - mount - 50;
    console.log(mount);
    console.log(updateMount);
    user.balance = updateMount;
    console.log(user.balance, user);
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " -- " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    let repo = {
      id: user.id,
      uName: user.uName,
      process: "فاتورة كهرباء ",
      mount: mount,
      balance: balancebefor,
      balanceAfterProccess: updateMount,
      time: datetime,
    };
    let finalRebort = [...report, repo];
    localStorage.setItem("report", JSON.stringify(finalRebort));

    localStorage.setItem("coustomerInformations", JSON.stringify(usersInfo));

    numberOfServ.value = 0;
    price.value = "";
    confirmBtn.style.display = "none";

    setTimeout(() => {
      creditNow.value = user.balance;
      creditUpdate.style.display = "block";
      creditUpdate.innerHTML = "تم شراء الكهرباء بالمبلغ المحدد من رصيد العميل";
    }, 1500);

    setTimeout(() => {
      alert("تم شراء الكهرباء وارسالها لرقم جوال العميل");
      window.location = "../mybank/electricServices.html";
    }, 5000);
  }
}
