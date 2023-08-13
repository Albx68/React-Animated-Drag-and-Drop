import { motion } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"
import useDraggableStore from "../store/useDraggableStore"

export type checkCollisionType = (item: itemRef, allItems: React.MutableRefObject<HTMLDivElement[] | null[]>) => void
export type itemRef = React.MutableRefObject<HTMLDivElement | null>

type Draggable = {
    children: ReactNode,
    snapToOrigin?: boolean,
    dataKey: string | number
}

const Draggable = ({ snapToOrigin = true, children, dataKey }: Draggable) => {
    const draggableRef = useRef(null)
    const { draggableContainers, activeDraggableId, setActiveDraggableId, setActiveDraggableContent } = useDraggableStore(state => state)
    console.log("draggableContainer", draggableContainers)
    const checkCollision: checkCollisionType = (item, allItems) => {
        if (item.current) {
            const divRect = item.current.getBoundingClientRect();

            allItems.forEach((element) => {
                if (element) {
                    const id = element.getAttribute('data-key')
                    const containerRect = element.getBoundingClientRect();
                    const isOverlapping = !(
                        divRect.right < containerRect.left ||
                        divRect.left > containerRect.right ||
                        divRect.bottom < containerRect.top ||
                        divRect.top > containerRect.bottom
                    );
                    const collided: {
                        id: number
                        status: boolean
                    } = {
                        id: Number(id),
                        status: isOverlapping
                    }

                    if (isOverlapping) {
                    }

                }
            });

        }

    }
    console.log("active draggable id", activeDraggableId)
    return <motion.div
        drag
        dragSnapToOrigin={snapToOrigin}
        data-key={dataKey}
        onDragStart={() => {
            setActiveDraggableId(dataKey)
            setActiveDraggableContent({ ...children, dataKey })
            console.log("drag start", children)
        }}
        onDragEnd={() => {
            checkCollision(draggableRef, draggableContainers)
        }}
        dragElastic={0}
        ref={(ref) => {
            draggableRef.current = ref
        }}
        className="cursor-grab active:cursor-grabbing"
    >{children}</motion.div>
}

export default Draggable

