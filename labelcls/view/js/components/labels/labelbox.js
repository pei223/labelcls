var labelBox = Vue.component(
    'label-box', {
    components: {
        'latel-item': labelItem,
        'label-form': labelForm,
    },
     props: {
        'labels': Array,
        'selectedLabels': Array,
        'onDeleteClicked': Function,
        'onSelected': Function,
        'onAdded': Function,
     },
      template: `
        <div class="card">
            <span class="card-title">Labels</span>
            <div class="card-content">
                <label-form :onAdded="onAdded" />
                <div class="label-box">
                    <div v-for="(label, index) in labels" :key="index">
                        <div class="col m6 s12">
                            <label-item :label="label" :index="index" :isSelected="selectedLabels.includes(label)"
                             :onDeleteClicked="onDeleteClicked" :onSelected="onSelected" :onAdded="onAdded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,
      mounted () {
      },
      methods: {
      }
})
