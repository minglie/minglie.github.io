(function() {












    function reloadgrid (v) {
//查询参数直接添加在queryParams中
        var queryParams = $('#resourceDataGrid').datagrid('options').queryParams;
        queryParams.name=v.name;
        queryParams.parent_id=v.parent_id;

        $('#resourceDataGrid').datagrid('options').queryParams=Object.assign(v,queryParams);
        $("#resourceDataGrid").datagrid('reload');
    }


    function init(){
        $('#resourceDataGrid').datagrid({
            url:"/listByPage",
            width:10000,
            rownumbers:true,//使能行号列
            toolbar:"#resourceDataGridToolButton",//顶部显示的工具栏
            pagination:true,//显示分页工具栏
            pageSize:20,//在设置分页属性的时候初始化页面大小。
            pageList:[20,30,40,50],//在设置分页属性的时候 初始化页面大小选择列表。
//行样式
            rowStyler:function(rowIndex,rowData){
                if(rowData.id%2==0){
                    return "background-color:pink";
                }
            },
//列
            columns:[[
                {checkbox:true},
                {field:'id',title:'id',width:100},
                {field:'parent_id',title:'父id',width:100},
                {field:'name',title:'资源名字',width:200},
                {field:'res_url',title:'资源地址',width:800,formatter: function(value,row,index){
                        return `<a href="${value}">${value}</a>`;

                    }
                }
            ]]
        });


        $('#leftMeau').datagrid({
            url:"/listAllRoot",
//pagination:true,//显示分页工具栏
            singleSelect:true,
//列
            columns:[[
                {checkbox:false},
                {field:'id',title:'id',width:50},
                {field:'name',title:'类别',width:200}
            ]],
            onClickRow:function (index, row) {
                $("#resourceDataGridToolButton [name='search']").click();
            }
        });


    }


//初始化myDataGridEND
//初始化添加对话框START
    function initAddDialog(){
//添加对话框
        $('#addDialog').dialog({
            title: '添加资源',
            width: 600,
            height: 200,
            closed: true,
            cache: false,
            modal: true ,
            buttons:"#addDialogButtons"
        });
    }
//初始化添加对话框END



//初始化修改对话框START
    function initUpdateDialog(){
//修改对话框
        $('#updateDialog').dialog({
            title: '修改资源',
            width: 600,
            height: 200,
            closed: true,
            cache: false,
            modal: true ,
            buttons:"#updateDialogButtons"
        });

    }
//初始化修改对话框END


//事件绑定START
    $(function(){
//DataGrid添加按钮
        $("#resourceDataGridToolButton [name='add']").click(
            function(){
                var row=$('#leftMeau').datagrid("getSelections");
                console.log(row);
                if(row.length>0){
                    $("#addDialog [name='parent_id']").val(row[0].id);
                }else{
                    $("#addDialog [name='parent_id']").val(-1);
                }
                $('#addDialog').dialog("open");//打开添加对话框
            }
        );

//DataGrid删除按钮
        $("#resourceDataGridToolButton [name='remove']").click(function() {

            var row = $('#resourceDataGrid').datagrid("getSelections");
            if (row.length > 0) {
                $.messager.confirm('温馨提示', '确认删除选择的内容？', function(r) {
                    if(r){
                        let ids=row.map(u=>u.id);
                        M.IO.delete({ids});
                        $('#resourceDataGrid').datagrid('reload');// 重新载入数据
                    }
                });
                return;
            }

            var row = $('#leftMeau').datagrid("getSelections");
            if (row.length == 1) {
                $.messager.confirm('温馨提示', '确认删除选择的内容？'+JSON.stringify(row), function(r) {
                    if(r){
                        let ids=row.map(u=>u.id);
                        M.IO.delete({ids});
                        $('#resourceDataGrid').datagrid('reload');// 重新载入数据
                        $('#leftMeau').datagrid('reload');// 重新载入数据
                    }
                });

            }

        });



        $("#resourceDataGridToolButton [name='search']").click(function() {
            var row = $('#leftMeau').datagrid("getSelections");
            if (row.length == 0) {
                reloadgrid ({name:$("#proBidSectionone").val()})
            } else {

                reloadgrid({name: $("#proBidSectionone").val(), parent_id: row[0].id})
            }
        });





        $("#resourceDataGridToolButton [name='downDate']").click(function() {
            M.doSql("select * from resource;",
                (d)=>{
                    M.fileDownload(JSON.stringify(d.data[0]),"data.json");
                }
            )
        });



        $("#resourceDataGridToolButton [name='uploadLoadDate']").click(function() {

            var objFile = document.getElementById("uploadLoadFileId");
            if(objFile.value == "") {
                alert("不能空")
            }


            var files = $('#uploadLoadFileId').prop('files');//获取到文件列表
            if(files.length == 0){
                alert('请选择文件');
            }else{
                var reader = new FileReader();//新建一个FileReader
                reader.readAsText(files[0], "UTF-8");//读取文件
                reader.onload = function(evt){ //读取完文件之后会回来这里
                    var fileString = evt.target.result; // 读取文件内容
                    var list=JSON.parse(fileString);
                        let sql="";
                       for(let i=0;i<list.length;i++){
                           let oi=list[i];
                           sql= sql+M.Db().getInsertObjSql("resource",oi)+";"
                       }
                     M.doSql(sql,
                        (d)=>{
                            alert(JSON.stringify(d));
                        }
                    )


                }
            }


        });



//DataGrid修改按钮
        $("#resourceDataGridToolButton [name='update']").click(
            function(){

                row=$('#resourceDataGrid').datagrid("getSelections");
                if(row.length==1){
                    $("#updateDialog [name='res_id']").val(row[0].id);
                    $("#updateDialog [name='res_url']").val(row[0].res_url);
                    $("#updateDialog [name='parent_id']").val(row[0].parent_id);
                    $("#updateDialog [name='name']").val(row[0].name);
                    $('#updateDialog').dialog("open");//打开添加对话框
                    return;
                }

                var row=$('#leftMeau').datagrid("getSelections");
                if(row.length==1){
                    $("#updateDialog [name='res_id']").val(row[0].id);
                    $("#updateDialog [name='res_url']").val(row[0].res_url);
                    $("#updateDialog [name='parent_id']").val(row[0].parent_id);
                    $("#updateDialog [name='name']").val(row[0].name);
                    $('#updateDialog').dialog("open");//打开添加对话框

                }else{//不是选择了一行
                    $.messager.alert('我的消息','请选择一行进行修改！','info');
                }



            }
        );


//添加对话框上的添加按钮
        $("#addDialogButtons [name='add']").click(
            function(){
                var name=$("#addForm [name='name']").val();
                var res_url=$("#addForm [name='res_url']").val();
                parent_id=$("#addForm [name='parent_id']").val();
                M.IO.add(
                    {
                        parent_id,
                        res_url,
                        name
                    }
                ).then((d)=>{
                    if(d.success==false){
                        $.messager.alert('我的消息',d.data,'info');
                    }
                });
                $('#resourceDataGrid').datagrid('reload');// 重新载入数据

                if(parent_id==-1){
                    $('#leftMeau').datagrid('reload');// 重新载入数据
                }
                $('#addDialog').dialog("close");//关闭添加对话框
            }
        );

//添加对话框上的取消按钮
        $("#addDialogButtons [name='cancel']").click(
            function(){
                $('#addDialog').dialog("close");//关闭添加对话框
            }
        );

//更改对话框上的 更改按钮
        $("#updateDialogButtons [name='update']").click(
            function(){
                var id=$("#updateForm [name='res_id']").val();
                var name=$("#updateForm [name='name']").val();
                var res_url=$("#updateForm [name='res_url']").val();
                M.IO.update(
                    {
                        id,
                        res_url,
                        name
                    }
                );
                $('#resourceDataGrid').datagrid('reload');// 重新载入数据
                $('#leftMeau').datagrid('reload');// 重新载入数据
                $('#updateDialog').dialog("close");//关闭添加对话框
            }
        );

//更改对话框上的取消按钮
        $("#updateDialogButtons [name='cancel']").click(
            function(){
                $('#updateDialog').dialog("close");
            }
        );
    });
//事件绑定END

//页面初始化
    $(function(){
        init();//初始化DataGrid
        initAddDialog();//初始化添加对话框
        initUpdateDialog();//初始化修改对话框
    })

})();
