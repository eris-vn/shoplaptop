// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Home',
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: 'Sản phẩm',
    href: '/about',
    icon: 'tabler-info-circle'
  }
]

export default verticalMenuData
