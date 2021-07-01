async function chack_if_user_exist(info) {
  var result = { suc: false, role: "", id: "" };
  var settings = {
    url: "https://webschool-f01fe0.appdrag.site/api/userNamePassword",
    data: {
      userName: info.user,
      password: info.pass,
    },
    method: "POST",
  };
  await $.ajax(settings).done(function (res) {
    if (res.Table[0]) {
      result.suc = true;
      result.role = res.Table[0].role;
      result.id = res.Table[0].id;
    }
  });
  return result;
}

async function get_all_employee() {
  var result = null;
  var settings = {
    url: "https://webschool-f01fe0.appdrag.site/api/getAllEmployee",
    data: {
      AD_PageNbr: "1",
      AD_PageSize: "500",
    },
    method: "POST",
  };
  await $.ajax(settings).done(function (res) {
    if (res.Table[0]) {
       result = res.Table;
    }
  });
  return result;
}

function admin_trash_func(row_click, id_clicked) {
  $(row_click).remove();
  delete_db(id_clicked);
}

function manager_trash_func(row_click, id, id_clicked) {
  var row_role = $(row_click).eq(5).html();
  if (id == id_clicked || row_role == "Employee") {
    $(row_click).remove();
    delete_db(id_clicked);
  }
}

function employee_trash_func(row_box, id, id_clicked) {
  if (id == id_clicked) {
    $(row_box).remove();
    delete_db(id_clicked);
  }
}

function delete_db(id) {
  var settings = {
    url: "https://webschool-f01fe0.appdrag.site/api/delete",
    data: {
      id: id,
    },
    method: "POST",
  };
  $.ajax(settings).done();
}

function employee_func(id, row_box) {
  var row_i = $(row_box).eq(0).html();
  if (id == row_i) {
    edit_table_true(row_box);
  }
}

function manager_func(row_click, id, id_clicked) {
  var row_role = $(row_click).eq(5).html();
  if (id == id_clicked || row_role == "Employee") {
    edit_table_true(row_click);
  }
}

function edit_table_true(row_box) {
  if (!row_box[1].isContentEditable) {
    loop_row("true", "solid #1392e7", row_box, "important");
    $(row_box[6])
      .find("img:first")
      .css("background-color", "green", "important");
  } else {
    loop_row("false", "", row_box);
    $(row_box[6]).find("img:first").css("background-color", "");
    var editRow = row_box;
    update_db(editRow);
  }
}

function loop_row(true_false, color, row_box) {
  for (let i = 1; i < 6; i++) {
    row_box[i].contentEditable = true_false;
    $(row_box[i]).css("outline", color);
  }
}

function update_db(tr) {
  var settings = {
    url: "https://webschool-f01fe0.appdrag.site/api/update",
    data: {
      id: tr[0].innerHTML,
      fName: tr[1].innerHTML,
      lName: tr[2].innerHTML,
      userName: tr[3].innerHTML,
      password: tr[4].innerHTML,
    },
    method: "POST",
  };
  $.ajax(settings).done();
}

async function addDb(emp) {
  var settings = {
    url: "https://webschool-f01fe0.appdrag.site/api/addEmployee",
    data: {
      fName: emp.fName,
      lName: emp.lName,
      userName: emp.userName,
      password: emp.password,
      role: emp.role,
    },
    method: "POST",
  };
  await $.ajax(settings).done();
}

export {
  addDb,
  chack_if_user_exist,
  get_all_employee,
  admin_trash_func,
  edit_table_true,
  manager_trash_func,
  manager_func,
  employee_trash_func,
  employee_func,
};
