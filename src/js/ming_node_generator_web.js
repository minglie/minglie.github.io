
context={}
//实体配置
context.entity={};
context.entity.packageStr="com.ming.dao.model"

//dao配置
context.dao={};
context.dao.packageStr="com.ming.dao.mapper"

//mapper配置
context.mapper={};
context.mapper.packageStr="com.ming.dao.mapper"

//service配置
context.service={};
context.service.packageStr="com.ming.service"

//serviceImpl配置
context.serviceImpl={};
context.serviceImpl.packageStr="com.ming.service.impl";

//controller配置
context.controller={};
context.controller.packageStr="com.ming.controller"

/**
 * 根据表名获取实体名
 */
context.getEntityClassNameByTableName=function (tableName) {
    return tableName.underlineToHump().firstChartoUpper()
}
/**
 * 根据表名获取实体描述
 */
context.getEntityDescsByTableName=function (tableName) {
    return tableComment;
}

/**
 * 根据sql类型获取java类型
 */
context.getJavaTypeBySqlType=function(sqlType) {
    if(sqlType.indexOf("varchar")>=0||sqlType.indexOf("text")>=0){
        return "String";
    }else if(sqlType.indexOf("int")>=0){
        return "Integer";
    }else if(sqlType.indexOf("date")>=0 || sqlType.indexOf("time")>=0){
        return "Date";
    }else if(sqlType.indexOf("float")>=0){
        return "Float";
    }else if(sqlType.indexOf("double")>=0){
        return "Double";
    }else if(sqlType.indexOf("decimal")>=0){
        return "BigDecimal";
    }
    return "Object";
}



/**
 * 根据sql类型获取JDBC类型
 */
context.getJdbcTypeBySqlType=function(sqlType) {
    if(sqlType.indexOf("varchar")>=0||sqlType.indexOf("text")>=0){
        return "VARCHAR";
    }else if(sqlType.indexOf("int")>=0){
        return "BIGINT";
    }else if(sqlType.indexOf("date")>=0 || sqlType.indexOf("time")>=0){
        return "TIMESTAMP";
    }else if(sqlType.indexOf("double")>=0){
        return "Double";
    }else if(sqlType.indexOf("float")>=0){
        return "FLOAT";
    }else if(sqlType.indexOf("decimal")>=0){
        return "DECIMAL";
    }
    return "Object";
}


function main(text,num){
    tableName="";
    tableComment=""
    fieldList=[];
    before(text);

    if(num==0){
 w(`import java.io.Serializable;
${entity_importStr}
/**
* @author WangPengFei
* @date ${time}
*/ 
public class ${entityClassName} implements Serializable {
    private static final long serialVersionUID = 1L;
    ${propertiesStr}
    ${methodStr}
}`)
    }
	if(num==1){
w(`package ${context.dao.packageStr};

import ${context.entity.packageStr}.${entityClassName};
import com.ming.utils.Page;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;


/**
 * @author WangPengFei
 * @date ${time}
 */
@Mapper
public interface ${entityClassName}Mapper{

    /**
     * 添加
     * @param
     * @return
     */
    Integer insert(${entityClassName}  ${entityClassName1});

    /**
     * 批量添加
     * @param
     * @return
     */
    void insertBatch(@Param("${entityClassName1}List") List<${entityClassName}> ${entityClassName1}List);

    /**
     * 修改
     * @param
     * @return
     */
    Integer update(${entityClassName}  ${entityClassName1});

    /**
     * 删除
     * @param
     * @return
     */
    Integer delete(Integer id);


    /**
     * 获取所有
     * @param
     * @return
     */
    List<${entityClassName}> listAll(${entityClassName}  ${entityClassName1});


    /**
     * 根据id获取
     * @param
     * @return
     */
    ${entityClassName} getById(Integer id);


    /**
     * 分页查询
     * @param
     * @param
     * @return
     */
    List<${entityClassName}> listByPage(@Param("${entityClassName1}")${entityClassName}  ${entityClassName1}, @Param("page")Page page);

    /**
     * 根据${entityClassName1}模糊查询个数
     * @param
     * @return
     */
    Integer count(@Param("${entityClassName1}")${entityClassName}  ${entityClassName1});

    /**
     * 批量删除
     * @param
     * @return
     */
    Integer deleteAllByIds(Integer[] ids);

}
`)

      
    }
    if(num==2){
 w(`<?xml version="1.0" encoding="UTF-8"?>
 <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
 <mapper namespace="${context.dao.packageStr}.${entityClassName}Mapper">
   <resultMap id="BaseResultMap" type="${context.entity.packageStr}.${entityClassName}">
       ${mapper_resultMap}
   </resultMap>
 
   <!-- 基本列 -->
   <sql id="Base_Column_List">
     ${mapper_baseColumn}
   </sql>
 
 
   <!-- 单个插入 -->
     <insert id="insert">
         insert into ${tableName} (${mapper_baseColumn})
         values(${insertIfProps}
         )
         <selectKey resultType="java.lang.Integer" order="AFTER"
                    keyProperty="id">
             SELECT LAST_INSERT_ID()
         </selectKey>
     </insert>
 
 
     <insert id="insertBatch">
         insert into ${tableName}
         (${mapper_baseColumn})
         values
         <foreach collection="${entityClassName1}List" item="${entityClassName1}" separator=",">
             (${batchInsertIfProps}
         )
         </foreach>
     </insert>
 
 
 
   <!-- 单个更新 -->
   <update id="update">
     update ${tableName} set  ${updateColProps}
     where ID = #{id}
   </update>
 
 
   <!-- 删除 -->
   <delete id="delete">
     delete from ${tableName}
     where ID =#{id}
   </delete>
 
 
   <!-- 查询所有 -->
   <select id="listAll" resultMap="BaseResultMap">
     SELECT
     <include refid="Base_Column_List" />
     FROM ${tableName}
   </select>
 
 
   <!-- 单个查询 -->
   <select id="getById"  resultMap="BaseResultMap">
       SELECT
       <include refid="Base_Column_List" />
       FROM ${tableName}
       where ID =#{id}
   </select>
 
 
     <!--分页查询  -->
     <select id="listByPage" resultMap="BaseResultMap">
         select  <include refid="Base_Column_List" />
         from  ${tableName}
         <where>
             <if test="${entityClassName1}.id != null">
                 AND t1.id=${entityClassName1}.id
             </if>
         </where>
         <if test="page !=null">
             <if   test="page.sortField!=null and page.sortField!=''">
                 order by $\{page.sortField} $\{page.sortOrder}
             </if>
             limit  #{page.start},#{page.offset}
         </if>
     </select>
 
     <!--查询行数-->
     <select id="count" resultType="int">
         select  count(1)
         from ${tableName}
         <where>
             <if test="${entityClassName1}.id != null">
                 AND t1.id=${entityClassName1}.id
             </if>
         </where>
     </select>
 
     <!--批量删除-->
     <delete id="deleteAllByIds">
         delete from ${tableName} where id in
         <foreach  collection="array" item="i" open="(" separator="," close=")">
            #{i}
         </foreach>
     </delete>
 
 </mapper>
 
 `)      
    }
    if(num==3){
w(`package ${context.service.packageStr};

import ${context.entity.packageStr}.${entityClassName};
import com.ming.utils.Page;
import java.util.List;
import java.util.Map;


/**
 * @author WangPengFei
 * @date ${time}
 */
public interface ${entityClassName}Service {
    /**
     * 添加
     * @param
     * @return
     */
    ${entityClassName} insert(${entityClassName} ${entityClassName1});


    /**
     * 修改
     * @param
     */
    Integer update(${entityClassName} ${entityClassName1});

    /**
     * 删除
     * @param
     */
    Integer delete(Integer id);


    /**
     * 获取所有
     * @param
     */
    List<${entityClassName}> listAll(${entityClassName} ${entityClassName1});


    /**
     * 根据id获取
     * @param
     */
    ${entityClassName} getById(Integer id);


    /**
     * 分页查询
     * @param
     * @param
     * @return
     */
    Map listByPage(${entityClassName} ${entityClassName1},Page page);

    /**
     * 批量删除
     * @param
     * @return
     */
    Integer deleteAllByIds(Integer[] ids);

}

`)
              
   
    }
    if(num==4){
 w(`package ${context.serviceImpl.packageStr};

import ${context.service.packageStr}.${entityClassName}Service;
import ${context.entity.packageStr}.${entityClassName};
import ${context.dao.packageStr}.${entityClassName}Mapper;
import com.ming.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author WangPengFei
 * @date ${time}
 */
@Service
public class  ${entityClassName}ServiceImpl  implements ${entityClassName}Service{

    @Autowired
    private ${entityClassName}Mapper ${entityClassName1}Mapper;


    @Override
    public ${entityClassName} insert(${entityClassName} ${entityClassName1}) {
        Integer insert = ${entityClassName1}Mapper.insert(${entityClassName1});
        if(insert==0) {
            return null;
        } else {
            return ${entityClassName1};
        }
    }


    @Override
    public Integer update(${entityClassName} ${entityClassName1}) {
        return ${entityClassName1}Mapper.update(${entityClassName1});
    }


    @Override
    public Integer delete(Integer id) {
        return ${entityClassName1}Mapper.delete(id);
    }


    @Override
    public List<${entityClassName}> listAll(${entityClassName} ${entityClassName1}) {
        return ${entityClassName1}Mapper.listAll(${entityClassName1});
    }


    @Override
    public ${entityClassName} getById(Integer id) {
        return ${entityClassName1}Mapper.getById(id);
    }


    @Override
    public Map listByPage(${entityClassName} ${entityClassName1}, Page page) {
        int totalCount=${entityClassName1}Mapper.count(${entityClassName1});
        page.setTotalCount(totalCount);
        List<${entityClassName}> ${entityClassName1}List = ${entityClassName1}Mapper.listByPage(${entityClassName1}, page);
        Map map=new HashMap();
        map.put("rows", ${entityClassName1}List);
        map.put("total", totalCount);
        return map;
    }

    @Override
    public Integer deleteAllByIds(Integer[] ids){
        return ${entityClassName1}Mapper.deleteAllByIds(ids);
    }

}
 `)      

    }
    if(num==5){
 w(`package ${context.controller.packageStr};

import ${context.entity.packageStr}.${entityClassName};
import ${context.service.packageStr}.${entityClassName}Service;

import com.ming.utils.MessageEnums;
import com.ming.utils.Page;
import com.ming.utils.Result;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * @author WangPengFei
 * @date ${time}
 */
@RestController
@RequestMapping("/${entityClassName1}")
@Api(tags={"${entityDesc}"})
public class ${entityClassName}Controller{

    @Autowired
    private ${entityClassName}Service ${entityClassName1}Service;

    @ApiOperation(value = "查询", notes = "根据Id查询")
    @GetMapping(value = "/getById")
    public Result<${entityClassName}> getById(Integer id) {
        ${entityClassName} ${entityClassName1} =${entityClassName1}Service.getById(id);
        return new Result(MessageEnums.OPERATION_SUCCESS,${entityClassName1}) ;
    }

    @GetMapping(value ="/listAll")
    @ApiOperation(value = "获取所有", notes = "获取所有")
    public Result<List<${entityClassName}>> listAll(${entityClassName} ${entityClassName1}) {
        List<${entityClassName}> ${entityClassName1}s =${entityClassName1}Service.listAll(${entityClassName1});
        return new Result(MessageEnums.OPERATION_SUCCESS,${entityClassName1}s);
    }

    @PostMapping(value = "/add")
    @ApiOperation(value = "添加一个", notes = "添加一个")
    public Result<${entityClassName}> add(${entityClassName} ${entityClassName1}) {
        ${entityClassName} ${entityClassName1}1= ${entityClassName1}Service.insert(${entityClassName1});
        if(${entityClassName1}1==null){
            return new Result(MessageEnums.OPERATION_FAILURE,"添加失败");
        }
        return new Result(MessageEnums.OPERATION_SUCCESS,${entityClassName1}1);
    }

    @PostMapping(value = "/update")
    @ApiOperation(value="更新", notes="更新")
    public Result<String> update(${entityClassName} ${entityClassName1}){

        Integer i = ${entityClassName1}Service.update(${entityClassName1});
        return new Result(MessageEnums.OPERATION_SUCCESS,i);
    }

    @GetMapping(value = "/delete")
    @ApiOperation(value="删除", notes="根据id删除")
    public Result<String> delete(Integer id){
        Integer i =${entityClassName1}Service.delete(id);
        return new Result(MessageEnums.OPERATION_SUCCESS,i);
    }

    @GetMapping(value = "/listByPage")
    @ApiOperation(value="分页查询", notes="分页查询")
    public Result<Map> listByPage(${entityClassName} ${entityClassName1},Page page){
        Map map = ${entityClassName1}Service.listByPage(${entityClassName1}, page);
        return new Result(MessageEnums.OPERATION_SUCCESS,map);
    }

}
 `)     
    }
    if(num==6){
 w(`M = require("ming_node")

 M.host="http://127.0.0.1:8888";
 
 if(1)
 M.get0("/${entityClassName1}/listAll")
 
 
 if(0)
 M.post0("/${entityClassName1}/add", {
     id: "id"
 })
 
 
 if(0)
 M.get0("/${entityClassName1}/delete", {
     id: 40
 })
 
 
 if(0)
 M.post0("/${entityClassName1}/update", {
     id: 39
 })
 
 
 if(0)
 M.get0("/${entityClassName1}/listByPage", {
     startPage: 1,
     limit: 2
 })`)      
    }
    if(num==7){
        ddl(text);
    }
}


function before(text){
    text=text.replace(/"|'/g,"");
    let arr=text.split(/[\r\n]/g);
    field={
        fieldName:"",
        fieldType:"",
        fieldCommont:""
    }
    for (let i=0;i<arr.length;i++){
        line=arr[i].trim();
        split=line.split(/\s+/);
        if(i==0){
            tableName=split[0];
            tableComment=split[1]
        }
        if(i>0){
            let field={};
            field.column_name=split[0]
            field.column_type=split[1]
            let s=""
            for (let j=2;j<split.length;j++){
                s+=split[j];
            }
            field.column_comment=s
            fieldList.push(field)
        }
    }
    table={}
    table.tableName=tableName;
    table.tableInfo=fieldList;
    tableName=table.tableName;
    entityClassName=context.getEntityClassNameByTableName(table.tableName);
    entityDesc=context.getEntityDescsByTableName(table.tableName);
    time=new Date().format("yyyy-MM-dd");
    entity_importStr="";
    entity_importStrArray=[];
    propertiesStr="";//属性字符串
    methodStr="";//方法字符串
    mapper_baseColumn="";
    mapper_resultMap="";
    insertIfProps="";
    batchInsertIfProps=""
    updateColProps="";
    entityClassName1=entityClassName.firstChartoLower();
    table.tableInfo.forEach(
        (u,index)=>{
          javaType=context.getJavaTypeBySqlType(u.column_type);
          jdbcType=context.getJdbcTypeBySqlType(u.column_type);
          if(javaType=="Date"){
              if(entity_importStrArray.indexOf("import java.util.Date;\n")<0){
                  entity_importStrArray.push("import java.util.Date;\n");
              }
          }
          propertiesStr+=
`   
    //${u.column_comment}
    private ${javaType} ${u.column_name.underlineToHump()};`;

          methodStr+=`
    public ${javaType} get${u.column_name.firstChartoUpper().underlineToHump()}(){return ${u.column_name.underlineToHump()};}                  
    public void set${u.column_name.firstChartoUpper().underlineToHump()}(${javaType} ${u.column_name.underlineToHump()}){this.${u.column_name.underlineToHump()}=${u.column_name.underlineToHump()};}                                   
`;
         mapper_resultMap+=`
        <result column="${u.column_name}" jdbcType="${jdbcType}" property="${u.column_name.underlineToHump()}"/>`;

         mapper_baseColumn+=u.column_name;
         if(index!=table.tableInfo.length-1){
             mapper_baseColumn+=",";
         }
         if(u.column_name.underlineToHump()=="id"){
             insertIfProps += `
             null,`;
             if(index==table.tableInfo.length-1){
                 insertIfProps=insertIfProps.substr(0,insertIfProps.lastIndexOf(","));
             }

             batchInsertIfProps += `
             null,`;
             if(index==table.tableInfo.length-1){
                 batchInsertIfProps=batchInsertIfProps.substr(0,batchInsertIfProps.lastIndexOf(","));
             }
         }else {


             insertIfProps += `
         #{${u.column_name.underlineToHump()},jdbcType=${jdbcType}},`;

             if(index==table.tableInfo.length-1){
                 insertIfProps=insertIfProps.substr(0,insertIfProps.lastIndexOf(","));
             }


             batchInsertIfProps += `
             #{${entityClassName1}.${u.column_name.underlineToHump()},jdbcType=${jdbcType}},`;

                 if(index==table.tableInfo.length-1){
                     batchInsertIfProps=batchInsertIfProps.substr(0,batchInsertIfProps.lastIndexOf(","));
                 }

         }
          if(u.column_name !="id"){
              updateColProps+=`
                 ${u.column_name}=#{${u.column_name.underlineToHump()},jdbcType=${jdbcType}},`
          }
          if(index==table.tableInfo.length-1){
              updateColProps=updateColProps.substr(0,updateColProps.lastIndexOf(","));
           }
        }
    )
    //去除重复导入的包,合并字符串
    entity_importStr=entity_importStrArray.filter((element,index,self)=>self.indexOf(element) === index).join("");


     
   console.log(insertIfProps)


}



function ddl() {
    let sql=`CREATE TABLE ${tableName} (\n`;
    for (let i=0;i<fieldList.length;i++){
        let field = fieldList[i];
        if(i==0){
            sql+=`${field.column_name}  ${field.column_type} NOT NULL AUTO_INCREMENT COMMENT '${field.column_comment.replace('\r',"")}',\n`
        }else {
            sql+=`${field.column_name}  ${field.column_type}   COMMENT '${field.column_comment.replace('\r',"")}',\n`;
        }
    }
    sql+=`PRIMARY KEY (id)\n`
    sql+=`)COMMENT='${tableComment.replace('\r',"")}'`
    w(sql)
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


String.prototype.underlineToHump=function(){
    var re=/_(\w)/g;
    str=this.replace(re,function($0,$1){
        return $1.toUpperCase();
    });
    return str;
}


String.prototype.humpToUnderline=function(){
    var re=/_(\w)/g;
    str=this.replace(/([A-Z])/g,"_$1").toLowerCase();
    return str;
}

//格式化日期
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
}
