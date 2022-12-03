import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../homepage/Header/Header';
import './QuestionDetails.scss';
import DataQuestWrapper from '../../wrapper/DataQuest';
import Constant from '../../wrapper/config/Constant';
import AnswerForm from '../answer-form/AnswerForm';
import AnswerDetails from '../answer-details/AnswerDetails';
import Countdown from 'react-countdown';
import { useCountdownTimer} from "use-countdown-timer";
import CurrencyFormat from 'react-currency-format';

const QuestionDetails = () => {
  let { questionHash } = useParams();
  let argumentToBePassed: string = !questionHash ? '' : questionHash;
  const [questionData, setQuestionData] = useState({} as any);
  const [allSubmissions, setAllSubmissions] = useState([] as any);
  const [showAnsDetail, setShowAnsDetail] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 10000,
  });


  let dataQuestInstance = new DataQuestWrapper(Constant.rpcURL, Constant.dataQuestcontract);
  const getQuestionDetails = async () => {
    let result = await dataQuestInstance.getQuestionDetailsByQuestionHash(argumentToBePassed);
    let submissions = await dataQuestInstance.getAnswersByQuestionHash(argumentToBePassed);
    setAllSubmissions(submissions);
    setQuestionData(result);
  };

  useEffect(() => {
    getQuestionDetails();
  }, []);

  const answerFormHandler = () => {
    setShowAnswerForm(!showAnswerForm);
  };

  const convertDateToSeconds = (currentDate: any) => {
    currentDate = Math.round(currentDate / 1000);
    return currentDate;
  };

  const openAnswerDetailsModal = () => {
    setShowAnsDetail(!showAnsDetail);
  };

  return (
    <>
      <Header />
      <div className="questiondetails-wrapper">
        {showAnswerForm ? (
          <div className="answer-form-container">
            <AnswerForm closeform={answerFormHandler}></AnswerForm>
          </div>
        ) : null}

        <div className="questiondetail-container">
          <div className="leftside-section">
            <div className="questioner">
              <img className="questioner-logo-image" src={questionData.imageUrl} />
            </div>
            <div className="question-content">
              <div className="question-info">
                <h1>{questionData.title}</h1>
                <p>{questionData.description}</p>
              </div>
              <div className="question-timer">
                {convertDateToSeconds(Date.now()) < questionData.endTimestamp ? (
                  <h3>
                    Ends in &nbsp;{' '}
                    <span>
                      {' '}
                      {questionData.endTimestamp ? (
                        <Countdown date={Date.now() + parseInt(questionData.endTimestamp)} />
                      ) : null}
                    </span>
                  </h3>
                ) : (
                  <h3>
                    Starts in &nbsp;{' '}
                    <span>
                      {' '}
                      {questionData.startTimestamp ? (
                        <Countdown date={Date.now() + parseInt(questionData.startTimestamp)} />
                      ) : null}
                    </span>
                  </h3>
                )}
              </div>
            </div>

            {convertDateToSeconds(Date.now()) < questionData.endTimestamp ? (
              <div className="submit-answer-btn">
                <button onClick={answerFormHandler}>Submit Answer</button>
              </div>
            ) : null}

            {convertDateToSeconds(Date.now()) > questionData.endTimestamp ? (
              <div className="select-winner-section">
                <div className="select-winner-content">
                  <h1>Select Winners</h1>
                  <div className="winner-dropdown-menu">
                    <div className="first-place-winner">
                      <img className="medal" src="./images/assets/1st-medal.png" alt="" />
                      <div className="first-dropdown-menu">
                        <select name="" id="">
                          <option value="user1">
                            <img src="./images/assets/matic.png" alt="matic" />
                            <h3>0x7...56789</h3>
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="first-place-winner">
                      <img className="medal" src="./images/assets/2nd-medal.png" alt="" />
                      <div className="first-dropdown-menu">
                        <select name="" id="">
                          <option value="user1">
                            <img src="./images/assets/matic.png" alt="matic" />
                            <h3>0x7...56789</h3>
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="first-place-winner">
                      <img className="medal" src="./images/assets/3rd-medal.png" alt="" />
                      <div className="first-dropdown-menu">
                        <select name="" id="">
                          <option value="user1">
                            <img src="./images/assets/matic.png" alt="matic" />
                            <h3>0x7...56789</h3>
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="submit-winners">
                    <button className="submit-winners-btn">Submit Winners</button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="submissions-section">
              <h1>Submissions ({allSubmissions.length})</h1>
              <hr />
              {allSubmissions.map((submissionsObj: any) => {
                return (
                  <div className="users-submissions">
                    <div className="user-card">
                      <div className="user-profile">
                        <img className="user-profile-image" src={submissionsObj.imageUrl} alt="" />
                      </div>
                      <div className="user-details">
                        <h2 className="wallet-address">
                          {submissionsObj.answerer.substring(0, 4) +
                            '...' +
                            submissionsObj.answerer.substring(38)}
                        </h2>
                        <a
                          className="link-to-ans-tab"
                          target="_blank"
                          href={submissionsObj.linkToAnswer}
                        >
                          {submissionsObj.linkToAnswer.substring(0, 20) + '...'}
                        </a>
                        <span className="link-to-open-modal" onClick={openAnswerDetailsModal}>
                          {' '}
                          view answer
                        </span>
                        {showAnsDetail ? (
                          <AnswerDetails
                            ansObject={submissionsObj}
                            closeModal={openAnswerDetailsModal}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rightside-section">
            <div className="question-reward-section">
              <h3 className="heading">Reward</h3>
              <h1 className="token-price">{questionData.totalWinningAmount} MATIC</h1>
              {/* <h5 className="usd-price"><CurrencyFormat value={questionData.totalWinningAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
</h5> */}
              <div className="lock-reward-btn">
                <button>
                  <svg
                    width="30"
                    height="35"
                    viewBox="0 0 30 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.95652 35H28.0435C29.124 35 30 34.2877 30 33.4091V15.3788C30 14.5002 29.124 13.7879 28.0435 13.7879H26.087V9.01515C26.087 4.0442 21.1133 0 15 0C8.88665 0 3.91304 4.0442 3.91304 9.01515V13.7879H1.95652C0.876 13.7879 0 14.5002 0 15.3788V33.4091C0 34.2877 0.876 35 1.95652 35ZM16.9565 24.9228V27.0455C16.9565 27.9241 16.0805 28.6364 15 28.6364C13.9195 28.6364 13.0435 27.9241 13.0435 27.0455V24.9228C12.252 24.4386 11.7391 23.6687 11.7391 22.803C11.7391 21.341 13.202 20.1515 15 20.1515C16.798 20.1515 18.2609 21.341 18.2609 22.803C18.2609 23.6687 17.748 24.4386 16.9565 24.9228ZM7.82609 9.01515C7.82609 5.79865 11.0443 3.18182 15 3.18182C18.9557 3.18182 22.1739 5.79865 22.1739 9.01515V13.7879H7.82609V9.01515Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionDetails;