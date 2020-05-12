import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "app",
  template: `
    <div id="app">
      this is app
      <a-button>this is test</a-button>
      <router-view></router-view>
    </div>
  `,
})
export default class App extends Vue {}
