import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";



const List = ({items,removeOneItem,editItem}) => {
  
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;

        return (
          <article  className="grocery-item" key={id}>
            {/* <h1>key ={id}</h1> */}
            <p className="title">{title}</p>
            <div className="btn-container">
              <button 
              type='button' 
              className='edit-btn'
              onClick={() => editItem(id)}
              >
                <FaEdit/>
              </button>
              <button 
              type="button" 
              className="delete-btn" 
              onClick={()=>removeOneItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
