var gAPIBase = "http://new.zackimage.com";
var gImgBase = "http://new.zackimage.com/app/";
var gAPI = {
    menu:gAPIBase + "/app/index/class.php",
    pic :gAPIBase + "/app/index/page.php",
    album :gAPIBase + "/app/index/album.php"
};
loadMenu();

var menuState = "c";

var searchH =  ($(".sort-2 .top li").length * 35 + 80)+"px";
// console.log(searchH);
// $('.sort-2').css('height','0');
$(".menu, .cover,.search-2 button, .sort-2 ul li:not('.search-2')").click(function () {
    if (menuState==="c") {
        $(".menu-t").addClass("menu-t-transform");
        $(".menu-m").addClass("menu-m-transform");
        $(".menu-b").addClass("menu-b-transform");
        $(".sort-2").css({'display':'block','height':searchH});
        $(".cover").css("display","block");
        menuState = "o";
    }else {
        $(".menu-t").removeClass("menu-t-transform");
        $(".menu-m").removeClass("menu-m-transform");
        $(".menu-b").removeClass("menu-b-transform");
        $(".sort-2").css("height","0");
        $(".cover").css("display","none");
        menuState = "c"
    }
});
$(window).resize(function () {
    if (menuState==="o") {
        $(".menu-t").removeClass("menu-t-transform");
        $(".menu-m").removeClass("menu-m-transform");
        $(".menu-b").removeClass("menu-b-transform");
        $(".sort-2").css("height","0");
        $(".cover").css("display","none");
        menuState = "c"
    }
});

$(".sort-2 .top li").click(function () {

    $('.detail').css('display','none');
    $('.detail-items').empty();

    $(window).scrollTop(0);
    loadEnd = true;
    id = $(this).attr('data-id');
    skey = "";
    $(this).css('background','#6b6b6b').siblings().css('background','').parents().siblings().children().css('background','');
    $(".item").remove();
    pageC=1;
    $('.about').css('display','none');
    $('.grid').css('display','block').masonry();
    $grid.infiniteScroll('loadNextPage');
});
$(".left .top li").click(function () {

    $('.detail').css('display','none');
    $('.detail-items').empty();

    $(window).scrollTop(0);
    loadEnd = true;
    id = $(this).attr('data-id');
    skey = "";
    $(this).children('a').css('border-bottom','#6b6b6b 1px solid').parents().siblings().children('a').css('border-bottom','');
    $(".item").remove();
    pageC=1;
    $('.about').css('display','none');
    $('.grid').css('display','block').masonry();
    $grid.infiniteScroll('loadNextPage');

});



$(".sort-2 button").click(function () {

    $('.detail').css('display','none');
    $('.detail-items').empty();

    loadEnd = true;
    $(window).scrollTop(0);
    $(".item").remove();
    var val = $("#inputR").val();
    $(this).parents().siblings().css({'background':''});
    $(this).parents().parents().siblings().children().css('background','');

    skey = val;
    id = "";
    pageC=1;

    $('.about').css('display','none');
    $grid.infiniteScroll('loadNextPage');
    $('.grid').css('display','block').masonry();
});
$(".left button").click(function () {

    $('.detail').css('display','none');
    $('.detail-items').empty();

    loadEnd = true;
    $(window).scrollTop(0);
    $(".item").remove();
    var val = $("#inputL").val();
    // $(this).parents().siblings().css({'border-bottom':''});
    $(this).parents().parents().siblings().children().children('a').css('border-bottom','');

    skey = val;
    id = "";
    pageC=1;

    $('.about').css('display','none');
    $grid.infiniteScroll('loadNextPage');
    $('.grid').css('display','block').masonry();
});

// 回车触发点击事件
$(function(){
    document.getElementById('inputL').onkeydown = function(e){
        // var ev = document.all ? window.event : e;
        if(e.keyCode==13) {
            $(".left button").click();
        }
    }
});
$(function(){
    document.getElementById('inputR').onkeydown = function(e){
        // var ev = document.all ? window.event : e;
        if(e.keyCode==13 && (menuState==='o')) {
            $(".sort-2 button").click();
        }
    }
});


$('.sort-2 .search-about').on('click',function () {

    $('.detail').css('display','none');
    $('.detail-items').empty();

    $(window).scrollTop(0);
    loadEnd = false;
    $('.grid').css('display','none').masonry();
    $('.page-load-status').css('display','none');
    $('.about').css('display','block');
    $(this).css('background','#6b6b6b').parents().siblings().children().css('background','')
});
$('.left .search-about').on('click',function () {

    $('.detail').css('display','none');
    $('.detail-items').empty();

    $(window).scrollTop(0);
    loadEnd = false;
    $('.grid').css('display','none').masonry();
    $('.page-load-status').css('display','none');
    $('.about').css('display','block');
});

function loadMenu() {
    $.ajax({
        type: "GET",
        url: gAPI.menu,
        dataType:"json",
        async:false,
        success: function (data) {
            var ele =   "<ul class='top wrap'>";

            for (var i = 0; i < data.results.length; i++) {
                var obj = data.results[i];
                ele +=  '<li class="class-menu" data-id="'+obj.id+'" ><a href="javascript:">' +
                    obj.title   +
                    '</a></li>';
            }
            ele +=   "</ul>" ;

            $(".left,.sort-2").prepend(ele);
        }
    });
}

$(function () {
    $('.go-top').toTop({
        autohide:true,
        position:false
    });
});
