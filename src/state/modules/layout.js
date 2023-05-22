export const state = () => ({
  layoutType: "horizontal", //horizontal
  layoutWidth: "fluid",
  leftSidebarType: "dark",
  leftSidebarSize: "default",
  menuPosition: "fixed",
  topbar: "dark",
  loader: false
});

export const mutations = {
  CHANGE_LAYOUT(state, layoutType) {
    state.layoutType = layoutType;
  },
  CHANGE_LAYOUT_WIDTH(state, layoutWidth) {
    state.layoutWidth = layoutWidth;
  },
  CHANGE_LEFT_SIDEBAR_TYPE(state, leftSidebarType) {
    state.leftSidebarType = leftSidebarType;
  },
  CHANGE_LEFT_SIDEBAR_SIZE(state, leftSidebarSize) {
    state.leftSidebarSize = leftSidebarSize;
  },
  CHANGE_TOPBAR(state, topbar) {
    state.topbar = topbar;
  },
  LOADER(state, loader) {
    state.loader = loader;
  },
  CHANGE_POSITION(state, menuPosition) {
    state.menuPosition = menuPosition;
  },
};

export const actions = {
  changeLayoutType({ commit }, { layoutType }) {
    commit("CHANGE_LAYOUT", layoutType);
  },

  changeLayoutWidth({ commit }, { layoutWidth }) {
    commit("CHANGE_LAYOUT_WIDTH", layoutWidth);
  },

  changeLeftSidebarType({ commit }, { leftSidebarType }) {
    commit("CHANGE_LEFT_SIDEBAR_TYPE", leftSidebarType);
  },

  changeLeftSidebarSize({ commit }, { leftSidebarSize }) {
    commit("CHANGE_LEFT_SIDEBAR_SIZE", leftSidebarSize);
  },

  changeTopbar({ commit }, { topbar }) {
    commit("CHANGE_TOPBAR", topbar);
  },

  changeLoaderValue({ commit }, { loader }) {
    commit("LOADER", loader);
  },

  changeMenuPosition({ commit }, { menuPosition }) {
    commit("CHANGE_POSITION", menuPosition);
  }
};