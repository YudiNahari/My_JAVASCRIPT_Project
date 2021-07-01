import * as Model from "./model.js";
import * as View from "./view.js";

export async function init() {
  View.inputUser();
  get_input_val();
}

var faild = 1;
var timer = null;
var userPass = { user: null, pass: "" };

function get_input_val() {
  $("#formUserPass").submit(function (e) {
    e.preventDefault();
    userPass.user = $("#userName").val();
    View.password_key();
    click_get_pass();
  });
}

function click_get_pass() {
  // click mouse
  $(".num").on("click", function () {
    catch_num(this.innerHTML);
  });
  // press keyboard
  var num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  $(document).keydown(function (e) {
    if (num.includes(e.key)) {
      catch_num(e.key);
    }
  });
}

function catch_num(num) {
  audioFunc("../../assests/audio/keybord.mp3");
  if (userPass.pass.length <= 3) {
    userPass.pass += num;
    color_on(num);
  }
}

async function go_chack_info(info) {
  var res = await Model.chack_if_user_exist(info);
  if (res.suc) {
    audioFunc("../../assests/audio/good.mp3");
    info_exist(res.role, res.id);
    $(document).off("keydown");
  } else {
    audioFunc("../../assests/audio/false.mp3");
    View.alert_massage("WORNG CREDENTIALS");
  }
}

async function info_exist(role, id) {
  var db_emp_table = await Model.get_all_employee();
  await View.employee_info(db_emp_table);
  submit_new_emp(role, id);
  edit_func(role, id);
  trash_func(role, id);
}

function submit_new_emp(role, id) {
  $("#formAdd").submit(function (e) {
    e.preventDefault();
    addEmployee(role, id);
  });
}

function addEmployee(role, id) {
  var new_emp = {
    fName: $("#fName").val(),
    lName: $("#lName").val(),
    userName: $("#user").val(),
    password: $("#pass").val(),
    role: $("#classification").val(),
  };
  add_emp_permission(new_emp, role, id);
}

async function add_emp_permission(new_emp, role, id) {
  if ((new_emp.role == "Employee" && role == "Manager") || role == "Admin") {
    await Model.addDb(new_emp);
    console.log("1");
    var db_emp = await Model.get_all_employee();
    console.log("2" + db_emp);
    await View.employee_info(db_emp);
    console.log("3");
    submit_new_emp(role, id);
    edit_func(role, id);
    trash_func(role, id);
  }
}

function edit_func(role, id) {
  $(".editbtn").on("click", function () {
    after_btn_click(this, role, id, "edit");
  });
}

function trash_func(role, id) {
  $(".trash").on("click", function () {
    after_btn_click(this, role, id, "trash");
  });
}

function after_btn_click(thi, role, id, typ) {
  var click = $(thi).parent().parent()[0].children;
  var id_clicked = $(click).eq(0).html();
  if (role == "Admin") {
    admin_btn(typ, click, id_clicked);
  } else if (role == "Manager") {
    manager_btn(typ, click, id, id_clicked);
  } else {
    employee_btn(typ, click, id, id_clicked);
  }
}

function admin_btn(typ, click, id_clicked) {
  if (typ == "edit") {
    Model.edit_table_true(click);
  } else {
    Model.admin_trash_func(click, id_clicked);
  }
}

function manager_btn(typ, click, id, id_clicked) {
  if (typ == "edit") {
    Model.manager_func(click, id, id_clicked);
  } else {
    Model.manager_trash_func(click, id, id_clicked);
  }
}

function employee_btn(typ, click, id, id_clicked) {
  if (typ == "edit") {
    Model.employee_func(id, click);
  } else {
    Model.employee_trash_func(click, id, id_clicked);
  }
}

function color_on(e) {
  if (userPass.pass.length >= 4) {
    go_chack_info(userPass);
  }
  View.colorOn(e);
  clearTimeout(timer);
  color_off();
}

function color_off() {
  timer = setTimeout(() => {
    if (userPass.pass.length >= 4) {
      faild++;
      chackFaild();
    }
    userPass.pass = "";
    View.colorOff();
  }, 3000);
}

function chackFaild() {
  if (faild > 3) {
    audioFunc("../../assests/audio/police.mp3");
    View.alert_massage("You Faild 3 Times!");
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}

function audioFunc(sound) {
  var audio = new Audio(sound);
  audio.volume = 0.1;
  audio.play();
}
