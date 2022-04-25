interface thisPerson {
    person: string
}

// type thisType = {
//     person: string;
// }

// interface anotherPerson  {
//     name: string
//     age: number;
// }

const Person = ({person}: thisPerson) => {
  return (
    <div>hey {person}</div>
  )
}

export default Person