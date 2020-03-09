<!-- 添加系统参数 -->
<template>
  <div class="add-org-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        :formRed="formRed"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      ref="metaForm"
      :model="metaForm"
      inline-message
      :rules="rules"
      label-width="100px"
      id="form-sys-parameter"
    >
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="conBox">
          <el-form-item label="参数编码" prop="v_ParamCode">
            <el-input
              :disabled="isDisableUser"
              v-model="metaForm.v_ParamCode"
              placeholder="可填写数字，英文,下划线组成"
            />
          </el-form-item>
          <el-form-item label="参数名称" prop="v_ParamName">
            <el-input v-model="metaForm.v_ParamName" />
          </el-form-item>
          <el-form-item label="适用类型">
            <el-select
              v-model="metaForm.v_ComponentType"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,key) in componentTypeList"
                :key="key"
                :label="item.v_EnumValue"
                :value="item.v_EnumValueName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="7">
              <el-form-item label="组织可定制" prop="i_EnableOrg">
                <el-switch
                  v-model="metaForm.i_EnableOrg"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="个人可定制" prop="i_EnableUser">
                <el-switch
                  v-model="metaForm.i_EnableUser"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="实例可定制" label-width="120px" prop="i_EnableApiComponent">
                <el-switch
                  v-model="metaForm.i_EnableApiComponent"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="参数值类型" prop="i_ParamValType">
            <!-- <el-input v-model="metaForm.v_ParamName"   /> -->
            <el-select
              v-model="metaForm.i_ParamValType"
              @change="selectParentVal"
              placeholder="请选择"
            >
              <el-option
                v-for="(item,key) in fatherEnumList"
                :key="key"
                :label="item.v_EnumValueName"
                :value="item.v_EnumValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参数值来源">
            <!-- <el-cascader
              clearable
              popper-class="filtrate"
              placeholder="请选择枚举"
              :options="enumList"
              :props="defaultProps"
              :show-all-levels='false'
              v-model="enumValue"
              @change="getEnumValueList"
            ></el-cascader> -->
            <el-select v-model="enumValue" @change="getEnumValueList" filterable :filter-method="getOptions" placeholder="请选择" clearable :disabled="enumValueFlag">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.v_EnumName"
                :value="item.v_EnumCode">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 数字类型 -->
          <el-row v-if="numFlag">
            <el-col :span="10">
              <el-form-item label="最小值" prop="i_MinNumber">
                <el-input-number
                controls-position="right"
                v-model="metaForm.i_MinNumber"
                @change="changeMinNum"
                label
              />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="最大值" prop="i_MaxNumber">
                <el-input-number
                controls-position="right"
                v-model="metaForm.i_MaxNumber"
                @change="changeMaxNum"
                label
              />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 颜色类型 -->
          <el-form-item label="预设颜色值" v-if="colorFlag">
            <span class="default-color">
              <el-color-picker size="small" @change='changeColor(color.val1,0)' v-model="color.val1"></el-color-picker>
            </span>
            <span class="span-color">
              <el-color-picker size="small" @change='changeColor(color.val2,1)' v-model="color.val2"></el-color-picker>
            </span>
            <span class="span-color">
              <el-color-picker size="small" @change='changeColor(color.val3,2)' v-model="color.val3"></el-color-picker>
            </span>
            <span class="span-color">
              <el-color-picker size="small" @change='changeColor(color.val4,3)' v-model="color.val4"></el-color-picker>
            </span>
            <span class="span-color">
              <el-color-picker size="small" @change='changeColor(color.val5,4)' v-model="color.val5"></el-color-picker>
            </span>
            <span class="span-color">
              <el-color-picker size="small" @change='changeColor(color.val6,5)' v-model="color.val6"></el-color-picker>
            </span>
            <span class="span-color">
              <el-color-picker size="small" @change='changeColor(color.val7,6)' v-model="color.val7"></el-color-picker>
            </span>
            <span class="span-color">
              <el-color-picker size="small" @change='changeColor(color.val8,7)' v-model="color.val8"></el-color-picker>
            </span>
          </el-form-item>
          <!-- 日期类型 -->
          <el-form-item label="日期范围" v-if="dataFlag" prop="v_TimeRange">
            <div class="block">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="metaForm.v_TimeRange"
                class="data-scope"
                @change="changedata"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <!-- 时间类型 -->
          <el-form-item label="时间范围" v-if="timeFlag" prop="v_TimeRange">
            <div class="block">
              <el-time-picker
                is-range
                v-model="metaForm.v_TimeRange"
                class="time-scope"
                value-format="HH:mm:ss"
                range-separator="至"
                @change="changeTime"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
            </div>
          </el-form-item>
          <!-- 日期时间类型 -->
          <el-form-item label="日期时间范围" v-if="dateFlag" prop="v_TimeRange">
            <div class="block">
              <el-date-picker
                v-model="metaForm.v_TimeRange"
                class="date-scope"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changedate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="参数描述" prop="v_Description">
            <el-input
              v-model="metaForm.v_Description"
              placeholder="可填写相关描述，帮助用户记忆和了解"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
        </div>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>参数设置
        </span>
        <!-- 参数值类型--无 -->
        <div class="conBox" v-if="noFlag">
          <el-form-item label="值1" prop="v_ParamValue">
            <el-input v-model="metaForm.v_ParamValue" />
          </el-form-item>
          <el-form-item label="值2">
            <el-input v-model="metaForm.v_ParamValue1" />
          </el-form-item>
          <el-form-item label="值3">
            <el-input v-model="metaForm.v_ParamValue2" />
          </el-form-item>
          <el-form-item label="值4">
            <el-input v-model="metaForm.v_ParamValue3" />
          </el-form-item>
          <el-form-item label="值5">
            <el-input v-model="metaForm.v_ParamValue4" />
          </el-form-item>
        </div>
        <!-- 参数值类型--数字 -->
        <div class="conBox" v-if="numFlag">
          <el-row>
            <el-col :span="10">
              <el-form-item label="值1" prop="v_ParamValue">
                <el-row>
                  <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue"
                    :min="Number(MinNumber)"
                    :max="Number(MaxNumber)"
                    label
                  />
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值2">
                <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue1"
                    :min="Number(MinNumber)"
                    :max="Number(MaxNumber)"
                    label
                  />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值3">
                <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue2"
                    :min="Number(MinNumber)"
                    :max="Number(MaxNumber)"
                    label
                  />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值4">
                <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue3"
                    :min="Number(MinNumber)"
                    :max="Number(MaxNumber)"
                    label
                  />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值5">
                <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue4"
                    :min="Number(MinNumber)"
                    :max="Number(MaxNumber)"
                    label
                  />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 参数值类型--颜色 -->
        <div class="conBox color-conBox" v-if="colorFlag">
          <el-row>
            <el-col :span="10">
              <el-form-item label="值1" prop="v_ParamValue">
                <el-row>
                  <el-col :span="5">
                    <span class="default-color">
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor1'   v-model="metaForm.v_ParamValue"></el-color-picker>
                  </span>
                  <span>
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor2' v-model="paramValue.v_ParamValue.color2"></el-color-picker>
                  </span>
                  </el-col>
                  <el-col :span="4">
                    <el-input v-model="paramValue.v_ParamValue.deg" @change='changeColor3' placeholder="渐变度数" />
                  </el-col>
                  <el-col :span="2" :push="1">
                    <div class="preview-color1">
                      <i v-if="iconFlag1" class="el-icon-close"></i>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="10" :push="1">
              <el-form-item label="值2">
                <el-col :span="5">
                  <span class="default-color">
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor4' v-model="paramValue.v_ParamValue1.color1"></el-color-picker>
                </span>
                <span>
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor5' v-model="paramValue.v_ParamValue1.color2"></el-color-picker>
                </span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="paramValue.v_ParamValue1.deg" @change='changeColor6' placeholder="渐变度数"/>
                </el-col>
                <el-col :span="2" :push="1">
                  <div class="preview-color2">
                    <i v-if="iconFlag2" class="el-icon-close"></i>
                  </div>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值3">
                <el-col :span="5">
                  <span class="default-color">
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor7' v-model="paramValue.v_ParamValue2.color1"></el-color-picker>
                </span>
                <span>
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor8' v-model="paramValue.v_ParamValue2.color2"></el-color-picker>
                </span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="paramValue.v_ParamValue2.deg" @change='changeColor9' placeholder="渐变度数"/>
                </el-col>
                <el-col :span="2" :push="1">
                  <div class="preview-color3">
                    <i v-if="iconFlag3" class="el-icon-close"></i>
                  </div>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="10" :push="1">
              <el-form-item label="值4">
                <el-col :span="5">
                  <span class="default-color">
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor10' v-model="paramValue.v_ParamValue3.color1"></el-color-picker>
                </span>
                <span>
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor11' v-model="paramValue.v_ParamValue3.color2"></el-color-picker>
                </span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="paramValue.v_ParamValue3.deg" @change='changeColor12' placeholder="渐变度数"/>
                </el-col>
                <el-col :span="2" :push="1">
                  <div class="preview-color4">
                    <i v-if="iconFlag4" class="el-icon-close"></i>
                  </div>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值5">
                <el-col :span="5">
                  <span class="default-color">
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor13' v-model="paramValue.v_ParamValue4.color1"></el-color-picker>
                </span>
                <span>
                  <el-color-picker size="small" :predefine="colorList" @change='changeColor14' v-model="paramValue.v_ParamValue4.color2"></el-color-picker>
                </span>
                </el-col>
                <el-col :span="4">
                  <el-input v-model="paramValue.v_ParamValue4.deg" @change='changeColor15' placeholder="渐变度数"/>
                </el-col>
                <el-col :span="2" :push="1">
                  <div class="preview-color5">
                    <i v-if="iconFlag5" class="el-icon-close"></i>
                  </div>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 参数值类型--日期 -->
        <div class="conBox data-conBox" v-if="dataFlag">
          <el-row>
            <el-col :span="10">
              <el-form-item label="值1" prop="v_ParamValue">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    v-model="metaForm.v_ParamValue1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值3">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue2"
                    :picker-options="pickerOptions"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值4">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue3"
                    :picker-options="pickerOptions"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值5">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue4"
                    :picker-options="pickerOptions"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 参数值类型--时间 -->
        <div class="conBox time-conBox" v-if="timeFlag">
          <el-row>
            <el-col :span="10">
              <el-form-item label="值1" prop="v_ParamValue">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="metaForm.v_ParamValue"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间">
                  </el-time-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值2">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="metaForm.v_ParamValue1"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间">
                  </el-time-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值3">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="metaForm.v_ParamValue2"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间">
                  </el-time-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值4">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="metaForm.v_ParamValue3"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间">
                  </el-time-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值5">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="metaForm.v_ParamValue4"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间">
                  </el-time-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 参数值类型--日期时间 -->
        <div class="conBox date-conBox" v-if="dateFlag">
          <el-row>
            <el-col :span="10">
              <el-form-item label="值1" prop="v_ParamValue">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="metaForm.v_ParamValue"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="metaForm.v_ParamValue1"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值3">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="metaForm.v_ParamValue2"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值4">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="metaForm.v_ParamValue3"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值5">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="metaForm.v_ParamValue4"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 参数值类型--开关 -->
        <div class="conBox" v-if="switchFlag">
          <el-row>
            <el-col :span="10">
              <el-form-item label="值1" prop="v_ParamValue">
                <el-switch
                  v-model="metaForm.v_ParamValue"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值2">
                <el-switch
                  v-model="metaForm.v_ParamValue1"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值3">
                <el-switch
                  v-model="metaForm.v_ParamValue2"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="值4">
                <el-switch
                  v-model="metaForm.v_ParamValue3"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="值5">
                <el-switch
                  v-model="metaForm.v_ParamValue4"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 参数值类型--图片 -->
        <div class="conBox image-conBox" v-if="imageFlag">
          <el-form-item label="值1" prop="v_ParamValue">
            <el-input v-model="metaForm.v_ParamValue" @change="changeImage" />
            <el-image
              class="image-box"
              :src="metaForm.v_ParamValue"
              :preview-src-list="srcList">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="值2">
            <el-input v-model="metaForm.v_ParamValue1" @change="changeImage1" />
            <el-image
              class="image-box"
              :src="metaForm.v_ParamValue1"
              :preview-src-list="srcList1">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="值3">
            <el-input v-model="metaForm.v_ParamValue2" @change="changeImage2" />
            <el-image
              class="image-box"
              :src="metaForm.v_ParamValue2"
              :preview-src-list="srcList2">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="值4">
            <el-input v-model="metaForm.v_ParamValue3" @change="changeImage3" />
            <el-image
              class="image-box"
              :src="metaForm.v_ParamValue3"
              :preview-src-list="srcList3">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="值5">
            <el-input v-model="metaForm.v_ParamValue4" @change="changeImage4" />
            <el-image
              class="image-box"
              :src="metaForm.v_ParamValue4"
              :preview-src-list="srcList4">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-form-item>
        </div>
        <!-- 参数值类型--枚举 -->
        <div class="conBox" v-if="enumFlag">
          <el-form-item label="值1" prop="v_ParamValue">
            <el-select
              v-model="metaForm.v_ParamValue"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,key) in enumVlaList"
                :key="key"
                :label="item.v_EnumValueName"
                :value="item.v_EnumValueName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值2">
            <el-select
              v-model="metaForm.v_ParamValue1"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,key) in enumVlaList"
                :key="key"
                :label="item.v_EnumValueName"
                :value="item.v_EnumValueName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值3">
            <el-select
              v-model="metaForm.v_ParamValue2"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,key) in enumVlaList"
                :key="key"
                :label="item.v_EnumValueName"
                :value="item.v_EnumValueName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值4">
            <el-select
              v-model="metaForm.v_ParamValue3"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,key) in enumVlaList"
                :key="key"
                :label="item.v_EnumValueName"
                :value="item.v_EnumValueName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值5">
            <el-select
              v-model="metaForm.v_ParamValue4"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,key) in enumVlaList"
                :key="key"
                :label="item.v_EnumValueName"
                :value="item.v_EnumValueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 参数值类型--样式 -->
        <div class="conBox style-conBox" v-if="styleFlag">
          <el-form-item label="值1" prop="v_ParamValue">
            <el-input v-model="metaForm.v_ParamValue" />
            <span :class="['style-box',`${metaForm.v_ParamValue}`]">样式</span>
          </el-form-item>
          <el-form-item label="值2">
            <el-input v-model="metaForm.v_ParamValue1" />
            <span :class="['style-box',`${metaForm.v_ParamValue1}`]">样式</span>
          </el-form-item>
          <el-form-item label="值3">
            <el-input v-model="metaForm.v_ParamValue2" />
            <span :class="['style-box',`${metaForm.v_ParamValue2}`]">样式</span>
          </el-form-item>
          <el-form-item label="值4">
            <el-input v-model="metaForm.v_ParamValue3" />
            <span :class="['style-box',`${metaForm.v_ParamValue3}`]">样式</span>
          </el-form-item>
          <el-form-item label="值5">
            <el-input v-model="metaForm.v_ParamValue4" />
            <span :class="['style-box',`${metaForm.v_ParamValue4}`]">样式</span>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import changeColor from '@/common/js/mixins/changeColor'
import { mapState } from 'vuex'
export default {
  name: 'addModifyParameter',
  mixins: [logMixin, changeColor],
  props: {
    shareData: {
      type: Object
    },
    configData: {
      type: Object
    },
    ifDialog: Boolean
  },
  data () {
    // 编码正则匹配
    var commonCode = (rule, value, callback) => {
      let codeVerify = /^\w+$/
      setTimeout(() => {
        if (!codeVerify.test(value)) {
          callback(new Error('请输入由数字,英文,下划线组合'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      metaForm: {
        v_ParamCode: '',
        v_ParamName: '',
        v_ComponentType: '',
        i_ParamValType: 'default',
        v_Description: '',
        i_EnableOrg: '0',
        i_EnableUser: '0',
        i_EnableApiComponent: '0',
        v_ParamValue: undefined,
        v_ParamValue1: undefined,
        v_ParamValue2: undefined,
        v_ParamValue3: undefined,
        v_ParamValue4: undefined,
        i_MinNumber: undefined,
        i_MaxNumber: undefined,
        v_TimeRange: ''
      },
      timeRange: ['00:00:00', '23:59:59'],
      paramValue: {
        v_ParamValue: {
          color1: '',
          color2: '',
          deg: ''
        },
        v_ParamValue1: {
          color1: '',
          color2: '',
          deg: ''
        },
        v_ParamValue2: {
          color1: '',
          color2: '',
          deg: ''
        },
        v_ParamValue3: {
          color1: '',
          color2: '',
          deg: ''
        },
        v_ParamValue4: {
          color1: '',
          color2: '',
          deg: ''
        }
      },
      MinNumber: undefined,
      MaxNumber: undefined,
      formData: {},
      isDisableUser: false,
      rules: {
        v_ParamCode: [
          { required: true, message: '请输入参数编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_ParamName: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_ParamValue: [{ required: true, message: '请输入值', trigger: 'blur' }],
        i_ParamValType: [{ required: true, message: '请选择值类型', trigger: 'blur' }],
        i_MinNumber: [{ required: true, message: '请输入最小值', trigger: 'blur' }],
        i_MaxNumber: [{ required: true, message: '请输入最大值', trigger: 'blur' }],
        v_TimeRange: [{ required: true, message: '请选择范围', trigger: 'blur' }]
      },
      // 小红点功能
      oldModAddData: {
        v_ParamCode: '',
        v_ParamName: '',
        v_ComponentType: '',
        i_ParamValType: '',
        v_Description: '',
        i_EnableOrg: '0',
        i_EnableUser: '0',
        i_EnableApiComponent: '0',
        v_ParamValue: undefined,
        v_ParamValue1: undefined,
        v_ParamValue2: undefined,
        v_ParamValue3: undefined,
        v_ParamValue4: undefined,
        i_MinNumber: undefined,
        i_MaxNumber: undefined,
        v_TimeRange: ''
      },
      formRed: false,
      enumVlaList: [],
      enumValue: '',
      options: [],
      v_EnumCode: '',
      parentEnumID: '',
      typeId: 'default',
      oldEnumValue: '',
      defaultProps: {
        children: 'children',
        label: 'label',
        value: 'value'
      },
      fatherEnumList: [],
      componentTypeList: [],
      noFlag: true,
      numFlag: false,
      colorFlag: false,
      dataFlag: false,
      timeFlag: false,
      dateFlag: false,
      switchFlag: false,
      imageFlag: false,
      enumFlag: false,
      styleFlag: false,
      enumValueFlag: false,
      color: {
        val1: '',
        val2: '',
        val3: '',
        val4: '',
        val5: '',
        val6: '',
        val7: '',
        val8: ''
      },
      colorList: [],
      iconFlag1: true,
      iconFlag2: true,
      iconFlag3: true,
      iconFlag4: true,
      iconFlag5: true,
      pickerOptions: {},
      pickerOptions1: {},
      srcList: [],
      srcList1: [],
      srcList2: [],
      srcList3: [],
      srcList4: [],
      viewID: ''
    }
  },
  computed: {
    ...mapState({
      btnConfig: state => state.confsBtn,
      viewsData: state => state.paginations
    })
  },
  created () {
    this.viewID = this.btnConfig.viewid
    let formData = this.$store.state.fieTableData
    let enumCode = ['dataCategoryList', 'componentType']
    this.getEnumValue({ enumCode })
    this.getEnumCateGoryList()
    if (formData.v_EnumCode === '') {
      if (formData.i_ParamValType === 'Number') {
        formData.v_ParamValue = Number(formData.v_ParamValue)
        formData.i_MaxNumber = Number(formData.i_MaxNumber)
        formData.i_MinNumber = Number(formData.i_MinNumber)
        if (formData.v_ParamValue1) {
          formData.v_ParamValue1 = Number(formData.v_ParamValue1)
        }
        if (formData.v_ParamValue2) {
          formData.v_ParamValue2 = Number(formData.v_ParamValue2)
        }
        if (formData.v_ParamValue3) {
          formData.v_ParamValue3 = Number(formData.v_ParamValue3)
        }
        if (formData.v_ParamValue4) {
          formData.v_ParamValue4 = Number(formData.v_ParamValue4)
        }
      }
    }
    if (this.btnConfig.operationcode === 'modify') {
      this.isDisableUser = true
      this.MinNumber = formData.i_MinNumber
      this.MaxNumber = formData.i_MaxNumber
      if (formData.v_EnumCode !== '') {
        this.enumFlag = true
        this.noFlag = false
        this.numFlag = false
        this.colorFlag = false
        this.dataFlag = false
        this.timeFlag = false
        this.dateFlag = false
        this.switchFlag = false
        this.imageFlag = false
        this.styleFlag = false
        this.enumValueFlag = false
      } else {
        if (formData.i_ParamValType === 'default') {
          this.noFlag = true
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (formData.i_ParamValType === 'Number') {
          this.noFlag = false
          this.numFlag = true
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (formData.i_ParamValType === 'colorBlocks') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = true
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (formData.i_ParamValType === 'date') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = true
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (formData.i_ParamValType === 'time') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = true
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (formData.i_ParamValType === 'datetime') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = true
          this.switchFlag = false
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (formData.i_ParamValType === 'switch') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = true
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = true
        } else if (formData.i_ParamValType === 'Img') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = true
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (formData.i_ParamValType === 'style') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = true
          this.enumValueFlag = false
        }
      }
      util.initFormData(this.metaForm, formData)

      this.typeId = formData.i_ParamValType
      if (formData.v_EnumCode !== '') {
        this.v_EnumCode = formData.v_EnumCode
        this.enumValue = formData.v_EnumCode
        this.oldEnumValue = formData.v_EnumCode
        let enumCode = this.v_EnumCode
        cgiService.getEnumValues({ enumCode }).then(res => {
          if (res.code === 0 && res.data) {
            this.enumVlaList = res.data[enumCode]
          }
        })
      } else {
        // 处理颜色
        if (formData.i_ParamValType === 'colorBlocks') {
          if (formData.v_PreColor) {
            this.color = JSON.parse(formData.v_PreColor)
            for (let key in this.color) {
              if (this.color[key]) {
                this.colorList.push(this.color[key])
              }
            }
          }
          let val1 = formData.v_ParamValue.split(' ')
          let val2 = formData.v_ParamValue1.split(' ')
          let val3 = formData.v_ParamValue2.split(' ')
          let val4 = formData.v_ParamValue3.split(' ')
          let val5 = formData.v_ParamValue4.split(' ')

          // 处理预览色
          this.colorPreview(val1[0], val1[1], val1[2], '.preview-color1')
          this.colorPreview(val2[0], val2[1], val2[2], '.preview-color2')
          this.colorPreview(val3[0], val3[1], val3[2], '.preview-color3')
          this.colorPreview(val4[0], val4[1], val4[2], '.preview-color4')
          this.colorPreview(val5[0], val5[1], val5[2], '.preview-color5')

          this.paramValue.v_ParamValue.color1 = val1[0]
          this.metaForm.v_ParamValue = this.paramValue.v_ParamValue.color1
          this.paramValue.v_ParamValue.color2 = val1[1]
          this.paramValue.v_ParamValue.deg = val1[2] === '0' ? 0 : val1[2]

          this.paramValue.v_ParamValue1.color1 = val2[0]
          this.paramValue.v_ParamValue1.color2 = val2[1]
          this.paramValue.v_ParamValue1.deg = val2[2] === '0' ? 0 : val2[2]

          this.paramValue.v_ParamValue2.color1 = val3[0]
          this.paramValue.v_ParamValue2.color2 = val3[1]
          this.paramValue.v_ParamValue2.deg = val3[2] === '0' ? 0 : val3[2]

          this.paramValue.v_ParamValue3.color1 = val4[0]
          this.paramValue.v_ParamValue3.color2 = val4[1]
          this.paramValue.v_ParamValue3.deg = val4[2] === '0' ? 0 : val4[2]

          this.paramValue.v_ParamValue4.color1 = val5[0]
          this.paramValue.v_ParamValue4.color2 = val5[1]
          this.paramValue.v_ParamValue4.deg = val5[2] === '0' ? 0 : val5[2]
        }
        // 处理数字
        if (formData.i_ParamValType === 'Number' && !formData.v_ParamValue1) {
          this.metaForm.v_ParamValue1 = undefined
        }
        if (formData.i_ParamValType === 'Number' && !formData.v_ParamValue2) {
          this.metaForm.v_ParamValue2 = undefined
        }
        if (formData.i_ParamValType === 'Number' && !formData.v_ParamValue3) {
          this.metaForm.v_ParamValue3 = undefined
        }
        if (formData.i_ParamValType === 'Number' && !formData.v_ParamValue4) {
          this.metaForm.v_ParamValue4 = undefined
        }
        if (formData.i_ParamValType === 'date' || formData.i_ParamValType === 'time' || formData.i_ParamValType === 'datetime') {
          this.metaForm.v_TimeRange = JSON.parse(this.metaForm.v_TimeRange)
        }
        // 处理日期
        if (formData.i_ParamValType === 'date') {
          this.pickerOptions = Object.assign({}, this.pickerOptions, {
            disabledDate: (time) => {
              let val = JSON.parse(formData.v_TimeRange)
              const oneDay = 3600 * 1000 * 24
              return new Date(val[0].substring(0, 10)).getTime() - oneDay >= time.getTime() || time.getTime() >= new Date(val[1].substring(0, 10)).getTime()
            }
          })
        }
        // 处理时间
        if (formData.i_ParamValType === 'time') {
          this.timeRange = JSON.parse(formData.v_TimeRange)
        }
        // 处理日期时间
        if (formData.i_ParamValType === 'datetime') {
          this.pickerOptions1 = Object.assign({}, this.pickerOptions1, {
            disabledDate: (time) => {
              let val = JSON.parse(formData.v_TimeRange)
              const oneDay = 3600 * 1000 * 24
              return new Date(val[0].substring(0, 19)).getTime() - oneDay >= time.getTime() || time.getTime() >= new Date(val[1].substring(0, 19)).getTime()
            }
          })
        }
        // 处理图片
        if (formData.i_ParamValType === 'Img') {
          this.srcList.push(this.metaForm.v_ParamValue)
          this.srcList1.push(this.metaForm.v_ParamValue1)
          this.srcList2.push(this.metaForm.v_ParamValue2)
          this.srcList3.push(this.metaForm.v_ParamValue3)
          this.srcList4.push(this.metaForm.v_ParamValue4)
        }
      }
      this.$set(this.metaForm, 'i_Id', formData.i_Id)
      this.$store.commit('changeRowTabData', this.metaForm)
    }
    this.oldModAddData = Object.assign({}, this.metaForm)
    if (!this.oldModAddData.i_MinNumber) {
      this.oldModAddData.i_MinNumber = 0
    }
    if (!this.oldModAddData.i_MaxNumber) {
      this.oldModAddData.i_MaxNumber = 0
    }
  },
  watch: {
    metaForm: {
      handler (nv) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(nv)) {
          this.formRed = true
        }
      },
      deep: true
    },
    enumValue: {
      handler: function (data) {
        if (JSON.stringify(data) !== JSON.stringify(this.oldEnumValue)) {
          this.formRed = true
        }
      }
    }
  },
  methods: {
    selectParentVal (val) {
      this.typeId = val
      this.metaForm.v_ParamValue = undefined
      this.metaForm.v_ParamValue1 = undefined
      this.metaForm.v_ParamValue2 = undefined
      this.metaForm.v_ParamValue3 = undefined
      this.metaForm.v_ParamValue4 = undefined
      if (!this.enumValue) {
        if (val === 'default') {
          this.noFlag = true
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (val === 'Number') {
          this.noFlag = false
          this.numFlag = true
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (val === 'colorBlocks') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = true
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
          this.metaForm.v_ParamValue = this.paramValue.v_ParamValue.color1
        } else if (val === 'date') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = true
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (val === 'time') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = true
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (val === 'datetime') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = true
          this.switchFlag = false
          this.imageFlag = false
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (val === 'switch') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = true
          this.imageFlag = false
          this.styleFlag = false
          this.enumValueFlag = true
          this.enumValue = ''
        } else if (val === 'Img') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = true
          this.styleFlag = false
          this.enumValueFlag = false
        } else if (val === 'style') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = false
          this.imageFlag = false
          this.styleFlag = true
          this.enumValueFlag = false
        }
      } else {
        if (val === 'switch') {
          this.noFlag = false
          this.numFlag = false
          this.colorFlag = false
          this.dataFlag = false
          this.timeFlag = false
          this.dateFlag = false
          this.switchFlag = true
          this.imageFlag = false
          this.enumFlag = false
          this.styleFlag = false
          this.enumValueFlag = true
          this.enumValue = ''
        }
      }
    },
    // 处理图片放大
    changeImage (val) {
      this.srcList = []
      this.srcList.push(val)
    },
    changeImage1 (val) {
      this.srcList1 = []
      this.srcList1.push(val)
    },
    changeImage2 (val) {
      this.srcList2 = []
      this.srcList2.push(val)
    },
    changeImage3 (val) {
      this.srcList3 = []
      this.srcList3.push(val)
    },
    changeImage4 (val) {
      this.srcList4 = []
      this.srcList4.push(val)
    },
    // 处理预览色块
    colorPreview (val1, val2, val3, val4) {
      setTimeout(() => {
        document.querySelector(`${val4} > i`).style.visibility = 'hidden'
        if (val2) {
          if (!val3) {
            val3 = 0
          }
          document.querySelector(`${val4}`).style.background = `linear-gradient(${val3}deg,${val1} 0%,${val2} 100%)`
        } else {
          document.querySelector(`${val4}`).style.background = `${val1}`
        }
        if (!val1) {
          document.querySelector(`${val4}`).style.background = `${val2}`
        }
        if (!val1 && !val2) {
          document.querySelector(`${val4}`).style.background = 'none'
          document.querySelector(`${val4} > i`).style.visibility = 'visible'
        }
      }, 100)
    },
    changeColor (val, index) {
      this.colorList.splice(index, 1, val)
      this.formRed = true
    },
    changedata (val) {
      this.pickerOptions = Object.assign({}, this.pickerOptions, {
        disabledDate: (time) => {
          const oneDay = 3600 * 1000 * 24
          return new Date(val[0].substring(0, 10)).getTime() - oneDay >= time.getTime() || time.getTime() >= new Date(val[1].substring(0, 10)).getTime()
        }
      })
    },
    changeTime (val) {
      this.timeRange = val
    },
    changedate (val) {
      this.pickerOptions1 = Object.assign({}, this.pickerOptions1, {
        disabledDate: (time) => {
          const oneDay = 3600 * 1000 * 24
          return new Date(val[0].substring(0, 19)).getTime() - oneDay >= time.getTime() || time.getTime() >= new Date(val[1].substring(0, 19)).getTime()
        }
      })
    },
    changeMinNum (val) {
      this.MinNumber = val
    },
    changeMaxNum (val) {
      this.MaxNumber = val
    },
    // 枚举获取系统参数值类型
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          this.fatherEnumList = res.data.dataCategoryList
          this.fatherEnumList.splice(8, 1)

          this.componentTypeList = res.data.componentType
        }
      })
    },
    // 获取枚举列表
    getEnumCateGoryList () {
      cgiService.getEnumCateGoryList().then(res => {
        if (res.code === 0) {
          this.options = res.data
          this.enumList = res.data
        }
      })
    },
    getOptions (val) {
      let params = {
        keywords: val
      }
      if (val) {
        setTimeout(() => {
          cgiService.getEnumCateGoryList(params).then(res => {
            if (res.code === 0) {
              this.options = res.data
            }
          })
        }, 1000)
      }
    },
    // 根据枚举分类拉取值
    getEnumValueList (val) {
      if (!val) {
        this.selectParentVal(this.typeId)
        this.enumFlag = false
        this.options = this.enumList
        if (this.typeId === 'Number') {
          this.metaForm.v_ParamValue = undefined
          this.metaForm.v_ParamValue1 = undefined
          this.metaForm.v_ParamValue2 = undefined
          this.metaForm.v_ParamValue3 = undefined
          this.metaForm.v_ParamValue4 = undefined
        } else {
          this.metaForm.v_ParamValue = ''
          this.metaForm.v_ParamValue1 = ''
          this.metaForm.v_ParamValue2 = ''
          this.metaForm.v_ParamValue3 = ''
          this.metaForm.v_ParamValue4 = ''
        }
      } else {
        this.noFlag = false
        this.numFlag = false
        this.colorFlag = false
        this.dataFlag = false
        this.timeFlag = false
        this.dateFlag = false
        this.switchFlag = false
        this.imageFlag = false
        this.enumFlag = true
      }
      this.v_EnumCode = val
      let enumCode = this.v_EnumCode
      cgiService.getEnumValues({ enumCode }).then(res => {
        if (res.code === 0 && res.data) {
          this.enumVlaList = res.data[enumCode]
        }
      })
    },
    // 时分秒转为时间戳
    countDown (time) {
      let s = ''
      let hour = time.split(':')[0]
      let min = time.split(':')[1]
      let sec = time.split(':')[2]
      s = Number(hour * 3600) + Number(min * 60) + Number(sec)
      return s
    },
    commit () {
      // let formData = this.$store.state.fieTableData
      let formData = this.$store.state.fieTreeData['CC_TR_parmeter']
      if (!formData) {
        this.$message.warning('请先选择左侧的树节点')
        return
      }
      let params = {
        ...this.metaForm
      }
      // 判断枚举值来源是否和数值类型匹配
      if (this.metaForm.i_ParamValType === 'Number' && this.enumValue) {
        if (!Number(this.metaForm.v_ParamValue) || !Number(this.metaForm.v_ParamValue1) || !Number(this.metaForm.v_ParamValue2) || !Number(this.metaForm.v_ParamValue3) || !Number(this.metaForm.v_ParamValue4)) {
          this.$message.error('来源枚举值类型不匹配')
        }
      }
      // 判断枚举值来源是否和时间类型匹配
      if (this.metaForm.i_ParamValType === 'date' && this.enumValue) {
        if (!(new Date(this.metaForm.v_ParamValue.substring(0, 10)).getTime()) || !(new Date(this.metaForm.v_ParamValue1.substring(0, 10)).getTime()) || !(new Date(this.metaForm.v_ParamValue2.substring(0, 10)).getTime()) || !(new Date(this.metaForm.v_ParamValue3.substring(0, 10)).getTime()) || !(new Date(this.metaForm4.v_ParamValue.substring(0, 10)).getTime())) {
          this.$message.error('来源枚举值类型不匹配')
        }
      }
      // 判断枚举值来源是否和时间日期类型匹配
      if (this.metaForm.i_ParamValType === 'datetime' && this.enumValue) {
        if (!(new Date(this.metaForm.v_ParamValue.substring(0, 19)).getTime()) || !(new Date(this.metaForm.v_ParamValue1.substring(0, 19)).getTime()) || !(new Date(this.metaForm.v_ParamValue2.substring(0, 19)).getTime()) || !(new Date(this.metaForm.v_ParamValue3.substring(0, 19)).getTime()) || !(new Date(this.metaForm4.v_ParamValue.substring(0, 19)).getTime())) {
          this.$message.error('来源枚举值类型不匹配')
        }
      }
      // 判断枚举值来源是否和时间日期类型匹配
      if (this.metaForm.i_ParamValType === 'time' && this.enumValue) {
        let value1 = this.countDown(this.metaForm.v_ParamValue)
        let value2 = this.countDown(this.metaForm.v_ParamValue1)
        let value3 = this.countDown(this.metaForm.v_ParamValue2)
        let value4 = this.countDown(this.metaForm.v_ParamValue3)
        let value5 = this.countDown(this.metaForm.v_ParamValue4)
        if (!value1 || !value2 || !value3 || !value4 || !value5) {
          this.$message.error('来源枚举值类型不匹配')
        }
      }
      if (this.v_EnumCode !== '') {
        this.$set(params, 'v_EnumCode', this.v_EnumCode)
      } else {
        if (this.metaForm.i_ParamValType === 'colorBlocks') {
          this.$set(params, 'v_PreColor', this.color)
          params.v_ParamValue = this.paramValue.v_ParamValue.color1 + ' ' + (this.paramValue.v_ParamValue.color2 === null ? '' : this.paramValue.v_ParamValue.color2) + ' ' + (this.paramValue.v_ParamValue.deg === '' ? 0 : this.paramValue.v_ParamValue.deg)
          params.v_ParamValue1 = (this.paramValue.v_ParamValue1.color1 === null ? '' : this.paramValue.v_ParamValue1.color1) + ' ' + (this.paramValue.v_ParamValue1.color2 === null ? '' : this.paramValue.v_ParamValue1.color2) + ' ' + this.paramValue.v_ParamValue1.deg
          params.v_ParamValue2 = (this.paramValue.v_ParamValue2.color1 === null ? '' : this.paramValue.v_ParamValue2.color1) + ' ' + (this.paramValue.v_ParamValue2.color2 === null ? '' : this.paramValue.v_ParamValue2.color2) + ' ' + this.paramValue.v_ParamValue2.deg
          params.v_ParamValue3 = (this.paramValue.v_ParamValue3.color1 === null ? '' : this.paramValue.v_ParamValue3.color1) + ' ' + (this.paramValue.v_ParamValue3.color2 === null ? '' : this.paramValue.v_ParamValue3.color2) + ' ' + this.paramValue.v_ParamValue3.deg
          params.v_ParamValue4 = (this.paramValue.v_ParamValue4.color1 === null ? '' : this.paramValue.v_ParamValue4.color1) + ' ' + (this.paramValue.v_ParamValue4.color2 === null ? '' : this.paramValue.v_ParamValue4.color2) + ' ' + this.paramValue.v_ParamValue4.deg
        }
        if (this.metaForm.i_ParamValType === 'date' || this.metaForm.i_ParamValType === 'time' || this.metaForm.i_ParamValType === 'datetime') {
          params.v_TimeRange = JSON.stringify(params.v_TimeRange)
        }
      }
      if (this.enumValue.length === 0) {
        this.$set(params, 'v_EnumCode', '')
      }
      if (this.metaForm.i_ParamValType === 'default' || this.metaForm.i_ParamValType === 'Img' || this.metaForm.i_ParamValType === 'colorBlocks' || this.metaForm.i_ParamValType === 'switch' || this.metaForm.i_ParamValType === 'style') {
        delete params.i_MinNumber
        delete params.i_MaxNumber
        delete params.v_TimeRange
      } else if (this.metaForm.i_ParamValType === 'Number') {
        delete params.v_TimeRange
      } else if (this.metaForm.i_ParamValType === 'date' || this.metaForm.i_ParamValType === 'time' || this.metaForm.i_ParamValType === 'datetime') {
        delete params.i_MinNumber
        delete params.i_MaxNumber
      }
      this.$set(params, 'i_BizID', formData.i_BizID)
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.tempParameterSaveData2(params).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.metaForm.i_Id = res.iId
              }
              this.oldModAddData = Object.assign({}, this.metaForm)
              this.$message.success(res.msg)
              this.$emit('getTableData', { changeSpecialNodeData: [{ i_Cid: res.i_Cid, isCurrentNode: true }] })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
.add-org-form {
  .el-form {
    overflow-x: hidden;
    // border: none !important;
    padding: 16px;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin: 15px 0 12px;
      padding: 16px 0;
      &:first-of-type {
        margin-top: 0;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
    }
    /deep/ .el-switch {
      width: 40px;
    }
  }
}
#form-sys-parameter {
  padding-bottom: 0;
}
.default-color {
  margin-left: 0px!important;
}
.span-color {
  margin-left: 13px!important;
}
.color-conBox {
  /deep/ .el-input__inner {
    padding: 0 4px!important;
  }
}
.preview-color1,
.preview-color2,
.preview-color3,
.preview-color4,
.preview-color5 {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
}
.data-scope,
.time-scope,
.date-scope {
  width: 100%!important;
  padding-right: 0px!important;
  /deep/ .el-range__close-icon {
    height: 32px!important;
    line-height: 32px!important;
  }
}
.data-conBox, .time-conBox{
  .dpicker {
    width: 150px!important;
    /deep/ .el-input__inner {
      padding-left: 30px!important;
      padding-right: 20px!important;
    }
  }
}
.date-conBox {
  .dpicker {
    width: 150px!important;
    /deep/ .el-input__inner {
      padding-left: 30px!important;
      padding-right: 0px!important;
    }
  }
}
.image-conBox {
  /deep/ .el-input {
    width: 84%!important;
  }
  .image-box {
    width: 45px;
    height: 30px;
    background-color: #E6E6E6;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    /deep/ .image-slot {
      text-align: center;
    }
  }
}
.style-conBox {
  /deep/ .el-input {
    width: 82%!important;
  }
  .style-box {
      height: 30px;
      width: 48px;
      display: inline-block;
      border: 1px solid #E6E6E6;
      vertical-align: middle;
      text-align: center;
    }
}
.value-box {
  color: aqua!important;
  background-color: #999;
  border-radius: 5px;
}
</style>
