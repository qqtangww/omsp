<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 18:25:51
 * @LastEditTime: 2019-09-04 15:01:50
 * @LastEditors: Please set LastEditors
 -->
<template>
 <!-- 此组件未使用 -->
  <div class="bodyBorderBox customAccess">
    <div class="formOperateBox">
      <el-button type="text" @click="closeDia">
        <i class="iconfont icon-tuichu"></i> 关闭
      </el-button>
      <el-badge :is-dot="isBadge" class="item">
        <el-button type="text" @click="commit('form')">
          <i class="iconfont icon-baocun"></i>保存
        </el-button>
      </el-badge>
      <!-- <el-button type="text" v-if="dialogTitle ==='添加策略'" @click="nextCommit('form')">
            <i class="el-icon-d-arrow-right"></i> 下一步
      </el-button>-->
      <el-dropdown trigger="hover" @command="addBlack" v-if="showBlackWhite">
        <span class="el-dropdown-link">
          <el-button type="text">
            <i class="iconfont icon-tianjia"></i>添加
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="addBIP">IP地址</el-dropdown-item>
          <el-dropdown-item command="addBIPD">IP段</el-dropdown-item>
          <el-dropdown-item command="addBMAC">MAC地址</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 导入 -->
      <el-upload
        v-if="showBlackWhite"
        class="upload-demo"
        ref="upload"
        :action="action"
        :on-success="handleUpload1Success"
        :on-progress="() => progress1 = true"
        :show-file-list="false"
        name="szUploadFile"
      >
        <el-button slot="trigger" type="text">
          <i class="iconfont icon-daoru"></i>导入
        </el-button>
      </el-upload>
      <el-button type="text" v-if="showBlackWhite" @click="exportBtn">
        <i class="iconfont icon-daochu"></i> 导出
      </el-button>
    </div>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" class="tab-dialog components-type-form">
        <el-tab-pane label="基本信息" name="first">
          <el-form
            ref="form"
            :model="modeAddData"
            :rules="rules"
            label-width="150px"
            class="content-accessform-box">
            <div class="access-borderDiv">
              <span>
                <i class="iconfont icon-jibenxinxi"></i> 基本信息
              </span>
              <div class="accessConBox">
                <div class="access-580">
                  <el-form-item label="访问策略名称" prop="v_APname">
                    <el-input v-model="modeAddData.v_APname"/>
                  </el-form-item>
                  <el-form-item label="描述" prop="v_Description">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 6, maxRows: 8}"
                      v-model="modeAddData.v_Description"
                      placeholder="可填写相关描述，帮助用户记忆和了解"
                    />
                  </el-form-item>
                </div>
                <div class="accessLine"></div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="可访问" prop="i_IsAccessable">
                      <el-switch
                        v-model="modeAddData.i_IsAccessable"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="外网可访问" prop="i_CheckInternet">
                      <el-switch
                        v-model="modeAddData.i_CheckInternet"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否缺省策略" prop="i_IsDefault">
                      <el-switch
                        v-model="modeAddData.i_IsDefault"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="访问时间" label-width="150px" id="access-time1">
                  <el-time-select
                    class="dateBox"
                    placeholder="起始时间"
                    v-model="accessTime1"
                    :picker-options="{
                            start: '00:00',
                            step: '00:05',
                            end: '23:55'
                          }"
                  ></el-time-select>至
                  <el-time-select
                    class="dateBox"
                    placeholder="结束时间"
                    v-model="accessTime2"
                    :picker-options="{
                            start: '00:00',
                            step: '00:05',
                            end: '23:55',
                            minTime: accessTime1
                          }"
                  ></el-time-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="黑名单" name="second" :disabled="!nextFlag">
          <div class="dialogBox">
            <div class="defaultBox">
              <!-- 黑名单搜索 -->
              <el-input
                placeholder="请输入编码或名称搜索"
                clearable
                v-model="keyBlack"
                class="input-with-select"
                @keydown.enter.native="searchDataBlack"
              >
                <el-button slot="append" @click="searchDataBlack">
                  <i class="el-icon-search"></i>
                </el-button>
              </el-input>
            </div>
            <div class="addBox" v-show="MACBox">
              <div class="addBoxMsg">
                <span>添加MAC地址</span>
                <el-input v-model="macAddr" class="input-with-select"></el-input>
              </div>
              <div class="operationDiv">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="confirmMACBox(0)">确定</el-button>
              </div>
            </div>
            <div class="addBox IPBox" v-show="IPBox">
              <div class="addBoxMsg">
                <span>添加IP地址</span>
                <el-input v-model="ipAddrOne" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipAddrTwo" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipAddrThree" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipAddrFour" :maxlength="4" class="input-with-select"></el-input>
              </div>
              <div class="operationDiv">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="confirmIPBox(0,'ip')">确定</el-button>
              </div>
            </div>
            <div class="addBox IPDBox" v-show="IPDBox">
              <div class="addBoxMsg">
                <span>添加IP段</span>
                <el-input v-model="ipdAddrOne" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrTwo" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrThree" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrFour" :maxlength="4" class="input-with-select"></el-input>
                <i>~</i>
                <el-input v-model="ipdAddrFive" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrSix" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrSeven" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrEight" :maxlength="4" class="input-with-select"></el-input>
              </div>
              <div class="operationDiv">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="confirmIPBox(0,'ipd')">确定</el-button>
              </div>
            </div>
          </div>
          <div class="dialogTabBox">
            <div>
              <template>
                <div class="smallTitle">
                  <i class="iconfont icon-ip"></i>IP地址/段
                </div>
                <el-table
                  ref="multipleTable"
                  :data="ipList"
                  height="325px"
                  tooltip-effect="dark"
                  class="contentTable"
                  :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                  @selection-change="handleSelectionChangeIP"
                >
                  <!-- 批量选中 -->
                  <!-- <el-table-column type="selection" width="30"></el-table-column>
                  <el-table-column label="序号" type="index" width="50"></el-table-column>-->
                  <el-table-column prop="name" label="禁止IP地址/段">
                    <template slot-scope="scope">
                      <span
                        v-if="!(scope.row.id === editID)"
                      >{{ scope.row.endip ? (scope.row.startip+' ~ '+scope.row.endip) : scope.row.startip}}</span>
                      <div class="editBoxInput" v-if="scope.row.id === editID">
                        <el-input v-model="editBIPOne"></el-input>
                        <el-input v-model="editBIPTwo"></el-input>
                        <el-input v-model="editBIPThree"></el-input>
                        <el-input v-model="editBIPFour"></el-input>
                        <span v-if="scope.row.endip">&nbsp;~&nbsp;</span>
                        <el-input v-if="scope.row.endip" v-model="editBIPFive"></el-input>
                        <el-input v-if="scope.row.endip" v-model="editBIPSix"></el-input>
                        <el-input v-if="scope.row.endip" v-model="editBIPSeven"></el-input>
                        <el-input v-if="scope.row.endip" v-model="editBIPEight"></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="90" fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editID)"
                        @click="editIP(scope.row)"
                      >修改</el-button>
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="scope.row.id === editID"
                        @click="commitIP(scope.row)"
                      >确定</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editID)"
                        @click="delIP(scope.row)"
                      >删除</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="scope.row.id === editID"
                        @click="editID = '000'"
                      >取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 黑名单IP分页 -->
                <el-pagination
                  :current-page.sync="blackIPCurrentPage"
                  :page-sizes="blackIPPageSizes"
                  :page-size="blackIPPageSize"
                  :total="blackIPTotal"
                  background
                  class="paginationBoxSmall"
                  id="access-pagination1"
                  layout="sizes, prev, pager, next, jumper"
                  @size-change="blackIPSizeChange"
                  @current-change="blackIPCurrentChange"
                />
              </template>
            </div>
            <div>
              <template>
                <div class="smallTitle">
                  <i class="iconfont icon-macdizhi"></i>MAC地址
                </div>
                <el-table
                  ref="multipleTable"
                  :data="macList"
                  tooltip-effect="dark"
                  class="contentTable"
                  height="325px"
                  :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                  @selection-change="handleSelectionChangeMAC"
                >
                  <!-- <el-table-column type="selection" width="30"></el-table-column>
                  <el-table-column label="序号" type="index" width="50"></el-table-column>-->
                  <el-table-column prop="name" label="禁止MAC地址/段">
                    <template slot-scope="scope">
                      <span v-if="!(scope.row.id === editMacID)">{{ scope.row.mac }}</span>
                      <div class="editMacBox">
                        <el-input v-model="editMACaddr" v-if="scope.row.id === editMacID"></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="90" fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editMacID)"
                        @click="editMAC(scope.row)"
                      >修改</el-button>
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="scope.row.id === editMacID"
                        @click="commitMAC(scope.row)"
                      >确定</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editMacID)"
                        @click="delMAC(scope.row)"
                      >删除</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="scope.row.id === editMacID"
                        @click="editMacID = '000'"
                      >取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page.sync="blackMACCurrentPage"
                  :page-sizes="blackMACPageSizes"
                  :page-size="blackMACPageSize"
                  :total="blackMACTotal"
                  background
                  class="paginationBoxSmall"
                  id="access-pagination2"
                  layout="sizes, prev, pager, next, jumper"
                  @size-change="blackMACSizeChange"
                  @current-change="blackMACCurrentChange"
                />
              </template>
            </div>
          </div>
        </el-tab-pane>
        <!-- 白名单搜索 -->
        <el-tab-pane label="白名单" name="third" :disabled="!nextFlag">
          <div class="dialogBox">
            <div class="defaultBox">
              <el-input
                placeholder="请输入编码或名称搜索"
                clearable
                v-model="keyWhite"
                class="input-with-select"
                @keydown.enter.native="searchDataWhite"
              >
                <el-button slot="append" @click="searchDataWhite">
                  <i class="el-icon-search"></i>
                </el-button>
              </el-input>
            </div>
            <div class="addBox" v-show="MACBox">
              <div class="addBoxMsg">
                <span>添加MAC地址</span>
                <el-input v-model="macAddr" class="input-with-select"></el-input>
              </div>
              <div class="operationDiv">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="confirmMACBox(1)">确定</el-button>
              </div>
            </div>
            <div class="addBox IPBox" v-show="IPBox">
              <div class="addBoxMsg">
                <span>添加IP地址</span>
                <el-input v-model="ipAddrOne" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipAddrTwo" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipAddrThree" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipAddrFour" :maxlength="4" class="input-with-select"></el-input>
              </div>
              <div class="operationDiv">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="confirmIPBox(1,'ip')">确定</el-button>
              </div>
            </div>
            <div class="addBox IPDBox" v-show="IPDBox">
              <div class="addBoxMsg">
                <span>添加IP段</span>
                <el-input v-model="ipdAddrOne" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrTwo" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrThree" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrFour" :maxlength="4" class="input-with-select"></el-input>
                <i>~</i>
                <el-input v-model="ipdAddrFive" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrSix" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrSeven" :maxlength="4" class="input-with-select"></el-input>
                <i>.</i>
                <el-input v-model="ipdAddrEight" :maxlength="4" class="input-with-select"></el-input>
              </div>
              <div class="operationDiv">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="confirmIPBox(1,'ipd')">确定</el-button>
              </div>
            </div>
          </div>
          <div class="dialogTabBox">
            <div>
              <template>
                <div class="smallTitle">
                  <i class="iconfont icon-ip"></i>IP地址/段
                </div>
                <el-table
                  ref="multipleTable"
                  :data="ipList"
                  tooltip-effect="dark"
                  height="325px"
                  class="contentTable"
                  :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                  style="width: 100%"
                  @selection-change="handleSelectionChangeIP"
                >
                  <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                  <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
                  <el-table-column prop="name" label="允许IP地址/段">
                    <template slot-scope="scope">
                      <span
                        v-if="!(scope.row.id === editID)"
                      >{{ scope.row.endip ? (scope.row.startip+' ~ '+scope.row.endip) : scope.row.startip}}</span>
                      <div class="editBoxInput" v-if="scope.row.id === editID">
                        <el-input v-model="editBIPOne" :maxlength="4"></el-input>
                        <el-input v-model="editBIPTwo" :maxlength="4"></el-input>
                        <el-input v-model="editBIPThree" :maxlength="4"></el-input>
                        <el-input v-model="editBIPFour" :maxlength="4"></el-input>
                        <span v-if="scope.row.endip">&nbsp;~&nbsp;</span>
                        <el-input v-if="scope.row.endip" :maxlength="4" v-model="editBIPFive"></el-input>
                        <el-input v-if="scope.row.endip" :maxlength="4" v-model="editBIPSix"></el-input>
                        <el-input v-if="scope.row.endip" :maxlength="4" v-model="editBIPSeven"></el-input>
                        <el-input v-if="scope.row.endip" :maxlength="4" v-model="editBIPEight"></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="90" fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editID)"
                        @click="editIP(scope.row)"
                      >修改</el-button>
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="scope.row.id === editID"
                        @click="commitIP(scope.row)"
                      >确定</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editID)"
                        @click="delIP(scope.row)"
                      >删除</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="scope.row.id === editID"
                        @click="editID = '000'"
                      >取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page.sync="whiteIPCurrentPage"
                  :page-sizes="whiteIPPageSizes"
                  :page-size="whiteIPPageSize"
                  :total="whiteIPTotal"
                  background
                  class="paginationBoxSmall"
                  id="access-pagination3"
                  layout="sizes, prev, pager, next, jumper"
                  @size-change="whiteIPSizeChange"
                  @current-change="whiteIPCurrentChange"
                />
              </template>
            </div>
            <div>
              <template>
                <div class="smallTitle">
                  <i class="iconfont icon-macdizhi"></i>MAC地址
                </div>
                <el-table
                  ref="multipleTable"
                  :data="macList"
                  tooltip-effect="dark"
                  height="325px"
                  class="contentTable"
                  :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                  style="width: 100%"
                  @selection-change="handleSelectionChangeMAC"
                >
                  <!-- <el-table-column label="序号" type="index" width="50"></el-table-column> -->
                  <el-table-column prop="name" label="允许MAC地址/段">
                    <template slot-scope="scope">
                      <span v-if="!(scope.row.id === editMacID)">{{ scope.row.mac }}</span>
                      <div class="editMacBox">
                        <el-input v-model="editMACaddr" v-if="scope.row.id === editMacID"></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="90" fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editMacID)"
                        @click="editMAC(scope.row)"
                      >修改</el-button>
                      <el-button
                        type="text"
                        size="mini"
                        class="opeartionBtn"
                        v-if="scope.row.id === editMacID"
                        @click="commitMAC(scope.row)"
                      >确定</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="!(scope.row.id === editMacID)"
                        @click="delMAC(scope.row)"
                      >删除</el-button>
                      <el-button
                        size="mini"
                        type="text"
                        class="opeartionBtn"
                        v-if="scope.row.id === editMacID"
                        @click="editMacID = '000'"
                      >取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  :current-page.sync="whiteMACCurrentPage"
                  :page-sizes="whiteMACPageSizes"
                  :page-size="whiteMACPageSize"
                  :total="whiteMACTotal"
                  background
                  class="paginationBoxSmall"
                  id="access-pagination4"
                  layout="sizes, prev, pager, next, jumper"
                  @size-change="whiteMACSizeChange"
                  @current-change="whiteMACCurrentChange"
                />
              </template>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import mixins from '@/assets/js/mixin'
import { mixin } from '@/assets/js/base.js'
import { API } from '@/api/basic'
export default {
  name: 'modAddAccess',
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      // 是否显示 添加 导入 导出
      showBlackWhite: false,
      // 导入地址
      action: 'sys/AccessPwd/importAccessIp/',
      progress1: false,
      // 白名单 IP 分页 默认显示第一条数据
      whiteMACCurrentPage: 1,
      // 白名单 IP 分页 设置每页展示多少条数据数组
      whiteMACPageSizes: [10, 15, 20],
      // 白名单 IP 分页 设置默认每页展示2条数据
      whiteMACPageSize: 10,
      // 白名单 IP 分页 设置默认总条数为2
      whiteMACTotal: 0,

      // 白名单 IP 分页 默认显示第一条数据
      whiteIPCurrentPage: 1,
      // 白名单 IP 分页 设置每页展示多少条数据数组
      whiteIPPageSizes: [10, 15, 20],
      // 白名单 IP 分页 设置默认每页展示2条数据
      whiteIPPageSize: 10,
      // 白名单 IP 分页 设置默认总条数为2
      whiteIPTotal: 0,

      // 黑名单 MAC 分页 默认显示第一条数据
      blackMACCurrentPage: 1,
      // 黑名单 MAC 分页 设置每页展示多少条数据数组
      blackMACPageSizes: [15, 20, 30],
      // 黑名单 MAC 分页 设置默认每页展示2条数据
      blackMACPageSize: 15,
      // 黑名单 MAC 分页 设置默认总条数为2
      blackMACTotal: 0,

      // 黑名单 IP 分页 默认显示第一条数据
      blackIPCurrentPage: 1,
      // 黑名单 IP 分页 设置每页展示多少条数据数组
      blackIPPageSizes: [10, 15, 20],
      // 黑名单 IP 分页 设置默认每页展示2条数据
      blackIPPageSize: 10,
      // 黑名单 IP 分页 设置默认总条数为2
      blackIPTotal: 0,

      // 主页数据列表 默认显示第一页数据
      homeCurrentPage: 1,
      // 主页数据列表 设置每页展示多少条数据数组
      homePageSizes: [20, 30, 50],
      // 主页数据列表 设置默认每页展示2条数据
      homePageSize: 20,
      // 主页数据列表 设置默认总条数为2
      homeTotal: 0,

      // 以下是定义修改黑名单IP
      editBIPOne: '',
      editBIPTwo: '',
      editBIPThree: '',
      editBIPFour: '',
      editBIPFive: '',
      editBIPSix: '',
      editBIPSeven: '',
      editBIPEight: '',

      // 记录当前点击修改 IP id
      editID: '',
      // 定义修改MAC的地址
      editMACaddr: '',
      // 记录当前点击修改 MAC id
      editMacID: '',
      // ip序号
      ipID: '',
      // mac序号
      macID: '',
      // 定义apcode为当前修改的apcode
      apcodeNow: '',
      // 添加mac黑名单
      MACBox: false,
      // 添加 IP 黑名单
      IPBox: false,
      // 添加 IP 段黑名单
      IPDBox: false,
      // 黑名单搜索关键字
      keyBlack: '',
      // 白名单搜索关键字
      keyWhite: '',
      // IP列表
      ipList: [],
      // MAC列表
      macList: [],
      // mac地址
      macAddr: '',
      // 以下为ip和ip段数据定义
      ipAddrOne: '',
      ipAddrTwo: '',
      ipAddrThree: '',
      ipAddrFour: '',

      ipdAddrOne: '',
      ipdAddrTwo: '',
      ipdAddrThree: '',
      ipdAddrFour: '',
      ipdAddrFive: '',
      ipdAddrSix: '',
      ipdAddrSeven: '',
      ipdAddrEight: '',

      // 默认显示 基本信息
      activeName: 'first',
      // 获取当前页面的pageid
      pageid: '',
      nextFlag: false,
      // 增加
      addObj: {},
      // 修改
      modifyObj: {},
      // 删除
      delObj: {},
      // 搜索
      searchObj: {},
      keywords: '',
      dialogTitle: '',
      value2: true,
      // 添加修改策略弹框 绑定的访问时间
      accessTime1: '',
      accessTime2: '',
      // 定义授权时间
      // startingTime: [],
      modeAddData: {},
      showDialog: false,
      accessList: [],
      // 效验规则
      rules: {
        v_APcode: [
          { required: true, message: '请输入访问策略编码', trigger: 'blur' },
          { min: 1, max: 10, message: '长度不可超出10个字符', trigger: 'blur' }
        ],
        v_APname: [
          { required: true, message: '请输入策略名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_IncludeIP: [
          { required: true, message: '请输入允许IP地址/段', trigger: 'blur' }
        ],
        v_ExcludeIP: [
          { required: true, message: '请输入禁止IP地址/段', trigger: 'blur' }
        ],
        v_IncludeMAC: [
          { required: true, message: '请输入限制MAC地址', trigger: 'blur' }
        ]
      },
      columns: [
        {
          id: 'apcode',
          label: '编码',
          key: 'apcode',
          width: '60',
          fixed: 'left',
          showOverflowTooltip: true
        },
        {
          id: 'apname',
          label: '访问策略名称',
          key: 'apname',
          width: 'auto',
          fixed: 'left',
          showOverflowTooltip: true
        }
      ],
      // 访问时间
      accessTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value4: [],
      value1: '',
      // 访问策略列表被选中的数组
      apChecked: [],
      // ip表格被选中的数组
      idChecked: [],
      // mac表格被选中的数组
      macChecked: []
    }
  },
  watch: {
    isBadge: {
      handler: function (newVal, oldVal) {
        this.$emit('badge', newVal)
      },
      deep: true
    },
    ifDialog: {
      handler: function (val) {
        // 获取当前行操作数据
        let confsBtn = this.$store.state.confsBtn
        if (confsBtn.operationcode === 'modify') {
          // 获取 当前行的数据
          let formData = this.$store.state.fieTableData
          this.modeAddData = {
            ...formData
          }
          this.nextFlag = true
          this.modeAddData = Object.assign({}, this.modeAddData)
          let accessTime = this.modeAddData.v_TimeDefine.split('~')
          this.accessTime1 = accessTime[0]
          this.accessTime2 = accessTime[1]
          this.apcodeNow = this.modeAddData.v_APcode
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    cancel () {
      this.IPBox = false
      this.IPDBox = false
      this.MACBox = false

      this.macAddr = ''
      this.ipAddrOne = ''
      this.ipAddrTwo = ''
      this.ipAddrThree = ''
      this.ipAddrFour = ''

      this.ipdAddrOne = ''
      this.ipdAddrTwo = ''
      this.ipdAddrThree = ''
      this.ipdAddrFour = ''
      this.ipdAddrFive = ''
      this.ipdAddrSix = ''
      this.ipdAddrSeven = ''
      this.ipdAddrEight = ''

      this.editBIPOne = ''
      this.editBIPTwo = ''
      this.editBIPThree = ''
      this.editBIPFour = ''
      this.editBIPFive = ''
      this.editBIPSix = ''
      this.editBIPSeven = ''
      this.editBIPEight = ''
    },
    // 关闭弹框
    closeDia () {
      this.$emit('closeAccess', false)
      this.$emit('getButtonConfig', false)
      this.keyWhite = ''
      this.keyBlack = ''
      this.ipAddrOne = ''
      this.ipAddrTwo = ''
      this.ipAddrThree = ''
      this.ipAddrFour = ''

      this.ipdAddrOne = ''
      this.ipdAddrTwo = ''
      this.ipdAddrThree = ''
      this.ipdAddrFour = ''
      this.ipdAddrFive = ''
      this.ipdAddrSix = ''
      this.ipdAddrSeven = ''
      this.ipdAddrEight = ''

      this.editBIPOne = ''
      this.editBIPTwo = ''
      this.editBIPThree = ''
      this.editBIPFour = ''
      this.editBIPFive = ''
      this.editBIPSix = ''
      this.editBIPSeven = ''
      this.editBIPEight = ''
      this.showBlackWhite = false
    },
    editMAC (data) {
      this.editMacID = data.id
      this.editMACaddr = data.mac
    },
    // 提交修改的MAC
    commitMAC (data) {
      let params = {
        id: data.id,
        type: data.type,
        mac: this.editMACaddr,
        apcode: data.apcode
      }
      this.apiAddMac(params)
      // this.getMacList(data.type)
      this.editMacID = '000'
    },
    // 添加/修改 策略表单提交
    commit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {}
          params.v_APname = this.modeAddData.v_APname
          params.v_Description = this.modeAddData.v_Description
          params.i_IsAccessable = this.modeAddData.i_IsAccessable
          params.i_CheckInternet = this.modeAddData.i_CheckInternet
          params.i_IsDefault = this.modeAddData.i_IsDefault
          params.v_APcode = this.modeAddData.v_APcode
          // 如果是编辑
          if (this.modeAddData.i_Id > 0) {
            // params.v_APcode = this.apcodeNow
            params.i_Id = this.modeAddData.i_Id
          }
          // 如果点击保存的时候 switch绑定的值不存在就默认传0
          if (!this.modeAddData.i_IsAccessable) {
            params.i_IsAccessable = this.modeAddData.i_IsAccessable = '0'
          }
          if (!this.modeAddData.i_CheckInternet) {
            params.i_CheckInternet = this.modeAddData.i_CheckInternet = '0'
          }
          if (!this.modeAddData.i_IsDefault) {
            params.i_IsDefault = this.modeAddData.i_IsDefault = '0'
          }
          if (!this.accessTime1) {
            this.accessTime1 = ''
          }
          if (!this.accessTime2) {
            this.accessTime2 = ''
          }
          if (this.accessTime2 && this.accessTime1) {
            params.v_TimeDefine = this.accessTime1 + '~' + this.accessTime2
            params.i_CheckUseTime = '1'
          }
          params.logParams = this.$store.state.customLog
          cgiService.temAccessSaveData1(params).then(res => {
            if (!res.code) {
              if (res.iId > 0) {
                this.modeAddData.i_Id = res.iId
                this.stdFormData = Object.assign({}, this.modeAddData)
                this.apcodeNow = res.v_APcode
              }
              this.nextFlag = true
              this.$message.success(res.msg)
              this.isBadge = false
              // 重新调取接口渲染数据
              let params = this.$store.state.paginations
              this.$emit('getTableData', params)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    addBlack (command) {
      if (command === 'addBIP') {
        // 添加IP黑名单
        this.IPBox = true
        this.IPDBox = false
        this.MACBox = false
      } else if (command === 'addBIPD') {
        // 添加IP段 黑名单
        this.IPDBox = true
        this.IPBox = false
        this.MACBox = false
      } else if (command === 'addBMAC') {
        // 添加mac黑名单
        this.MACBox = true
        this.IPBox = false
        this.IPDBox = false
      }
    },
    // 添加修改IP接口
    apiAddIP (params) {
      cgiService.accessAddIP(params).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
          this.getIPList(params.type)
          this.clearIP()
          this.clearIPD()
          this.IPBox = false
          this.IPDBox = false
          // 重新调取接口渲染数据
          let param = this.$store.state.paginations
          this.$emit('getTableData', param)
          // this.$parent.$parent.$parent.getTableData({
          //   index: param.index,
          //   size: param.size
          // })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加修改MAC地址
    apiAddMac (params) {
      cgiService.accessAddMac(params).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
          this.MACBox = false
          // 添加成功后清空MAc绑定的数据
          this.macAddr = ''
          this.getMacList(params.type)
          // 重新调取接口渲染数据
          let param = this.$store.state.paginations
          this.$parent.$parent.$parent.getTableData({
            index: param.index,
            size: param.size
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 删除mac地址
    delMAC (row) {
      var ids = []
      ids.push(row.id)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.accessDelMac({ ids: ids }).then(res => {
          this.getMacList(row.type)
        })
      })
    },
    // 添加ip / ip段地址
    confirmIPBox (type, ip) {
      // iPv4的ip正则效验
      let reg = /^((\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5])\.(\d|\d\d|[0-1]\d\d|2[0-4]\d|25[0-5]))$/
      let ips =
        this.ipAddrOne +
        '.' +
        this.ipAddrTwo +
        '.' +
        this.ipAddrThree +
        '.' +
        this.ipAddrFour
      // 如果是添加的ip 并且 ip格式正确
      if (ip === 'ip' && reg.test(ips)) {
        let params = {
          id: 0,
          type,
          startip: ips,
          endip: '',
          apcode: this.apcodeNow
        }
        this.apiAddIP(params)
      } else if (ip === 'ipd') {
        // 如果添加的是ip段 并且 每段的第一个值不能为空  并且 要在0-255之间（我这里没验证0-255）
        if (this.ipdAddrOne && this.ipdAddrFive) {
          let ipdstart = this.ipdAddrOne + '.' + this.ipdAddrTwo + '.' + this.ipdAddrThree + '.' + this.ipdAddrFour
          let ipdend = this.ipdAddrFive + '.' + this.ipdAddrSix + '.' + this.ipdAddrSeven + '.' + this.ipdAddrEight
          let params = {
            id: 0,
            type: type,
            startip: ipdstart,
            endip: ipdend,
            apcode: this.apcodeNow
          }
          if (reg.test(ipdstart) && reg.test(ipdend)) {
            this.apiAddIP(params)
          } else {
            this.$message.warning('写入数据不正确，请您重新输入')
          }
        }
      } else {
        this.$message.warning('写入数据不正确，请您重新输入')
      }
    },
    // 导出
    exportBtn () {
      window.open(
        API.defaults.baseURL + 'sys/AccessPwd/exportAsccessIp/' + this.apcodeNow
      )
    },
    handleUpload1Success () {
      this.progress1 = false
      this.submitUpload()
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleClick (tab, event) {
      this.keyBlack = ''
      this.keyWhite = ''
      this.MACBox = false
      this.IPBox = false
      this.IPDBox = false
      this.cancel()
      if (tab.name === 'second') {
        // 黑名单
        this.getIPList('0')
        this.getMacList('0')
        this.showBlackWhite = true
        this.action = API.defaults.baseURL + this.action + this.apcodeNow
      } else if (tab.name === 'third') {
        // 白名单
        this.getIPList('1')
        this.getMacList('1')
        this.showBlackWhite = true
        this.action = API.defaults.baseURL + this.action + this.apcodeNow
      } else {
        this.showBlackWhite = false
      }
    },
    // 清空ip段
    clearIPD () {
      this.ipdAddrOne = ''
      this.ipdAddrTwo = ''
      this.ipdAddrThree = ''
      this.ipdAddrFour = ''
      this.ipdAddrFive = ''
      this.ipdAddrSix = ''
      this.ipdAddrSeven = ''
      this.ipdAddrEight = ''
    },
    // 清空ip
    clearIP () {
      this.ipAddrOne = ''
      this.ipAddrTwo = ''
      this.ipAddrThree = ''
      this.ipAddrFour = ''
    },
    // 获取ip  列表
    getIPList (type, keywords) {
      let params = {}
      if (Number(type) === 0) {
        // 如果是黑名单
        params = {
          index: this.blackIPCurrentPage,
          size: this.blackIPPageSize,
          keywords
        }
        cgiService.accessIpList(this.apcodeNow, type, params).then(res => {
          this.ipList = res.data
          this.blackIPTotal = res.totalCount
        })
      } else if (Number(type) === 1) {
        // 如果是白名单
        params = {
          index: this.whiteIPCurrentPage,
          size: this.whiteIPPageSize,
          keywords
        }
        cgiService.accessIpList(this.apcodeNow, type, params).then(res => {
          this.ipList = res.data
          this.whiteIPTotal = res.totalCount
        })
      }
    },
    // 获取mac 列表
    getMacList (type, keywords) {
      let params = {}
      if (Number(type) === 0) {
        // 如果是黑名单
        params = {
          index: this.blackMACCurrentPage,
          size: this.blackMACPageSize,
          keywords
        }
        cgiService.accessMacList(this.apcodeNow, type, params).then(res => {
          this.macList = res.data
          this.blackMACTotal = res.totalCount
        })
      } else if (Number(type) === 1) {
        // 如果是白名单
        params = {
          index: this.whiteMACCurrentPage,
          size: this.whiteMACPageSize,
          keywords
        }
        cgiService.accessMacList(this.apcodeNow, type, params).then(res => {
          this.macList = res.data
          this.whiteMACTotal = res.totalCount
        })
      }
    },
    // 黑名单搜索
    searchDataBlack () {
      this.getMacList(0, this.keyBlack)
      this.getIPList('0', this.keyBlack)
    },
    // 添加mac地址的确定按钮
    confirmMACBox (type) {
      // type 0 是黑名单
      // type 1 是白名单
      let params = {
        id: 0,
        type: type,
        mac: this.macAddr,
        apcode: this.apcodeNow
      }
      if (this.macAddr !== '') {
        this.apiAddMac(params)
      } else {
        this.$message.warning('请输入MAC地址!!!')
      }
    },
    // 弹框中的  修改
    editIP (data) {
      this.editFlag = false
      this.editID = data.id
      let dataArrStart = data.startip.split('.')
      let dataArrEnd = data.endip.split('.')
      if (!data.endip) {
        this.editBIPOne = dataArrStart[0]
        this.editBIPTwo = dataArrStart[1]
        this.editBIPThree = dataArrStart[2]
        this.editBIPFour = dataArrStart[3]
      } else {
        this.editBIPOne = dataArrStart[0]
        this.editBIPTwo = dataArrStart[1]
        this.editBIPThree = dataArrStart[2]
        this.editBIPFour = dataArrStart[3]

        this.editBIPFive = dataArrEnd[0]
        this.editBIPSix = dataArrEnd[1]
        this.editBIPSeven = dataArrEnd[2]
        this.editBIPEight = dataArrEnd[3]
      }
    },
    // 表格 中提交修改的IP
    commitIP (data) {
      this.editFlag = true
      let startip =
        this.editBIPOne +
        '.' +
        this.editBIPTwo +
        '.' +
        this.editBIPThree +
        '.' +
        this.editBIPFour
      let endip = ''
      // 添加的是IP段
      if (this.editBIPFive) {
        endip =
          this.editBIPFive +
          '.' +
          this.editBIPSix +
          '.' +
          this.editBIPSeven +
          '.' +
          this.editBIPEight
        let params = {
          id: data.id,
          apcode: data.apcode,
          startip: startip,
          endip: endip,
          type: data.type
        }
        this.apiAddIP(params)
      } else {
        // 添加的是IP
        let params = {
          id: data.id,
          apcode: data.apcode,
          startip: startip,
          endip: endip,
          type: data.type
        }
        this.apiAddIP(params)
      }
      this.editID = '000'
    },
    // 删除IP地址
    delIP (row) {
      var ids = []
      ids.push(row.id)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.accessDelIP({ ids: ids }).then(res => {
          if (res.code === 0) {
            this.getIPList(row.type)
            this.$message.success(res.msg)
          }
        })
      })
    },
    // 黑名单 IP 分页 分页数据调用
    blackIPSizeChange (val) {
      this.blackIPPageSize = val
      this.getIPList('0')
    },
    // 黑名单 IP 分页 分页数据调用
    blackIPCurrentChange (val) {
      this.blackIPCurrentPage = val
      this.getIPList('0')
    },
    handleSelectionChangeMAC (val) {
      this.macChecked = val
    },
    // 黑名单 MAC 分页 分页数据调用
    blackMACCurrentChange (val) {
      this.blackMACCurrentPage = val
      this.getMacList(0)
    },
    // 黑名单 MAC 分页 分页数据调用
    blackMACSizeChange (val) {
      this.blackMACPageSize = val
      this.getMacList(0)
    },
    // 白名单搜索
    searchDataWhite () {
      this.getMacList(1, this.keyWhite)
      this.getIPList('1', this.keyWhite)
    },
    // 白名单 IP 分页 分页数据调用
    whiteIPSizeChange (val) {
      this.whiteIPPageSize = val
      this.getIPList('1')
    },
    // 白名单 MAC 分页 分页数据调用
    whiteMACSizeChange (val) {
      this.whiteMACPageSize = val
      this.getMacList(1)
    },
    // 白名单 IP 分页 分页数据调用
    whiteIPCurrentChange (val) {
      this.whiteIPCurrentPage = val
      this.getIPList('1')
    },
    // 表格 checkbox选中时触发
    handleSelectionChangeAplist (val) {
      this.apChecked = val
    },
    handleSelectionChangeIP (val) {
      this.idChecked = val
    },
    // 白名单 MAC 分页 分页数据调用
    whiteMACCurrentChange (val) {
      this.whiteMACCurrentPage = val
      this.getMacList(1)
    },
    clearError () {
      this.activeName = 'first'
      this.nextFlag = false
      this.ipList = []
      this.macList = []
      this.accessTime1 = ''
      this.accessTime2 = ''
      this.modeAddData.i_Id = 0
      this.$refs.modeAddData.resetFields()
    }
  },
  mixins: [mixins, mixin]
}
</script>
<style lang="scss">
.customAccess {
  #access-time1{
    /deep/ .el-input__inner{
      padding-left: 30px;
    }
  }
  #access-pagination1,#access-pagination2,#access-pagination3,#access-pagination4{
    .el-input__inner{
      padding: 0;
    }
  }
  .dateBox {
    width: 250px !important;
    &:first-of-type {
      margin-right: 32px;
    }
    &:last-of-type {
      margin-left: 32px;
    }
  }
  // .formOperateBox {
  //   display: flex;
  //   .el-dropdown {
  //     font-size: 12px;
  //     color: #333333;
  //   }
  // }
  #pane-first {
    .el-form {
      margin-top: 0;
      height: 400px;
    }
  }
  .el-tabs--border-card {
    .el-tabs__header {
      border-bottom: none;
      padding-top: 1px;
      border-bottom: 1px solid #3792d8;
      .el-tabs__nav{
        >div{
          height: 29px;
          margin-top: 0px;
        }
      }
    }
    .el-tabs__content {
      padding: 0px;
    }
  }

  #pane-second,
  #pane-third {
    padding: 10px 22px;
    border: 4px solid #abd6ff;
    // 顶部的操作盒子
    .dialogBox {
      display: flex;
      flex-direction: column;
      .defaultBox {
        display: flex;
        justify-content: space-between;
        // 左侧的搜索框
        .input-with-select {
          width: 350px;
          height: 30px;
          div.el-input-group__append {
            width: 45px;
            height: 30px;
            box-sizing: border-box;
            padding: 0;
            text-align: center;
          }
        }
      }
      .addBox {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        &.IPBox,
        &.IPDBox {
          .addBoxMsg {
            align-items: baseline;
            div.input-with-select {
              width: 30px;
              input.el-input__inner {
                padding: 0;
                text-align: center;
              }
            }
            i {
              font-size: 20px;
              padding: 0 2px;
            }
          }
        }
        .addBoxMsg {
          display: flex;
          span {
            color: #999999;
            font-size: 12px;
            margin-right: 20px;
            width: 100px;
            line-height: 30px;
            height: 30px;
          }
          div.input-with-select {
            width: 250px;
          }
        }
      }
    }
    .dialogTabBox {
      display: flex;
      justify-content: space-around;
      > div {
        width: 50%;
        height: 400px;
        &:first-of-type {
          margin-right: 16px !important;
        }
        .contentTable {
          height: 80%;
        }
      }
    }
  }

  // 修改ip地址
  .editBoxInput {
    display: flex;
    > div.el-input {
      width: 40px;
      margin-right: 2px;
      input {
        padding: 0;
        text-align: center;
      }
      .el-input__inner {
          padding: 0 10px;
      }
    }
  }
  // 修改mac地址
  .editMacBox {
    width: 250px;
  }
  .content-accessform-box {
    padding: 24px 48px !important;
    .access-borderDiv {
      height: 100%;
      min-height: 361px;
      box-sizing: border-box;
      border: 1px solid #bfbfbf;
      position: relative;
      padding: 36px 24px 0 24px;
      > span {
        position: absolute;
        top: -15px;
        left: 12px;
        background: white;
        padding: 0 8px;
        line-height: 30px;
        display: inline-block;
      }
      .accessLine {
        height: 1px;
        background: #cccccc;
        margin: 20px 0;
      }
      .access-580 {
        .el-form-item__content {
          width: 580px;
        }
        .el-form-item:first-of-type {
          margin-top: 0 !important;
        }
      }
      .el-row {
        .el-form-item:first-of-type {
          margin-top: 0 !important;
        }
      }
    }
  }
}
</style>
