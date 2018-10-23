(function($){
    $.fn.dragpswd = function(options){
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
            if ($("#npswd1").val().length < 7 || $("#npswd1").val().length > 24){
              alert("Please input a key with 7~24 characters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#original").attr("value","");
              $("#npswd1").attr("value","");
              $("#npswd2").attr("value","");
            }
            else if (/^[A-Za-z0-9]+$/.test($("#npswd1").val()) == false){
              alert("Please input a key with only numbers and letters!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#original").attr("value","");
              $("#npswd1").attr("value","");
              $("#npswd2").attr("value","");
            }
            else if ($("#npswd1").val() != $("#npswd2").val()){
              alert("The key you repeated was wrong!");
              drag.mouseup();
              handler.removeClass('handler_ok_bg').addClass('handler_bg');
              text.text('Drag it');
              drag.css({'color': '#fff'});
              handler.css({'left': 0});
              drag_bg.css({'width': 0});
              $("#original").attr("value","");
              $("#npswd1").attr("value","");
              $("#npswd2").attr("value","");
            }
            else{
              var jsonpswdinfo = $("#passwordform").serializeObject();
              jsonpswdinfo = JSON.stringify(jsonpswdinfo);
              $.ajax({ 
                type: "post",
                async: false, 
                url: "/pswd", 
                data: jsonpswdinfo, 
                success: function (data) {
                  if (data == "Change password successful! Please check in!"){
                    alert(data);
                    window.location.reload();
                  }
                  else {
                    alert(data);
                    drag.mouseup();
                    handler.removeClass('handler_ok_bg').addClass('handler_bg');
                    text.text('Drag it');
                    drag.css({'color': '#fff'});
                    handler.css({'left': 0});
                    drag_bg.css({'width': 0});
                    $("#original").attr("value","");
                    $("#npswd1").attr("value","");
                    $("#npswd2").attr("value","");
                  }
                }, 
              });
            }
        }
    };
})(jQuery);


