<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <!-- 放置页签 -->
        <el-tab-pane label="角色管理">
          <!-- 新增角色按钮 -->
          <el-row style="height:60px">
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="addrole"
            >新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" :data="rowsList" border="">
            <el-table-column align="center" type="index" label="序号" width="120" />
            <el-table-column align="center" prop="name" label="角色名称" width="240" />
            <el-table-column align="center" prop="description" label="描述" />
            <el-table-column align="center" label="操作">
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="eddRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delrow(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
            <!-- 分页组件 -->

            <el-pagination
              v-if="total>0"
              layout="prev,pager,next,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,3,4,5,6,7,8,9,10]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <Addindex ref="formData" :dialogvisible.sync="dislogVisible" @refresList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import Addindex from './components/addindex.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'HrsaasIndex',
  components: {
    Addindex
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      rowsList: [],
      loading: false,
      dislogVisible: false,
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {

  },

  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    addrole() {
      this.dislogVisible = true
    },
    async  getRoleList() {
      try {
        this.loading = true
        // const { res } = await getRoleList(this.page)
        // console.log(res)
        const { rows, total } = await getRoleList(this.page)
        this.total = total
        this.rowsList = rows
        if (total > 0 && rows.length === 0) {
          this.page.page = this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 增加编辑校色功能
    eddRole(row) {
      this.$refs.formData.formData = { ...row }
      this.dislogVisible = true
    },
    // 删除角色功能
    async delrow(id) {
      try {
        await this.$confirm('确认删除角色吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 只有点击了确定 才能进入到下方
        await deleteRole(id)// 调用删除接口
        this.getRoleList()// 重新加载数据
        console.log('成功')
      } catch (error) {
        console.log('失败')
      }
    },
    async  getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
      console.log(this.companyInfo)
    }
  }
}
</script>

<style>

</style>
