export interface UiState {
  isShowSearch: Ref<boolean>
  isShowCatalogMenu: Ref<boolean>
  showSearch: () => void
  closeSearch: () => void
  toggleShowCatalogMenu: () => void
  closeCatalogMenu: () => void
}