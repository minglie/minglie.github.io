/*
Navicat MySQL Data Transfer

Source Server         : windows-mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : ming-lie

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-02-19 00:23:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增主键ID',
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级资源ID',
  `name` varchar(200) DEFAULT NULL COMMENT '资源名称',
  `res_url` varchar(200) DEFAULT NULL COMMENT '资源页url',
  `sort_num` bigint(20) DEFAULT NULL COMMENT '资源排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8 COMMENT='(资源表)';
