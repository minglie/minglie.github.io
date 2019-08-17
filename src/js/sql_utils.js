
tabNameCn="";

function main(text,num){
    if(num==0){
        num0(text)
    }
	if(num==1){
        num1(text)
    }
    if(num==2){

    }
    if(num==3){

    }
}

function num0(text) {
    text=text.removeBlankLine();
    arr=text.split(/[\r\n]/g);

    w("select ");
    w(arr.map(u=>u));
    w("from table where 1=1;")
}
function num1(text) {
    text=text.removeBlankLine();
    arr=text.split(/[\r\n]/g);

    w("select ");
    w(arr.map(u=>u+" "+u.underlineToHump()));
    w("from table where 1=1;")
}















//移除空行
String.prototype.removeBlankLine=function(){	
	 return  this.replace(/\n(\s)*( )*(\s)*/g,"\n");
};

//移除分号多余空格
String.prototype.removeBlankAtFenhao=function(){
    return  this.replace(/(\s)*;/g,";");
};

/***
 * 下划线命名转为驼峰命名
 */
String.prototype.underlineToHump=function(){
    var re=/_(\w)/g;
    str=this.replace(re,function($0,$1){
        return $1.toUpperCase();
    });
    return str;
};

/***
 * 驼峰命名转下划线
 */
String.prototype.humpToUnderline=function(){
    var re=/_(\w)/g;
    str=this.replace(/([A-Z])/g,"_$1").toLowerCase();
    return str;
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