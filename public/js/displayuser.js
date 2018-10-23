$(document).ready(function(){
  $("#buttonpswd").click(function(){
    $("#password").css("display","");
  });

  $("#cancelpswd").click(function(){
    $("#password").css("display","none");  
  });

  $("#buttonprofile").click(function(){
    $("#profile").css("display",""); 
  });

  $("#cancelprofile").click(function(){
    $("#profile").css("display","none");  
  });

  $("#buttonstatelist").click(function(){
    $("#stateslist").css("display",""); 
  });

  $("#cancelstatelist").click(function(){
    $("#stateslist").css("display","none");  
  });

  $("#buttonifollow").click(function(){
    $("#ifollowlist").css("display",""); 
  });

  $("#cancelifollow").click(function(){
    $("#ifollowlist").css("display","none");  
  });

  $("#buttonfollowy").click(function(){
    $("#followylist").css("display",""); 
  });

  $("#cancelfollowy").click(function(){
    $("#followylist").css("display","none");  
  });

  $("#roomdoor0").click(function(){
    $("#roomprofile0").css("display",""); 
  });

  $("#buttonrf0").click(function(){
    $("#roomprofile0").css("display","none");  
  });

  $("#roomdoor1").click(function(){
    $("#roomprofile1").css("display",""); 
  });

  $("#buttonrf1").click(function(){
    $("#roomprofile1").css("display","none");  
  });

  $("#roomdoor2").click(function(){
    $("#roomprofile2").css("display",""); 
  });

  $("#buttonrf2").click(function(){
    $("#roomprofile2").css("display","none");  
  });

  $("#roomdoor3").click(function(){
    $("#roomprofile3").css("display",""); 
  });

  $("#buttonrf3").click(function(){
    $("#roomprofile3").css("display","none");  
  });

  $("#roomdoor4").click(function(){
    $("#roomprofile4").css("display",""); 
  });

  $("#buttonrf4").click(function(){
    $("#roomprofile4").css("display","none");  
  });

  $("#roomdoor5").click(function(){
    $("#roomprofile5").css("display",""); 
  });

  $("#buttonrf5").click(function(){
    $("#roomprofile5").css("display","none");  
  });

  $("#roomdoor6").click(function(){
    $("#roomprofile6").css("display",""); 
  });

  $("#buttonrf6").click(function(){
    $("#roomprofile6").css("display","none");  
  });

  $("#welcome").ready(function(){
    if ($("#currentavatar0").css("background-image") == 'url("' + window.location.href + '0")') {
      if ($("#sex").val() == "Male") {
        $("#currentavatar0").css("display","none"); 
        $("#currentavatar1").css("display",""); 
        $("#currentavatar2").css("display","none"); 
        $("#currentavatar3").css("display","none");  
        $("#roomav0to0").css("display","none"); 
        $("#roomav0to1").css("display",""); 
        $("#roomav0to2").css("display","none"); 
        $("#roomav0to3").css("display","none");  
      }
      else if ($("#sex").val() == "Female") {
        $("#currentavatar0").css("display","none"); 
        $("#currentavatar1").css("display","none"); 
        $("#currentavatar2").css("display",""); 
        $("#currentavatar3").css("display","none"); 
        $("#roomav0to0").css("display","none"); 
        $("#roomav0to1").css("display","none"); 
        $("#roomav0to2").css("display",""); 
        $("#roomav0to3").css("display","none"); 
      }
      else {
        $("#currentavatar0").css("display","none"); 
        $("#currentavatar1").css("display","none"); 
        $("#currentavatar2").css("display","none"); 
        $("#currentavatar3").css("display",""); 
        $("#roomav0to0").css("display","none"); 
        $("#roomav0to1").css("display","none"); 
        $("#roomav0to2").css("display","none"); 
        $("#roomav0to3").css("display",""); 
      }
    }
    else {
      $("#currentavatar0").css("display",""); 
      $("#currentavatar1").css("display","none"); 
      $("#currentavatar2").css("display","none"); 
      $("#currentavatar3").css("display","none"); 
      $("#roomav0to0").css("display",""); 
      $("#roomav0to1").css("display","none"); 
      $("#roomav0to2").css("display","none"); 
      $("#roomav0to3").css("display","none"); 
      if ($("#sex").val() == "Male") {
        $("#currentavatar0").css("color","#005CAF"); 
        $("#roomav0to0").css("color","#005CAF"); 
      }
      else if ($("#sex").val() == "Female") {
        $("#currentavatar0").css("color","#C1328E"); 
        $("#roomav0to0").css("color","#C1328E"); 
      }
      else {
        $("#currentavatar0").css("color","#77428D"); 
        $("#roomav0to0").css("color","#77428D"); 
      }
    }
    if ($("#male").val() == $("#sex").val())
    {
      $("#male").attr("checked","checked");
    }
    if ($("#female").val() == $("#sex").val())
    {
      $("#female").attr("checked","checked");
    }
    if ($("#other").val() == $("#sex").val())
    {
      $("#other").attr("checked","checked");
    }
    for (var i=0;i<5;i++){
      if ($("#icurrentsex" + i.toString()).val() == "Male") {
        $("#icurrentav" + i.toString()).css("color","#005CAF");
        $("#icurrentav" + i.toString()).css("display","");  
        $("#ifollowuser" + i.toString()).css("display",""); 
      }
      if ($("#icurrentsex" + i.toString()).val() == "Female") {
        $("#icurrentav" + i.toString()).css("color","#C1328E");
        $("#icurrentav" + i.toString()).css("display","");  
        $("#ifollowuser" + i.toString()).css("display",""); 
      }
      if ($("#icurrentsex" + i.toString()).val() == "Other") {
        $("#icurrentav" + i.toString()).css("color","#77428D");
        $("#icurrentav" + i.toString()).css("display","");  
        $("#ifollowuser" + i.toString()).css("display",""); 
      }
    }
    for (var i=0;i<5;i++){
      if ($("#i2currentsex" + i.toString()).val() == "Male") {
        $("#i2currentav" + i.toString()).css("color","#005CAF");
        $("#i2currentav" + i.toString()).css("display","");  
        $("#i2followuser" + i.toString()).css("display",""); 
      }
      if ($("#i2currentsex" + i.toString()).val() == "Female") {
        $("#i2currentav" + i.toString()).css("color","#C1328E");
        $("#i2currentav" + i.toString()).css("display",""); 
        $("#i2followuser" + i.toString()).css("display",""); 
      }
      if ($("#i2currentsex" + i.toString()).val() == "Other") {
        $("#i2currentav" + i.toString()).css("color","#77428D");
        $("#i2currentav" + i.toString()).css("display",""); 
        $("#i2followuser" + i.toString()).css("display",""); 
      }
    }
    for (var i=0;i<5;i++){
      if ($("#ycurrentsex" + i.toString()).val() == "Male") {
        $("#ycurrentav" + i.toString()).css("color","#005CAF");
        $("#ycurrentav" + i.toString()).css("display",""); 
      }
      if ($("#ycurrentsex" + i.toString()).val() == "Female") {
        $("#ycurrentav" + i.toString()).css("color","#C1328E");
        $("#ycurrentav" + i.toString()).css("display",""); 
      }
      if ($("#ycurrentsex" + i.toString()).val() == "Other") {
        $("#ycurrentav" + i.toString()).css("color","#77428D");
        $("#ycurrentav" + i.toString()).css("display",""); 
      }
      if ($("#ycurrentmark" + i.toString()).val() == "0") { 
        $("#yunfollowuser" + i.toString()).css("display",""); 
      }
      if ($("#ycurrentmark" + i.toString()).val() == "1") {
        $("#yfollowuser" + i.toString()).css("display",""); 
      }
    }
    for (var i=0;i<5;i++){
      if ($("#y2currentsex" + i.toString()).val() == "Male") {
        $("#y2currentav" + i.toString()).css("color","#005CAF");
        $("#y2currentav" + i.toString()).css("display",""); 
      }
      if ($("#y2currentsex" + i.toString()).val() == "Female") {
        $("#y2currentav" + i.toString()).css("color","#C1328E");
        $("#y2currentav" + i.toString()).css("display",""); 
      }
      if ($("#y2currentsex" + i.toString()).val() == "Other") {
        $("#y2currentav" + i.toString()).css("color","#77428D");
        $("#y2currentav" + i.toString()).css("display",""); 
      }
      if ($("#y2currentmark" + i.toString()).val() == "0") { 
        $("#y2unfollowuser" + i.toString()).css("display",""); 
      }
      if ($("#y2currentmark" + i.toString()).val() == "1") {
        $("#y2followuser" + i.toString()).css("display",""); 
      }
    }
    for (var i = 1; i < 7; i++) {
      if ($("#roomid" + i.toString()).val() == '' || $("#roomid" + i.toString()).val() == $("#uid").val()){
        $("#roomhead" + i.toString()).text("R" + i.toString() + ": Empty");
        $("#roomface" + i.toString()).text("No roomer");
        $("#roomempty" + i.toString()).css("display",""); 
      }
      else {
        $("#roomhead" + i.toString()).text("R" + i.toString() + ": " + $("#roomname" + i.toString()).val());
        $("#roomface" + i.toString()).text("Knock the door"); 
        $("#roomdoor" + i.toString()).css("display","");  
        if ($("#roomav" + i.toString() + "to0").css("background-image") == 'url("' + window.location.href + '0")') {
          if ($("#roomsex" + i.toString()).val() == "Male") {
            $("#roomav" + i.toString() + "to0").css("display","none"); 
            $("#roomav" + i.toString() + "to1").css("display",""); 
            $("#roomav" + i.toString() + "to2").css("display","none"); 
            $("#roomav" + i.toString() + "to3").css("display","none");  
          }
          else if ($("#roomsex" + i.toString()).val() == "Female") {
            $("#roomav" + i.toString() + "to0").css("display","none"); 
            $("#roomav" + i.toString() + "to1").css("display","none"); 
            $("#roomav" + i.toString() + "to2").css("display",""); 
            $("#roomav" + i.toString() + "to3").css("display","none"); 
          }
          else {
            $("#roomav" + i.toString() + "to0").css("display","none"); 
            $("#roomav" + i.toString() + "to1").css("display","none"); 
            $("#roomav" + i.toString() + "to2").css("display","none"); 
            $("#roomav" + i.toString() + "to3").css("display",""); 
          }
        }
        else {
          $("#roomav" + i.toString() + "to0").css("display",""); 
          $("#roomav" + i.toString() + "to1").css("display","none"); 
          $("#roomav" + i.toString() + "to2").css("display","none"); 
          $("#roomav" + i.toString() + "to3").css("display","none"); 
          if ($("#roomsex" + i.toString()).val() == "Male") {
            $("#roomav" + i.toString() + "to0").css("color","#005CAF"); 
          }
          else if ($("#roomsex" + i.toString()).val() == "Female") {
            $("#roomav" + i.toString() + "to0").css("color","#C1328E"); 
          }
          else {
            $("#roomav" + i.toString() + "to0").css("color","#77428D"); 
          }
        }
        if ($("#roommark" + i.toString()).val() == "0") { 
          $("#unfollowroom" + i.toString()).css("display",""); 
          $("#followroom" + i.toString()).css("display","none"); 
        }
        if ($("#roommark" + i.toString()).val() == "1") {
          $("#followroom" + i.toString()).css("display",""); 
          $("#unfollowroom" + i.toString()).css("display","none"); 
        }
      }
    }
  });
});
