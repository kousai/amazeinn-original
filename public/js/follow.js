(function($){
  $.fn.follow = function(){
    var bid = this.attr("id");
    var pi1 = new RegExp("ifollowuser");
    var pi2 = new RegExp("i2followuser");
    var py1 = new RegExp("yfollowuser");
    var py2 = new RegExp("y2followuser");
    var pny1 = new RegExp("yunfollowuser");
    var pny2 = new RegExp("y2unfollowuser");
    var pr = new RegExp("followroom");
    var pur = new RegExp("unfollowroom");
    var lon = new RegExp("The num of roomers you are following: ");
    var un = new RegExp("un");
    var non = "";
    var name = "";
    var tag = 0;
    var id = "";
    if (pi1.test(bid) == true){
      non = "#icurrentid" + bid.replace(pi1,"");
      name = "#icurrentname" + bid.replace(pi1,"");
      id = $(non).val();
      tag = 0;
    }
    if (pi2.test(bid) == true){
      non = "#i2currentid" + bid.replace(pi2,"");
      name = "#i2currentname" + bid.replace(pi2,"");
      id = $(non).val();
      tag = 0;
    }
    if (py1.test(bid) == true){
      non = "#ycurrentid" + bid.replace(py1,"");
      name = "#ycurrentname" + bid.replace(py1,"");
      id = $(non).val();
      tag = 1;
    }
    if (py2.test(bid) == true){
      non = "#y2currentid" + bid.replace(py2,"");
      name = "#y2currentname" + bid.replace(py2,"");
      id = $(non).val();
      tag = 1;
    }
    if (pny1.test(bid) == true){
      non = "#ycurrentid" + bid.replace(pny1,"");
      name = "#ycurrentname" + bid.replace(pny1,"");
      id = $(non).val();
      tag = 0;
    }
    if (pny2.test(bid) == true){
      non = "#y2currentid" + bid.replace(pny2,"");
      name = "#y2currentname" + bid.replace(pny2,"");
      id = $(non).val();
      tag = 0;
    }
    if (pr.test(bid) == true){
      non = "#roomid" + bid.replace(pr,"");
      name = "#roomname" + bid.replace(pr,"");
      id = $(non).val();
      tag = 1;
    }
    if (pur.test(bid) == true){
      non = "#roomid" + bid.replace(pur,"");
      name = "#roomname" + bid.replace(pur,"");
      id = $(non).val();
      tag = 0;
    }
    if (tag == 1){
      $.ajax({
        type: "post",
        async: false,
        url: "/follow",
        data: id,
        success: function(data){
          alert('Follow "' + $(name).val() + '" successful!');
          var str = (parseInt($("#ifollowheader").text().replace(lon,"")) + 1).toString();
          $("#ifollowheader").text("The num of roomers you are following: " + str);
          if (py1.test(bid) == true){
            var str = "#yunfollowuser" + bid.replace(py1,"");
            $("#" + bid).hide();
            $(str).css("display","");  
          }
          if (py2.test(bid) == true){
            var str = "#y2unfollowuser" + bid.replace(py2,"");
            $("#" + bid).hide();
            $(str).css("display","");  
          }
          if (pr.test(bid) == true){
            $("#" + bid).css("display","none");
            $("#un" + bid).css("display","");  
          }
        }
      });
    }
    else if (tag == 0){
      $.ajax({
        type: "post",
        async: false,
        url: "/unfollow",
        data: id,
        success: function(data){
          alert('Unfollow "' + $(name).val()+ '" successful!');
          var str = (parseInt($("#ifollowheader").text().replace(lon,"")) - 1).toString();
          $("#ifollowheader").text("The num of roomers you are following: " + str);
          if (pur.test(bid) == true){
            var str = "#" + bid.replace(un,"");
            $(str).css("display","");  
            $("#" + bid).css("display","none");            
          }
          if (pi1.test(bid) == true){
            var str1 = "#icurrentstr" + bid.replace(pi1,"");
            var str2 = "#icurrentav" + bid.replace(pi1,"");
            $(str1).hide();
            $(str2).hide();
            $("#" + bid).hide();
          }
          if (pi2.test(bid) == true){
            var str1 = "#i2currentstr" + bid.replace(pi2,"");
            var str2 = "#i2currentav" + bid.replace(pi2,"");
            $(str1).hide();
            $(str2).hide();
            $("#" + bid).hide();
          }
          if (pny1.test(bid) == true){
            var str = "#yfollowuser" + bid.replace(pny1,"");
            $("#" + bid).hide();
            $(str).css("display","");  
          }
          if (pny2.test(bid) == true){
            var str = "#y2followuser" + bid.replace(pny2,"");
            $("#" + bid).hide();
            $(str).css("display","");  
          }
        }
      });
    }
  };
})(jQuery);
