<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <a href="/" class="brand-logo">Soundboard</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down" ref="nav" @click="onNavClick">
          <li>
            <router-link to="/"> Mainboard</router-link>
          </li>
          <li>
            <router-link to="/management">Manage</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: null
    }
  },

  methods: {
    removeActiveClassesFromNav() {
      this.navList.querySelectorAll('li').forEach(element => {
        element.classList.remove('active');
      });
    },

    addActiveClass(element) {
      element.classList.add('active');
    },

    onNavClick(e) {
      this.removeActiveClassesFromNav();
      this.addActiveClass(e.target.parentNode);
    }
  },

  mounted() {
    this.navList = this.$refs.nav;
    const activeNavElement = this.navList.querySelector('.active').parentNode;
    this.addActiveClass(activeNavElement);
  }
}
</script>