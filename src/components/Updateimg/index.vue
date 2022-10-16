<template>
  <div>
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onpreview"
      :on-remove="Onremove"
      :on-change="Onchange"
      :http-request="httpRequest"
      :limit="1"
      :before-upload="beforeupload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!--  -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img style="width:100%" :src="previewImgUrl" alt="">
    </el-dialog>

  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
console.log(COS)
const cos = new COS({
  SecretId: 'AKIDFKGIC9tWwBCzc4IINQNF3kGbkhJwZ6cT',
  SecretKey: 'rX0eBZCeu9EOXdiopeGe9ZrAHBrNh3Ob'
})
export default {
  name: 'UpdateImg',
  props: {
    defaulturl: {
      type: String,
      default: () => {

      }
    }
  },
  data() {
    return {
      previewImgUrl: '',
      previewDialog: false,
      fileList: [
        { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      loading: false
    }
  },
  watch: {
    defaulturl() {
      this.fileList.push({
        name: 'default', url: this.defaulturl
      })
    }
  },
  methods: {
    beforeupload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 10 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    },
    Onchange(file, fileList) {
      // console.log(file, fileList)
      // this.fileList.push(file)
      this.fileList = fileList
    },
    Onremove(file, fileList) {
      // console.log('点击预览')
      this.fileList = fileList
    },
    onpreview(file) {
      this.previewImgUrl = file.url
      this.previewDialog = true
    },
    httpRequest({ file }) {
      this.loading = true
      // console.log('先等一等'),
      cos.putObject({
        Bucket: 'hz-33-1314348578', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        // StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
          // 这个就是上传的百分比
          // params.percent 表示当前上传的进度
        }
      }, (err, data) => {
        // console.log(err || data)
        this.loading = false

        if (err) return this.$message.error('上传图片失败')
        this.$emit('on-success', {
          imgUrl: 'https://' + data.Location
        })
      }

      )
    }
  }
}
</script>

<style lang="scss" scoped>
.uploadImg{
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>

