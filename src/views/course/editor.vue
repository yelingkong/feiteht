<template>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left"></div>
    </div>  
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'editorElem',
  props:["content",'isShow'],
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  watch: {
    isShow () {
      console.log(this.isShow);
      this.editor.txt.html(this.content)
    }
  },

  mounted () {
    console.log(this.isShow)
    this.editor = new E(this.$refs.editorElem)
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
      console.log(this.editorContent)
      this.$emit('childFn', this.editorContent);
      // this.catchData(this.editorContent)  // 把这个html通过catchData的方法传入父组件
    }
    this.editor.customConfig.uploadImgServer = 'http://94.191.86.168/api/files/upload/1'
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.menus = [          // 菜单配置
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'justify',  // 对齐方式
      'emoticon',  // 表情
      'image',  // 插入图片
      'undo',  // 撤销
      'redo'  // 重复
    ]
                      // 下面是最重要的的方法
    this.editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {
                  // 图片上传之前触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                  // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                  // return {
                  //     prevent: true,
                  //     msg: '放弃上传'
                  // }
      },
      success: function (xhr, editor, result) {
          console.log(result.data)
                  // 图片上传并返回结果，图片插入成功之后触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        this.imgUrl = result.data.path//Object.values(result.data).toString()
      },
      fail: function (xhr, editor, result) {
                  // 图片上传并返回结果，但图片插入错误时触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
                  // 图片上传出错时触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
                  // 图片上传超时时触发
                  // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

              // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
              // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
                  // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                  // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        console.log(result.data);
        let d ={errno:0, data: [result.data.path]}
                  // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        let url = Object.values(d)      // result.data就是服务器返回的图片名字和链接
        JSON.stringify(url)    // 在这里转成JSON格式
        insertImg(`http://94.191.86.168/file${result.data.path}`)
                  // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }

    this.editor.create()     // 创建富文本实例
    if (!this.content) {
      this.editor.txt.html('')
    }else{
      this.editor.txt.html(this.content)
    }
  },
}
</script>
<style lang="scss" rel="stylesheet/scss">
    #wangeditor {
      width: 50rem;
    }  
</style>