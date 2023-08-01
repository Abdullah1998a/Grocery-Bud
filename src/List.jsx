import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({items, remove, edit}) => {
  const itemsTemp = items.map(({id, title}) => {
    return (
      <article className='grocery-item' key={id}>
        <p className='title'>{title}</p>
        <div className='btn-container'>
          <button 
            type='button' 
            className='edit-btn'
            onClick={() => edit(id)}
          >
            <FaEdit />
          </button>
          <button 
            type='button' 
            className='delete-btn' 
            onClick={() => remove(id)}
          >
           <FaTrash />
          </button>
        </div>
     </article>
    );
  });
  return <div className='grocery-list'>{itemsTemp}</div>
};

export default List;
