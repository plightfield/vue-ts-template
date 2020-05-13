import Vue from "vue";
import axios from "axios";
import router from "@/router";
import { Component } from "vue-property-decorator";
import { Method } from "axios";
import { catchError, switchMap, tap } from "rxjs/operators";
import { from, never, Observable } from "rxjs";
import { message } from "ant-design-vue";

// 声明新的请求对象
const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://qasc.qdingnet.com/"
      : "https://sc.qdingnet.com/",
  timeout: 15000,
});

// 错误处理交给流，请求是副作用
// 或者单独导出 request 利用promise 自己处理错误
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const { url, data } = config;
    const start = url?.substr(0, 4);
    if (start !== "http") {
      // 本地路径
      // 需要转化为 FormData 请求
      const formData = new FormData();
      formData.append("body", data ? JSON.stringify(data) : "{}");
      config.data = formData;
    }
    let token = window.localStorage.getItem("token");
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// 返回拦截器
instance.interceptors.response.use(
  (res) => {
    // 七牛云不含 code
    if (res?.data?.hash && res?.data?.key) {
      return res.data;
    }
    // 验证权限
    if (res?.data?.code && res.data.code === 5002) {
      // 会话失效逻辑
      localStorage.removeItem("token");
      router.push({ name: "login" });
    }
    if (res?.data?.code !== 200) {
      throw new Error(res.data.msg);
    }
    if (res?.data?.data?.result && res.data.data.result.indexOf("1001") < 0) {
      throw new Error(res.data.msg);
    }
    return res?.data?.data;
  },
  (err) => Promise.reject(err)
);

export const request = instance;

/**
 * 请求参数
 *
 * @export
 * @interface httpRequestConfig
 */
export interface httpRequestConfig {
  method: Method;
  url: string;
  data?: any;
}

/**
 * 需要请求 http 组件父类
 * !注意: 所有的请求都需要在 mounted 及之后的生命周期中执行
 *
 * @export
 * @class Http
 * @extends {Vue}
 */
@Component
export default class Http extends Vue {
  // axios 请求实例
  public request = instance;
  // http 请求 loading 状态
  public httpLoading = true;
  // 作为可复用管道逻辑
  public withHttp(stream$: Observable<httpRequestConfig>) {
    return stream$.pipe(
      tap(() => {
        // 等待
        this.httpLoading = true;
      }),
      switchMap((config: httpRequestConfig) =>
        from(this.request({ ...config })).pipe(
          catchError((err: any) => {
            // 错误提示
            message.error(err.toString());
            // 结束等待状态
            this.httpLoading = false;
            return never();
          })
        )
      ),
      tap(() => {
        // 结束等待状态
        this.httpLoading = false;
      })
    );
  }
  // 首次加载时 httpLoading 逻辑
  mounted() {
    this.httpLoading = false;
  }
}
