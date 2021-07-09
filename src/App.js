import { useState, useEffect } from 'react';
import produce from 'immer';
import styled from 'styled-components';
const Notes = props => props.data.map(note => <div>{note.text}</div>);
const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
function App () {
  const initialData = [{ text: 'Loading Notes ... ' }];
  const [data, setData] = useState(initialData);
  const handleClick = () => {
    const text = document.querySelector('#noteinput').value.trim();
    if (text) {
      const nextState = produce(data, draftState => {
        draftState.push({ text });
      });
      document.querySelector('#noteinput').value = '';
      if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(nextState));
      }
      setData(nextState);
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('data');
      if (getData !== '' && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
  }, 0);
  return (
    <>
      <input style={{ color: '#c56ceb' }} id="noteinput" style={{ width: '80%' }} type="text" placeholder="Enter a new note" />
      <Button onClick={() => handleClick()}>Add note</Button>
      <Notes data={data} />
    </>
  );
};
export default App;
