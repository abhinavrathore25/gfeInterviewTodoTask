import { useEffect, useState } from "react";

function App() {

  const [listOfCloumns, setListOfCloumns] = useState(
    [{ name: 'Winnie', items: [] }, { name: 'Bob', items: [] }, { name: 'Thomas', items: [] }, { name: 'George', items: [] }]
  );

  useEffect(() => {
    const localList = localStorage.getItem('listOfItems');
    // console.log(localList);
    if (localList !== undefined)
      setListOfCloumns(JSON.parse(localList));
  }, []);

  const headingColors = ['#8E6E95', '#39A59C', '#344759', '#E8741E'];

  function handleAdd(index) {

    const task = window.prompt('Enter a task:');

    let newList = JSON.parse(JSON.stringify(listOfCloumns));
    newList[index].items.push(task);
    localStorage.setItem('listOfItems', JSON.stringify(newList))
    setListOfCloumns(newList);
  }

  function handleMoveTask(indexOfList, indexOfTask, task, type) {

    let newList = JSON.parse(JSON.stringify(listOfCloumns));
    newList[indexOfList].items.splice(indexOfTask, 1);

    switch (type) {
      case 'l':
        if (indexOfList > 0)
          newList[indexOfList - 1].items.push(task);
        else {
          newList[listOfCloumns.length - 1].items.push(task);
        }
        break;

      case 'r':
        if (indexOfList < listOfCloumns.length - 1)
          newList[indexOfList + 1].items.push(task);
        else {
          newList[0].items.push(task);
        }
        break;

      default:
        return;
    }


    localStorage.setItem('listOfItems', JSON.stringify(newList))
    setListOfCloumns(newList);
  }

  return (
    <div className='columnContainer'>

      {listOfCloumns.map((item, indexOfList) => {
        return <div key={indexOfList} className="column">
          <h4 style={{backgroundColor: headingColors[indexOfList]}}>{item.name}</h4>

          {item.items.length !== 0 && item.items.map((task, indexOfTask) => {

            return <div key={indexOfTask} className="listItem">
              <button onClick={() => { handleMoveTask(indexOfList, indexOfTask, task, 'l') }}><i class="fa-solid fa-angle-left"></i></button>
              {task}
              <button onClick={() => { handleMoveTask(indexOfList, indexOfTask, task, 'r') }}><i class="fa-solid fa-angle-right"></i></button>
            </div>
          })}

          <button onClick={() => handleAdd(indexOfList)}>+ Add a card</button>
        </div>
      })}

    </div>
  );
}

export default App;
