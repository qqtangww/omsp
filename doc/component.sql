CREATE TABLE `t_sys_form_operation` (
  `i_Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `v_FormCode` varchar(30) NOT NULL COMMENT '表单编码',
  `i_ButType` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '按钮代码（1-系统 2自定义3-按钮组4-分割线）',
  `i_Type` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '按钮代码（1-视图 2行内按钮）',
  `v_OperationCode` varchar(50) NOT NULL COMMENT '操作代码',
  `v_OperationName` varchar(50) NOT NULL COMMENT '操作名称(分组名称)',
  `v_IconURL` varchar(30) NOT NULL COMMENT '图标文件(正常)',
  `i_NeedAuthorized` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否需要授权 1-需要授权才能使用，0-不需要',
  `i_EnableAgent` tinyint(1) NOT NULL COMMENT '是否允许代理使用 1-允许，0-不允许',
  `i_IsRecordLog` tinyint(1) NOT NULL COMMENT '是否记录日志 1-写入，0-不写入',
  `i_IsDisabled` tinyint(1) NOT NULL COMMENT '是否禁用 1-禁用，0-不禁用',
  `i_OpenMode` tinyint(1) NOT NULL COMMENT '打开方式 1-弹出，0-嵌入',
  `i_SortNO` int(6) NOT NULL COMMENT '顺序号',
  `i_DisplayStyle` tinyint(3) NOT NULL COMMENT '显示样式(1-图标文字,2-仅图标,3-仅文字)',
  `i_RunMode` tinyint(3) NOT NULL COMMENT '执行方式(1-函数,2-弹框,3-页面链接)',
  `v_LinkPage` varchar(200) NOT NULL COMMENT '链接地址',
  `v_Func` varchar(100) NOT NULL COMMENT '操作对应函数名',
  `v_DialogCode` varchar(30) NOT NULL COMMENT '弹框配置code',
  `v_ComponentCode` varchar(30) NOT NULL COMMENT '组件类型code',
  `v_ComponentConfigCode` varchar(30) NOT NULL COMMENT '组件类型下 组件配置的Code',
  `v_OperationId` varchar(30) NOT NULL COMMENT '操作按钮ID',
  `v_OperationParentId` varchar(30) NOT NULL DEFAULT '0' COMMENT '操作按钮父ID(组)',
  `i_isHidden` tinyint(1) NOT NULL DEFAULT '0' COMMENT '按钮是否隐藏',
  `i_Status` int(11) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='表单操作表';

CREATE TABLE `t_sys_tree` (
  `i_Id` int(10) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `v_TreeCode` varchar(30) NOT NULL COMMENT '树型代码',
  `v_TreeName` varchar(50) NOT NULL COMMENT '树型名称',
  `v_Description` varchar(255) NOT NULL COMMENT '描述',
  `v_SQLString` text NOT NULL COMMENT 'SQL语句',
  `v_PreCondition` varchar(300) NOT NULL COMMENT '预设条件',
  `v_ComponentCode` varchar(30) NOT NULL COMMENT '组件类型编码',
  `v_ComponentViewCode` varchar(30) NOT NULL COMMENT '模板路径编码',
  `v_ExtendedInterface` varchar(30) NOT NULL COMMENT '扩展接口',
  `v_ScriptBody` text NOT NULL COMMENT '函数体',
  `i_IsShowActionBar` tinyint(1) NOT NULL COMMENT '是否显示操作栏(1/0)',
  `i_IsShowTitleBae` tinyint(1) NOT NULL COMMENT '是否显示标题栏(1/0)',
  `i_DisplayCheckBox` tinyint(1) NOT NULL COMMENT '是否显示选择栏',
  `i_IsExpandCheckFirstLine` tinyint(1) NOT NULL COMMENT '是否缺省选中首行(1/0)',
  `v_TitleFont` varchar(200) NOT NULL COMMENT '标题文字',
  `v_TRBGColor` varchar(100) NOT NULL COMMENT '背景色',
  `v_TRHoverStyle` varchar(50) NOT NULL COMMENT '行hover样式',
  `v_TitleStyle` varchar(50) NOT NULL COMMENT '标题栏',
  `v_CheckedStyle` varchar(50) NOT NULL COMMENT '选中行',
  `v_ParentField` varchar(50) NOT NULL COMMENT '父字段',
  `v_SonField` varchar(50) NOT NULL COMMENT '子字段',
  `v_ShowField` varchar(50) NOT NULL COMMENT '显示字段',
  `i_IsNodeShowLimit` tinyint(1) NOT NULL COMMENT '是否节点显示限制(1/0)',
  `v_ShowLimitNode` varchar(50) NOT NULL COMMENT '显示限制节点',
  `v_DefaultExpandNode` varchar(50) NOT NULL COMMENT '缺省展开至节点',
  `i_IsTrigExpandSingle` tinyint(1) NOT NULL COMMENT '是否仅触发展开单项',
  `v_NoExpandNodeStyle` varchar(50) NOT NULL COMMENT '未展开节点样式',
  `v_ExpandNodeStyle` varchar(50) NOT NULL COMMENT '已展开节点样式',
  `v_SortInterface` varchar(100) NOT NULL COMMENT '调序接口',
  `v_OrderField` varchar(100) NOT NULL COMMENT '调序字段名',
  `v_AutoLoadFunc` text NOT NULL COMMENT '自动加载函数',
  `v_DataSendFunc` text NOT NULL COMMENT '数据接收函数',
  `v_DataReceiveFunc` text NOT NULL COMMENT '数据发送函数',
  `i_Status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='表单操作表';


CREATE TABLE `t_sys_form` (
  `i_Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `v_FormCode` varchar(30) NOT NULL COMMENT '表单编码',
  `v_FormName` varchar(30) NOT NULL COMMENT '表单名称',
  `v_CustomInterface` varchar(30) NOT NULL COMMENT '自定义接口',
  `v_ComponentViewCode` varchar(30) NOT NULL COMMENT '模板路径编码',
  `v_ExtendedInterface` varchar(30) NOT NULL COMMENT '扩展接口',
  `v_Description` varchar(255) NOT NULL COMMENT '描述',
  `i_IsDefault` int(5) NOT NULL COMMENT '是否缺省 1是 0否 ',
  `v_AutoLoadFunc` text NOT NULL COMMENT '自动加载函数',
  `v_DataSendFunc` text NOT NULL COMMENT '数据接收函数',
  `v_DataReceiveFunc` text NOT NULL COMMENT '数据发送函数',
  `i_Status` int(6) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='表单组件';

CREATE TABLE `t_sys_form_operation` (
  `i_Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `v_FormCode` varchar(30) NOT NULL COMMENT '表单编码',
  `i_ButType` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '按钮代码（1-系统 2自定义3-按钮组4-分割线）',
  `i_Type` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '按钮代码（1-视图 2行内按钮）',
  `v_OperationCode` varchar(50) NOT NULL COMMENT '操作代码',
  `v_OperationName` varchar(50) NOT NULL COMMENT '操作名称(分组名称)',
  `v_IconURL` varchar(30) NOT NULL COMMENT '图标文件(正常)',
  `i_NeedAuthorized` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否需要授权 1-需要授权才能使用，0-不需要',
  `i_EnableAgent` tinyint(1) NOT NULL COMMENT '是否允许代理使用 1-允许，0-不允许',
  `i_IsRecordLog` tinyint(1) NOT NULL COMMENT '是否记录日志 1-写入，0-不写入',
  `i_IsDisabled` tinyint(1) NOT NULL COMMENT '是否禁用 1-禁用，0-不禁用',
  `i_OpenMode` tinyint(1) NOT NULL COMMENT '打开方式 1-弹出，0-嵌入',
  `i_ButSort` int(4) NOT NULL COMMENT '按钮排序',
  `i_SortNO` int(6) NOT NULL COMMENT '顺序号',
  `i_DisplayStyle` tinyint(3) NOT NULL COMMENT '显示样式(1-图标文字,2-仅图标,3-仅文字)',
  `i_RunMode` tinyint(3) NOT NULL COMMENT '执行方式(1-函数,2-弹框,3-页面链接)',
  `v_LinkPage` varchar(200) NOT NULL COMMENT '链接地址',
  `v_Func` varchar(100) NOT NULL COMMENT '操作对应函数名',
  `v_DialogCode` varchar(30) NOT NULL COMMENT '弹框配置code',
  `i_Cate` tinyint(3) NOT NULL COMMENT '组件类型 1内容组件 2布局组件 3自定义内容',
  `i_CateCode` tinyint(3) NOT NULL COMMENT '组件分类code 比如视图，树形等等',
  `v_Code` varchar(30) NOT NULL COMMENT '组件类型下 组件配置的Code',
  `v_OperationId` varchar(30) NOT NULL COMMENT '操作按钮ID',
  `v_OperationParentId` varchar(30) NOT NULL DEFAULT '0' COMMENT '操作按钮父ID(组)',
  `i_isHidden` tinyint(1) NOT NULL DEFAULT '0' COMMENT '按钮是否隐藏',
  `i_Status` int(11) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='表单操作表';


CREATE TABLE `t_sys_tree_column` (
  `i_Id` int(10) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `v_TreeCode` varchar(30) NOT NULL COMMENT '树型代码',
  `v_TableName` varchar(100) NOT NULL COMMENT '数据库表名',
  `v_ColName` varchar(100) NOT NULL COMMENT '字段名',
  `i_ColTitle` varchar(30) NOT NULL DEFAULT '' COMMENT '字段中文名',
  `v_Func` varchar(100) NOT NULL COMMENT '操作对应函数名',
  `i_ColumnType` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '字段类型 1基础字段2 计算字段 ',
  `i_FieldType` tinyint(1) NOT NULL COMMENT '数据类型 : 1匿名函数 2命名函数 3转化代码 4SQl',
  `v_Formulas` text NOT NULL COMMENT '计算公式',
  `i_EnumID` int(8) NOT NULL COMMENT '枚举Id',
  `i_IsExpord` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否导出 (1/0) ',
  `i_Status` int(4) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数字段表';



CREATE TABLE `t_sys_tree` (
  `i_Id` int(10) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `v_TreeCode` varchar(30) NOT NULL COMMENT '树型代码',
  `v_TreeName` varchar(50) NOT NULL COMMENT '树型名称',
  `v_Description` varchar(255) NOT NULL COMMENT '描述',
  `v_SQLString` text NOT NULL COMMENT 'SQL语句',
  `v_PreCondition` varchar(300) NOT NULL COMMENT '预设条件',
  `v_ComponentCode` varchar(30) NOT NULL COMMENT '组件类型编码',
  `v_ComponentViewCode` varchar(30) NOT NULL COMMENT '模板路径编码',
  `v_ExtendedInterface` varchar(30) NOT NULL COMMENT '扩展接口',
  `v_ScriptBody` text NOT NULL COMMENT '函数体',
  `i_IsShowSelectBar` tinyint(1) NOT NULL COMMENT '是否显示选择栏(1/0)',
  `i_IsShowTitleBar` tinyint(1) NOT NULL COMMENT '是否显示标题栏(1/0)',
  `i_IsShowSearchBar` tinyint(1) NOT NULL COMMENT '是否显示搜索栏(1/0)',
  `i_IsExpandCheckFirstLine` tinyint(1) NOT NULL COMMENT '是否缺省选中首行(1/0)',
  `v_TitleFont` varchar(200) NOT NULL COMMENT '标题文字',
  `v_TRBGColor` varchar(100) NOT NULL COMMENT '背景色',
  `v_TRHoverStyle` varchar(50) NOT NULL COMMENT '行hover样式',
  `v_TitleStyle` varchar(50) NOT NULL COMMENT '标题栏',
  `v_CheckedStyle` varchar(50) NOT NULL COMMENT '选中行',
  `v_SetNoExpandNode` text NOT NULL COMMENT '未展开节点',
  `v_SetExpandNode` text NOT NULL COMMENT '已展开节点',
  `v_ParentField` varchar(50) NOT NULL COMMENT '父字段',
  `v_SonField` varchar(50) NOT NULL COMMENT '子字段',
  `v_ShowField` varchar(50) NOT NULL COMMENT '显示字段',
  `i_NodeSetType` tinyint(1) NOT NULL COMMENT '节点设置依据 (0-层级  1-类型)',
  `v_NodeTypeField` varchar(50) NOT NULL COMMENT '节点类型字段',
  `i_IsNodeShowLimit` tinyint(1) NOT NULL COMMENT '是否节点显示限制(1/0)',
  `v_LimitLevel` varchar(50) NOT NULL COMMENT '限制至层级',
  `v_DefaultExpandLevel` varchar(50) NOT NULL COMMENT '缺省展开至层级',
  `i_IsAccordionMode` varchar(50) NOT NULL COMMENT '是否手风琴模式',
  `i_IsDropSort` tinyint(1) NOT NULL COMMENT '是否拖动调序',
  `v_SortInterface` varchar(100) NOT NULL COMMENT '调序接口',
  `v_OrderField` varchar(100) NOT NULL COMMENT '调序字段名',
  `v_AutoLoadFunc` text NOT NULL COMMENT '自动加载函数',
  `v_DataSendFunc` text NOT NULL COMMENT '数据接收函数',
  `v_DataReceiveFunc` text NOT NULL COMMENT '数据发送函数',
  `i_Status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='树形表';

CREATE TABLE `t_sys_component_region_instance` (
  `i_Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `v_CateCode` varchar(30) NOT NULL COMMENT '组件类型编码',
  `v_RegionCode` varchar(30) NOT NULL COMMENT '布局编码',
  `v_RegionName` varchar(255) NOT NULL COMMENT '布局名称',
  `v_TemplateCode` varchar(30) NOT NULL COMMENT '模板路径编码',
  `v_ExtendedInterface` varchar(30) NOT NULL COMMENT '扩展接口',
  `i_IsDefaultDragRegin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否拖拽调整区域 1是 0否',
  `i_DefaultResRegin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '缺省响应区域',
  `v_ReginData` text NOT NULL COMMENT '布局信息 json',
  `v_Description` varchar(255) NOT NULL COMMENT '描述',
  `i_IsDefault` int(5) NOT NULL COMMENT '是否缺省 1是 0否 ',
  `i_Status` int(6) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='布局组件实例表';

CREATE TABLE `t_sys_region_tabs_flag` (
  `i_Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `v_RegionCode` varchar(30) NOT NULL COMMENT '布局编码',
  `v_TabsFlagCode` varchar(30) NOT NULL COMMENT 'tabs标签编码',
  `v_TabsFlagName` varchar(255) NOT NULL COMMENT 'tabs标签名称',
  `v_Description` varchar(255) NOT NULL COMMENT '描述',
  `i_Cate` tinyint(3) NOT NULL COMMENT '组件类型code',
  `v_CateCode` varchar(30) NOT NULL COMMENT '组件类型Code',
  `v_Code` varchar(30) NOT NULL COMMENT '组件实例Code',
  `i_InstanceCate` tinyint(3) NOT NULL COMMENT '实例组件类型code',
  `v_InstanceCateCode` varchar(30) NOT NULL COMMENT '实例组件类型Code',
  `v_InstanceCode` varchar(30) NOT NULL COMMENT '组件实例Code',
  `i_IsSetBlank` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是空组件(1/0)',
  `i_IsSpecialShow` int(5) NOT NULL DEFAULT '0' COMMENT '是否特殊显示(1/0) ',
  `v_Func` text NOT NULL COMMENT '函数体 ',
  `v_IconURL` varchar(100) NOT NULL COMMENT '图标文件',
  `i_SortNO` int(6) unsigned NOT NULL COMMENT '排序号',
  `i_ComponentNature` tinyint(3) NOT NULL COMMENT '组件性质 1内容组件  2布局组件',
  `i_Status` int(6) NOT NULL DEFAULT '1' COMMENT '状态1正常 9删除',
  `v_Creator` varchar(30) NOT NULL COMMENT '创建者',
  `d_CreateTime` datetime NOT NULL COMMENT '创建时间',
  `v_LastModifiedUser` varchar(30) NOT NULL COMMENT '最后修改者',
  `d_LastModifiedTime` datetime NOT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`i_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='tabs标签';