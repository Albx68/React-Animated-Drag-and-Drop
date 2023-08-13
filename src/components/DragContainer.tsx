import { motion } from "framer-motion"
import { ReactNode, useRef } from "react"
import useDraggableStore from "../store/useDraggableStore"

type DragContainer = {
    children: ReactNode,
    snapToOrigin?: boolean,
    dataKey: string | number
}
const DragContainer = ({ children }: DragContainer) => {
    const { addDraggableContainer } = useDraggableStore(state => state)
    const DragContainerRef = useRef<unknown>(null)
    return <motion.div
        ref={(ref) => {
            if (ref) {
                DragContainerRef.current = ref
            }
            addDraggableContainer(ref)
        }}
        className="cursor-grab active:cursor-grabbing  rounded-lg bg-emerald-300 p-4"
    >{children}</motion.div>
}

export default DragContainer