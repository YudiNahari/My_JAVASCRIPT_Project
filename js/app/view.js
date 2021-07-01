function inputUser() {
  var main = document.getElementById("main");
  main.innerHTML = `<div id="userPas"><h2 id="login">Enter Username</h2>
 <form id="formUserPass">
     <input type="text" id="userName" placeholder="My User Name" required />
     <br><button type="submit" id="submit_user">Login</button>
 </form></div>`;
}

function password_key() {
  main.innerHTML = `
  <h1 id="pin"> Please Enter Your Pin </h1>
  <div id="keys">
  <button class="num" id="1">1</button>
  <button class="num" id="2">2</button>
  <button class="num" id="3">3</button>
  <button class="num" id="4">4</button>
  <button class="num" id="5">5</button>
  <button class="num" id="6">6</button>
  <button class="num" id="7">7</button>
  <button class="num" id="8">8</button>
  <button class="num" id="9">9</button>
  <button class="num zero" id="0">0</button>
</div>`;
}

async function employee_info(data) {
  var rows = "";
  data.forEach((e) => {
    rows += `<tr>
    <td id="none" class="tde">${e.id}</td>
      <td class="tde" id="fName">${e.fName}</td>
      <td class="tde" id="lName">${e.lName}</td>
      <td class="tde" id="userName">${e.userName}</td>
      <td class="tde" id="pass">${e.password}</td>
      <td class="tde" id="role">${e.role}</td>
      <td>
      <img class="editbtn tde" src="./assests/icons8-edit-24.png" alt="trash" />
      <img class="trash" src="./assests/icons8-trash-64.png" alt="edit" />
      </td>
      </tr>`;
  });
  show_table(rows);
}

function show_table(rows) {
  main.innerHTML = `
  <audio id="pop">
  <source src="../audio/btn.mp3" type="audio/mp3">
  </audio>
<div id="header">
    <h2><a href="#main"> Home </a> | <a href="#"> About </a> | <a href="#"> Login </a></h2>
  </div>
  <div id="mainPage">
  <div id="addEmployee">
  <h2 class="ani">Add an Employee</h2>
<form id="formAdd">
 <input type="text" id="fName" placeholder="First Name"  required />
 <input type="text" id="lName" placeholder="Last Name"  required />
 <input type="text" id="user" placeholder="User Name"  required />
 <input type="text" id="pass" placeholder="Password"  required />
   <select id="classification" name="Classification" required>
     <option value="">Classification</option>
     <option value="Manager">Manager</option>
     <option value="Employee">Employee</option>
   </select>
   <button type="submit" id="submit">Add an Employee</button>
 </form>
  </div>
  <div id="employeeInfo">
    <table id="tab">
    <h2>Current Employees</h2>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>User Name</th>
        <th>Pin</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody class="">
      ${rows}
      </tbody>
    </table>
  </div>
</div>`;
}

function alert_massage(massage) {
  alert(massage);
}

function colorOn(e) {
  $("#" + e).css("background-color", "#0ca80ce8");
}
function colorOff() {
  $(".num").css({ "background-color": "" });
}

export {
  inputUser,
  employee_info,
  alert_massage,
  password_key,
  colorOn,
  colorOff,
};
