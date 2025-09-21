// 根级别的mutation
export default {
  toggleMenuCollapse(state, val) {
    state.menuCollapse = val;
  },
  setBreadcrumb(state, val) {
    state.breadcrumbList = val;
  }
};
