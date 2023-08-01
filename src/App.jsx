import { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getItems = () => {
  const items = localStorage.getItem("list");
  if (items) {
    return JSON.parse(items);
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getItems());
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: ""
  });
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      handleAlert(true, "danger", "please enter an item first");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      handleAlert(true, "success", "the item has been changed");
    } else {
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      handleAlert(true, "success", "An item has been added to the list");
      setName("");
    }
  };
  const handleAlert = (show = false, type = "", message = "") => {
    setAlert({show, type, message});
  };
  const handleEdit = (id) => {
    const editItem = list.find((item) => item.id === id);
    setEditID(id);
    setName(editItem.title);
    setIsEditing(true);
  };
  const handleRemove = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    handleAlert(true, "danger", "the item has been removerd");
  };
  const handleClear = () => {
    setList([]);
    handleAlert(true, "danger", "the list has been cleared!");
  };
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} handleAlert={handleAlert} list={list}/>}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            data-state="name"
            value={name}
            onChange={handleChange}
            className='grocery'
            placeholder='e.g. eggs'/>
          <button type='submit' className='submit-
btn'>{isEditing ? "Edit" : "Submit"}</button>
        </div>
      </form>
      { list.length > 0 && 
        <div className='grocery-container'>
          <List items={list} remove={handleRemove} edit={handleEdit} />
          <button className='clear-btn' onClick={handleClear}>
            clear items
          </button>
        </div>
      }
    </section>
  );
}

export default App
