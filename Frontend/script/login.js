let myform = document.getElementById("form");
let email = document.getElementById("email");
let password = document.getElementById("password");
let heading = document.getElementById("heading");

myform.addEventListener("submit", (event) => {
  event.preventDefault();

  const payload = {
    email: myform.email.value,
    password: myform.password.value,
  };
  fetching(payload)
});


function fetching(payload) {
  // let flag = false;
  console.log(payload);
  fetch("https://frantic-red-pumps.cyclic.app/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.token) {
        localStorage.setItem("NotesApptoken", res.token);
        localStorage.setItem("userName",JSON.stringify(  res.name));
        localStorage.setItem("auth",true);
        Swal.fire(
          'Good job signin successful!',
          'You clicked the button!',
          'success'
        )
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        // alert("Wrong Credentials");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong Credentials!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // if (flag==true) {
  //   alert("Sign in Successful");
  //   setTimeout(() => {
  //     window.location.href = "index.html";
  //   }, 2000);
  // } else {
  //   alert("Wrong Credentials");
  // }
}