import { useState } from "react";
import AddProductSuggestionPopup from "../pages/public/components/AddProductSuggestionPopup";

const TestPage = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Show</button>
      {show && <AddProductSuggestionPopup onClose={() => setShow(false)} />}
    </div>
  );
};

export default TestPage;
