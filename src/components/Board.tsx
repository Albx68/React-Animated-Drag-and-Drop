import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { checkCollisionType } from "../utils/types"


const Board = () => {
    const targetRefs = useRef<HTMLDivElement[] | null[]>([])
    const draggableRef = useRef<HTMLDivElement | null>(null)
    const [collision, setCollision] = useState({ id: -1, status: false })
    const checkCollision: checkCollisionType = (item, allItems) => {
        if (item.current) {
            const divRect = item.current.getBoundingClientRect();

            allItems.current.forEach((element) => {
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
                        setCollision(collided)

                    }

                }
            });

        }

    }
    const handleCollisionEnd = () => {
        setCollision({ id: -1, status: false })
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex gap-8">
                {Array.from({ length: 4 }, (_, index) => index + 1).map((el, idx) => {
                    return <motion.div data-key={idx} ref={(ref) => {
                        targetRefs.current[idx] = ref;
                    }} key={el} className={twMerge("h-32 w-32 bg-emerald-200 rounded-lg", collision.id === Number(idx) ? "border-orange-400 border-dashed border-8" : "border-none")}>

                    </motion.div>
                })}
            </div>
            <div className="">
                <motion.div onDrag={() => checkCollision(draggableRef, targetRefs)} onDragEnd={() => handleCollisionEnd()} drag dragSnapToOrigin ref={draggableRef} className="cursor-grab active:cursor-grabbing h-32 w-32 flex justify-center items-center bg-emerald-500 rounded-lg text-7xl">👾</motion.div>
            </div>
        </div>
    )
}

export default Board
