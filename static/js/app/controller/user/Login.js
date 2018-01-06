define([
    'app/controller/base',
    'swiper',
	'app/module/validate',
    'app/interface/UserCtr'
], function(base, Swiper, Validate, UserCtr) {
	
    init();
    
    function init() {
    	$(".head-button-wrap .button-register").removeClass("hidden")
        initSwiperBanner();
        addListener();
        
    }
    // 初始化swiper
    function initSwiperBanner(){
        var _swiper = $("#swiper");
        if(_swiper.find('.swiper-slide').length <= 1){
            _swiper.find('.swiper-pagination').hide();
        }
        var mySwiper = new Swiper('#swiper', {
            'autoplay': 5000,
            'pagination': '#swiper',
            'pagination' : '#swiper .swiper-pagination',
            'paginationClickable' :true,
            'preventClicksPropagation': true,
            'loop' : true,
            'speed': 600
        });
    }
	
	function login(params){
		return UserCtr.login(params).then((data)=>{
			UserCtr.getUser(true,data.token).then((item)=>{
				base.setSessionUser(data)
				sessionStorage.setItem("nickname",item.nickname);
				base.hideLoadingSpin()
				base.showMsg("登錄成功")
				setTimeout(function(){
					base.gohref("../index.html")
				},800)
			})
		},base.hideLoadingSpin)
	}
	
    function addListener() {
        var _loginForm = $("#login-form");
	    _loginForm.validate({
	    	'rules': {
	        	"loginName": {
	        		required: true,
	        		mobile: true
	        	},
	        	"loginPwd": {
	        		required: true
	        	},
	    	},
	    	onkeyup: false
	    });
	    
	    $("#subBtn").click(function(){
	    	if(_loginForm.valid()){
	    		base.showLoadingSpin()
	    		var params=_loginForm.serializeObject()
	    		login(params);
	    	}
	    })
	    
    }
});