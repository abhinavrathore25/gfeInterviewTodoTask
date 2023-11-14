import { useEffect, useState } from "react";

function App() {

  const [listOfColumns, setListOfColumns] = useState(
    [
      {
        name: 'Winnie',
        items: ['First default message of Winnie', 'Second default message of Winnie']
      },
      {
        name: 'Bob',
        items: ['First default message of Bob', 'Second default message of Bob']
      },
      {
        name: 'Thomas',
        items: ['First default message of Thomas', 'Second default message of Thomas']
      },
      {
        name: 'George',
        items: ['First default message of George', 'Second default message of George']
      }
    ]
  );

  const headingColors = ['#8E6E95', '#39A59C', '#344759', '#E8741E'];

  useEffect(() => {
    const localList = localStorage.getItem('listOfItems');
    if (localList !== null) setListOfColumns(JSON.parse(localList));
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem('listOfItems', JSON.stringify(data));
    setListOfColumns(data);
  };

  function handleAdd(index) {

    const task = window.prompt('Enter a task:');
    if (task === null) return;

    const newList = listOfColumns.map((column, i) =>
      i === index ? { ...column, items: [...column.items, task] } : column
    );

    updateLocalStorage(newList);
  }

  function handleMoveTask(indexOfList, indexOfTask, task, type) {

    let newList = JSON.parse(JSON.stringify(listOfColumns));
    newList[indexOfList].items.splice(indexOfTask, 1);

    switch (type) {
      case 'l':
        if (indexOfList > 0)
          newList[indexOfList - 1].items.push(task);
        else {
          newList[listOfColumns.length - 1].items.push(task);
        }
        break;

      case 'r':
        if (indexOfList < listOfColumns.length - 1)
          newList[indexOfList + 1].items.push(task);
        else {
          newList[0].items.push(task);
        }
        break;

      default:
        return;
    }

    updateLocalStorage(newList);
  }

  function handleDelete(indexOfList, indexOfTask) {
    let newList = JSON.parse(JSON.stringify(listOfColumns));
    newList[indexOfList].items.splice(indexOfTask, 1);

    const item = document.getElementById(`${indexOfList}${indexOfTask}`);
    item.style.textDecoration = 'line-through';

    setTimeout(() => {
      item.style.textDecoration = 'none';
      updateLocalStorage(newList);
    }, 300);
  }

  return (
    <div className='columnContainer'>

      {listOfColumns.map((item, indexOfList) => {
        return <div key={indexOfList} className="column">
          <h4 style={{ backgroundColor: headingColors[indexOfList] }}>{item.name}</h4>

          {item.items.length !== 0 && item.items.map((task, indexOfTask) => {

            return <div key={indexOfTask} className="listItem">
              <button onClick={() => { handleMoveTask(indexOfList, indexOfTask, task, 'l') }}><i className="fa-solid fa-angle-left"></i></button>
              <p onClick={() => handleDelete(indexOfList, indexOfTask)} id={`${indexOfList}${indexOfTask}`}>
                {task}
              </p>
              <button onClick={() => { handleMoveTask(indexOfList, indexOfTask, task, 'r') }}><i className="fa-solid fa-angle-right"></i></button>
            </div>
          })}

          <button onClick={() => handleAdd(indexOfList)}>
            + Add a card
          </button>
        </div>
      })}

    </div>
  );
}

export default App;
