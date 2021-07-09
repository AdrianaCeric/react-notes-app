import { useState, useEffect } from 'react';
import produce from 'immer';
import styled from 'styled-components';
import image from './dog.gif';
const Notes = props => props.data.map(note => <Wrapper><div>{note.text}</div></Wrapper>);
const Button = styled.button`
  background: ${props => props.primary ? "#561475" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #282c34;
`;

const Wrapper = styled.section`
  padding: 2em;
  margin: 12px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  width: 80%;
  background: #f7f4f0;
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
      <Title>The-Purple-Dog-Zero-Peanut-Butter-Soccer-Notes-App</Title>
      <img src={image} alt="dog"/>
  

      <input style={{ color: '#c56ceb', width: '80%' }} id="noteinput"  type="text" placeholder="Enter a new note" />
      <button onClick={() => handleClick()}>Add note</button>
      
        <Notes data={data} />
     
    </>
  );
};
export default App;
