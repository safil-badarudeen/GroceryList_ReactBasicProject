import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// const getLocalStorage = () => {
//   let list = localStorage.getItem('list');
//   if (list) {
//     return (list = JSON.parse(localStorage.getItem('list')));
//   } else {
//     return [];
//   }
// };

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
      //display alert
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      let newItem = { id: new Date().getTime().toString(), title: name };
      
      setList([...list, newItem]);
      showAlert(true,'success','item added to the list')
      setName("");
    }
  };
 
  const removeOneItem=(id)=>{
   console.log(id)
   showAlert(true,'danger','Item Removed from List')
   let newList=list.filter((item)=>item.id !== id)
   setList(newList)
  }


  const  showAlert= (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList=()=>{
    showAlert(true,'danger','Empty List')
    setList([])
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
 
  //localstorage

  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(list));
  // }, [list]);


  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="eg : eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button 
          type="submit" 
          className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        <List items={list} removeOneItem={removeOneItem}  editItem={editItem}/>
        <button className="clear-btn" onClick={clearList}>clear items</button>
      </div>
    </section>
  );
}

export default App;
