$(document).ready(function(){
  $("#buttonstate").click(function(){
    if ($("#statecontent").val() == ''){
      alert("You did not input a status!");
    }
    else if ($("#statecontent").val().length > 30){
      alert("You can only input a status with at most 30 characters!");
    }
    else {
      var stateinfo = $("#statecontent").val();
      $.ajax({
        type: "post",
        async: false,
        url: "/state",
        data: stateinfo,
        dataType: "json",
        success: function(data){
          $("#statecontent").attr("value","");
          $("#recentstate").text(data["date"][0] + data["state"][0]);
          for (var i = 0; i < 7; i++){
            $("#dtdate" + i.toString()).text(data["date"][i]);
            $("#dtstate" + i.toString()).text(data["state"][i]);
          }
          $("#roomstate0").text("Status : " + data["state"][0]);
        }
      });
    }
  });
});
