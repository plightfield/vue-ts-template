import Vue from "vue";
import { Component } from "vue-property-decorator";
import "@/App.less";
@Component({
  name: "app",
  template: `
    <div id="app">
      <router-view></router-view>
    </div>
  `,
})
export default class App extends Vue {
  mounted() {}
}
