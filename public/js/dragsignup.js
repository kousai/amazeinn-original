(function($){
    $.fn.dragsignup = function(options){
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
            if ($("#signname").val()==""){
              alert("Please input an ID!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#pswd1").attr("value","");
              $("#pswd2").attr("value","");
            }
            else if ($("#pswd1").val()==""){
              alert("Please input a key!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#pswd1").attr("value","");
              $("#pswd2").attr("value","");
            }
            else if ($("#signname").val().length < 3 || $("#signname").val().length > 9){
              alert("Please input an ID with 3~9 characters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#pswd1").attr("value","");
              $("#pswd2").attr("value","");
            }
            else if (/^[A-Za-z0-9]+$/.test($("#signname").val()) == false){
              alert("Please input an ID with only numbers and letters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#pswd1").attr("value","");
              $("#pswd2").attr("value","");
            }
            else if ($("#pswd1").val().length < 7 || $("#pswd1").val().length > 24){
              alert("Please input a key with 7~24 characters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#pswd1").attr("value","");
              $("#pswd2").attr("value","");
            }
            else if (/^[A-Za-z0-9]+$/.test($("#pswd1").val()) == false){
              alert("Please input a key with only numbers and letters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#pswd1").attr("value","");
              $("#pswd2").attr("value","");
            }
            else if ($("#pswd1").val() != $("#pswd2").val()){
              alert("The key you repeated was wrong!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#pswd1").attr("value","");
              $("#pswd2").attr("value","");
            }
            else{
              var jsonuserinfo = $("#signup").serializeObject();
              jsonuserinfo = JSON.stringify(jsonuserinfo);
              $.ajax({ 
                type: "post",
                async: false, 
                url: "/signup", 
                data: jsonuserinfo, 
                success: function (data) { 
                  alert(data);
                  drag.mouseup();
                  handler.removeClass('handler_ok_bg').addClass('handler_bg');
                  text.text('Drag it');
                  drag.css({'color': '#fff'});
                  handler.css({'left': 0});
                  drag_bg.css({'width': 0});
                  $("#pswd1").attr("value","");
                  $("#pswd2").attr("value","");
                  $("#login").css("display","");
                  $("#signup").css("display","none");
                }, 
              });
            }
        }
    };
})(jQuery);


