var imageCanvas = Vue.component(
    'image-canvas', {
        props: {
            "width": Number,
            "height": Number,
            "zoomRate": Number,
            "imageSrc": String,
            "imageFilePath": String,
        },
      template: `
        <div class="card">
            <span class="card-title">{{ imageFileName }}</span>
            <div class="card-content image-canvas">
                <img v-show="imageSrc" :src="imageSrc" :width="width * zoomRate/100" :height="height * zoomRate/100">
            </div>
        </div>
      `,
      computed: {
        imageFileName: function() {
            return this.imageFilePath.replace(/^.*[\\\/]/, "");
        }
      }
});
