var gAPIBase = "http://new.zackimage.com";
var gImgBase = "http://new.zackimage.com/app/";
var gAPI = {
    menu:gAPIBase + "/app/index/class.php",
    pic :gAPIBase + "/app/index/page.php",
    album :gAPIBase + "/app/index/album.php"
};
var $grid = $('.grid').masonry({
    itemSelector:'.item',
    percentPosition: true,
    columnWidth: '.grid__col-sizer',
    gutter: '.grid__gutter-sizer',
    sragger: 50,
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 }
});

var msnry = $grid.data('masonry');

var pcount;
var skey = "";
var id = "";
var pageC =1;
var loadEnd = true;

$grid.infiniteScroll({
    path: function() {
        return  gAPI.pic+ "?id=" + id  + "&skey=" + skey + '&page=' + pageC;
    },
    loadOnScroll: true,
    responseType: 'text',
    history: false,
    scrollThreshold: 20   //  触发加载的距离
});
$grid.on( 'load.infiniteScroll', function( event, response ) {
    if (loadEnd) {
        loadEnd = false;
        var data = JSON.parse(response);
        pcount = data.pcount;
        var $item = $(showContent(data));
        if (pcount === 0) {
            $('.infinite-scroll-request').css('display', 'none');
            $('.infinite-scroll-error,.page-load-status').css('display', 'block');
            $('.infinite-scroll-last').css('display', 'none');
            // $grid.infiniteScroll('destroy');
            return false
        } else if (pageC > pcount && pcount !== 0) {
            $('.infinite-scroll-request').css('display', 'none');
            $('.infinite-scroll-error').css('display', 'none');
            $('.infinite-scroll-last,.page-load-status').css('display', 'block');
            // $grid.infiniteScroll('destroy');
            return false
        } else {
            // $('.page-load-status').css('display','block');
            $('.infinite-scroll-error').css('display', 'none');
            $('.infinite-scroll-last').css('display', 'none');
            $('.infinite-scroll-request,.page-load-status').css('display', 'block');
        }
        $item.imagesLoaded(function () {
            var reqDis =  $('.infinite-scroll-request').css('display');
            if (reqDis==="block") {
                $grid.infiniteScroll('appendItems', $item)
                    .masonry('appended', $item);
                pageC++;
                loadEnd = true;
                $('.infinite-scroll-request').css('display','none');
            }
        });
    }
});
$grid.infiniteScroll('loadNextPage');


//  图片盒子
function showContent(data) {
    var $ele = "";
    for (var j = 0; j < data.list.length; j++) {
        var pic = data.list[j];
        $ele +=
            '<div class="item">' +
            '<a href="#">' +            //zack/second.html     _blank
            '<img src="'+ (gImgBase + pic.img)+'" cover-id="'+pic.id+'"/>' +
            '</a>' +
            '<span class="content" title="'+pic.title+'"> '+pic.title+'</span>' +
            '</div>';
    }
    return $ele;
}


