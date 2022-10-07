<template>
  <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
// props可以用数组来接收数据 也可以用对象来接收
  // props: {   props属性: {  配置选项 }  }
  props: {
    //   定义一个props属性
    treeNode: {
      type: Object, // 对象类型
      required: true // 要求对方使用您的组件的时候 必须传treeNode属性 如果不传 就会报错
    },
    isRoot: {
      type: Boolean, // 对象类型
      default: true
    }
  },

  methods: {
    handleCommand(type) {
      // console.log(type)
      if (type === 'add') {
        this.$emit('AddDept', this.treeNode)
        // tinaji
      } else if (type === 'edit') {
        // bianji
        this.$emit('editDept', this.treeNode)
      } else {
        // shancghu1
        this.$confirm('是否确认删除部门', '提示', {
          type: 'warning'
        }).then(async res => {
          // console.log(res)
          return await delDepartments(this.treeNode.id)
        }).then(
          res => {
            this.$message.success('删除成功')
            this.$emit('refreshList')
          }
        )
      }
    }
  }
}

</script>

<style>

</style>
