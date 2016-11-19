
(function(){
    var mask = $(".mask");
    var iconList = $(".top-label a");
    var menuAs = $(".sidebar a");
    console.log(iconList)
    iconList.eq(0).tap(function(){
        mask.show();
    });
    menuAs.eq(0).tap(function () {
        mask.hide();
    });
https://packagecontrol.io/

})();

