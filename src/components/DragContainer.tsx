import { motion } from "framer-motion"
import React, { ReactNode, createElement, useRef } from "react"
import useDraggableStore from "../store/useDraggableStore"

type DragContainer = {
    children: ReactNode,
    snapToOrigin?: boolean,
    dataKey: string | number
}
const DragContainer = ({ children, dataKey }: DragContainer) => {
    const { addDraggableContainer, draggableChildrenMap, setDraggabableChildrenMap } = useDraggableStore(state => state)
    const DragContainerRef = useRef<unknown>(null)
    const currentDraggableChildren = draggableChildrenMap[dataKey] ?? []
    console.log("draggableChildrenMap", draggableChildrenMap)
    console.log("childdd", children)
    return <motion.div
        ref={(ref) => {
            if (ref) {
                DragContainerRef.current = ref
            }
            const childrenWithIdx = React.Children.map(children, (child, index) => ({ ...child, idx: index }))
            setDraggabableChildrenMap(dataKey, childrenWithIdx)
            addDraggableContainer({ current: ref, dataKey })
        }}
        className="cursor-grab active:cursor-grabbing  rounded-lg bg-emerald-300 p-4"
    >{currentDraggableChildren}</motion.div>
}

export default DragContainer