<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" @AddDept="handLeClose" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <treeTools
        slot-scope="{data}"
        :tree-node="data"
        @AddDept="handLeClose"
        @editDept="editDept"
        @refreshList="getDepartments"
      />
    </el-tree>
    <addDept ref="addDept" :tree-node="currentNode" :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treeTools from './components/tree-tools.vue'
// 按需导出必须要加{。。。。}放内容
import { tranListToTreeData } from '@/utils/index'
import addDept from './components/add-dept.vue'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {

    async getDepartments() {
      this.loading = true
      try {
        const { depts, companyManage, companyName } = await getDepartments()
        console.log(depts)
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    handLeClose(node) {
      this.dialogVisible = true
      this.currentNode = node
    },
    editDept(node) {
      this.$refs.addDept.formData = { ...node }
      this.currentNode = { ... node }
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {

    }
  }
}
</style>
