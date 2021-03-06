(function($){
    $.fn.dragprofile = function(options){
        var x, drag = this, isMove = false, defaults = {
        };
        var options = $.extend(defaults, options);
        var html = '<div class="drag_bg"></div>'+
                    '<div class="drag_text" onselectstart="return false;" unselectable="on">Drag it</div>'+
                    '<div class="handler handler_bg"></div>';
        this.append(html);
        
        var handler = drag.find('.handler');
        var drag_bg = drag.find('.drag_bg');
        var text = drag.find('.drag_text');
        var maxWidth = drag.width() - handler.width();
        
        handler.mousedown(function(e){
            isMove = true;
            x = e.pageX - parseInt(handler.css('left'), 10);
        });
        
        $(document).mousemove(function(e){
            var _x = e.pageX - x;
            if(isMove){
                if(_x > 0 && _x <= maxWidth){
                    handler.css({'left': _x});
                    drag_bg.css({'width': _x});
                }else if(_x > maxWidth){
                    dragOk();
                }
            }
        }).mouseup(function(e){
            isMove = false;
            var _x = e.pageX - x;
            if(_x < maxWidth){
                handler.css({'left': 0});
                drag_bg.css({'width': 0});
            }
        });
        
        function dragOk(){
            handler.removeClass('handler_bg').addClass('handler_ok_bg');
            text.text('Passed');
            drag.css({'color': '#fff'});
            if ($("#nicktext").val().length > 13){
              alert("Please input a nickname with less than 13 characters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
            }
            else if ($("#introtext").val().length > 26){
              alert("Please input a introduction with less than 26 characters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
            }
            else{
              var jsonprofileinfo = $("#profileform").serializeObject();
              jsonprofileinfo = JSON.stringify(jsonprofileinfo);
              $.ajax({ 
                type: "post",
                async: false, 
                url: "/edit", 
                data: jsonprofileinfo, 
                dataType: "json",
                success: function (data) {
                  alert("Update profile successful!");
                  drag.mouseup();
                  handler.removeClass('handler_ok_bg').addClass('handler_bg');
                  text.text('Drag it');
                  drag.css({'color': '#fff'});
                  handler.css({'left': 0});
                  drag_bg.css({'width': 0});
                  $("#currentnickname").text("Nickname : " + data["nickname"]);
                  $("#currentgender").text("Gender : " + data["gender"]);
                  $("#currentintro").text("Introduction : " + data["intro"]);
                  $("#roomnickname0").text("Nickname : " + data["nickname"]);
                  $("#roomgender0").text("Gender : " + data["gender"]);
                  $("#roomintro0").text("Introduction : " + data["intro"]);
                  if (data["avatar"] == 0) {
                    if (data["gender"] == "Male") {
                      $("#currentavatar0").css("display","none"); 
                      $("#currentavatar1").css("display",""); 
                      $("#currentavatar2").css("display","none"); 
                      $("#currentavatar3").css("display","none");  
                      $("#roomav0to0").css("display","none"); 
                      $("#roomav0to1").css("display",""); 
                      $("#roomav0to2").css("display","none"); 
                      $("#roomav0to3").css("display","none");  
                    }
                    else if (data["gender"] == "Female") {
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
                  }
                    if (data["gender"] == "Male") {
                      $("#currentavatar0").css("color","#005CAF"); 
                      $("#roomav0to0").css("color","#005CAF"); 
                    }
                    else if (data["gender"] == "Female") {
                      $("#currentavatar0").css("color","#C1328E"); 
                      $("#roomav0to0").css("color","#C1328E"); 
                    }
                    else {
                      $("#currentavatar0").css("color","#77428D"); 
                      $("#roomav0to0").css("color","#77428D"); 
                    }
                }, 
              });
            }
        }
    };
})(jQuery);


