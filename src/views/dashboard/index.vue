<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <svg-icon icon-class="table" />
    <!-- <UploadExcel :before-upload="beforeUpload" :on-success="handleSucess" /> -->
    <Updateimg @on-success="onSuccess1" />
    <Updateimg @on-success="onSuccess2" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import UploadExcel from '@/components/UploadExcel/index.vue'
import Updateimg from '@/components/Updateimg/index.vue'
export default {
  name: 'Dashboard',
  components: {
    // UploadExcel,
    Updateimg
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {

    onSuccess1(val) {
      console.log(123, val)
    },
    onSuccess2(val) {
      console.log(456, val)
    },
    handleSucess(data) {
      console.log('data', data)
    },
    beforeUpload(file) {
      console.log(file)
      if (file.size > 9000) {
        this.$message.error('to big')
        return false
      } return true
    }
  }
  // async created() {
  //   const res = await this.$store.dispatch('user/getUserInfo')
  //   console.log(res)
  // }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
