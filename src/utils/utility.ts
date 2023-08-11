import { checkCollisionType } from './types';

export const checkCollision: checkCollisionType = (item, allItems) => {
    if (item.current) {
        const divRect = item.current.getBoundingClientRect();
        if (!allItems.current)
            return {
                id: '',
                status: false
            }
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
                    id: string
                    status: boolean
                } = {
                    id: String(id),
                    status: isOverlapping
                }
                console.log("cii", collided, isOverlapping)
                return isOverlapping
            }
        });

    }

}