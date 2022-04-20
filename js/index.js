// ----------屏幕左侧小节锚点导航模块----------
var aside = document.querySelector(".main>aside"),
    main = document.querySelector(".main"),
    sectionList = main.querySelectorAll("section.pyg_productModel"),
    footer = document.querySelector("footer"),
    // 选项卡点击标志，防止点击移动时与页面滚动侦听相互干扰
    tabClick = false;
document.addEventListener("scroll", function () {
    // 侧边导航滚动固定定位
    // 头部隐藏后固定定位
    if (window.pageYOffset <= main.offsetTop) {
        aside.style.position = "absolute";
        aside.style.top = "167px";
        aside.style.left = "-76px";
    } else {
        aside.style.position = "fixed";
        aside.style.top = "167px";
        aside.style.left = "84px";

        // 选项卡选中函数
        function chose(index) {
            // 如果有选中的则取消
            aside.children[0].querySelector(".current") &&
                aside.children[0]
                    .querySelector(".current")
                    .classList.remove("current");
            // 第index个未被选中则选中
            aside.children[0].children[index].classList[0] != "current" &&
                aside.children[0].children[index].classList.add("current");
        }
        // 侧边导航滚动小节定位
        //   当选项卡未被点击时监听页面滚动
        if (!tabClick) {
            if (
                window.pageYOffset >
                2 * sectionHeight + sectionStartTop - 200
            ) {
                chose(2);
            } else if (
                window.pageYOffset >
                sectionHeight + sectionStartTop - 200
            ) {
                chose(1);
            } else if (window.pageYOffset > sectionStartTop - 200) {
                chose(0);
            } else if (window.pageYOffset > sectionStartTop - innerHeight  + 200) {
            } else {
                // 如果第一个小节不可见，则清除选项卡的选中状态
                // 如果有选中的则取消
                aside.children[0].querySelector(".current") &&
                    aside.children[0]
                        .querySelector(".current")
                        .classList.remove("current");
            }
        }

        // 距离底部与上方一样距离时绝对定位
        //   计算侧边栏底部距footer的间距
        var betweenFooter =
            footer.offsetTop -
            window.pageYOffset -
            aside.offsetTop -
            aside.offsetHeight;
        // 如果小于167px则改绝对定位
        if (betweenFooter <= 167) {
            aside.style.position = "absolute";
            // 定位高度:底部模块的滚动距离 - 侧边栏上方间距 - 顶部高度 - 侧边栏高度
            aside.style.top =
                footer.offsetTop -
                aside.offsetTop -
                main.offsetTop -
                aside.offsetHeight +
                "px";
            aside.style.left = "-76px";
        }
    }
});
// 侧边导航根据页面小节个数自动生成导航个数
// 1.统计页面中小节个数
var sectionNum = sectionList.length,
    sectionHeight = sectionList[0].offsetHeight,
    sectionStartTop = sectionList[0].offsetTop + main.offsetTop;
for (var i = 0; i < sectionNum; i++) {
    // 2.根据小节个数生成导航条目
    var li = document.createElement("li"),
        a = document.createElement("a");
    a.href = "javascript:;";
    a.innerHTML = sectionList[i].children[0].children[0].innerHTML;
    li.appendChild(a);
    //   添加序号
    li.setAttribute("index", i);
    aside.children[0].appendChild(li);

    // 3.绑定侧导航点击事件
    aside.children[0].children[i].addEventListener("click", function () {
        // 选项卡点击标志置为true
        tabClick = true;
        // 切换选中类显示
        // 去除当前current，如果有
        if (aside.children[0].querySelector(".current")) {
            aside.children[0]
                .querySelector(".current")
                .classList.remove("current");
        }
        //给点击的li添加current
        this.classList.add("current");

        // 滚动到对应小节位置
        //   获取点击的序号
        var index = this.getAttribute("index");
        //   根据获得的序号滚动到对应小节
        //   滚动高度是：index * sectionHeight +sectionStart - 150
        var currentSectionTop = index * sectionHeight + sectionStartTop - 150;
        animateTop(window, currentSectionTop, function () {
            // 滚动结束后将点击标志置为false
            tabClick = false;
        });
    });
}

// -------------屏幕右侧面板模块--------------
var toolbar = document.querySelector(".pyg_toolbar"),
    centerNav = document.querySelector(".pyg_toolbar .centerNav"),
    tabList = centerNav.querySelectorAll("li"),
    tabListAll = document.querySelectorAll(".pyg_toolbar>.tabList li"),
    tabHideList = document.querySelectorAll(".pyg_toolbar>.tabList .hide"),
    tabContent = document.querySelector(".pyg_toolbar>.tabContent"),
    contentList = tabContent.querySelectorAll("li"),
    contentPic = tabContent.querySelector(".title>i"),
    barTitle = tabContent.querySelector(".title>span"),
    barClose = document.querySelector(
        ".pyg_toolbar>.tabContent>.title>a.close"
    );
// 关闭按钮点击动画事件
barClose.addEventListener("click", function () {
    console.log(toolbar.offsetLeft);
    animate(toolbar, toolbar.offsetLeft + 264);
    toolbar.classList.add("close");
    // 取消选项卡的选中
    centerNav.querySelector(".current").classList.remove("current");
});
// 选项卡点击动画事件
centerNav.addEventListener("click", function (e) {
    // 如果面板处于关闭状态，先打开
    var isClose = toolbar.classList[1] == "close";
    if (isClose) {
        animate(toolbar, toolbar.offsetLeft - 264);
        // 清除关闭状态标志类
        toolbar.classList.remove("close");
    }

    console.log(e.target.nodeName);
    // 如果是a标签
    if (e.target.nodeName == "A") {
        var index = e.target.parentNode.getAttribute("index");
        // 如果是i标签
    } else if (e.target.nodeName == "I" || e.target.nodeName == "SPAN") {
        var index = e.target.parentNode.parentNode.getAttribute("index");
    }

    // 切换选项卡显示
    //   去掉当前显示的选项卡
    var del = document.querySelector(".tabList li.current");
    if (del) {
        document
            .querySelector(".tabList li.current")
            .classList.remove("current");
    }
    //   添加要显示的选项卡
    tabList[index - 1].classList.add("current");

    // 将隐藏描述收回
    animate(tabHideList[index - 1], 35);

    // 切换内容区图标显示
    //   先清除类
    contentPic.className = "";
    //   根据当前序号添加类
    contentPic.classList.add("content" + index);

    // 切换上方标题文字显示
    barTitle.innerHTML = contentList[index - 1].getAttribute("alt");

    // 切换内容区显示
    //   去掉当前显示的内容区
    tabContent.querySelector("li.show").classList.remove("show");
    //   添加要显示的内容区
    contentList[index - 1].classList.add("show");
});
// 返回顶部事件
tabListAll[3].addEventListener("click", function () {
    animateTop(window, 0);
});

// ---------------主要轮播图js-----------------
var swiper = new Swiper(".mainSwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    dynamicBullets: true,
    loop: true,
    speed: 1000,
    spaceBetween: 0,
});

// ------------产品展示模块轮播图js-------------
var swiper = new Swiper(".productSwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    dynamicBullets: true,
    loop: true,
    speed: 1000,
    spaceBetween: 0,
});

// ----------产品展示模块自动生成品牌js----------
var model = document.querySelectorAll(".pyg_productModel");
for (var i = 0; i < model.length; i++) {
    var brand = model[i].querySelector(".brand");
    for (var j = 0; j < 10; j++) {
        var a = document.createElement("a");
        a.href = "#";
        var img = document.createElement("img");
        img.src = "./uploads/brand_" + (j + 1) + ".png";
        a.appendChild(img);
        brand.appendChild(a);
    }
}

// ------------模块选择自动填充图标js------------
var modelChose = document
    .querySelector(".main")
    .querySelector(".right")
    .querySelector(".modelChose");
var x = 17,
    y = 16,
    num = 0;
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
        modelChose.children[num].children[0].style.backgroundPosition =
            "-" + x + "px -" + y + "px";
        num++;
        // 调整最后一列
        if (j == 2) {
            x += 67;
        } else {
            x += 61;
        }
    }
    y += 72;
    x = 17;
}
