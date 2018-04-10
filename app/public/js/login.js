var $username = $("#username"),
  $password = $("#password"),
  $sub = $("#sub");

$sub.on("click", () => {
  $.ajax({
    url: "/login",
    type: "post",
    data: {
      username: $username.val(),
      password: $password.val()
    },
    dataType:"json",
    success(data){
      if (data.code == 0) {
        // location.href = data.data.redirectUrl;
      }
    }
  });
});
