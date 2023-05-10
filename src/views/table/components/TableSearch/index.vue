<template>
  <div id="div-search" class="div-search">
    <el-form :inline="true" :size="option.size" :model="query">
      <template>
        <el-form-item>
          <el-input v-model="query.customerName" placeholder="客户名称" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.customerStatus" placeholder="客户状态" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.contactName" placeholder="联系人姓名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.contactPhone" placeholder="联系人电话" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.searchKeywords" placeholder="搜索关键词" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.promotionalKeywords" placeholder="推广关键词" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="query.createUser" placeholder="创建人" />
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchChange">搜索</el-button>
        <el-button icon="el-icon-delete" @click="searchReset()">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  components: { },
  props: {},
  data() {
    return { }
  },
  computed: { },
  watch: { },
  created() { },
  mounted() { },
  methods: { }
}
</script>

<style lang='less' scoped>
</style>
