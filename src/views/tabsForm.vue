<template>
  <el-card class="card">
    <el-tabs v-model="currentConfig" type="card" @tab-click="handleChangeConfig" editable @edit="handleTabsEdit" class="father">
      <el-tab-pane
        v-for="(config, index) in form.assembly"
        :key="config.id"
        :label="config.title"
        :name="config.id"
        class="son"
      >
        <template slot="label">
          <span v-if="configNameChangeTrigger !== index" style="user-select: none" @dblclick="configNameChangeTrigger = index">{{ config.title }}</span>
          <el-input v-else v-model="form.assembly[index].title" v-input-focus size="mini" @blur="configNameChangeTrigger = -1"></el-input>
        </template>
        <el-form :model="form.assembly[index]" ref="componentForm">
          <!--            基础配置-->
          <el-form-item label="类型：" label-width="130px" prop="assembly_type">
            <el-radio-group v-model="form.assembly[index].assembly_type">
              <el-radio v-for="item in assemblyType" :label="item.label" :key="item.label">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="时间限制："
            label-width="130px"
            prop="assembly_time"
          >
            <el-date-picker
              v-model="form.assembly[index].assembly_time"
              type="datetimerange"
              :picker-options="datePickerOptions"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态：" label-width="130px" prop="status"><el-switch v-model="form.assembly[index].status"></el-switch></el-form-item>
          <!--            单图配置-->
          <el-form-item label="单图七巧板：" label-width="130px" class="inputwidth" prop="assembly_1_id">
            <el-input v-model="form.assembly[index].assembly_1_id" type="textarea" autosize resize="none" placeholder="填写七巧板TOPIC_ID"></el-input>
            <el-alert
              title="提示文字"
              type="info"
              style="margin-top: 10px"
            >
            </el-alert>
          </el-form-item>
          <el-form-item label="上传图片" label-width="130px" prop="assembly_desc">
            <el-upload
              class="upload-demo"
              action="#"
              :accept="'.jpg, .png, .gif'"
              :show-file-list="false"
            >
              <el-button size="small" type="primary"><i class="el-icon-download"></i>上传图片</el-button>
              <span style="color: #909399; font-size: 13px;margin-left: 5px">只能上传{{prop === 'background_img' ? 'jpg/png/gif' : 'png'}}文件{{prop === 'background_img' ? '，且尺寸限制1125×759' : ''}}</span>
            </el-upload>
          </el-form-item>
          <el-form-item label="文案：" label-width="130px" class="inputwidth" prop="assembly_4_name">
            <el-input v-model="form.assembly[index].assembly_4_name" type="textarea" autosize resize="none" placeholder="文案请用中文“，”，多个英文“,”隔开"></el-input>
          </el-form-item>
          <el-form-item label="链接：" label-width="130px" class="inputwidth" prop="assembly_4_url">
            <el-input v-model="form.assembly[index].assembly_4_url" type="textarea" autosize resize="none" placeholder="多个英文“,”隔开"></el-input>
          </el-form-item>
          <el-form-item class="button-group">
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'TabsForm',
  data() {
    return {
      currentConfig: 1,
      form: {
        assembly: [
          {
            id: 1,
            title: '配置一'
          },
          {
            id: 2,
            title: '配置二'
          }
        ]
      },
      configList: [],
      assemblyType: [
        { label: 1, value: '1' },
        { label: 2, value: '2' },
        { label: 3, value: '3' },
        { label: 4, value: '4' },
        { label: 5, value: '5' },
        { label: 6, value: '6' },
        { label: 7, value: '7' }
      ],
      configNameChangeTrigger: -1,
    }
  },
  mounted() {
    Sortable.create(document.querySelector('.el-tabs__header .el-tabs__nav'), {
      onEnd: (evt) => {
        const choseEl = this.form.assembly.splice(evt.oldIndex, 1)[0]
        this.form.assembly.splice(evt.newIndex, 0, choseEl)
      }
    })
  },
  methods: {
    handleChangeConfig() {

    },
    handleTabsEdit(targetName, action) {

    }
  },
  computed: {
    datePickerOptions() {
      return {
        disabledDate: (time) => {
          return (time.getTime() < Date.now() - 8.64e7)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  height: 100%;
}
.button-group {
  text-align: center;
}
</style>
