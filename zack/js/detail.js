var H = '';
$('.grid').on('click','img',function () {
    H = $(window).scrollTop();
    $('.grid').css('display','none');
    $('.detail').css('display','block');
    // loadEnd = false;
    var coverId = $(this).attr('cover-id');
    showContents(coverId);
    showVideo(coverId);
    $('.page-load-status').css('display','none');
});
$('.go-back').on('click',function () {
    loadEnd = true;
    $('.grid').css('display','block').masonry();
    $('.detail').css('display','none');
    $('.detail-items').empty();
    $(window).scrollTop(H);
});

function showContents(coverId) {
    loadEnd = false;
    $.ajax({
        type: "GET",
        url: gAPI.album,
        dataType:"json",
        data:{
            // page:secPage,
            // psize:secPageSize,
            id:coverId
        },
        success: function (data) {
            var img = "";
            datapcount = data.pcount;

            for (var i = 0; i < data.list.length; i++) {
                var pic = data.list[i];
                img += '<div class="detail-item">'+
                            '<p class="biaoti clear">'+ pic.title +'</p>'+
                            '<div><img src="'+ (gImgBase+pic.img)+' "/><div>' +
                            '<p class="beizhu">'+ pic.intro +'</p>' +
                        '</div>'
            }
            $(".detail-items").append(img);
        }
    });
}
function showVideo(coverId) {
    loadEnd = false;
    $.ajax({
        type: "GET",
        url: gAPI.album,
        dataType:"json",
        data:{
            // page:secPage,
            // psize:secPageSize,
            id:coverId
        },
        success: function (data) {
            var video = "";
            for (var i = 0; i < data.list.length; i++) {
                var vid = data.list[i];
                if (vid.video !== "") {
                    video +=    '<div class="detail-item">' +
                                    '<div class="iframe">' +
                                        '<iframe src="'+vid.video+'"  frameborder="0" allowfullscreen="true" "></iframe>' +
                                    '</div>' +
                                '</div>';
                }
                $(".detail-items").append(video);
            }
        }
    });
}