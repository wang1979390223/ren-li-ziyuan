<template>
  <div class="dashboard-container">
    <div class="app-container">

      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="登陆账号设置" name="first">
            <!--
              表单添加校验
              1，from组件:model=" 表单数据accountInfo"
              2， :rules=" 表单校验规则accountInfoRules"
              -----
              2，el-form-item绑定 prop=" 属性password"
              ------
              3，el-input 绑定v-model="accountInfo.password"
            -->
            <el-form ref="form" :rules="accountInfoRules" :model="accountInfo" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item prop="username" label="姓名:">
                <el-input v-model="accountInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item prop="password" label="密码:">
                <el-input v-model="accountInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form></el-tab-pane>
          <el-tab-pane label="个人详情" name="second"><UserInfo /></el-tab-pane>
          <el-tab-pane label="岗位信息" name="third"><JobInfo /></el-tab-pane>
        </el-tabs>

      </el-card>

    </div>
  </div>
</template>

<script>
import { getUserDetailById, updateUserDetailById } from '@/api/user.js'
import UserInfo from '@/views/zujian/user-info.vue'
import JobInfo from '@/views/zujian/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      accountInfoRules: {
        username: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度最小为6位', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      const res = await getUserDetailById(this.$route.params.id)
      // console.log(res)
      this.accountInfo = res
    },
    async  updateEmployees() {
      // 表单更新验证给表单绑定$ref
      // 表单校验方法validate()
      try {
        await this.$refs.form.validate()
        console.log('成功')
        await updateUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }

  }
}
</script>

<style>

</style>
