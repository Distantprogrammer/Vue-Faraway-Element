<template>
  <el-dialog :title="title" :visible.sync="box" width="800px" height="200px" :before-close="beforeClose" append-to-body>
    <div style="max-height: 600px; overflow-y: scroll">
      <el-form ref="form" :disabled="view" :size="option.size" :model="form" label-width="140px">
        <!-- 表单字段 -->
        <el-row>
          <el-col :span="18">
            <el-form-item label="客户名称" prop="customerName">
              <el-input v-model="form.customerName" placeholder="请输入客户名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="客户状态" prop="customerStatus">
              <el-select v-model="form.customerStatus" clearable placeholder="请选择客户状态">
                <el-option v-for="item in customerStatusData" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="联系人姓名" prop="contactName">
              <el-input v-model="form.contactName" placeholder="请输入联系人姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="联系人电话" prop="contactPhone">
              <el-input v-model="form.contactPhone" placeholder="请输入联系人电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="客户来源" prop="clientSource">
              <el-input v-model="form.clientSource" placeholder="请输入客户来源" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="留资方式" prop="retentionMethod">
              <el-select v-model="form.retentionMethod" clearable placeholder="请选择留资方式">
                <el-option v-for="item in retentionMethodData" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="推广站点_url" prop="promotionSiteUrl">
              <el-input v-model="form.promotionSiteUrl" placeholder="请输入推广站点_url" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="介绍人姓名" prop="referrerName">
              <el-input v-model="form.referrerName" placeholder="请输入介绍人姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="有效线索标签" prop="validleadTag">
              <el-select v-model="form.validleadTag" clearable placeholder="请选择有效线索标签">
                <el-option v-for="item in validleadTagData" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="无效线索标签" prop="invalidleadTag">
              <el-select v-model="form.invalidleadTag" clearable placeholder="请选择无效线索标签">
                <el-option v-for="item in invalidleadTagData" :key="item.dictKey" :label="item.dictValue" :value="item.dictKey" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="商机负责人ID" prop="businessOpportunityLeaders">
              <el-input v-model="form.businessOpportunityLeaders" placeholder="请输入商机负责人ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="销售负责人ID" prop="salesLeader">
              <el-input v-model="form.salesLeader" placeholder="请输入销售负责人ID" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="搜索关键词" prop="searchKeywords">
              <el-input v-model="form.searchKeywords" placeholder="请输入搜索关键词" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="推广关键词" prop="promotionalKeywords">
              <el-input v-model="form.promotionalKeywords" placeholder="请输入推广关键词" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="搜索引擎" prop="searchEngine">
              <el-input v-model="form.searchEngine" placeholder="请输入搜索引擎" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="跟进次数" prop="countFollowUps">
              <el-input v-model="form.countFollowUps" placeholder="请输入跟进次数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="联系次数" prop="countContacts">
              <el-input v-model="form.countContacts" placeholder="请输入联系次数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="排序号" prop="sort">
              <el-input v-model="form.sort" placeholder="请输入排序号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="更新人名（冗余）" prop="createUserName">
              <el-input v-model="form.createUserName" placeholder="请输入更新人名（冗余）" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="创建人名（冗余）" prop="updateUserName">
              <el-input v-model="form.updateUserName" placeholder="请输入创建人名（冗余）" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表单按钮 -->
    <span v-if="!view" slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-circle-check" :size="option.size" @click="handleSubmit">提 交</el-button>
      <el-button icon="el-icon-circle-close" :size="option.size" @click="box = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  props: {},
  data () {
    return {}
  },
  created () { },
  components: {},
  computed: {},
  watch: {},
  mounted () { },
  methods: {}
}
</script>

<style lang='less' scoped></style>
