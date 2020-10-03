var filelist = Vue.component(
    'filelist', {
        props: {
            "filepathList": Array,
            "selectedFileIndex": Number,
            "onSelected": Function,
        },
      template: `
        <div class="card">
            <span class="card-title" autofocus>File list</span>
            <div class="card-content filelist-box">
                <div v-for="(fileName, index) in fileList">
                    <p @click="onSelected(index)"
                    v-bind:class="[index === selectedFileIndex ? 'selected-filename-row' : '' , 'filename-row']">{{ fileName }}</p>
                    <div class="divider"></div>
                </div>
            </div>
        </div>
          `,
      computed: {
        fileList: function() {
            let result = [];
            this.filepathList.forEach(filepath => {
                result.push(this.getFileStem(filepath));
            })
            return result;
        }
      },
      methods: {
        getFileStem(fullpath) {
            return fullpath.replace(/^.*[\\\/]/, "");
        }
      }
});
