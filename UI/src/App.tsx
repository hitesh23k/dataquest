import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import QuestionForm from './components/question-form/QuestionForm';
import Homepage from './components/homepage/Homepage';
import AnswerForm from './components/answer-form/AnswerForm';
import Discoverpage from "./components/homepage/Discover/Discoverpage";
import QuestionDetails from './components/question-details/QuestionDetails';
import AnswerDetails from './components/answer-details/AnswerDetails';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from './redux/store';
import { addUserWalletAddress } from './redux/actions/user-action';
import { useEffect } from 'react';


function App() {
  const myState = useSelector((state:RootState)=>state);
  console.log(myState);
  let str = "Its Working";
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(addUserWalletAddress("Hello"));
  },[])
  console.log(myState);

  const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/realchoubey/questionanswers',
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/question" element={<QuestionForm />}></Route>
        <Route path="/answer" element={<AnswerForm />}></Route>
        <Route path="/discover" element={<Discoverpage/>}></Route>
        <Route path="/question-details/:questionHash" element={<QuestionDetails />}></Route>
        <Route path="/answer-details" element={<AnswerDetails />}></Route>
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
