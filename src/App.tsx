import { Button } from "@heroui/react";
import clsx from "clsx";

function App() {
  return (
    <>
      <div className="p-10 flex gap-4">
        <Button
          className={clsx(
          )}
          color="primary"
        >
          Primary
        </Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="danger">Danger</Button>
      </div>
    </>
  );
}

export default App;
