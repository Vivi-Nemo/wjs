// 自定义的js脚本



$(function(){

	function resize(){
	//根据屏幕宽度 取banner图片的大小
	var windowWidth = $(window).width();
	// console.log(windowWidth);
	var isSmallScreen = windowWidth < 768
// $('#main_ad > .carousel-inner > .item') 得到一个DOM数组
	$('#main_ad > .carousel-inner > .item').each(function(index,ele){
		var $item = $(ele); //因为得到的DOM对象  需要转换
		var imgSrc = $item.data( isSmallScreen ? 'image-xs':'image-lg'); //判断页面宽度 调用不同的图片src
		//设置背景图片
		$item.css('backgroundImage','url("'+ imgSrc +'")');
		//因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img标签
		if(isSmallScreen) {
			$item.html('<img src="'+ imgSrc +'"/>');
		} else {
			$item.empty();  //删除所有子节点
		}
	});

	//tab栏横向滚动条
	var $ulContainer = $(".nav-tabs");
	var width = 30; //因为原本ul有padding-left20px
	$ulContainer.children().each(function(index,element){
		// console.log(element.clientWidth); //js属性获取宽度
		// console.log($(element).width()); //jq方法获取每一个li的宽度
		
		width += $(element).width();
	});
      //此时width为所有li的总和
      //判断当前ul是否超出屏幕宽度 如果超出就显示滚动条
      if(width > $(window).width()){
      	$ulContainer
    	.css('width',width) //设置宽度
    	.parent().css('overflow-x','scroll'); //显示滚动条
    }
}

// $(window).on('resize',resize);
// $(window).trigger('resize');  //让window对象立即触发一下resize
$(window).on('resize',resize).trigger('resize');

// 初始化js提示工具 tooltip插件 （弹出小提示框）
$('[data-toggle="tooltip"]').tooltip();

//新闻版块 根据所点内容改变title
   var $newsTitle = $('#news .news-title');
$("#news .nav-pills a").on('click',function(){
	var title = $(this).data('title');
	$newsTitle.text(title);
});


//banner 手指缓动 图片相应滚动

// 1.判断手指在轮播图上的滑动方向
	// 获取界面轮播图容器
	var $carousels = $('.carousel');
	var startX, endX;
	var offset = 50;
	//注册滑动事件
		// 记录手指触摸开始时的x坐标
		$carousels.on('touchstart',function(e){
			// console.log(e);
			// console.log(e.originalEvent.touches[0].clientX); //有可能多点触控 所以touches[0]
			startX = e.originalEvent.touches[0].clientX;
		});
		// 记录手指触摸结束的x坐标 (出没结束时获取不到离开那一瞬间的坐标值 因此取touchmove的最后一个值)
		$carousels.on('touchmove',function(e){
			//变量重复赋值 取最后一个值
			// console.log(e);
			// console.log(e.originalEvent.touches[0].clientX); //有可能多点触控 所以touches[0]
			endX = e.originalEvent.touches[0].clientX
		});


// 2.根据获得的方向选择上一张或者下一张：
//   - $('a').click(); 方法一 找到上一张 下一张a链接 触发click事件
  // - 原生的carousel方法实现 http://v3.bootcss.com/javascript/#carousel
  		//鼠标离开时比较X轴大小
		$carousels.on('touchend',function(e){
			// 获取运动精度 当距离大于一定距离 是有一定方向变化的
			var distance = Math.abs(startX-endX)
			if(distance > offset){
				// console.log(startX > endX ? '←' : '→');
				$(this).carousel(startX > endX ? 'next' : 'prev');
			}
		});

});