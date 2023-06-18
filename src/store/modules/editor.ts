import { defineStore } from 'pinia'
import { nextTick } from 'vue'

import pinia from '@/store'
import { getLocalStorage, setLocalStorage } from '@/common/locastorage'
import { showMessageVN } from '@/common/message'
import { getCurrentTypeContent } from '@/utils'

const MARKDOWN_CONTENT = 'markdown-content'

const useEditorStore = defineStore('editorStore', {
  state: () => ({
    MDContent: '',
    writable: false
  }),
  actions: {
    // 初始化编辑器内容（默认为Markdown模式）
    initMDContent(resumeType: string) {
      const cacheKey = MARKDOWN_CONTENT + '-' + resumeType
      this.MDContent = getLocalStorage(cacheKey)
        ? (getLocalStorage(cacheKey) as string)
        : getCurrentTypeContent(resumeType)
    },
    setMDContent(nv: string, resumeType: string) {
      this.MDContent = nv
      // 处理之后的操作
      if (!nv) return
      setLocalStorage(`${MARKDOWN_CONTENT}-${resumeType}`, nv)
    },
    // 切换编辑模式
    setWritableMode(html: HTMLElement) {
      this.writable = !this.writable
      showMessageVN('您已切换至', this.writable ? '内容模式' : 'Markdown模式')
      if (this.writable) {
        nextTick(() => {
          html = html || (document.querySelector('.reference-dom') as HTMLElement)
          const DOMTree = document.querySelector('.writable-edit-mode') as HTMLElement
          DOMTree && (DOMTree.innerHTML = html.innerHTML)
        })
      }
    }
  }
})

export default () => useEditorStore(pinia)