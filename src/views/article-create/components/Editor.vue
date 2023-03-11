<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{ $t('msg.article.commit') }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import E from 'wangeditor'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { commitArticle, editArticle } from './commit'
import { watchSwitchLang } from '@/utils/i18n'
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
const store = useStore()
let editor = null
let el = null
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})
watchSwitchLang(() => {
  if (!el) {
    return
  }
  const htmlStr = editor.txt.html()
  editor.destroy()
  initEditor()
  editor.txt.html(htmlStr)
})
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  editor.txt.html('')
  emtis('onSuccess')
}
watch(() => props.detail, (val) => {
  if (val && val.content) {
    editor.txt.html(val.content)
  }
}, {
  immediate: true
})
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
