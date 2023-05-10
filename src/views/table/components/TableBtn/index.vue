<template>
  <div class="div-table-button">
    <!-- 左侧按钮 -->
    <div class="div-table-button__left">
      <el-button :size="option.size" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <el-button :size="option.size" type="success" icon="el-icon-download" @click="handleImport">导入</el-button>
      <el-button type="warning" size="small" plain icon="el-icon-download" @click="handleExport">导出</el-button>
      <el-button :size="option.size" type="danger" icon="el-icon-delete" plain @click="handleDelete">删除
      </el-button>
    </div>
    <!-- 右侧按钮 -->
    <div class="div-table-button__right">
      <el-button :size="option.size" icon="el-icon-refresh" circle @click="searchChange" />
      <el-button :size="option.size" icon="el-icon-search" circle @click="searchHide" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style lang='less' scoped></style>
