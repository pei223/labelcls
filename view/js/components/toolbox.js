var toolbox = Vue.component(
    'toolbox', {
      props: {
        'onZoomInClicked': Function,
        'onZoomOutClicked': Function,
        'onChangeClassTypeClicked': Function,
        'onNextImageClicked': Function,
        'onPrevImageClicked': Function,
        'isMultiClass': Boolean,
      },
      template: `
      <div class="card">
        <div class="card-content">
            <div class="toolbox-tile" @click="onNextImageClicked">
                <div>
                    <p class="toolbox-title">Next image<br>(right key)</p>
                    <p><i class="material-icons">navigate_next</i></p>
                </div>
            </div>
            <div class="toolbox-tile" @click="onPrevImageClicked">
                <div>
                    <p class="toolbox-title">Prev image<br>(left key)</p>
                    <p><i class="material-icons">navigate_before</i></p>
                </div>
            </div>
            <div class="toolbox-tile" @click="onChangeClassTypeClicked">
                <div>
                    <p v-if="isMultiClass" class="toolbox-title">Multi Class</p>
                    <p v-else class="toolbox-title">Single Class</p>
                    <p><i class="material-icons">loop</i></p>
                </div>
            </div>
            <div class="toolbox-tile" @click="onZoomInClicked">
                <div>
                    <p class="toolbox-title">Zoom in<br>(Ctrl + wheel)</p>
                    <p><i class="material-icons">zoom_in</i></p>
                </div>
            </div>
            <div class="toolbox-tile" @click="onZoomOutClicked">
                <div>
                    <p class="toolbox-title">Zoom out<br>(Ctrl + wheel)</p>
                    <p><i class="material-icons">zoom_out</i></p>
                </div>
            </div>
            <div class="divider"></div>
        </div>
      </div>
          `,
});
