import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const DragAndDrop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Handle drag-and-drop logic
  return (
    <DndProvider backend={HTML5Backend}>
      <div>{children}</div>
    </DndProvider>
  );
};

export default DragAndDrop;
