<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="dialogVisible" @close="handLeClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option label="username11" value="username" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'

export default {
  name: 'HrsaasAdddept',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    const checkCodeRepeat = async(rlue, value, callback) => {
      const { depts } = await getDepartments()
      // console.log(depts)
      const isRepeat = depts.some('depts', depts)
      isRepeat ? callback(new Error(`模块下已经存在${value}`)) : callback()
    }
    //     部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
    const nameCheck = async(rlue, value, callback) => {
      const { depts } = await getDepartments()
      console.log(depts)
      const deptstj = depts.filter(item => item.pid === this.treeNode.id)
      // console.log(deptstj)
      const isRepeat = deptstj.some(ele => ele.name === value)
      isRepeat ? callback(new Error(`部门已经存在${value}`)) : callback()
    }
    // 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复

    // 部门负责人（manager）：必填

    // 部门介绍 ( introduce)：必填 1-300个字符
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍

      },
      rules: { name: [
        { required: true, message: '部门名称必填', trigger: 'blur' },
        { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
        { validator: nameCheck, trigger: 'blur' }
      ],
      code: [
        { required: true, message: '部门编码必填', trigger: 'blur' },
        { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
        { validator: checkCodeRepeat, trigger: 'blur' }
      ],
      manager: [
        { required: true, message: '部门负责人必填' }
      ],
      introduce: [
        { required: true, message: '部门介绍必填', trigger: 'blur' },
        { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
      ]
      }
    }
  },
  mounted() {

  },
  methods: {
    handLeClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addDeptForm.resetFields()
    }
  }

}
</script>

<style>

</style>
