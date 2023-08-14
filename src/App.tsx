
import './App.css'
import Draggable from './components/Draggable'
import DragContainer from './components/DragContainer'
import useDraggableStore from './store/useDraggableStore'

function App() {
  const { draggables, activeDraggableId, activeDraggableContent } = useDraggableStore(state => state)
  console.log("activeDraggableContent", activeDraggableContent)
  return (
    <>
      <div className='flex gap-8'>
        <DragContainer dataKey={'1'} >
          <Draggable snapToOrigin={true} dataKey={'1'} >
            <div className='text-7xl  flex justify-center items-center' >👾</div>
          </Draggable>
        </DragContainer>
        <DragContainer dataKey={'2'}>

        </DragContainer>
        <DragContainer dataKey={'3'}>
          <Draggable snapToOrigin={true} dataKey={'1'}>
            <div className='text-7xl flex justify-center items-center' >🎃</div>
          </Draggable>
        </DragContainer>

      </div>

    </>
  )
}

export default App
