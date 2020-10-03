var loading = Vue.component(
    'loading', {
        props: {
            "isBackDarken": Boolean,
            "isOpen": Boolean,
        },

      template: `
        <div
            v-bind:style="{ backgroundColor: isBackDarken ? 'rgba(0,0,0,0.5)': 'rgba(0,0,0,0.0)' }"
            style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 999;" v-show="isOpen">
            <div class="preloader-wrapper big active" style="top: 50%; left: 50%;">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
        </div>
      `,
});


var modalDialog = Vue.component(
    'modal-dialog', {
        props: {
            "isOpen": Boolean,
            "message": String,
            "onClosed": Function
        },
      template: `
        <div v-show="isOpen">
            <div id="modal1" class="modal open" tabindex="0"
            style="z-index: 1003; display: block; opacity: 1; top: 10%; transform: scaleX(1) scaleY(1);">
                <div class="modal-content">
                  <h4>Notice</h4>
                  <p>{{ message }}</p>
                </div>
                <div class="modal-footer">
                  <a @click="onClosed" class="modal-close waves-effect waves-green btn-flat">OK</a>
                </div>
            </div>
            <div class="modal-overlay" style="z-index: 1002; display: block; opacity: 0.5;" @click="onClosed"></div>
        </div>
      `,
});

var progressBar = Vue.component(
    'progress-bar', {
        props: {
            'percent': Number,
            'color': String
        },
      template: `
        <div>
            <span style="">{{ roundedPercent }}%</span>
            <div style="height: 10px; width: 100%; border: 1px solid #9e9e9e; background-color: white;">
                <div v-bind:style="{ backgroundColor: color, width: percent + '%' }" style="height: 10px; position: relative;"></div>
            </div>
        </div>
      `,
      computed: {
        roundedPercent: function() {
            return  Math.round(this.percent);
        }
      }
});