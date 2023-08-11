import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { checkCollision } from "../utils/utility"
import { twMerge } from "tailwind-merge"


const Board = () => {
    const targetRefs = useRef<HTMLDivElement[] | null[]>([])
    const draggableRef = useRef<HTMLDivElement | null>(null)
    const [collision, setCollision] = useState({ id: -1, status: false })
    const handleOverlap = () => {
        const collided = checkCollision(draggableRef, targetRefs)
        console.log(collided)
        if (collided?.status) {
            console.log("collision state", collision)

            setCollision(collided)
        }
        else {
            setCollision({ id: -1, status: false })
        }
    }
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="">{collision.id}</div>
            <div className="flex gap-8">
                {Array.from({ length: 4 }, (_, index) => index + 1).map((el, idx) => {
                    return <motion.div data-key={idx} ref={(ref) => {
                        targetRefs.current[idx] = ref;
                    }} key={el} className={twMerge("h-32 w-32 bg-emerald-200 rounded-lg", collision.id === Number(idx) ? "border-orange-400" : "border-none")}></motion.div>
                })}
            </div>
            <div className="">
                <motion.div onDrag={handleOverlap} drag dragSnapToOrigin ref={draggableRef} className="cursor-grab active:cursor-grabbing h-32 w-32 flex justify-center items-center bg-emerald-500 rounded-lg text-7xl">👾</motion.div>
            </div>
        </div>
    )
}

export default Board
