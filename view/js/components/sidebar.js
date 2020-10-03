var sidebar = Vue.component(
    'sidebar', {
        props: {
            'saveAnnotationResult': Function,
            'loadAnnotationResult': Function,
            'saveLabels': Function,
            'loadLabels': Function,
            'loadFiles': Function
        },
      template: `
          <ul>
              <li><a class="subheader">File/Folder</a></li>
              <li><a @click="loadFiles"><i class="material-icons">save</i>Load files</a></li>
              <div class="divider"></div>

              <li><a class="subheader">Annotation result</a></li>
              <li><a @click="saveAnnotationResult"><i class="material-icons">save</i>Save annotation result</a></li>
              <li><a @click="loadAnnotationResult"><i class="material-icons">insert_drive_file</i>Load annotation result</a></li>
              <div class="divider"></div>

              <li><a class="subheader">Labels</a></li>
              <li><a @click="saveLabels"><i class="material-icons">file_download</i>Save labels</a></li>
              <li><a @click=" loadLabels"><i class="material-icons">file_upload</i>Load labels</a></li>
          </ul>`,
});

