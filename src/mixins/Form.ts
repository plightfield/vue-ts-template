import Vue from "vue";
import { Component } from "vue-property-decorator";
import {
  WrappedFormUtils,
  ValidationRule,
} from "ant-design-vue/types/form/form";
import { Observable } from "rxjs";
import { message } from "ant-design-vue";

@Component
export default class Form extends Vue {
  /**
   * 生成表单模型
   *
   * @param {string} idStr
   * @returns {WrappedFormUtils}
   * @memberof Form
   */
  createForm(idStr: string): WrappedFormUtils {
    return this.$form.createForm(this, { name: idStr });
  }

  /**
   * 生成表单配置项
   *
   * @param {string} name
   * @param {*} [init=null]
   * @param {ValidationRule[]} [rules=[]]
   * @param {string} [trigger="change"]
   * @returns 返回表单配置项
   * @memberof Form
   */
  createItemDecorator(
    name: string,
    init: any = null,
    rules: ValidationRule[] = [],
    trigger: string = "change"
  ) {
    return [name, { name, initialValue: init, rules, trigger }];
  }
  formSubmit(e: Event, form: WrappedFormUtils): Observable<any> {
    e.preventDefault();
    return new Observable((observer) => {
      form.validateFields((err, values) => {
        if (err) {
          message.warn("请按照要求填写");
          return;
        }
        observer.next(values);
      });
    });
  }
}
