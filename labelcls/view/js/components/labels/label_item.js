var labelItem = Vue.component('label-item', {
    props: {
        'isSelected': Boolean,
        'index': Number,
        'label' : String,
        'onDeleteClicked': Function,
        'onSelected': Function,
    },
  template: `
    <div class="card" v-bind:class="[isSelected ? 'selected-label' : 'unselected-label']" style="cursor: pointer;">
        <div class="card-content row valign-wrapper" style="padding: 8px; margin; 0px;" @click="onSelected(label)">
            <div class="col m11 s12">
                <p id="label-name">
                    {{ label }}
                </p>
            </div>
            <div class="m1 right valign-wrapper btn-area" @click.stop="onDeleteClicked(label)">
                <i class="material-icons">delete</i>
            </div>
        </div>
    </div>
    `,
})
