
tabNameCn="";

function main(text,num){
    if(num==0){
        mainA(text);
    }
	if(num==1){
        entityInit(text);
    }
    if(num==2){
        mainC(text);
    }
    if(num==3){
        jsonToJavaInit(text);
    }
}

function mainA(text){
    var text=text.replace(/\t/g,"@");
    var tabName=/^(\w*)@/.exec(text)[1];
    if(tabName.trim()=="id"){
    	arr=text.split(/[\r\n]/g);
        main1(arr);
	}else{
        arr=text.split(/[\r\n]/g);
        main2(arr);
	}
}



//有tableName
function main2(arr){
    var tabName=/^(\w*)@/.exec(arr[0])[1];


     if(!arr[arr.length-1]){
         arr.length--;
     }
    w("CREATE TABLE "+tabName+"(\n");
    for(i=0;i<arr.length;i++){
        var arr1=arr[i].split("@");
        arr1.shift(1);
        //console.log(arr1);
        if(arr1[1]=="varchar"){
            arr1[1]="varchar(200)";
        }
        var hang="     "+arr1[0]+"  "+arr1[1];
        if(arr1[0]=="id"){
            hang=hang+" not null primary key auto_increment  "
        }
        hang =hang +"  comment '"+ arr1[4]+"'";

        if(i<arr.length-1){
            hang=hang+",";
        }
        w(hang);
    }
    w(")comment='"+tabNameCn+"';");
}

//无tableName
function main1(arr){
	//把tab键换成@	
    var tabName=RndNum(2);
    w("CREATE TABLE Table"+tabName+"(\n");
     for(i=0;i<arr.length;i++){
     	var arr1=arr[i].split("@");
     	//console.log(arr1);
     	if(arr1[1]=="varchar"){
   			arr1[1]="varchar(200)";   			
   		}
 		var hang="     "+arr1[0]+"  "+arr1[1];
         if(arr1[0]=="id"){
             hang=hang+" primary key "
         }
 		hang =hang +"  comment '"+ arr1[4]+"'";
 		if(i<arr.length-1){
 			hang=hang+",";
 		}
 		w(hang);	
     }
     w(")");  
}


//产生随机数函数
function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}

//单表OK
//去掉数据表()
function main66(text){
    var text=text.replace(/\t/g,"@");
    arr=text.split(/[\r\n]/g);
     tabNameCn=/^数据表(.*)@字段名/.exec(arr[0])[1];
    w("-- "+tabNameCn);
    arr.shift(1);
    main2(arr,"ss");
}


function mainC(text){
     text=text.replace(/数据表/g,"#数据表");
     var arr=text.split("#");
     arr.shift(1);
     for(var i=0;i<arr.length;i++){
     	main66(arr[i]);
     }
}

//实体初始化
function entityInit(text){
      text=text.removeBlankLine();
      text=text.removeBlankAtFenhao();
      var className=/^public\s+class\s+(\w*)/.exec(text);
      className=className?className[1]:"Ming_";
      var obj=className.firstChartoLower();
		w(className+" "+obj+"=new "+className+"();");
      var arr=text.split(/[\r\n]/g);
      for(i=0;i<arr.length;i++){
       var type="";var arg="";
        if(arr[i].search(/(Integer)/i)>0)  arg="1";
        else if(arr[i].search(/(String)/i)>0){
        	  arg=arr[i].replace(/\s+/g, " ").trim();
    	      arg=/(\w+);/.exec(arr[i])[1];     
    	      arg="\""+arg+"\""
        }else if(arr[i].search(/(Date)/i)>0){
        	  arg="new Date()";
        }
        try {
            arr[i]=arr[i].replace(/\s+/g, " ").trim();
            arr[i]=/(\w+);/.exec(arr[i])[1]+"(";
            arr[i]=arr[i].firstChartoUpper();
            arr[i]=obj+".set"+arr[i]+arg+");";
            w(arr[i]);
        }catch (e){
        }

   }
   w("String s = JSONUtils.toJson("+obj+");");
   w("M.in(s);");
}

function jsonToJavaInit(text){
    text=text.removeBlankLine();
    text=text.removeBlankAtFenhao();
    var jsonStr=text.substring(text.indexOf("{"),text.length) ;
    var className=text.split("{")[0]||"Object";
    eval(`var jsonObj=${jsonStr}`);
    w(`${className} ${className.firstChartoLower()}=new ${className}();`);

    var fields="(";
    var values="(";
    for(let field in jsonObj){
        w(`${className.firstChartoLower()}.set${field.firstChartoUpper()}("${jsonObj[field]}");`);
    }

}



//移除空行
String.prototype.removeBlankLine=function(){	
	 return  this.replace(/\n(\s)*( )*(\s)*/g,"\n");
};

//移除分号多余空格
String.prototype.removeBlankAtFenhao=function(){
    return  this.replace(/(\s)*;/g,";");
};


//首字母变大写
String.prototype.firstChartoUpper=function() {  
    return this.replace(/^([a-z])/g, function(word) {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    }); 
};

//首字母变小写
String.prototype.firstChartoLower=function() {
    return this.replace(/^([A-Z])/g, function(word) {
        return word.replace(word.charAt(0), word.charAt(0).toLowerCase());
    });
};
