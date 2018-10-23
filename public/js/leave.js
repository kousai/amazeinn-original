$(document).ready(function(){
  $("#leave").click(function(){
    $.ajax({
      type: "post",
      async: false,
      url: "/logout",
      success: function(data){
        alert(data);
        window.location.reload();
      }
    });
  });
});
