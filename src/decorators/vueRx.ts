import Vue from "vue";
import { createDecorator } from "vue-class-component";

Vue.filter("async");

/**
 * 不使用 DomStreams, Typescript 语境下不需要
 * 一次性声明 Subscriptions
 */
export const Subscription = function() {
  return createDecorator((options, key, parameterIndex) => {
    const temp = (options as any).methods[key];
    // 删除 method
    delete (options as any).methods[key];
    if (typeof temp !== "function") {
      throw new Error("Subscription 必须挂载在函数上");
    }
    if (!options.subscriptions) {
      // 无 subscriptions 声明一个空的
      options.subscriptions = function() {
        return {};
      };
    }
    // 之前的 subscriptions
    const lastSubscriptions = options.subscriptions;
    if (typeof lastSubscriptions !== "function") {
      throw new Error("subscriptions 必须为函数");
    }
    options.subscriptions = function(this: Vue) {
      return {
        ...(lastSubscriptions as any).call(this),
        [key]: temp.call(this),
      };
    };
  });
};
