/***
 * M-0.1
 * 新增get发送方法
 * mingLie常用方法
 * 2018-3-5
 * @param {Object} window
 * @param {Object} undefined
 */
(function(window, undefined) {
	//方法管理器名	
	var mingLie = {
		/***
		 * 测试方法测试完成将其移除
		 * @param {Object} a
		 */
		w: function() {
			for(var i=0;i<arguments.length;i++){
				console.log(arguments[i]);
			}
		},
		log: function() {
			for(var i=0;i<arguments.length;i++){
				console.log(arguments[i]);
			}
		},
		
		info: function() {
			for(var i=0;i<arguments.length;i++){
				console.info(arguments[i]);
			}
		},
		
		debug: function() {
			for(var i=0;i<arguments.length;i++){
				console.debug(arguments[i]);
			}
		},
		
		/**
		 * 通配符的实现
		 * @param str
		 * @returns {String}
		 */
		p: function p(str){
			var param=[];
			for(var i=0;i<arguments.length;i++){
				param[i]=arguments[i];
			}
			param=param.slice(1);
			var result="";
			var sb="";
			var i=0,j=0;
			if(str.length>0){
				while ((i = str.indexOf("?")) != -1) {
					sb=sb+str.substring(0, i) + param[j++];
					str = str.substring(i + 1);
				}
				sb=sb+str;
				result=sb;
			}
			return result;
		},		
		/**
		 * 数组的最大值
		 */
		max : function(arr){
			return Math.max.apply(null,arr);
		},
		/**
		 * 数组的最小值
		 */
		min : function(arr){
			return Math.min.apply(null,arr);
		},
		/**
		 * 下拉框选择
		 * @param SelectId     下拉框的id
		 * @param optionValue  下拉选项的value
		 */
		selectItemByValue:function (SelectId,optionValue) {  
		       for(var i=0;i<SelectId.options.length;i++) {  
			            if(SelectId.options[i].value == optionValue) {  
			            	SelectId.options[i].selected = true;  
			               break;  
			            }  
			    }  
		 },
		
		 /**
		  * 上传图片后回显
		  * @param fileId 文件id
		  * @param imgId  图片id
		  */
		 imgDisplayWhenFileOnload:function(fileId,imgId){
			 $(fileId).on('change', function () {
				    var oFReader = new FileReader();
				    var file = fileId.files[0];
				    oFReader.readAsDataURL(file);
				    oFReader.onloadend = function(e){
				        var src = e.target.result;
				        $(imgId).attr('src',src);
				    }
				});			 
		 },		 		 
        /***
         * 得到地址栏的表单数据
         * @param {Object} name  希望得到的表单name
         */
		getParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if(r != null) return unescape(r[2]);//unescape()函数可对通过 escape()编码的字符串进行解码。
			return null;
		},
		/**
		 * jQuery版表单验证
		 * @param {Object} name    通过标签name属性获取该标签对象
		 * @param {Object} reg     正则确定校验规则
		 * @param {Object} spanId  用于获取输出信息对象
		 * @param {Object} okinfo  正确信息
		 * @param {Object} errinfo 错误信息
		 */
	    formCheck :function(name, reg, spanId, okinfo, errinfo) {
			var flag;
			if(reg.test($("[name="+name+"]").val())) {		
				$("#" + spanId)[0].innerHTML = okinfo.fontcolor("green");
				flag = true;
			} else {
				$("#" + spanId)[0].innerHTML = errinfo.fontcolor("red");
				flag = false;
			}
			return flag;
		},
		/**
		 * post方式向服务器发送数据
		 * @param {Object} url 
		 * @param {Object} arr 键值对参数
		 */
 		post :function(url,arr){
			var myForm = document.createElement("form"); 		
			myForm.method = "post"; 		
			myForm.action =url; 		
			for ( var k in arr) { 			
					var myInput = document.createElement("input"); 			
					myInput.setAttribute("name", k); 			
					myInput.setAttribute("value", arr[k]); 			
					myForm.appendChild(myInput); 		
			}
			document.body.appendChild(myForm); 		
			myForm.submit(); 		
			document.body.removeChild(myForm); 	
		},
 		/**
		 * get方式向服务器发送数据
		 * @param {Object} url 
		 * @param {Object} args 键值对参数
		 */
 		get :function(url,arr){
			var myForm = document.createElement("form"); 		
			myForm.method ="get"; 		
			myForm.action =url; 		
			for ( var k in arr) { 			
					var myInput = document.createElement("input"); 			
					myInput.setAttribute("name", k); 			
					myInput.setAttribute("value", arr[k]); 			
					myForm.appendChild(myInput); 		
			}
			document.body.appendChild(myForm); 		
			myForm.submit(); 		
			document.body.removeChild(myForm); 	
		},
		/**
		 * 给服务器发送一条数据，不需要响应
		 * @param {Object} url 
		 */
 		send :function(url){
			var myimg = document.createElement("img");						
			myimg.src=url;	
		},	

		jsonp:function Jsonp(param) {
            let ele = document,
                script = ele.createElement('script'),
                result = null,
                _url = param.url || '',
                _success = param.success || function () { },
                _error = param.error || function () { };
            if( !param.callbackName ){
                throw new Error('callbackName is required!');
            }
            window[param.callbackName] = function(){ result = arguments[0]; };

            ele.getElementsByTagName('head')[0].appendChild(script);

            script.onload = script.readystatechange = function () {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    _success(result);
                    script.onload = script.readystatechange = null;
                }else{
                    _error();
                }
            };

            script.src = _url;
        },

		/**
		 * 
		 * 用ajax向服务器发送一些数据
		 * arr为json数组
		 */
		ajaxGet:function(url,arr,callback){
			var param="";
			if(arr !=null){
				param="?";
				for(var a in arr){
					param=param+a+"="+arr[a]+"&";
				}
				param=param.slice(0,-1);
			}
			$.get(url+param,callback);
		},
		/**
		 * 纯js方式ajax请求
		 */
		xhrGet:function(url,callback,form){
			 var xhr;
			 function innetf(){
				// alert(xhr.readyState);
				//判断交互是否成功
				if(xhr.readyState==4){
					//判断状态码
					if(xhr.status==200){
						var responseTest=xhr.responseText;						
						callback(responseTest);
					}
				}	 
			 }	
			  xhr=new XMLHttpRequest();
			  xhr.onreadystatechange=innetf;
			  //可选同步还是异步
			  xhr.open("GET",url, true);				    
			  xhr.send(form);
		},
		xhrPost:function(url,callback,form){
			 var xhr;
			 function innetf(){
				// alert(xhr.readyState);
				//判断交互是否成功
				if(xhr.readyState==4){
					//判断状态码
					if(xhr.status==200){
						var responseTest=xhr.responseText;						
						callback(responseTest);
					}
				}	 
			 }	
			 /**
			  * post方式发送数据
			  */
			  xhr=new XMLHttpRequest();
			  xhr.onreadystatechange=innetf;
			  //可选同步还是异步	  
			  xhr.open("POST",url,true);
			  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			  xhr.send(form);  
		}

	};

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////内置对象功能扩展/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
	/**
	 * 格式化日期字符串
	 * @param {Object} fmt
	 */
	Date.prototype.format = function(fmt) {
	     var o = { 
	        "M+" : this.getMonth()+1,                 //月份 
	        "d+" : this.getDate(),                    //日 
	        "h+" : this.getHours(),                   //小时 
	        "m+" : this.getMinutes(),                 //分 
	        "s+" : this.getSeconds(),                 //秒 
	        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	        "S"  : this.getMilliseconds()             //毫秒 
	    }; 
	    if(/(y+)/.test(fmt)) {
	            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	    }
	     for(var k in o) {
	        if(new RegExp("("+ k +")").test(fmt)){
	             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	         }
	     }
	    return fmt; 
	}; 
	
	/**
	 * 数组获取最大值的方法。 
	 */
	Array.prototype.getMax = function(){
		var temp = 0;
		for(var x=1; x<this.length; x++){
			if(this[x]>this[temp]){
				temp = x;
			}
		}
		return this[temp];
	};
	
	/**
	 * 常用正则验证
	 */
	mingLie.res={
		"a":0,//日期格式
		"b":1,
		"c":"112"
	};	
	mingLie.res.help=function(){
		console.log("1.验证手机");
		console.log("2.验证邮箱-->^\d{6}$");
		console.log("3.xml标签-->/<[^<>]+>/g");//用于替换
	};
	
	window.M=window.mingLie = mingLie;

})(window);























