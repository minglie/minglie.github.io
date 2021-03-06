
context = {}
/**
 * 根据表名获取实体名
 */
context.getEntityClassNameByTableName = function (tableName) {
    return tableName.underlineToHump().firstChartoUpper()
}
/**
 * 根据表名获取实体描述
 */
context.getEntityDescsByTableName = function (tableName) {
    return tableComment;
}

/**
 * 根据sql类型获取java类型
 */
context.getJavaTypeBySqlType = function (sqlType) {
    sqlType=sqlType.toLowerCase();
    if (sqlType.indexOf("string") >= 0 || sqlType.indexOf("varchar") >= 0 || sqlType.indexOf("text") >= 0) {
        return "String";
    }  else if (sqlType.indexOf("bigint") >= 0) {
        return "Long";
    }else if (sqlType.indexOf("int") >= 0) {
        return "Integer";
    } else if (sqlType.indexOf("date") >= 0 || sqlType.indexOf("time") >= 0) {
        return "Date";
    } else if (sqlType.indexOf("float") >= 0) {
        return "Float";
    } else if (sqlType.indexOf("double") >= 0) {
        return "Double";
    } else if (sqlType.indexOf("decimal") >= 0) {
        return "BigDecimal";
    }
    return "Object";
}



/**
 * 根据sql类型获取JDBC类型
 */
context.getJdbcTypeBySqlType = function (sqlType) {
	sqlType=sqlType.toLowerCase();
    if (sqlType.indexOf("string") >= 0 || sqlType.indexOf("varchar") >= 0 || sqlType.indexOf("text") >= 0) {
        return "VARCHAR";
    } else if (sqlType.indexOf("int") >= 0) {
        return "BIGINT";
    } else if (sqlType.indexOf("date") >= 0 || sqlType.indexOf("time") >= 0) {
        return "TIMESTAMP";
    } else if (sqlType.indexOf("double") >= 0) {
        return "DOUBLE";
    } else if (sqlType.indexOf("float") >= 0) {
        return "FLOAT";
    } else if (sqlType.indexOf("decimal") >= 0) {
        return "DECIMAL";
    }
    return "Object";
}









function main(text, num) {
    tableName = "";
    tableComment = ""
    fieldList = [];
    before(text);

    if (num == 0) {
        w(`package ${context.entity.packageStr};
import java.io.Serializable;
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
    if (num == 1) {
        w(`package ${context.dao.packageStr};
import ${context.entity.packageStr}.${entityClassName};
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
    void batchInsert(@Param("${entityClassName1}List") List<${entityClassName}> ${entityClassName1}List);

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
    Integer delete(Long id);


    /**
     * 获取所有
     * @param
     * @return
     */
    List<${entityClassName}> listAll();


    /**
     * 根据id获取
     * @param
     * @return
     */
    ${entityClassName} getById(Long id);

 

}
`)


    }
    if (num == 2) {
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
         <selectKey resultType="java.lang.Long" order="AFTER"
                    keyProperty="id">
             SELECT LAST_INSERT_ID()
         </selectKey>
     </insert>
 
 
     <insert id="batchInsert">
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
 
 
 
 </mapper>
 
 `)
    }
    if (num == 3) {
        w(`package ${context.service.packageStr};
import ${context.entity.packageStr}.${entityClassName};
import java.util.List;


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
    Integer delete(Long id);


    /**
     * 获取所有
     * @param
     */
    List<${entityClassName}> listAll();


    /**
     * 根据id获取
     * @param
     */
    ${entityClassName} getById(Long id);

}
`)


    }
    if (num == 4) {
        w(`package ${context.serviceImpl.packageStr};
import ${context.service.packageStr}.${entityClassName}Service;
import ${context.entity.packageStr}.${entityClassName};
import ${context.dao.packageStr}.${entityClassName}Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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
        ${entityClassName1}Mapper.insert(${entityClassName1});
         return ${entityClassName1}; 
    }


    @Override
    public Integer update(${entityClassName} ${entityClassName1}) {
        return ${entityClassName1}Mapper.update(${entityClassName1});
    }


    @Override
    public Integer delete(Long id) {
        return ${entityClassName1}Mapper.delete(id);
    }


    @Override
    public List<${entityClassName}> listAll() {
        return ${entityClassName1}Mapper.listAll();
    }


    @Override
    public ${entityClassName} getById(Long id) {
        return ${entityClassName1}Mapper.getById(id);
    }
}
 `)

    }
    if (num == 5) {
        w(`package ${context.controller.packageStr};
import ${context.entity.packageStr}.${entityClassName};
import ${context.service.packageStr}.${entityClassName}Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * @author WangPengFei
 * @date ${time}
 */
@RestController
@RequestMapping("/${entityClassName1}")
public class ${entityClassName}Controller{

    @Autowired
    private ${entityClassName}Service ${entityClassName1}Service;


    @GetMapping(value = "/getById")
    public ${entityClassName} getById(Long id) {
        ${entityClassName} ${entityClassName1} =${entityClassName1}Service.getById(id);
        return ${entityClassName1};
    }

    @GetMapping(value ="/listAll")
    public List<${entityClassName}> listAll() {
        List<${entityClassName}> ${entityClassName1}s =${entityClassName1}Service.listAll();
        return  ${entityClassName1}s;
    }

    @PostMapping(value = "/add")
    public ${entityClassName} add(${entityClassName} ${entityClassName1}) {
        ${entityClassName} ${entityClassName1}1= ${entityClassName1}Service.insert(${entityClassName1});
        if(${entityClassName1}1==null){
            return null;
        }
        return ${entityClassName1}1;
    }

    @PostMapping(value = "/update")
    public String update(${entityClassName} ${entityClassName1}){

        Integer i = ${entityClassName1}Service.update(${entityClassName1});
        return i+"";
    }

    @GetMapping(value = "/delete")
    public String delete(Long id){
        Integer i =${entityClassName1}Service.delete(id);
        return i+"";
    }
}
 `)
    }


if(num==6){
    w(`package com.${projectNameId.value};
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }

}
    `)
}

if(num==7){
    w(`server.port=8888
spring.datasource.url =jdbc:mysql://127.0.0.1:3306/ming-lie
spring.datasource.username=root
spring.datasource.password=123456


# mybatis
mybatis.mapper-locations=mybatis/*Mapper.xml
logging.level.com.${projectNameId.value}.dao=debug
    `)}

if(num==8){
    w("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<configuration>\n" +
    "    <property name=\"server_name\" value=\"operation\" />\n" +
    "    <property name=\"log_dir\" value=\"/data/logs/operation-service\" />\n" +
    "    <property name=\"maxFileSize\" value=\"50MB\" />\n" +
    "    <property name=\"maxHistory\" value=\"180\" />\n" +
    "\n" +
    "    <!-- 控制台输出 -->\n" +
    "    <appender name=\"STDOUT\" class=\"ch.qos.logback.core.ConsoleAppender\">\n" +
    "        <encoder class=\"ch.qos.logback.classic.encoder.PatternLayoutEncoder\">\n" +
    "            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->\n" +
    "            <pattern>%date [%thread] %-5level %logger %msg%n</pattern>\n" +
    "        </encoder>\n" +
    "    </appender>\n" +
    "\n" +
    "    <!-- info日志 appender  -->\n" +
    "    <appender name=\"INFO\" class=\"ch.qos.logback.core.rolling.RollingFileAppender\">\n" +
    "        <rollingPolicy class=\"ch.qos.logback.core.rolling.TimeBasedRollingPolicy\">\n" +
    "            <!-- 按天回滚 daily -->\n" +
    "            <fileNamePattern>${log_dir}/${server_name}-info-%d{yyyy-MM-dd}-%i.log</fileNamePattern>\n" +
    "            <!-- 日志最大的历史 180天 -->\n" +
    "            <maxHistory>${maxHistory}</maxHistory>\n" +
    "            <timeBasedFileNamingAndTriggeringPolicy class=\"ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP\">\n" +
    "                <!-- maxFileSize:这是活动文件的大小，默认值是10MB，这里设置为50MB -->\n" +
    "                <maxFileSize>${maxFileSize}</maxFileSize>\n" +
    "            </timeBasedFileNamingAndTriggeringPolicy>\n" +
    "        </rollingPolicy>\n" +
    "        <encoder class=\"ch.qos.logback.classic.encoder.PatternLayoutEncoder\">\n" +
    "            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->\n" +
    "            <pattern>%date{yyyy-MM-dd HH:mm:ss}%msg%n</pattern>\n" +
    "        </encoder>\n" +
    "        <filter class=\"ch.qos.logback.classic.filter.LevelFilter\">\n" +
    "            <!-- 只打印info日志 -->\n" +
    "            <level>INFO</level>\n" +
    "            <onMatch>ACCEPT</onMatch>\n" +
    "            <onMismatch>DENY</onMismatch>\n" +
    "        </filter>\n" +
    "    </appender>\n" +
    "\n" +
    "    <!-- 出错日志 appender  -->\n" +
    "    <appender name=\"ERROR\" class=\"ch.qos.logback.core.rolling.RollingFileAppender\">\n" +
    "        <rollingPolicy class=\"ch.qos.logback.core.rolling.TimeBasedRollingPolicy\">\n" +
    "            <!-- 按天回滚 daily -->\n" +
    "            <fileNamePattern>${log_dir}/${server_name}-error-%d{yyyy-MM-dd}-%i.log</fileNamePattern>\n" +
    "            <!-- 日志最大的历史 180天 -->\n" +
    "            <maxHistory>${maxHistory}</maxHistory>\n" +
    "            <timeBasedFileNamingAndTriggeringPolicy class=\"ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP\">\n" +
    "                <!-- maxFileSize:这是活动文件的大小，默认值是10MB，这里设置为50MB -->\n" +
    "                <maxFileSize>${maxFileSize}</maxFileSize>\n" +
    "            </timeBasedFileNamingAndTriggeringPolicy>\n" +
    "        </rollingPolicy>\n" +
    "        <encoder class=\"ch.qos.logback.classic.encoder.PatternLayoutEncoder\">\n" +
    "            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->\n" +
    "            <pattern>%msg%n</pattern>\n" +
    "        </encoder>\n" +
    "        <filter class=\"ch.qos.logback.classic.filter.LevelFilter\">\n" +
    "            <!-- 只打印错误日志 -->\n" +
    "            <level>ERROR</level>\n" +
    "            <onMatch>ACCEPT</onMatch>\n" +
    "            <onMismatch>DENY</onMismatch>\n" +
    "        </filter>\n" +
    "    </appender>\n" +
    "\n" +
    "\n" +
    "    <!--控制台和日志文件输出级别-->\n" +
    "    <root level=\"INFO\" additivity = \"false\">\n" +
    "        <appender-ref ref=\"STDOUT\" />\n" +
    "        <appender-ref ref=\"INFO\" />\n" +
    "        <appender-ref ref=\"ERROR\" />\n" +
    "    </root>\n" +
    "\n" +
    "</configuration>\n" +
    "\n");
}
if(num==9){
    w("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
    "         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\">\n" +
    "    <modelVersion>4.0.0</modelVersion>\n" +
    "    <parent>\n" +
    "        <groupId>org.springframework.boot</groupId>\n" +
    "        <artifactId>spring-boot-starter-parent</artifactId>\n" +
    "        <version>2.0.1.RELEASE</version>\n" +
    "        <relativePath/> <!-- lookup parent from repository -->\n" +
    "    </parent>\n" +
    "    <groupId>ming</groupId>\n" +
    "    <artifactId>demo</artifactId>\n" +
    "    <version>0.0.1-SNAPSHOT</version>\n" +
    "    <name>demo</name>\n" +
    "    <description>Demo project for Spring Boot</description>\n" +
    "\n" +
    "    <properties>\n" +
    "        <java.version>1.8</java.version>\n" +
    "    </properties>\n" +
    "\n" +
    "    <dependencies>\n" +
    "        <dependency>\n" +
    "            <groupId>org.springframework.boot</groupId>\n" +
    "            <artifactId>spring-boot-starter-web</artifactId>\n" +
    "        </dependency>\n" +
    "\n" +
    "        <dependency>\n" +
    "            <groupId>org.springframework.boot</groupId>\n" +
    "            <artifactId>spring-boot-starter-test</artifactId>\n" +
    "            <scope>test</scope>\n" +
    "        </dependency>\n" +
    "\n" +
    "        <dependency>\n" +
    "            <groupId>com.alibaba</groupId>\n" +
    "            <artifactId>fastjson</artifactId>\n" +
    "            <version>1.2.55</version>\n" +
    "        </dependency>\n" +
    "\n" +
    "        <dependency>\n" +
    "            <groupId>org.mybatis.spring.boot</groupId>\n" +
    "            <artifactId>mybatis-spring-boot-starter</artifactId>\n" +
    "            <version>1.3.2</version>\n" +
    "        </dependency>\n" +
    "\n" +
    "        <dependency>\n" +
    "            <groupId>mysql</groupId>\n" +
    "            <artifactId>mysql-connector-java</artifactId>\n" +
    "            <version>5.1.46</version>\n" +
    "        </dependency>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </dependencies>\n" +
    "\n" +
    "    <build>\n" +
    "        <plugins>\n" +
    "            <plugin>\n" +
    "                <groupId>org.springframework.boot</groupId>\n" +
    "                <artifactId>spring-boot-maven-plugin</artifactId>\n" +
    "            </plugin>\n" +
    "        </plugins>\n" +
    "    </build>\n" +
    "\n" +
    "\n" +
    "</project>\n");
}

    if (num == 10) {
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
    if (num == 11) {
        ddl(text);
    }
    
}


function before(text) {

//实体配置
context.entity = {};
context.entity.packageStr = `com.${projectNameId.value}.dao.model`

//dao配置
context.dao = {};
context.dao.packageStr = `com.${projectNameId.value}.dao.mapper`

//mapper配置
context.mapper = {};
context.mapper.packageStr = `com.${projectNameId.value}.dao.mapper`

//service配置
context.service = {};
context.service.packageStr = `com.${projectNameId.value}.service`

//serviceImpl配置
context.serviceImpl = {};
context.serviceImpl.packageStr = `com.${projectNameId.value}.service.impl`;

//controller配置
context.controller = {};
context.controller.packageStr = `com.${projectNameId.value}.controller`









    text = text.replace(/"|'/g, "");
    let arr = text.split(/[\r\n]/g);
    field = {
        fieldName: "",
        fieldType: "",
        fieldCommont: ""
    }
    for (let i = 0; i < arr.length; i++) {
        line = arr[i].trim();
        split = line.split(/\s+/);
        if (i == 0) {
            tableName = split[0];
            tableComment = split[1]
        }
        if (i > 0) {
            let field = {};
            field.column_name = split[0]
            field.column_type = split[1]
            let s = ""
            for (let j = 2; j < split.length; j++) {
                s += split[j];
            }
            field.column_comment = s
            fieldList.push(field)
        }
    }
    table = {}
    table.tableName = tableName;
    table.tableInfo = fieldList;
    tableName = table.tableName;
    entityClassName = context.getEntityClassNameByTableName(table.tableName);
    entityDesc = context.getEntityDescsByTableName(table.tableName);
    time = new Date().format("yyyy-MM-dd");
    entity_importStr = "";
    entity_importStrArray = [];
    propertiesStr = "";//属性字符串
    methodStr = "";//方法字符串
    mapper_baseColumn = "";
    mapper_resultMap = "";
    insertIfProps = "";
    batchInsertIfProps = ""
    updateColProps = "";
    entityClassName1 = entityClassName.firstChartoLower();
    table.tableInfo.forEach(
        (u, index) => {
            javaType = context.getJavaTypeBySqlType(u.column_type);
            jdbcType = context.getJdbcTypeBySqlType(u.column_type);
            if (javaType == "Date") {
                if (entity_importStrArray.indexOf("import java.util.Date;\n") < 0) {
                    entity_importStrArray.push("import java.util.Date;\n");
                }
            }
            propertiesStr +=
                `   
    /**
     * ${u.column_comment}
     */
    private ${javaType} ${u.column_name.underlineToHump()};`;

            methodStr += `
    public ${javaType} get${u.column_name.firstChartoUpper().underlineToHump()}(){return ${u.column_name.underlineToHump()};}                  
    public void set${u.column_name.firstChartoUpper().underlineToHump()}(${javaType} ${u.column_name.underlineToHump()}){this.${u.column_name.underlineToHump()}=${u.column_name.underlineToHump()};}                                   
`;
            mapper_resultMap += `
        <result column="${u.column_name}" jdbcType="${jdbcType}" property="${u.column_name.underlineToHump()}"/>`;

            mapper_baseColumn += u.column_name;
            if (index != table.tableInfo.length - 1) {
                mapper_baseColumn += ",";
            }
            if (u.column_name.underlineToHump() == "id") {
                insertIfProps += `
             null,`;
                if (index == table.tableInfo.length - 1) {
                    insertIfProps = insertIfProps.substr(0, insertIfProps.lastIndexOf(","));
                }

                batchInsertIfProps += `
             null,`;
                if (index == table.tableInfo.length - 1) {
                    batchInsertIfProps = batchInsertIfProps.substr(0, batchInsertIfProps.lastIndexOf(","));
                }
            } else {


                insertIfProps += `
         #{${u.column_name.underlineToHump()},jdbcType=${jdbcType}},`;

                if (index == table.tableInfo.length - 1) {
                    insertIfProps = insertIfProps.substr(0, insertIfProps.lastIndexOf(","));
                }


                batchInsertIfProps += `
             #{${entityClassName1}.${u.column_name.underlineToHump()},jdbcType=${jdbcType}},`;

                if (index == table.tableInfo.length - 1) {
                    batchInsertIfProps = batchInsertIfProps.substr(0, batchInsertIfProps.lastIndexOf(","));
                }

            }
            if (u.column_name != "id") {
                updateColProps += `
                 ${u.column_name}=#{${u.column_name.underlineToHump()},jdbcType=${jdbcType}},`
            }
            if (index == table.tableInfo.length - 1) {
                updateColProps = updateColProps.substr(0, updateColProps.lastIndexOf(","));
            }
        }
    )
    //去除重复导入的包,合并字符串
    entity_importStr = entity_importStrArray.filter((element, index, self) => self.indexOf(element) === index).join("");



    console.log(insertIfProps)


}



function ddl() {
    let sql = `CREATE TABLE ${tableName} (\n`;
    for (let i = 0; i < fieldList.length; i++) {
        let field = fieldList[i];
        if (i == 0) {
            sql += `  ${field.column_name}  ${field.column_type} NOT NULL AUTO_INCREMENT COMMENT '${field.column_comment.replace('\r', "")}',\n`
        } else {
            sql += `  ${field.column_name}  ${field.column_type}   COMMENT '${field.column_comment.replace('\r', "")}',\n`;
        }
    }
    sql += `  PRIMARY KEY (id)\n`
    sql += `)COMMENT='${tableComment.replace('\r', "")}'`
    w(sql)
}





























//移除空行
String.prototype.removeBlankLine = function () {
    return this.replace(/\n(\s)*( )*(\s)*/g, "\n");
};

//移除分号多余空格
String.prototype.removeBlankAtFenhao = function () {
    return this.replace(/(\s)*;/g, ";");
};


//首字母变大写
String.prototype.firstChartoUpper = function () {
    return this.replace(/^([a-z])/g, function (word) {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    });
};

//首字母变小写
String.prototype.firstChartoLower = function () {
    return this.replace(/^([A-Z])/g, function (word) {
        return word.replace(word.charAt(0), word.charAt(0).toLowerCase());
    });
};


String.prototype.underlineToHump = function () {
    var re = /_(\w)/g;
    str = this.replace(re, function ($0, $1) {
        return $1.toUpperCase();
    });
    return str;
}


String.prototype.humpToUnderline = function () {
    var re = /_(\w)/g;
    str = this.replace(/([A-Z])/g, "_$1").toLowerCase();
    return str;
}

//格式化日期
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
