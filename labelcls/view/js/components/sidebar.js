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
              <li><a class="subheader">Images</a></li>
              <li><a @click="loadFiles"><i class="material-icons">save</i>Load images from folder</a></li>
              <div class="divider"></div>

              <li><a class="subheader">Annotation result</a></li>
              <li><a @click="saveAnnotationResult"><i class="material-icons">save</i>Save annotation result file</a></li>
              <li><a @click="loadAnnotationResult"><i class="material-icons">insert_drive_file</i>Load annotation result file</a></li>
              <div class="divider"></div>

              <li><a class="subheader">Label file</a></li>
              <li><a @click="saveLabels"><i class="material-icons">file_download</i>Save label file</a></li>
              <li><a @click=" loadLabels"><i class="material-icons">file_upload</i>Load label file</a></li>
          </ul>`,
});

