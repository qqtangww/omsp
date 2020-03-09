<!-- 上下局组件添加组件参数 -->
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
      inline-message
      :model="metaForm"
      :rules="rules"
      label-width="100px"
      id="form-org-parameter"
    >
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="conBox">
          <el-form-item label="参数编码" prop="v_ParamCode">
            <el-input
              :disabled="isDisableOrg"
              v-model="metaForm.v_ParamCode"
              placeholder="可填写数字，英文,下划线组成"
            />
          </el-form-item>
          <el-form-item label="参数名称" prop="v_ParamName">
            <!-- <el-input v-model="metaForm.v_ParamName"   /> -->
            <el-select
              clearable
              filterable
              v-model="metaForm.v_ParamName"
              @change="selectParentVal"
              placeholder="请选择"
              :disabled="isDisable"
            >
              <el-option
                v-for="(item,key) in fatherEnumList"
                :key="key"
                :label="item.v_ParamName"
                :value="item.v_ParamCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="适用类型">
            <el-select
              v-model="metaForm.v_ComponentType"
              placeholder="请选择"
              :disabled="isDisableOrg"
            >
              <el-option
                v-for="(item,key) in componentTypeList"
                :key="key"
                :label="item.v_EnumValue"
                :value="item.v_EnumValueName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参数描述" prop="v_Description" class='description-label'>
            <el-input
              v-model="metaForm.v_Description"
              placeholder="可填写相关描述，帮助用户记忆和了解"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
              :disabled="isDisableOrg"
            />
          </el-form-item>
        </div>
      </div>
      <div id="border-box">
        <el-row class="box-head">
          <el-col :span="4" :push="2">
            <div>参数值</div>
          </el-col>
          <el-col :span="7" :push="5">
            <div>组件</div>
          </el-col>
          <el-col :span="7" :push="7">
            <div>上下</div>
          </el-col>
        </el-row>
        <!-- 默认 -->
        <div v-if="noFlag" id="no-conBox">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue === null ? '/' : sysMetaForm.v_ParamValue"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input placeholder v-model="metaForm.v_ParamValue"></el-input>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue1 === null ? '/' : sysMetaForm.v_ParamValue1"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input placeholder v-model="metaForm.v_ParamValue1"></el-input>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue2 === null ? '/' : sysMetaForm.v_ParamValue2"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input placeholder v-model="metaForm.v_ParamValue2"></el-input>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue3 === null ? '/' : sysMetaForm.v_ParamValue3"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input placeholder v-model="metaForm.v_ParamValue3"></el-input>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue4 === null ? '/' : sysMetaForm.v_ParamValue4"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input placeholder v-model="metaForm.v_ParamValue4"></el-input>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 数字类型 -->
        <div v-if="numFlag" id="num-conBox">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    :value="sysMetaForm.v_ParamValue === '' ? undefined : sysMetaForm.v_ParamValue"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                    :disabled="true"
                  />
                </div>
              </el-col>
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                  />
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    :value="sysMetaForm.v_ParamValue1 === '' ? undefined : sysMetaForm.v_ParamValue1"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                    :disabled="true"
                  />
                </div>
              </el-col>
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue1"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                  />
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    :value="sysMetaForm.v_ParamValue2 === '' ? undefined : sysMetaForm.v_ParamValue2"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                    :disabled="true"
                  />
                </div>
              </el-col>
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue2"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                  />
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    :value="sysMetaForm.v_ParamValue3 === '' ? undefined : sysMetaForm.v_ParamValue3"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                    :disabled="true"
                  />
                </div>
              </el-col>
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue3"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                  />
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    :value="sysMetaForm.v_ParamValue4 === '' ? undefined : sysMetaForm.v_ParamValue4"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                    :disabled="true"
                  />
                </div>
              </el-col>
              <el-col :span="10" :push="5">
                <div>
                  <el-input-number
                    controls-position="right"
                    v-model="metaForm.v_ParamValue4"
                    :min="Number(sysMetaForm.i_MinNumber)"
                    :max="Number(sysMetaForm.i_MaxNumber)"
                    label
                  />
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 颜色类型 -->
        <div v-if="colorFlag" id="color-conBox">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="2">
                <div>
                  <div id="colorval-input">
                    <el-input v-model="sysMetaForm.v_ParamValue" disabled/>
                  </div>
                  <div class="preview1-color1">
                    <i  class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" :push="4">
                <div>
                  <span class="default-color">
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor1'  v-model="metaForm.v_ParamValue"></el-color-picker>
                  </span>
                  <span>
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor2'  v-model="paramValue.v_ParamValue.color2"></el-color-picker>
                  </span>
                  <div id="deg-input">
                    <el-input v-model="paramValue.v_ParamValue.deg" @change='changeColor3' placeholder="度数"/>
                  </div>
                  <div class="preview-color1">
                    <i v-if="iconFlag1" class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <div id="colorval-input">
                    <el-input :value="sysMetaForm.v_ParamValue1" disabled/>
                  </div>
                  <div class="preview1-color2">
                    <i  class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="8" :push="4">
                <div>
                  <span class="default-color">
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor4'  v-model="paramValue.v_ParamValue1.color1"></el-color-picker>
                  </span>
                  <span>
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor5'  v-model="paramValue.v_ParamValue1.color2"></el-color-picker>
                  </span>
                  <div id="deg-input">
                    <el-input v-model="paramValue.v_ParamValue1.deg" @change='changeColor6' placeholder="度数"/>
                  </div>
                  <div class="preview-color2">
                    <i v-if="iconFlag2" class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <div id="colorval-input">
                    <el-input v-model="sysMetaForm.v_ParamValue2" disabled/>
                  </div>
                  <div class="preview1-color3">
                    <i  class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" :push="4">
                <div>
                  <span class="default-color">
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor7' v-model="paramValue.v_ParamValue2.color1"></el-color-picker>
                  </span>
                  <span>
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor8'  v-model="paramValue.v_ParamValue2.color2"></el-color-picker>
                  </span>
                  <div id="deg-input">
                    <el-input v-model="paramValue.v_ParamValue2.deg" @change='changeColor9' placeholder="度数"/>
                  </div>
                  <div class="preview-color3">
                    <i v-if="iconFlag3" class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <div id="colorval-input">
                    <el-input v-model="sysMetaForm.v_ParamValue3" disabled/>
                  </div>
                  <div class="preview1-color4">
                    <i  class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" :push="4">
                <div>
                  <span class="default-color">
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor10' v-model="paramValue.v_ParamValue3.color1"></el-color-picker>
                  </span>
                  <span>
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor11'  v-model="paramValue.v_ParamValue3.color2"></el-color-picker>
                  </span>
                  <div id="deg-input">
                    <el-input v-model="paramValue.v_ParamValue3.deg" @change='changeColor12' placeholder="度数"/>
                  </div>
                  <div class="preview-color4">
                    <i v-if="iconFlag4" class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <div id="colorval-input">
                    <el-input v-model="sysMetaForm.v_ParamValue4" disabled/>
                  </div>
                  <div class="preview1-color5">
                    <i  class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="10" :push="4">
                <div>
                  <span class="default-color">
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor13'  v-model="paramValue.v_ParamValue4.color1"></el-color-picker>
                  </span>
                  <span>
                    <el-color-picker size="small" :predefine="colorList" @change='changeColor14'  v-model="paramValue.v_ParamValue4.color2"></el-color-picker>
                  </span>
                  <div id="deg-input">
                    <el-input v-model="paramValue.v_ParamValue4.deg" @change='changeColor15' placeholder="度数"/>
                  </div>
                  <div class="preview-color5">
                    <i v-if="iconFlag5" class="el-icon-close"></i>
                  </div>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 日期类型 -->
        <div v-if="dataFlag" class="data-conBox">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="sysMetaForm.v_ParamValue"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="sysMetaForm.v_ParamValue1"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue1"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="sysMetaForm.v_ParamValue2"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue2"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="sysMetaForm.v_ParamValue3"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue3"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="sysMetaForm.v_ParamValue4"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd"
                    v-model="metaForm.v_ParamValue4"
                    type="date"
                    :picker-options="pickerOptions"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 时间类型 -->
        <div v-if="timeFlag" class="time-conBox">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间"
                    disabled>
                  </el-time-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue1"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间"
                    disabled>
                  </el-time-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue2"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间"
                    disabled>
                    >
                  </el-time-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue3"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间"
                    disabled>
                    >
                  </el-time-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-time-picker
                    class="dpicker"
                    value-format="HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue4"
                    :picker-options="{
                      selectableRange: `${timeRange[0]} - ${timeRange[1]}`
                    }"
                    placeholder="请选择时间"
                    disabled>
                    >
                  </el-time-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 日期时间类型 -->
        <div v-if="dateFlag" class="date-conBox">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue1"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue2"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue3"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="2">
                <div class="block">
                  <el-date-picker
                    class="dpicker"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="sysMetaForm.v_ParamValue4"
                    type="datetime"
                    :picker-options="pickerOptions1"
                    placeholder="请选择时间"
                    disabled>
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
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
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 开关类型 -->
        <div v-if="switchFlag">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="6">
                <div>
                  <el-switch
                    v-model="sysMetaForm.v_ParamValue"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    disabled
                  ></el-switch>
                </div>
              </el-col>
              <el-col :span="10" :push="7">
                <div>
                  <el-switch
                    v-model="metaForm.v_ParamValue"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="6">
                <div>
                  <el-switch
                    v-model="sysMetaForm.v_ParamValue1"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    disabled
                  ></el-switch>
                </div>
              </el-col>
              <el-col :span="10" :push="7">
                <div>
                  <el-switch
                    v-model="metaForm.v_ParamValue1"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="6">
                <div>
                  <el-switch
                    v-model="sysMetaForm.v_ParamValue2"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    disabled
                  ></el-switch>
                </div>
              </el-col>
              <el-col :span="10" :push="7">
                <div>
                  <el-switch
                    v-model="metaForm.v_ParamValue2"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="6">
                <div>
                  <el-switch
                    v-model="sysMetaForm.v_ParamValue3"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    disabled
                  ></el-switch>
                </div>
              </el-col>
              <el-col :span="10" :push="7">
                <div>
                  <el-switch
                    v-model="metaForm.v_ParamValue3"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="6">
                <div>
                  <el-switch
                    v-model="sysMetaForm.v_ParamValue4"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                    disabled
                  ></el-switch>
                </div>
              </el-col>
              <el-col :span="10" :push="7">
                <div>
                  <el-switch
                    v-model="metaForm.v_ParamValue4"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 图片类型 -->
        <div class="image-conBox" v-if="imageFlag">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="2">
                <div>
                  <textarea id="copy-site1" v-model="sysMetaForm.v_ParamValue"></textarea>
                  <span :value='sysMetaForm.v_ParamValue' class="copy-site1" @click="copySite('#copy-site1')">复制地址</span>
                  <el-image
                    class="image-box"
                    :src="sysMetaForm.v_ParamValue"
                    :preview-src-list="sysSrcList">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue" @change="changeImage" />
                  <el-image
                    class="image-box"
                    :src="metaForm.v_ParamValue"
                    :preview-src-list="srcList">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <textarea id="copy-site2" v-model="sysMetaForm.v_ParamValue1"></textarea>
                  <span class="copy-site2" @click="copySite('#copy-site2')">复制地址</span>
                  <el-image
                    class="image-box"
                    :src="sysMetaForm.v_ParamValue1"
                    :preview-src-list="sysSrcList1">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue1" @change="changeImage1" />
                  <el-image
                    class="image-box"
                    :src="metaForm.v_ParamValue1"
                    :preview-src-list="srcList1">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <textarea id="copy-site3" v-model="sysMetaForm.v_ParamValue2"></textarea>
                  <span class="copy-site3" @click="copySite('#copy-site3')">复制地址</span>
                  <el-image
                    class="image-box"
                    :src="sysMetaForm.v_ParamValue2"
                    :preview-src-list="sysSrcList2">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue2" @change="changeImage2" />
                  <el-image
                    class="image-box"
                    :src="metaForm.v_ParamValue2"
                    :preview-src-list="srcList2">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <textarea id="copy-site4" v-model="sysMetaForm.v_ParamValue3"></textarea>
                  <span class="copy-site4" @click="copySite('#copy-site4')">复制地址</span>
                  <el-image
                    class="image-box"
                    :src="sysMetaForm.v_ParamValue3"
                    :preview-src-list="sysSrcList3">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue3" @change="changeImage3" />
                  <el-image
                    class="image-box"
                    :src="metaForm.v_ParamValue3"
                    :preview-src-list="srcList3">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <textarea id="copy-site5" v-model="sysMetaForm.v_ParamValue4"></textarea>
                  <span class="copy-site5" @click="copySite('#copy-site5')">复制地址</span>
                  <el-image
                    class="image-box"
                    :src="sysMetaForm.v_ParamValue4"
                    :preview-src-list="sysSrcList4">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue4" @change="changeImage4" />
                  <el-image
                    class="image-box"
                    :src="metaForm.v_ParamValue4"
                    :preview-src-list="srcList4">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 枚举 -->
        <div v-if="enumFlag">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue === '' ? '/' : sysMetaForm.v_ParamValue"
                    disabled
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
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
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue1 === '' ? '/' : sysMetaForm.v_ParamValue1"
                    disabled
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
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
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue2 === '' ? '/' : sysMetaForm.v_ParamValue2"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
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
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue3 === '' ? '/' : sysMetaForm.v_ParamValue3"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
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
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="2">
                <div>
                  <el-input
                    placeholder
                    :value="sysMetaForm.v_ParamValue4 === '' ? '/' : sysMetaForm.v_ParamValue4"
                    :disabled="true"
                  ></el-input>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
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
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
        <!-- 样式类型 -->
        <div class="image-conBox" v-if="styleFlag">
          <el-row>
            <el-form-item label="值1" label-width="90px" prop="v_ParamValue">
              <el-col :span="10" :push="4">
                <div>
                  <textarea id="copy-site1" v-model="sysMetaForm.v_ParamValue"></textarea>
                  <span class="copy-site1" @click="copySite('#copy-site1')">复制类名</span>
                  <span :class="['style-box',`${sysMetaForm.v_ParamValue}`]">样式</span>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue" />
                  <span :class="['style-box',`${metaForm.v_ParamValue}`]">样式</span>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值2" label-width="90px">
              <el-col :span="10" :push="4">
                <div>
                  <textarea id="copy-site2" v-model="sysMetaForm.v_ParamValue1"></textarea>
                  <span class="copy-site2" @click="copySite('#copy-site2')">复制类名</span>
                  <span :class="['style-box',`${sysMetaForm.v_ParamValue1}`]">样式</span>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue1" />
                  <span :class="['style-box',`${metaForm.v_ParamValue1}`]">样式</span>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值3" label-width="90px">
              <el-col :span="10" :push="4">
                <div>
                  <textarea id="copy-site3" v-model="sysMetaForm.v_ParamValue2"></textarea>
                  <span class="copy-site3" @click="copySite('#copy-site3')">复制类名</span>
                  <span :class="['style-box',`${sysMetaForm.v_ParamValue2}`]">样式</span>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue2" />
                  <span :class="['style-box',`${metaForm.v_ParamValue2}`]">样式</span>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值4" label-width="90px">
              <el-col :span="10" :push="4">
                <div>
                  <textarea id="copy-site4" v-model="sysMetaForm.v_ParamValue3"></textarea>
                  <span class="copy-site4" @click="copySite('#copy-site4')">复制类名</span>
                  <span :class="['style-box',`${sysMetaForm.v_ParamValue3}`]">样式</span>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue3" />
                  <span :class="['style-box',`${metaForm.v_ParamValue3}`]">样式</span>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="值5" label-width="90px">
              <el-col :span="10" :push="4">
                <div>
                  <textarea id="copy-site5" v-model="sysMetaForm.v_ParamValue4"></textarea>
                  <span class="copy-site5" @click="copySite('#copy-site5')">复制类名</span>
                  <span :class="['style-box',`${sysMetaForm.v_ParamValue4}`]">样式</span>
                </div>
              </el-col>
              <el-col :span="10" :push="3">
                <div>
                  <el-input v-model="metaForm.v_ParamValue4" />
                  <span :class="['style-box',`${metaForm.v_ParamValue4}`]">样式</span>
                </div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import changeColor from '@/common/js/mixins/changeColor'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'comParameter_upDown',
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
      fatherEnumList: [],
      metaForm: {
        v_ParamCode: '',
        v_ParamName: '',
        v_ComponentType: '',
        v_Description: '',
        v_ParamValue: undefined,
        v_ParamValue1: undefined,
        v_ParamValue2: undefined,
        v_ParamValue3: undefined,
        v_ParamValue4: undefined
      },
      oldModAddData: {
        v_ParamCode: '',
        v_ParamName: '',
        v_ComponentType: '',
        v_Description: '',
        v_ParamValue: undefined,
        v_ParamValue1: undefined,
        v_ParamValue2: undefined,
        v_ParamValue3: undefined,
        v_ParamValue4: undefined
      },
      sysMetaForm: {
        i_ParamValType: '',
        v_ParamValue: undefined,
        v_ParamValue1: undefined,
        v_ParamValue2: undefined,
        v_ParamValue3: undefined,
        v_ParamValue4: undefined,
        i_MaxNumber: '',
        i_MinNumber: ''
      },
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
      iconFlag1: true,
      iconFlag2: true,
      iconFlag3: true,
      iconFlag4: true,
      iconFlag5: true,
      formData: {},
      isDisable: false,
      isDisableOrg: true,
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
        v_ParamValue: [
          { required: true, message: '请输入组件参数值1', trigger: 'blur' }
        ]
      },
      formRed: false,
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
      colorList: [],
      timeRange: ['00:00:00', '23:59:59'],
      pickerOptions: {},
      pickerOptions1: {},
      sysSrcList: [],
      sysSrcList1: [],
      sysSrcList2: [],
      sysSrcList3: [],
      sysSrcList4: [],
      srcList: [],
      srcList1: [],
      srcList2: [],
      srcList3: [],
      srcList4: [],
      enumVlaList: [],
      v_EnumCode: '',
      componentTypeList: []
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
    }
  },
  created () {
    let enumCode = ['componentType']
    this.getEnumValue({ enumCode })
    let formData = this.$store.state.fieTableData
    this.getParameterSysList()
    let confsBtn = this.$store.state.confsBtn
    if (formData.v_EnumCode === '') {
      if (formData.i_ParamValType === 'Number') {
        formData.v_ParamValue = Number(formData.v_ParamValue)
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
    if (confsBtn.operationcode === 'modify') {
      this.isDisable = true
      util.initFormData(this.metaForm, formData)
      if (formData.v_EnumCode === '') {
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
        // 处理颜色
        if (formData.i_ParamValType === 'colorBlocks') {
          let val1 = formData.v_ParamValue.split(' ')
          let val2 = formData.v_ParamValue1.split(' ')
          let val3 = formData.v_ParamValue2.split(' ')
          let val4 = formData.v_ParamValue3.split(' ')
          let val5 = formData.v_ParamValue4.split(' ')

          // 处理预览色
          this.$nextTick(() => {
            setTimeout(() => {
              this.colorPreview(val1[0], val1[1], val1[2], '.preview-color1')
              this.colorPreview(val2[0], val2[1], val2[2], '.preview-color2')
              this.colorPreview(val3[0], val3[1], val3[2], '.preview-color3')
              this.colorPreview(val4[0], val4[1], val4[2], '.preview-color4')
              this.colorPreview(val5[0], val5[1], val5[2], '.preview-color5')
            }, 100)
          })

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
      this.selectParentVal(formData.v_ParamCode)
    }
    this.oldModAddData = Object.assign({}, this.metaForm)
  },
  methods: {
    commit () {
      let formData = this.$store.state.repetitionRowTabData['regin1']
      let params = {
        ...this.metaForm
      }
      delete params.v_ParamName
      delete params.v_Description
      delete params.i_ParamValType
      if (this.v_EnumCode === '') {
        if (this.metaForm.i_ParamValType === 'colorBlocks') {
          params.v_ParamValue = this.paramValue.v_ParamValue.color1 + ' ' + (this.paramValue.v_ParamValue.color2 === null ? '' : this.paramValue.v_ParamValue.color2) + ' ' + (this.paramValue.v_ParamValue.deg === '' ? 0 : this.paramValue.v_ParamValue.deg)
          params.v_ParamValue1 = (this.paramValue.v_ParamValue1.color1 === null ? '' : this.paramValue.v_ParamValue1.color1) + ' ' + (this.paramValue.v_ParamValue1.color2 === null ? '' : this.paramValue.v_ParamValue1.color2) + ' ' + this.paramValue.v_ParamValue1.deg
          params.v_ParamValue2 = (this.paramValue.v_ParamValue2.color1 === null ? '' : this.paramValue.v_ParamValue2.color1) + ' ' + (this.paramValue.v_ParamValue2.color2 === null ? '' : this.paramValue.v_ParamValue2.color2) + ' ' + this.paramValue.v_ParamValue2.deg
          params.v_ParamValue3 = (this.paramValue.v_ParamValue3.color1 === null ? '' : this.paramValue.v_ParamValue3.color1) + ' ' + (this.paramValue.v_ParamValue3.color2 === null ? '' : this.paramValue.v_ParamValue3.color2) + ' ' + this.paramValue.v_ParamValue3.deg
          params.v_ParamValue4 = (this.paramValue.v_ParamValue4.color1 === null ? '' : this.paramValue.v_ParamValue4.color1) + ' ' + (this.paramValue.v_ParamValue4.color2 === null ? '' : this.paramValue.v_ParamValue4.color2) + ' ' + this.paramValue.v_ParamValue4.deg
        }
      }
      this.$set(params, 'v_Code', formData.v_ViewID)
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.getComParameter(params).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.metaForm.i_Id = res.iId
              }
              this.oldModAddData = Object.assign({}, this.metaForm)
              this.$message.success(res.msg)
              let params = this.$store.state.paginations['CC_VW_contentCompParameter']
              this.$emit('getTableData', params)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 复制图片地址
    copySite (val) {
      this.CopyUrl(val)
    },
    CopyUrl (imageClass) {
      let url = document.querySelector(imageClass)
      url.select() // 选择对象
      document.execCommand('Copy')
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
    // 下拉框Change事件
    selectParentVal (code) {
      // let formData = this.$store.state.fieTableData
      let params = { v_ParamCode: code }
      cgiService.getOneSysParameter(params).then(res => {
        if (res.code === 0) {
          let data = res.data
          this.metaForm.v_ParamCode = data.v_ParamCode
          this.metaForm.v_ParamName = data.v_ParamName
          this.metaForm.v_ComponentType = data.v_ComponentType
          this.oldModAddData.v_ComponentType = data.v_ComponentType
          this.metaForm.v_Description = data.v_Description
          this.metaForm.i_ParamValType = data.i_ParamValType
          this.oldModAddData.i_ParamValType = data.i_ParamValType
          this.oldModAddData.v_Description = data.v_Description
          this.sysMetaForm.i_ParamValType = data.i_ParamValType
          this.sysMetaForm.i_MaxNumber = data.i_MaxNumber
          this.sysMetaForm.i_MinNumber = data.i_MinNumber
          this.sysMetaForm.v_ParamValue = data.v_ParamValue || ''
          this.sysMetaForm.v_ParamValue1 = data.v_ParamValue1 || ''
          this.sysMetaForm.v_ParamValue2 = data.v_ParamValue2 || ''
          this.sysMetaForm.v_ParamValue3 = data.v_ParamValue3 || ''
          this.sysMetaForm.v_ParamValue4 = data.v_ParamValue4 || ''
          this.v_EnumCode = data.v_EnumCode
          if (this.v_EnumCode) {
            let enumCode = this.v_EnumCode
            cgiService.getEnumValues({ enumCode }).then(res => {
              this.enumVlaList = res.data[enumCode]
            })
          }

          if (this.v_EnumCode === '') {
            if (data.v_PreColor) {
              this.colorList = []
              this.color = JSON.parse(data.v_PreColor)
              for (let key in this.color) {
                if (this.color[key]) {
                  this.colorList.push(this.color[key])
                }
              }
            }
            if (this.sysMetaForm.i_ParamValType === 'default') {
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
            }
            if (this.sysMetaForm.i_ParamValType === 'Number') {
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
            }
            if (this.sysMetaForm.i_ParamValType === 'colorBlocks') {
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
              this.metaForm.v_ParamValue = this.paramValue.v_ParamValue.color1
              let val1 = data.v_ParamValue.split(' ')
              let val2 = data.v_ParamValue1.split(' ')
              let val3 = data.v_ParamValue2.split(' ')
              let val4 = data.v_ParamValue3.split(' ')
              let val5 = data.v_ParamValue4.split(' ')
              this.colorPreview(val1[0], val1[1], val1[2], '.preview1-color1')
              this.colorPreview(val2[0], val2[1], val2[2], '.preview1-color2')
              this.colorPreview(val3[0], val3[1], val3[2], '.preview1-color3')
              this.colorPreview(val4[0], val4[1], val4[2], '.preview1-color4')
              this.colorPreview(val5[0], val5[1], val5[2], '.preview1-color5')
            }
            if (this.sysMetaForm.i_ParamValType === 'date') {
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
              this.pickerOptions = Object.assign({}, this.pickerOptions, {
                disabledDate: (time) => {
                  let val = JSON.parse(data.v_TimeRange)
                  const oneDay = 3600 * 1000 * 24
                  return new Date(val[0].substring(0, 10)).getTime() - oneDay >= time.getTime() || time.getTime() >= new Date(val[1].substring(0, 10)).getTime()
                }
              })
            }
            if (this.sysMetaForm.i_ParamValType === 'time') {
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
              this.timeRange = JSON.parse(data.v_TimeRange)
            }
            if (this.sysMetaForm.i_ParamValType === 'datetime') {
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
              this.pickerOptions1 = Object.assign({}, this.pickerOptions1, {
                disabledDate: (time) => {
                  let val = JSON.parse(data.v_TimeRange)
                  const oneDay = 3600 * 1000 * 24
                  return new Date(val[0].substring(0, 19)).getTime() - oneDay >= time.getTime() || time.getTime() >= new Date(val[1].substring(0, 19)).getTime()
                }
              })
            }
            if (this.sysMetaForm.i_ParamValType === 'switch') {
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
            }
            if (this.sysMetaForm.i_ParamValType === 'Img') {
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
              this.sysSrcList.push(data.v_ParamValue)
              this.sysSrcList1.push(data.v_ParamValue1)
              this.sysSrcList2.push(data.v_ParamValue2)
              this.sysSrcList3.push(data.v_ParamValue3)
              this.sysSrcList4.push(data.v_ParamValue4)
            }
            if (this.sysMetaForm.i_ParamValType === 'style') {
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
            this.styleFlag = false
            this.enumFlag = true
          }
        }
      })
    },
    // 处理预览色
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
    // 获取组件参数
    getParameterSysList () {
      let params = { v_ComponentType: 'CR_UD' }
      cgiService.parameterComList(params).then(res => {
        if (res.code === 0) {
          this.fatherEnumList = res.data
        }
      })
    },
    // 枚举获取系统参数值类型
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          this.componentTypeList = res.data.componentType
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
    #border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding-bottom: 16px;
      margin-bottom: 10px;
      .box-head {
        background-color: #f7f7f7;
        line-height: 30px;
      }
      /deep/ .el-form-item__error {
        left: 52% !important;
      }
      #num-conBox {
        /deep/ .el-form-item__error {
          left: 60% !important;
        }
      }
      #no-conBox {
        /deep/ .el-form-item__error {
          left: 52% !important;
        }
      }
      #color-conBox {
        /deep/ .el-form-item__error {
          left: 57% !important;
        }
      }
      /deep/ .el-switch {
      width: 40px;
    }
    }
  }
}
#form-org-parameter {
  padding-bottom: 0;
}
#deg-input /deep/ .el-input__inner,
#deg-input /deep/ .el-input,
#deg-input{
  display: inline-block;
  vertical-align: top;
  width: 35px;
  height: 32px;
  padding: 0 2px;
}
.preview-color1,
.preview-color2,
.preview-color3,
.preview-color4,
.preview-color5,
.preview1-color1,
.preview1-color2,
.preview1-color3,
.preview1-color4,
.preview1-color5 {
  display: inline-block;
  vertical-align: top;
  width: 32px;
  height: 32px;
  line-height: 30px;
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
}
#colorval-input,
#colorval-input /deep/ .el-input__inner,
#colorval-input /deep/ .el-input {
  display: inline-block;
  vertical-align: top;
  width: 130px;
  height: 32px;
  padding: 0 2px;
}

.data-conBox,
.time-conBox,
.date-conBox{
  .dpicker {
    width: 203px!important;
    /deep/ .el-input__inner {
      padding-left: 30px!important;
      padding-right: 20px!important;
    }
  }
}
.image-conBox {
  .copy-site1,
  .copy-site2,
  .copy-site3,
  .copy-site4,
  .copy-site5{
    color: #5892F6;
    cursor: pointer;
  }
  /deep/ .el-input {
    width: 70%!important;
    /deep/ .el-input__inner {
      padding-right: 10px!important;
    }
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
#copy-site1,
#copy-site2,
#copy-site3,
#copy-site4,
#copy-site5 {
  position: absolute;
  height: 10px!important;
  z-index: -9999;
}
.style-box {
  height: 30px;
  width: 48px;
  display: inline-block;
  border: 1px solid #E6E6E6;
  vertical-align: middle;
  text-align: center;
}
</style>
