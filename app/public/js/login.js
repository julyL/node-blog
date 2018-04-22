var $username = $("#username"),
  $password = $("#password"),
  $remember = $("#remember"),
  $sub = $("#sub");

$sub.on("click", () => {
  $.ajax({
    url: "/login",
    type: "post",
    data: {
      username: $username.val(),
      password: $password.val(),
      remember: $remember[0].checked
    },
    dataType:"json",
    success(data){
      if (data.code == 0) {
        location.href = data.data.redirectUrl;
      }
    }
  });
});
