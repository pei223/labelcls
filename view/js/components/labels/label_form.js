var labelForm = Vue.component('label-form', {
    props: [
        'onAdded',
    ],
    data() {
        return {
            labelName: ''
        }
    },
  template: `
    <div class="row">
        <div class="col m9">
            <input id="label_name" type="text" class="validate" v-model="labelName" @keydown.enter="onAddClicked" >
        </div>
        <div class="col m3">
            <a class="waves-effect waves-light btn-small btn-floating green darken-2" @click="onAddClicked"><i class="material-icons left">add</i></a>
        </div>
    </div>
    `,
    methods: {
        onAddClicked() {
            if (this.labelName === "") {
                return;
            }
            this.onAdded(this.labelName);
            this.labelName = "";
        }
    },
})
