$(document).ready(function(){
  $("#checkout").click(function(){
    $.ajax({
      type: "post",
      async: false,
      url: "/delete",
      success: function(data){
        alert(data);
        window.location.reload();
      }
    });
  });
});
