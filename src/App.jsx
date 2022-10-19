import './App.css';
import x from './x.svg'
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Relocator from './relocator.js'
import { Routes, useParams, Route, Link, HashRouter as Router, useLocation} from 'react-router-dom'



function Todo(props) {
  return (
    <div className='Todo'>
      <span style={{textDecoration: props.completed?"line-through":"none"}}>
      <input type="checkbox" checked={props.completed} onChange={(e) => {
        props.setTodo(props.state.map(el => el.id===props.id ? {...el, completed: e.target.checked}:el));}}/>
      {props.text}
      <img src={x} alt="Remove" className="remove" onClick={() => {
        props.setTodo(props.state.filter(el => el.id!==props.id));}}/>
      </span>
    </div>
  );
}

function ListInternals(props) {
  const [value, setValue] = useState('');
  const [id, setId] = useState(1);
  return (<div>
    <form onSubmit={e => {
      if (value !== '') {
      e.preventDefault(); setId(id+1)
    props.updater([...props.list, {id:id, text: value, completed: false}]);}
    else {alert("Todo cannot be empty")}}}>
      <input type="text" onChange={e => setValue(e.target.value)} />
      <input type="submit" value="Add"/>
    </form>
    {props.list.map(todo => <Todo key={todo.id} {...todo} setTodo={props.updater} state={props.list}/>)}
    <button onClick={ type=='new'? '': () => props.save(props.list)}>Save</button>
  </div>);
}

function TodoList(props) {
  const [todoList, updater] = useState([]);
  return (<ListInternals list={todoList} updater={updater} type="new" />);
}

function App() {
  return (
    <div className='App'>
    <Routing/>
    </div>);
}

function Main() {return (<><h1>Todo List</h1><TodoList/></>)}
function NavBar() {return <nav></nav>}

function SavedList() {
  const {name} = useParams();
  useEffect(() => {

  });
  const [todoList, updater] = useState([]);
  return <ListInternals list={todoList} updater={updater} type="saved" />
}

function Routing() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route path="/about">{/*<About/>*/}</Route>
        <Route path="/lists/:name" element={<SavedList/>}/>
      </Routes>
    </Router>
  )
}

export default App;

