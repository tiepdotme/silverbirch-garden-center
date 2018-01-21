$(function () {
    var menuRight = document.getElementById('navigation'),
        showRightPush = document.getElementById('showRightPush'),
        floatingNavigation = document.getElementById('floating_nav'),
        body = document.body;

    showRightPush.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(body, 'push_to_left');
        classie.toggle(menuRight, 'menu_right_open');
        classie.toggle(floatingNavigation, 'push_to_left');
        disableOther('showRightPush');
    };

    function disableOther(a) {
        if (a !== 'showRightPush') {
            classie.toggle(showRightPush, 'disabled');
        }
    }

});

$(function () {
    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000); // Scroll speed to the top
    });
});
$(function () {
    $('#showRightPush').click(function () {
        $("i", this).toggleClass("fa fa-bars fa fa-times");
    });
});

$(function () {
    var images = ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner9.jpg'];
    $('#headerContainer').css({
        'background-image': 'url(../images/banners/' + images[Math.floor(Math.random() * images.length)] + ')'
    });
});

$(function () {
    if ($('.flexslider').length > 0) {
        $('.flexslider').flexslider({
            animation: "slide"
        });
    }
});