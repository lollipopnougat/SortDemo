# SortDemo

排序算法演示 `TypeScript` 实现<br>
[GitHub托管的静态页面](https://lollipopnougat.github.io/SortDemo/)


### 设计模式

采用了**策略模式**，将排序算法封装，对外采用统一的接口
视图控制类采用了**单例模式**，每次获取的都是一个单例

## 注意

* 请确保安装了 `nodejs` 和 `npm`
* 使用 `TypeScript`<br>
  全局安装 `ts` 编译器
  ```
  npm i -g typescript
  ```
* 使用了 `Less`<br>
  全局安装 `less` 编译器
  ```
  npm i -g less
  ```
* 使用了 `jquery`
* 直插排序和希尔排序以及快速排序的动画有待改进
* 快排实现有点奇怪，现在都有点懵了(搞了个模拟栈，为了实现单步执行快晕了)
* <del>明明ES6就有yield关键字还写那么麻烦的什么单步分解(编译到的目标平台是ES5，最重要的是还不会用...)<del>

## 修改了项目如何编译

1. 克隆项目后，然后在项目下打开终端，执行
    ```
    npm i
    ```

2. 修改了 `less` 或者 `ts` 源码以后，需要执行
    ```
    npm run compile
    ```

3. 然后执行 (也可以不执行这句，直接开html也可以观看)
    ```
    npm start
    ```
    打开浏览器，定位到 http://localhost:8080 即可看到页面


## 待实现算法:

* <del>直接插入排序 (InsertSort)</del>
* <del>希尔排序 (ShellSort)</del>
* <del>冒泡排序 (BubbleSort)</del>
* <del>快速排序 (QuickSort)</del>
* <del>简单选择排序 (SelectSort)</del>

暂时摸了，剩下这俩以后再说
* 堆排序 (HeapSort) 
* 归并排序 (MergeSort)


