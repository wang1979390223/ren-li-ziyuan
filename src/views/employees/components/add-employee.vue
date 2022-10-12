<template>
  <el-dialog
    title="新增员工"
    :visible="dialogVisible"
    @close="handleClose"
  >
    <!-- 表单 -->
    <el-form ref="addEmploy" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width:80%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <el-tree
          v-show="isshow"
          v-loading="loading"
          style="80%"
          :data="treeData"
          :props="{label:'name'}"
          default-expand-all
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择日期" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
//  实现弹窗组件的显示和隐藏
//  其实 el-dialog 组件显示 隐藏 visible
//  父到子 props
//  点击关闭按钮 close $emit 去改父组件里的值 (upate:dialogVisible)
//  handleClose 完善 // 1. 表单重置 2.表单绑定的值从新赋值

import employeesEnum from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  name: 'HrsaasAddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      treeData: [{ name: '行政部', manager: '刘备' }],
      isshow: false,
      hireType: employeesEnum.hireType,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClose() {
      // 表单重置

      this.$emit('update:dialogVisible', false)
      // 重新赋值
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.isshow = false
      this.$refs.addEmploy.resetFields()
    },
    async getDepartments() {
      this.isshow = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.isshow = false
    },
    async btnOk() {
      try {
        await this.$refs.addEmploy.validate()
        await addEmployee(this.formData)
        this.handleClose()
        this.$parent.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
