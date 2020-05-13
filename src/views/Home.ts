import { BehaviorSubject } from "rxjs";
import Vue from "vue";
import { Component, Provide } from "vue-property-decorator";
import "./Home.less";
import { Subscription } from "@/decorators/vueRx";

@Component({
  name: "Home",
  template: `
    <div class="Home">
      <p>{{ logic }}</p>
      <p>{{ ui }}</p>
      <p v-for="link in links" :key="link">
        <a>{{ link }}</a>
      </p>
    </div>
  `,
})
export default class Test extends Vue {
  beforeCreate() {}
  @Provide() logic$ = new BehaviorSubject(
    "Let me introduce you the Vue-Class-Component & VueRx"
  );
  @Provide() ui$ = new BehaviorSubject("alone side with Ant-Design-Vue");
  @Subscription() logic() {
    return this.logic$;
  }
  @Subscription() ui() {
    return this.ui$;
  }
  @Subscription() links() {
    (this as any).links = new BehaviorSubject([
      "https://class-component.vuejs.org/",
      "https://github.com/vuejs/vue-rx/tree/638e555addb67deaa18343b6e1d18328296d7d23",
      "https://www.antdv.com/docs/vue/introduce-cn/",
    ]);
    return (this as any).links;
  }
  created() {}
  mounted() {}
}
