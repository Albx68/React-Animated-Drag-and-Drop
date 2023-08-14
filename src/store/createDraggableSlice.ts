import { ReactNode } from "react";
import { StoreApi } from "zustand";

interface DraggableSlice {
    draggableContainers: React.MutableRefObject<unknown>[];
    addDraggableContainer: (draggable: React.MutableRefObject<unknown>) => void;
    activeDraggableId: number | string,
    setActiveDraggableId: (id: number | string) => void,
    activeDraggableContent: ReactNode,
    setActiveDraggableContent: (children: ReactNode) => void
    draggableChildrenMap: { id: ReactNode }
    setDraggableChildrenMap: (id: string | number, children: ReactNode) => void
}


export const createDraggableSlice = (set: StoreApi<DraggableSlice>['setState']) => ({
    draggableContainers: [],
    addDraggableContainer: (draggableContainer: React.MutableRefObject<unknown>) => set((state) => ({ draggableContainers: [...state.draggableContainers, draggableContainer] })),
    activeDraggableId: -1,
    setActiveDraggableId: (id: number | string) => set(() => ({ activeDraggableId: id })),
    activeDraggableContent: [],
    setActiveDraggableContent: (children: ReactNode) => set(() => ({ activeDraggableContent: children })),
    draggableChildrenMap: {},
    setDraggabableChildrenMap: (id: string, children: ReactNode) => set((state) => ({ draggableChildrenMap: { ...state.draggableChildrenMap, [id]: [children] } }))
})