import { motion } from "framer-motion"
import { ReactNode, createRef, useRef, } from "react"
import useDraggableStore from "../store/useDraggableStore"

export type checkCollisionType = (item: itemRef, allItems: React.MutableRefObject<HTMLDivElement[] | null[]>, type: 'DRAG_END') => void
export type itemRef = React.MutableRefObject<HTMLDivElement | null>

type Draggable = {
    children: ReactNode,
    snapToOrigin?: boolean,
    dataKey: string | number
}

const Draggable = ({ snapToOrigin = true, children, dataKey }: Draggable) => {
    const draggableRef = useRef(null)
    const { draggableContainers, activeDraggableId, activeDraggableContent, setActiveDraggableId, setActiveDraggableContent, setDraggabableChildrenMap } = useDraggableStore(state => state)
    console.log("draggableContainer", draggableContainers)
    const checkCollision: checkCollisionType = (item, allItems, type = "DRAG_END") => {
        if (item.current) {
            const divRect = item.current.getBoundingClientRect();
            console.log("item.current", item.current)
            allItems.forEach((element) => {
                if (element) {
                    const id = element.dataKey

                    // const elementRef = element.createRef()
                    console.log("id", id)
                    const elementRef = element.current
                    const containerRect = elementRef.getBoundingClientRect();
                    const isOverlapping = !(
                        divRect.right < containerRect.left ||
                        divRect.left > containerRect.right ||
                        divRect.bottom < containerRect.top ||
                        divRect.top > containerRect.bottom
                    );

                    if (isOverlapping) {
                        setDraggabableChildrenMap(id, activeDraggableContent)
                        // filterPrevDraggable()
                    }

                }
            });

        }

    }
    return <motion.div
        drag
        dragSnapToOrigin={snapToOrigin}
        data-key={dataKey}
        onDragStart={() => {
            setActiveDraggableId(dataKey)
            setActiveDraggableContent({ ...children, dataKey, })
            console.log("drag start", children)
        }}

        onDragEnd={() => {
            checkCollision(draggableRef, draggableContainers, "DRAG_END")
        }}
        dragElastic={0}
        ref={(ref) => {
            draggableRef.current = ref
        }}
        className="cursor-grab active:cursor-grabbing"
    >{children}</motion.div>
}

export default Draggable

