var mask = $(".mask");
var iconList = $(".top-label a");
var menuAs = $(".sidebar a");
var as = $(".top nav a");
var difSections = $(".wrap>div");
iconList.eq(0).tap(function(){
    mask.show();
});
menuAs.eq(0).tap(function () {
    mask.hide();
});
as.tap(function(){
	
	$(this).addClass("active");
	// difSections
})


