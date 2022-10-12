<template>
  <div class="app-container">
    <PageTools type="success" :showbefore="true">
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleClose">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterfn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>

        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          :page-sizes="[2,5]"
          :page-size.sync="page.size"
          :current-page.sync="page.page"
          layout="prev, pager, next,sizes,total"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <addEmployee :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
import PageTools from '@/components/PageTools/index.vue'
import EnumHireType from '@/api/constant/employees'
// console.log(EnumHireType)
import { getEmployeeList } from '@/api/employees'
import addEmployee from './components/add-employee.vue'
import { delEmployee } from '@/api/employees'
export default {
  components: { PageTools,
    addEmployee },

  // name: 'PageTools',局部注册类名
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      // 聘用形式
      hireType: EnumHireType.hireType,
      dialogVisible: false
    }
  },
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        // console.log(res)
        this.list = rows
        this.total = total
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 聘用形式的
    formatterfn(row, column, cellValue) {
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res && res.value || '非正式'
    },
    handleClose() {
      // 新增员工
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    async  exportExcel() {
      // 绑定点击事件，找到对应的包引入下载，
      // 文件懒加载方法，
      const { export_json_to_excel } = await import('@/vender/Export2Excel.js')
      // import('@/vender/Export2Excel.js').then((res) => {
      //   console.log(res)
      // })
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      console.log(rows)
      // 拿到页面中的数据
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(headers)
      const data = rows.map(item => {
      // return []
        console.log(item)
        return header.map(h => {
          // 循环表头是手机号
          // item mobile
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[headers[h]]
            })
            return find ? find.value : '未知'
          }
          return item[headers[h]]
        })
      })
      //
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '黑马', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    }
  }
}
</script>

<style>

</style>
