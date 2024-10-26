import { Product } from "@/types/data/product-types"

export type ChildrenType = {
    children: React.ReactNode
}

export type ChildrenAndClassNameType = ChildrenType & {
    className: string
}

export type ChildrenAndParamsType = ChildrenType & {
    params: PageParams
}

export type PageParams = {
    item: string
}

export type PageTitleType = {
    pageTitle: string,
    className: string
}

export type EditProductsDialogType = ChildrenType & {
    products: Product[]
    fetchProducts: (paymentId: number) => void
}