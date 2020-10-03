var app = new Vue({
  el: '#root',

 components: {
    'image-canvas': imageCanvas,
    'filelist': filelist,
    'toolbox': toolbox,
    'app-header': appHeader,
    'sidebar': sidebar,
    'label-box': labelBox,
    'modal-dialog': modalDialog,
  },

  template: `
    <div>
        <modal-dialog :message="dialogMessage" :isOpen="dialogMessage !== ''" :onClosed="() => dialogMessage = ''" />
        <loading :isOpen="loading" :isBackDarken="true" />
        <loading :isOpen="miniLoading" :isBackDarken="false" />

        <app-header>
            <sidebar
                :loadFiles="loadFiles"
                :saveAnnotationResult="saveAnnotationResult"
                :loadAnnotationResult="loadAnnotationResult"
                :saveLabels="saveLabels"
                :loadLabels="loadLabels" />
        </app-header>
        <div class="row content-area center-align">
            <div class="row left-align">
                <progress-bar :percent="percent" color="#388e3c" />
            </div>
            <div class="col m3 left-align">
                <toolbox
                    :isMultiClass="isMultiClass"
                    :onChangeClassTypeClicked="changeClassType"
                    :onNextImageClicked="nextImage"
                    :onPrevImageClicked="prevImage"
                    :onZoomInClicked="zoomIn"
                    :onZoomOutClicked="zoomOut" />
            </div>
            <div class="col m6 left-align">
                <image-canvas
                    :width="width"
                    :height="height"
                    :zoomRate="zoomRate"
                    :imageSrc="imageSrc"
                    :imageFilePath="imageFilePath" />
            </div>
            <div class="col m3 left-align">
                <label-box
                    :labels="labels"
                    :selectedLabels="selectedLabels"
                    :onDeleteClicked="deleteLabel"
                    :onSelected="selectLabel"
                    :onAdded="addLabel" />
                <filelist
                    :filepathList="filepathList"
                    :selectedFileIndex="selectedFileIndex"
                    :onSelected="selectImage" />
            </div>
        </div>
    </div>
    `,

  data: {
    imageFilePath: "",
    imageSrc: "",
    isMultiClass: false,
    width: 0,
    height: 0,
    zoomRate: 100,
    labels: [],
    result: {},
    filepathList: [],
    selectedFileIndex: 0,
    selectedLabels: [],
    loading: false,
    miniLoading: false,
    dialogMessage: '',
    percent: 0,
  },

  mounted () {
    // 十字キーで画像切り替え
    window.addEventListener('keydown', function(event) {
        let keyCode = event.keyCode;
        if (keyCode === 37) {
            app.prevImage();
        } else if (keyCode === 39) {
            app.nextImage();
        }
    })
    // zoom in/out on mouse wheel.
    window.addEventListener('wheel', function(event) {
        if (!event.ctrlKey) {
            return;
        }
        event.preventDefault();
        let wheelVal = event.deltaY;
        if (wheelVal < 0) {
            app.zoomIn();
        } else {
            app.zoomOut();
        }
    }, {passive: false});
  },
  methods: {
    async saveAnnotationResult() {
        let result = await eel.write_csv_result(this.result)();
        this.loading = true;
        this.dialogMessage = "Succeed saving annotation result!"
        this.loading = false;
    },
    async loadAnnotationResult() {
        let result = await eel.read_csv_result()();
        if(Object.keys(result).length <= 0) {
            return;
        }
        this.loading = true;
        this.result = result;
        this.selectImage(this.selectedFileIndex);
        this.updateProgress();
        this.loading = false;
    },
    updateAnnotationResult() {
        let filepath = this.filepathList[this.selectedFileIndex];
        this.result[filepath] = this.selectedLabels;
    },

    changeClassType() {
        this.isMultiClass = !this.isMultiClass;
    },

    // Image
    async loadFiles() {
        let filepathList = await eel.load_filepath_list()();
        this.loading = true;
        this.filepathList.push(...filepathList);
        this.selectImage(this.selectedFileIndex);
        this.updateProgress();
        this.loading = false;
    },
    async selectImage(index) {
        if (this.filepathList.length <= index) {
            return;
        }

        this.miniLoading = true;
        this.selectedFileIndex = index;

        let filepath = this.filepathList[index];
        let imageData = await eel.load_image(filepath)();

        this.imageSrc = imageData[0];
        this.width = imageData[1];
        this.height = imageData[2];
        this.imageFilePath = filepath

        this.selectedLabels = this.result[filepath] ?? [];
        this.miniLoading = false;
    },
    nextImage() {
        if (this.selectedFileIndex + 1 >= this.filepathList.length) {
            return;
        }
        this.selectImage(this.selectedFileIndex + 1);
    },
    prevImage() {
        if (this.selectedFileIndex <= 0) {
            return;
        }
        this.selectImage(this.selectedFileIndex - 1);
    },


    // Labels
    async saveLabels() {
        if (this.labels.length <= 0) {
            return;
        }
        let result = await eel.save_labels_to_file(this.labels)();
    },
    async loadLabels() {
        let labels = await eel.load_labels_from_file()();
        if(labels.length <= 0) {
            return;
        }
        this.labels = labels;
    },
    selectLabel(label) {
        if (this.filepathList.length <= 0) {
            return;
        }
        if (this.selectedLabels.includes(label)) {
            let i = this.selectedLabels.indexOf(label);
            this.selectedLabels.splice(i, 1);
            this.updateAnnotationResult();
            return;
        }
        this.selectedLabels.push(label);
        this.updateAnnotationResult();
        this.updateProgress();

        if (!this.isMultiClass) {
            this.nextImage();
        }
    },
    addLabel(labelName) {
        let labelWithoutSpace = labelName.replace(/\ +/g, '');
        if(labelWithoutSpace === '') {
            return;
        }
        if (this.labels.includes(labelName)) {
            this.dialogMessage = `Label ${labelName} is exists.`
            return;
        }
        this.labels.push(labelName);
    },
    deleteLabel(label) {
        let i = this.labels.indexOf(label);
        if (i < 0) {
            console.log("Delete unexpected label: " + label);
            return;
        }
        this.labels.splice(i, 1);
    },

    // Zoom
    zoomIn() {
        if(this.zoomRate >= 500) {
            return;
        }
        this.zoomRate += 10;
    },
    zoomOut() {
        if(this.zoomRate <= 10) {
            return;
        }
        this.zoomRate -= 10;
    },

    updateProgress() {
        this.percent = this.filepathList.length <= 0 ? 0 : 100 * Object.keys(this.result).length  / this.filepathList.length;
    },
  }
});
