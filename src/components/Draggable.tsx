import { motion } from "framer-motion"
import { ReactNode } from "react"

type Draggable = { children: ReactNode }
const Draggable = ({ children }: Draggable) => {

    return <motion.div drag dragSnapToOrigin>{children}</motion.div>
}

export default Draggable