<template>
  <div class="tableEidtType">
    <div class="table-handle" v-if="editType == 'input'">
      <el-input  v-focus class="table-input" @focus="inputFocus(editValue)"  @blur="tableCellBlur()" @keyup.enter.native="tableCellBlur('click')"
                 v-if="tableEidtShow" v-model="editValue">
      </el-input>
      <div class="table-data" v-else>
        <span>{{ editValue }}</span>
      </div>
      <span class="el-input__suffix" v-if="!tableEidtShow">
        <span class="el-input__suffix-inner">
          <i slot="suffix" class="el-icon-edit" @click="tableCellEdit()"></i></span>
      </span>
    </div>
    <div class="table-handle" v-else-if="editType == 'textarea'" style="justify-content: center;">
      <div class="table-textarea">
        <el-dialog v-dialogDrag :modal='false' :before-close="textareaClose" :show-close="false" :destroy-on-close="false"
                   :fullscreen.sync="textareaFullscreen" :visible="tableEidtShow" class="avue-dialog avue-dialog--top" width="70%">
          <div slot="title" class="avue-dialog__title">
            <div class="dialog-window">
              <div class="window_title">
                <span class="window_title_text">{{ row.id.slice(row.id.length-5,row.id.length) }}</span>
                <span class="window_title_text window_title_button" @click="save">保存</span>
              </div>
              <div class="window_btn">
                <button class="icon_minus" @click="textareaMinus('minsize')"><i class="el-icon-minus"></i></button>
                <button class="icon_screen" @click="textareaScreen"><i :class="[textareaFullscreen? 'el-icon-copy-document':'el-icon-full-screen']"></i></button>
                <button class="icon-close" @click="textareaClose"><i class="el-icon-close"></i></button>
              </div>
            </div>
          </div>
          <MonacoEditor ref="monaco" style="width: 100%;height: 100%;" :language="language" :textareaValue="textareaValue"
                       @input="textareaInput" v-if="tableEidtShow" :index="index" />
        </el-dialog>
        <div class="table-data" >
          <el-button size="mini"  type="text" @click="tableCellEdit()">编辑</el-button>
        </div>
        <div class="textarea_maxsize" :style="{'left':260+60*index+'px'}" v-if="textareaMinsizeDetail.id" @click="textareaMinus('maxsize',textareaMinsizeDetail.id)">
          {{ row.id.slice(row.id.length-5,row.id.length) }}
        </div>
      </div>
    </div>
    <div class="table-handle" v-else-if="editType == 'select-tag'">
      <div class="table-select is-select-tag">
        <div class="select-value"
             @click="tableCellEdit(variableName + index, 'click'), inputFocus(editValue)"
             v-if="!editValue">{{ selectOptionEnum(editValue) || placeholder }}
        </div>
        <div class="select-value"
             @click="tableCellEdit(variableName + index, 'click'), inputFocus(editValue)" v-else>
          <el-tag :type="tagEnum[editValue]" v-if="!filterable" size="small">
            {{ selectOptionEnum(editValue) }}
          </el-tag>
          <el-input v-model="selectSearchValue" v-else type="text" @input="filterMethod(variableName + index)"
                    :value="selectOptionEnum(editValue)" />
        </div>
        <el-select v-bind="$attrs" @visible-change="typeVisible()" filterable v-on="$listeners"
                   @change="tableCellBlur()" :ref="variableName + index" v-model="editValue"
                   :placeholder="placeholder">
          <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left"><el-tag :type="tagEnum[item.value]" size="small">{{ item.label || item.value
              }}</el-tag></span>
            <span style="float: right; color: #8492a6; font-size: 13px" v-if="editValue == item.value"><i
              class="el-icon-check"></i></span>
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table-handle" v-else-if="editType == 'select'">
      <div class="table-select">
        <el-select v-bind="$attrs" @visible-change="typeVisible()" :filterable="filterable" v-on="$listeners"
                   @change="tableCellBlur()" :ref="variableName + index" v-model="editValue"
                   :placeholder="placeholder">
          <el-option v-for="item in selectOption" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="table-handle" v-else-if="editType == 'date'">
      <el-date-picker type="date" @focus="inputFocus(editValue)"
                      v-model="editValue" :clearable="false" class="table-date"
                      @blur="tableCellBlur()" :value-format="valueFormat">
      </el-date-picker>
    </div>
    <div class="table-handle" v-else-if="editType == 'datetime'">
      <el-date-picker  type="datetime" @focus="inputFocus(editValue)"
                       v-model="editValue" :clearable="false" class="table-date"
                       @blur="tableCellBlur()" :value-format="valueFormat">
      </el-date-picker>
    </div>
    <div class="table-handle" v-else-if="editType == 'readonly'">
      {{ row[variableName] }}
    </div>
    <div class="table-handle" v-else-if="editType == 'switch'">
      <div class="table-switch">
        <el-switch width="40" :active-value="1" :inactive-value="0"
                   v-model="editValue"  @change="tableCellBlur('switch')">
        </el-switch>
      </div>
    </div>
    <div class="table-handle" v-else>
      {{ row[variableName] }}
    </div>
  </div>
</template>

<script>
/**
 * 添加组件时 tableCellBlur()是必须的，自己设置触发时机
 * 发现改值但未调用接口 @focus="inputFocus(editValue)" 这里会传一个编辑前的值用来判断做没做出修改
 * 使用select-tag组件时，只支持普通用法，filterable模式有bug
 *
 */
import MonacoEditor from './MonacoEditor'
export default {
  name: '',
  /**
   * @param {Object} row 行数据
   * @param {String} editType forbid不可编辑 编辑类型
   * @param {String} variableName 编辑字段
   * @param {Number} index 行索引
   * @param {Array} selectOption 下拉框数据
   * @param {String} valueFormat 日期格式
   * @param {Boolean} filterable 是否可搜索
   * @param {String} placeholder 占位符
   * @param {Object} tagEnum tag标签的枚举
   * @param {String} language 代码编辑器语言
   * @param {String} author Base64 MTgxNDM3OTcyNQ==
   */
  props: {
    row: {
      type: Object,
      default: () => { }
    },
    editType: {
      type: String,
      default: 'readonly'
    },
    variableName: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    selectOption: {
      type: Array,
      default: () => { return [] }
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    },
    tagEnum: {
      type: Object,
      default: () => {
        return {
          '-1': 'warning',
          1: 'warning',
          10: 'warning',
          20: 'danger',
          30: 'info',
          40: 'warning',
          50: 'success',
          undefined: '',
          null: ''
        }
      }
    }
  },
  components: {
    MonacoEditor
  },
  data () {
    return {
      selectSearchValue: '', // select-tag 搜索值
      textareaFullscreen: false, // textarea弹窗全屏
      textareaValue: '', // textarea弹窗内容
      textareaMinsizeDetail: {}, // textarea弹窗最小化时的内容
      tableEidtShow: false, // 表格输入框显示状态
      preEditValue:"" // 编辑前的值 用来判断是否做出过编辑操作 不做任何操作
      // // tag标签的枚举
      // tagEnum: ,
    }
  },
  created () {
    if (this.editType == 'textarea')this.textareaValue = this.row[this.variableName]
  },
  updated () {
    if (this.editType == 'textarea')this.textareaValue = this.row[this.variableName]
  },
  computed: {
    editForm () {
      return this.row
    },
    textareaDialogShow () {
      return this.tableEidtShow
    },
    editValue:{
      get(){
        return this.editForm[this.variableName]
      },
      set(val){
        this.editForm[this.variableName] = val
      }
    }
  },
  watch: {
  },
  mounted () { },
  methods: {
    /**
     * @param { String } event ref值
     * @param { String } eType 事件类型
     */
    tableCellEdit (event, eType) {
      this.tableEidtShow = true
      // 下拉框
      if (eType == 'click') {
        this.selectSearchValue = this.editForm[this.variableName]
        // 操作select源码
        this.$refs[event].visible = true
      }
    },
    // 下拉框搜索
    filterMethod (event) {
      this.$refs[event].handleQueryChange(this.selectSearchValue)
    },
    inputFocus (value) {
      console.log(value);
      this.preEditValue = value
    },
    tableCellBlur (event) {
      if (event=='click') {
        return
      }
      if (event == 'switch') {
        this.$emit('tableCellBlur', this.editForm, true, this.variableName, this.index)
        return
      }
      this.tableEidtShow = false
      if (this.editForm[this.variableName] == this.preEditValue) {
        console.log(111);
        this.$emit('tableCellBlur', this.editForm, false, this.variableName, this.index)
      } else {
        console.log(2222);
        this.$emit('tableCellBlur', this.editForm, true, this.variableName, this.index)
      }
    },
    // 点击保存文本
    save(){
      this.$refs.monaco.save()
    },
    // 下拉框打开前事件
    typeVisible () {
      this.$emit('typeVisible')
    },
    selectOptionEnum (selectedValue) {
      const selectedOption = this.selectOption.find((option) => option.value == selectedValue);
      const selectedLabel = selectedOption ? selectedOption.label : selectedValue;
      return selectedLabel;
    },
    // 最小化与取消最小化
    textareaMinus (type) {
      if (type == 'minsize') {
        this.tableEidtShow = false
        this.textareaMinsizeDetail={
          id: this.variableName + this.index,
          index: this.index,
          value: this.textareaValue,
          variableName: this.variableName
        }
      }else {
        this.tableEidtShow = true
        this.textareaValue = this.textareaMinsizeDetail.value
        this.textareaMinsizeDetail = {}
      }
    },
    // 全屏
    textareaScreen () {
      this.textareaFullscreen = !this.textareaFullscreen
    },
    // 关闭
    textareaClose () {
      this.tableEidtShow = false
      this.textareaValue = ''
    },
    // 文本域保存或关闭
    textareaInput(value,type){
      if (type=='save') {
        this.tableEidtShow = false
        this.editForm[this.variableName] = value
        this.$emit('tableCellBlur', this.editForm, true, this.variableName, this.index)
      }else{
        this.textareaValue = value
        this.textareaMinsizeDetail.value = value
      }
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
// 开关样式
.table-switch {
  /deep/ .el-switch__core {
    width: 32px !important;
    height: 14px;
    &::after {
      width: 10px;
      height: 10px;
    }
  }
  /deep/ .is-checked {
    .el-switch__core {
      &::after {
        margin-left: -12px;
      }
    }
  }
}
//
.tableEidtType {
  width: 100%;
  height: 100%;
}

.table-handle {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  // padding: 0 10px;
  /deep/.el-input {
    font-size: 12px;
  }

  .table-data {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  /deep/.el-input__suffix {
    display: none;
  }

  .el-icon-edit {
    font-size: 14px;

    &:hover {
      cursor: pointer;
      color: rgb(27, 154, 238);
    }
  }
}

/deep/.el-input__inner {
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  line-height: 30px;
  color: #666666;
}

.table-input {
  width: 100%;
  height: 100%;
  font-size: 12px;

  &:focus-within {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    padding: 0 10px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 2px 2px 2px #c5a5a5;
  }
}

.table-date {
  /deep/.el-input__icon {
    display: none;
    height: 100%;
    padding: 0;
    line-height: 30px;
    color: #666666;
  }
}

.table-select {
  width: 100%;
  height: 100%;

  .select-value {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .el-input {
      width: 90%;
    }

    /deep/.el-tag {
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /deep/.el-select {
    .el-input__icon {
      line-height: 30px;
    }



  }


}

.is-select-tag {
  /deep/.el-select {
    .el-input {
      visibility: hidden;
    }
  }
}

.table-textarea {
  /deep/.el-dialog__header {
    padding: 0;
    margin: 0;
    padding: 0 20px;
    background-color: #3c3c3c;
    border-bottom: none;
    box-shadow: 2px 2px 5px#333333;
  }

  /deep/.el-dialog__headerbtn {
    display: none;
  }

  /deep/.el-dialog__body {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  /deep/.el-dialog.is-fullscreen {
    left: 50% !important;
    right: 50% !important;
    top: 0 !important;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
  }

  .avue-dialog__title {
    width: 100%;
    height: 100%;
  }
  .textarea_maxsize{
    color: #fff;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #000;
    position: fixed;
    z-index: 100;
    bottom: 10px;
    left: 260px;
  }
  .dialog-window {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .window_title {
      color: #fff;
      font-size: 16px;

      .window_title_text {
        margin: 0 10px;
      }
      .window_title_button{
        cursor: pointer;
      }
    }

    .window_btn {

      .icon_minus,
      .icon_screen,
      .icon-close {
        margin: 0 10px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
        color: #ccc;
      }
    }

  }
}
</style>
