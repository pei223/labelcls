var appHeader = Vue.component(
  'app-header', {
      template: `
          <nav>
            <div class="nav-wrapper green darken-2">
              <a href="#!" class="brand-logo center">labelcls</a>
              <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
              <div id="slide-out" class="sidenav"><slot /></div>
            </div>
          </nav>`,
  }
);
