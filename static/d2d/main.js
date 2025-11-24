let F={};
let F_fileName=window.location.hash.replaceAll("#","");
if(F_fileName.startsWith("http")){
    F=await import(F_fileName);
}else {
  F=await import("./"+window.location.hash.replaceAll("#","")+".js")
}
M.leftIsJson= F.default.leftLanguage==null || F.default.leftLanguage=="json"
M.rightIsJson= F.default.rightLanguage==null || F.default.rightLanguage=="json"
M.F=F;
M.htmlResult=(resutHtml)=>{
    document.querySelector("#resultId").innerHTML=resutHtml;
}
require.config({
    baseUrl: 'https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/js/lib/monacoeditor/', paths: { 'vs': 'min/vs' }
});
require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('left'), {
        value: [
            M.leftIsJson?  `${JSON.stringify(F.default.input,null,5)}`:F.default.input
        ].join('\n'),
        language: M.leftIsJson?'json': F.default.leftLanguage,
        theme:'vs-dark',
        automaticLayout:true,
        scrollbar: {
            useShadows:false,
            vertical:'visible',
            horizontal:'visible',
            horizontalSliderSize:5,
            verticalSliderSize:5,
            horizontalScrollbarSize:15,
            verticalScrollbarSize:15,
        },
        quickSuggestions:true,
        overviewRulerBorder:true,
        minimap: {
            enabled:false
        }
    });

    M.left_editor=editor;
});
require(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('right'), {
        value: [
            M.rightIsJson? `${JSON.stringify(F.default.output,null,5)}`:F.default.output
        ].join('\n'),
        language: M.rightIsJson? 'json':F.default.rightLanguage,
        theme:'vs-dark',
        automaticLayout:true,
        scrollbar: {
            useShadows:false,
            vertical:'visible',
            horizontal:'visible',
            horizontalSliderSize:5,
            verticalSliderSize:5,
            horizontalScrollbarSize:15,
            verticalScrollbarSize:15,
        },
        quickSuggestions:true,
        overviewRulerBorder:true,
        minimap: {
            enabled:false
        }
    });

    M.right_editor=editor;
});
helpId.innerHTML=F.default.help;



btn.onclick=async function () {
    let input=M.leftIsJson?JSON.parse(M.left_editor.getValue()):M.left_editor.getValue();
    let r=await F.default.main(input);
    //console.log(r,"AA")
    if(M.rightIsJson){
        r=JSON.stringify(r,null,5);
    }
    M.right_editor.setValue(r);
}
var resize = document.getElementById("resize");
var left = document.getElementById("left");
var right = document.getElementById("right");
var box = document.getElementById("box");
resize.onmousedown = function(e){
    var startX = e.clientX;
    resize.left = resize.offsetLeft;
    document.onmousemove = function(e){
        var endX = e.clientX;
        var moveLen = resize.left + (endX - startX);
        var maxT = box.clientWidth - resize.offsetWidth;
        if(moveLen<150) moveLen = 150;
        if(moveLen>maxT-150) moveLen = maxT-150;
        resize.style.left = moveLen;
        left.style.width = moveLen + "px";
        right.style.width = (box.clientWidth - moveLen - 5) + "px";
        //console.log(right.style.width,"WW")
        fetch(right.style.width)
    }
    document.onmouseup = function(evt){
        document.onmousemove = null;
        document.onmouseup = null;
        resize.releaseCapture && resize.releaseCapture();
    }
    resize.setCapture && resize.setCapture();
    return false;
}

