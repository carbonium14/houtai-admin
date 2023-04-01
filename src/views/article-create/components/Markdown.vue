<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{ $t('msg.article.commit') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import MKEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})
const emtis = defineEmits(['onSuccess'])
let mkEditor = null
let el = null
const store = useStore()
const initEditor = () => {
  mkEditor = new MKEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
  })
  mkEditor.getMarkdown()
}
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})
watchSwitchLang(() => {
  if (!el) {
    return
  }
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  mkEditor.reset()
  emtis('onSuccess')
}
watch(() => props.detail, (val) => {
  if (val && val.content) {
    mkEditor.setHTML(val.content)
  }
}, {
  immediate: true
})
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
