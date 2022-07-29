/**
 * Created by xsc on 2017/8/1.
 */


Cards.prototype.goToFoodDetailPage = function(e){
    //console.log("DetailPage");

    // 1. 获取当前点击的元素
    var ele = e.target;
    var eleName = ele.localName;
    var eleId = ele.id;
    var eleIndex = eleId.slice(5);
    //console.log(ele, eleName, eleId, eleIndex);

    // 2. 当点击的元素不是li, 向上冒泡直到li
    var result = that.getLiEle(ele, eleName, eleId, eleIndex);
    for( var j = 0; j < result.length; j++ ){
        ele = result[0];
        eleName = result[1];
        eleId = result[2];
        eleIndex =result[3];
    }

    // 存储下是第几个商品进入的详情页
    //localStorage.pageId = eleIndex;
    that.index = eleIndex;
    //console.log(localStorage.pageId);

    // 3. 清空所有列表页html ul#container
    //console.log(that.wrap);
    document.querySelector('body').removeChild(that.wrap);

    // 4. 创建详情页 div#detail
    var detailPage = document.querySelector('#detail') || '';

    if( detailPage === '' ){
        var divEle = document.createElement('div');
        divEle.id = 'detail';

        document.body.insertBefore(divEle,document.body.childNodes[0]);
        detailPage = document.getElementById('detail');
    }

    var template = '<div class="bigPhoto_area">\
                                    <img class="button_3" src="img_compress/back2@2x.png" alt="dislike">\
                                    <img class="bigPhoto" src="{{img}}" alt="big food pic">\
                                </div>\
                                <h1 class="detail_text">{{caption}}</h1>\
                                <h2 class="detail_text">{{desc}}</h2>\
                                <div class="tags_area"></div>\
                                <div class="controls">\
                                    <div class="button_area button_dislike">\
                                        <img class="button_1" src="img_compress/dislike@2x.png" alt="dislike">\
                                    </div>\
                                    <div class="button_area button_like">\
                                        <img class="button_2" src="img_compress/like@2x.png" alt="like">\
                                    </div>\
                                </div>';

    var html = [];
    //console.log(eleIndex);

    var _html = template
        .replace('{{img}}', that.data[eleIndex].img)
        .replace('{{caption}}', that.data[eleIndex].caption)
        .replace('{{desc}}', that.data[eleIndex].desc);

    html.push(_html);
    detailPage.innerHTML = html;

    // 初始化位置后才可以利用位置值移动 CSS 没做到 没有这3个值，后面的动画无法完成位移
    detailPage.style.position = 'absolute';
    detailPage.style.left = '0px';
    detailPage.style.top = '0px';
    // 给内页一个高度
    detailPage.style.height = that.screenHeight + 'px';
    //console.log(detailPage.style.height);
    // 把隐藏的这段html变为可视
    detailPage.style.display = "block";
    detailPage.style['-webkit-transition'] = 'all .6s linear';

    // 标签内容显示
    var tags = document.querySelector('.tags_area');
    for(var i = 0; i < that.data[eleIndex]['tags'].length; i++){
        var spanEle = document.createElement('span');
        spanEle.textContent += that.data[eleIndex]['tags'][i];
        spanEle.className += 'tags';
        tags.appendChild(spanEle);
    }


    // 返回按钮与事件绑定
    var backBtn = document.querySelector('.button_3');
    //console.log(backBtn);

    // 喜欢与不喜欢按钮与事件绑定
    var dislikeBtn = document.querySelector('.button_1');
    var likeBtn = document.querySelector('.button_2');
    //console.log(dislikeBtn);

    backBtn.onclick = that.goBackToFoodCards;

    dislikeBtn.onclick = that.doDislikeActionOnDetailPage;
    likeBtn.onclick = that.doLikeActionOnDetailPage;

};