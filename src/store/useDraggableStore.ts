import { create } from 'zustand'
import { createDraggableSlice } from './createDraggableSlice'

const useDraggableStore = create<
    ReturnType<typeof createDraggableSlice>
>((...a) => ({
    ...createDraggableSlice(...a),
}))

export default useDraggableStore