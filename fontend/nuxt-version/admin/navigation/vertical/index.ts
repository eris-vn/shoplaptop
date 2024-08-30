import type { VerticalNavItems } from '@layouts/types'

export default [
  {
    icon: { icon: 'tabler-smart-home' },
    title: 'Dashboard',
    to: 'index',
  },
  {
    title: 'Sản Phẩm',
    icon: { icon: 'tabler-box' },

    children: [
      { title: 'Danh sách', to: 'product-list' },
      { title: 'Thêm', to: 'product-add' },
      { title: 'Danh mục', to: 'product-category-list' },
    ],
  },
  {
    icon: { icon: 'tabler-augmented-reality' },
    title: 'Thuộc tính',
    to: 'attribute'
  },
  {
    icon: { icon: 'tabler-shopping-cart-plus' },
    title: 'Đơn hàng',
    children: [
      { title: 'Danh sách', to: 'order-list' },
    ],
  },
  // {
  //   title: 'Manage Review',
  //   to: 'manage-review',
  // },
  // {
  //   title: 'Referrals',
  //   to: 'referrals',
  // },
  // {
  //   title: 'Settings',
  //   to: 'settings',
  // },
] as VerticalNavItems
