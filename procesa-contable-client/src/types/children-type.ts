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

export type PageTitleType = ChildrenType & {
    pageTitle: string,
    className: string
}