<template>
  <div class="article-create">
    <el-card>
      <el-input class="title-input" :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title" maxLength="20" clearable>
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown :title="title" @onSuccess="onSuccess" :detail="detail"></Markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <Editor :title="title" @onSuccess="onSuccess" :detail="detail"></Editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { articleDetail } from '@/api/article'
import { useRoute } from 'vue-router'
const route = useRoute()
const activeName = ref('markdown')
const title = ref('')
const onSuccess = () => {
  title.value = ''
}
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  title.value = detail.value.title
}
if (articleId) {
  onActivated(getArticleDetail)
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
