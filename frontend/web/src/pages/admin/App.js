import { useState } from "react";
import "./App.css";
import Navbar from "./admin/components/Navbar";


function App( { items } ) {
  const [checkedBoxes, setCheckBoxes] = useState(0);

  const collections = ["Products", "Users"];

  const products = ["Product1", "Product2"];

  const users = ["user1", "user2"];

  const handleSelectAll = () => {
    var checkboxTitle = document.querySelector("#checkbox-title");
    var checkboxes = document.querySelectorAll("#checkbox");

    checkboxes.forEach((checkbox) => {
      checkbox.checked = checkboxTitle.checked;
    });

    setCheckBoxes(checkboxTitle.checked ? checkboxes.length : 0);
  };

  const handleCheckbox = () => {
    var checkboxTitle = document.querySelector("#checkbox-title");
    var checkboxes = document.querySelectorAll("#checkbox");

    var checked = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checked++;
      }
    });

    setCheckBoxes(checked);
    checkboxTitle.checked = checked === checkboxes.length;
  };

  return (
    <div className="dynamic-page-container">
      <Navbar />

      <div className="breadcrumb-container">
        <p>Home / Collections / Products</p>
      </div>

      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Collections</th>
              </tr>
            </thead>

            <tbody>
              {collections.map((collection, index) => (
                <tr key={index}>
                  <td>
                    <p>{collection}</p>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="list-container">
          <div className="header-container">
            <p>Select collection to change</p>
            <button>Add New Collection</button>
          </div>

          <div className="action-container">
            <p>Action:</p>
            <select name="action" id="action">
              <option value="default">--------</option>
              <option value="add">Add</option>
              <option value="edit">Edit</option>
              <option value="delete">Delete</option>
            </select>
            <button>Apply</button>
            <p>
              {checkedBoxes} of {products.length} selected
            </p>
          </div>

          <div className="list">
            <div className="list-item-container title">
              <input
                type="checkbox"
                id="checkbox-title"
                onClick={handleSelectAll}
              />
              <p id="title">Select All</p>
            </div>
            {items.map((item, index) => (
              <div className="list-item-container item">
                <input type="checkbox" id="checkbox" onClick={handleCheckbox} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <div className="counter-container">
            <p>{products.length} products</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
