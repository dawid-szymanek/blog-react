import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase';
import { QuerySnapshot } from 'firebase/firestore';

function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [newTitle, setNewTitle] = useState([]);
  const [newContent, setNewContent] = useState([]);
  const [login, setLogin] = useState([]);
  const [password, setPassword] = useState([]);
  const ref = firebase.firestore().collection("posts");
  function data(data, id) {
    let content = data.content;
    let date = data.date;
    let title = data.title;
    return {content, date, title, id};
  }
  function getPosts() {
    setLoading(true);
    ref.onSnapshot((QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push(data(doc.data(), doc.id));
      });
      setPosts(items);
      setLoading(false);
    });
  }
  function addPost(newPost) {
    ref
      .doc()
      .set(newPost)
      .catch((err) => {
        console.error(err);
      });
  }
  function deletePost(delPost) {
    ref
      .doc(delPost)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }
  function logIn() {
    if(login=="login" && password=="1234") setLoggedIn(true);
    else alert("Niepoprawny login lub hasło");
  }
  useEffect(() => {
    getPosts();
  }, []);

  if(loading) {
    return <h1>Loading...</h1>
  }

  return(
    <div id="page">
      <Login 
      loggedIn={loggedIn} 
      setNewContent={setNewContent} 
      setNewTitle={setNewTitle}
      newContent={newContent}
      newTitle={newTitle}
      addPost={addPost}
      logIn={logIn}
      setLogin={setLogin}
      setPassword={setPassword}
      setLoggedIn={setLoggedIn}
      login={login}
      password={password}
      />
      <Menu/>
      <Main 
      posts={posts}
      loggedIn={loggedIn}
      deletePost={deletePost}
      />
    </div>
  );
}

function Login(props) {
  let a;
  let loggedIn = props.loggedIn;
  let newTitle = props.newTitle;
  let newContent = props.newContent;
  let addPost = props.addPost;
  let logIn = props.logIn;

  let setNewTitle = props.setNewTitle;
  let setNewContent = props.setNewContent;
  let setLogin = props.setLogin;
  let setPassword = props.setPassword;
  let setLoggedIn = props.setLoggedIn;
  if(loggedIn) {
    a = <><br/>
    Title:<br/><input type="text" name="new_title" onChange={(e) => setNewTitle(e.target.value)}/><br/>
    Content:<br/><textarea name="new_content" onChange={(e) => setNewContent(e.target.value)}/><br/>
    <button type="button" onClick={() => addPost({content: newContent, date: firebase.firestore.Timestamp.fromDate(new Date()), title: newTitle})}>Add Post</button><br/>
    <button type="button" onClick={() => setLoggedIn(false)}>Log Out</button><br/></>
  } else {
    a = <><br/><br/><br/><br/>
    <input type="text" name="login" placeholder="Login" onChange={(e) => setLogin(e.target.value)}/><br/>
    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/><br/>
    <button type="button" onClick={() => logIn()}>Log In</button></>
  }
  return(
    <div id="login">
      {a}
    </div>
  )
}

function Menu() {
  return(
    <div id="menu">
      <ul>
        <li><br/><br/><br/><a href="https://www.facebook.com" target="_blank"><i className="fa-brands fa-facebook-f fa-2xl"/></a></li>
        <li><br/><br/><br/><a href="https://www.youtube.com" target="_blank"><i className="fa-brands fa-youtube fa-2xl"/></a></li>
        <li><br/><br/><br/><a href="https://www.twitter.com" target="_blank"><i className="fa-brands fa-twitter fa-2xl"/></a></li>
        <li><br/><br/><br/><a href="https://www.instagram.com" target="_blank"><i className="fa-brands fa-instagram fa-2xl"/></a></li>
      </ul>
    </div>
  )
}

function Main(props) {
  let main = props.posts.map((post) => (
    <Post key={post.id} id={post.id} title={post.title} date={post.date} content={post.content} loggedIn={props.loggedIn} deletePost={props.deletePost}/>
  ))
  return(
    <div id="main">
      <br/>
        {main}
      <br/>
    </div>
  )
}

function Post(props) {
  let postTitle=props.title;
  let loggedIn = props.loggedIn;
  let postDate= new Date(props.date.seconds * 1000 + props.date.nanoseconds / 1000000);
  let postContent=props.content;
  let deletePost = props.deletePost;
  let deleteButton = (loggedIn) ? <button onClick={() => deletePost(props.id)}>Delete Post</button> : <></>;
  return(
    <div className="post">
      <h2>{postTitle} - {postDate.toLocaleDateString()}</h2>
      <p>{postContent}</p><br/>
      {deleteButton}
    </div>
  )
}

ReactDOM.render(
  <Page/>,
  document.getElementById('root')
);

reportWebVitals();