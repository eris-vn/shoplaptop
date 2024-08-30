// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'
import verticalMenuData from './verticalMenuData'

const horizontalMenuData = (): HorizontalMenuDataType[] => verticalMenuData as any

export default horizontalMenuData
