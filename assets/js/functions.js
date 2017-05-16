var clicked = false;

$(document).ready(function(){
    $(".hamburger").click(function(){
        $(".hamburger").toggleClass("open");
        $(".main").toggleClass("mainopen");
    });
    $(".giving1").click(function(){
        $(".selection1").toggleClass('hide');
        $(".selection2, .selection3").addClass('hide');
        $("#triangle-up1").toggleClass('hidet');
        $("#triangle-up2, #triangle-up3").addClass('hidet');
        if (!clicked){
              clicked = true;
              setTimeout(function(){ clicked = false; }, 1000);
              }else{
                return false;
            };
        });
    $(".giving2").click(function(){
        $(".selection2").toggleClass('hide');
        $(".selection1, .selection3").addClass('hide');
        $("#triangle-up2").toggleClass('hidet');
        $("#triangle-up1, #triangle-up3").addClass('hidet');
        if (!clicked){
              clicked = true;
              setTimeout(function(){ clicked = false; }, 1000);
              }else{
                return false;
              };
    });
    $(".giving3").click(function(){
        $(".selection3").toggleClass('hide');
        $(".selection1, .selection2").addClass('hide');
        $("#triangle-up3").toggleClass('hidet');
        $("#triangle-up1, #triangle-up2").addClass('hidet');
        if (!clicked){
              clicked = true;
              setTimeout(function(){ clicked = false; }, 1000);
              }else{
                return false;
              };
    });
});
