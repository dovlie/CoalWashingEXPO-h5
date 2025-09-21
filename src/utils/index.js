import _ from 'lodash'
 /**
 * @desc 节流函数
 * @param fn 目标函数
 * @param wait 延迟执行毫秒数
*/
export function throttle (fn, wait = 500) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last > wait) {
      fn.apply(this, arguments);
      last = now;
    }
  };
}

// 获取assets静态资源
export function getAssetsFile(url) {
  return new URL(`../assets/${url}`, import.meta.url).href
}

/**
 * @desc 设备
*/
export function getNavigator() {
  return navigator.userAgent || 'h5'
}
/**
 * @desc 消息
*/
export function fixedInfo(information , closeInstructions) {
  const info = {
    title: information?.title,
    name: information?.name,
    alias_name: information.alias_name,
    ue_name: information.ue_name,
    isUEAlone: information.isUEAlone,
    isOpen: information.isOpen,
    instructions: information.instructions,
    sand_table_instructions: information.sand_table_instructions,
    close_sand_table_instructions: closeInstructions,
    webSide: information.webSide
    // device: getNavigator(),
  }
  return JSON.stringify(_.pickBy(info, _.identity))
}