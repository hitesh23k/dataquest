import './QuestionForm.scss';
import Header from '../homepage/Header/Header';
import { useEffect, useState } from 'react';
import DataQuestWrapper from '../../wrapper/DataQuest';
import Constant from '../../wrapper/config/Constant';
import { CreateQuestionMethodParams } from '../../wrapper/Types';
import Constants from '../../utility/constants';
import { metamaskLogin2 } from '../web3Service';
import Loader from '../lodaer/loader';

function QuestionForm() {
  const [showLoader, setShowLoader] = useState(false);
  const allTokens = Constants.tokens;
  let dataQuestInstance = new DataQuestWrapper(Constant.rpcURL, Constant.dataQuestcontract);

  const [totalStakeAmount, setTotalStakeAmount] = useState(0);
  const [CreateQuestionMethodParams, setCreateQuestionMethodParams] = useState(
    {} as CreateQuestionMethodParams
  );
  const [questionData, setQuestionData] = useState({
    title: '',
    token: '0x9f324abb8a8744a18030deb6b2888db6b7b6841d',
    amount: '',
    website: '',
    startDate: '',
    endDate: '',
    bannerImage: '',
    desc: '',
    totalAmount: '',
    firstPrize: '',
    secondPrize: '',
    thirdPrize: '',
  });

  const handleForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setQuestionData({ ...questionData, [event.currentTarget.name]: event.target.value });
    console.log(questionData);
  };

  useEffect(() => {
    let totalStake: number = Number(questionData.amount);
    totalStake = 0.005 * totalStake + totalStake;
    setTotalStakeAmount(totalStake);
    setFormObject();
  }, [questionData]);

  const submitQuestion = async () => {
    // let result = await dataQuestInstance.getQuestionDetailsByQuestionHash(argumentToBePassed);
    // let submissions = await dataQuestInstance.getAnswersByQuestionHash(argumentToBePassed);
    // setAllSubmissions(submissions);
    // setQuestionData(result);
    console.log(CreateQuestionMethodParams);
    setShowLoader(true);
    await dataQuestInstance.createQuestion(CreateQuestionMethodParams);
    setShowLoader(false);
  };

  const setFormObject = () => {
    let testObject = {} as CreateQuestionMethodParams;
    testObject.description = questionData.desc;
    let startDate = new Date(questionData.startDate);
    let startSeconds = Math.floor(startDate.getTime() / 1000);
    let endDate = new Date(questionData.startDate);
    let endSeconds = Math.floor(endDate.getTime() / 1000);

    testObject.endTimestamp = endSeconds;
    testObject.imageUrl = questionData.bannerImage;
    testObject.startTimestamp = startSeconds;
    testObject.title = questionData.title;
    testObject.token = questionData.token;
    testObject.totalWinningAmount = totalStakeAmount;
    testObject.winnersAmount = [
      Number(questionData.firstPrize),
      Number(questionData.secondPrize),
      Number(questionData.thirdPrize),
    ];

    setCreateQuestionMethodParams(testObject);
    console.log(testObject);
  };
  return (
    <div className="question-form-main-wrapper">
      {showLoader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}

      <Header />
      <div className="question-form-sub-wrapper">
        <div className="forms-container">
          <h1 className="title">CREATE QUESTION</h1>
          <div className="left-side-form">
            <label className="our-label">Title</label>
            <input
              placeholder="Title"
              value={questionData.title}
              onChange={handleForm}
              name="title"
              className="input-field"
              type="text"
            />
            <label className="our-label">Token - All ERC20 Tokens are Supported</label>
            <select
              value={questionData.token}
              onChange={handleForm}
              className="select-token-network-form input-field"
              name="token"
              id=""
            >
              {allTokens.map((token) => {
                return (
                  <option value={token.tokenAddress}>
                    <h3>{token.tokenName}</h3>
                  </option>
                );
              })}
            </select>
            <label className="our-label">Winners Amount</label>
            <input
              placeholder="Winners Amount"
              value={questionData.amount}
              onChange={handleForm}
              name="amount"
              className="input-field"
              type="number"
            />
            <label className="our-label">Website</label>
            <input
              placeholder="Website"
              value={questionData.website}
              onChange={handleForm}
              name="website"
              className="input-field"
              type="text"
            />
            <label className="our-label">Start Date</label>
            <input
              placeholder="Start Date"
              value={questionData.startDate}
              onChange={handleForm}
              name="startDate"
              className="input-field"
              type="date"
            />
            <label className="our-label">End Date</label>
            <input
              placeholder="End Date"
              value={questionData.endDate}
              onChange={handleForm}
              name="endDate"
              className="input-field date"
              type="date"
            />
            <label className="our-label">Banner Image</label>
            <input
              placeholder="Add Image"
              value={questionData.bannerImage}
              onChange={handleForm}
              name="bannerImage"
              className="input-field"
              type="text"
            />
          </div>
          <div className="right-side-form">
            <label className="our-label">Description</label>
            {/* <input
              placeholder="Description"
              className="input-field"
              type="textfield"
            /> */}
            <textarea
              placeholder="Description"
              className="input-field textarea"
              value={questionData.desc}
              onChange={handleForm}
              name="desc"
              id=""
            ></textarea>
            <label className="our-label">Winning Amount</label>
            <input
              placeholder="1st Place"
              value={questionData.firstPrize}
              onChange={handleForm}
              name="firstPrize"
              className="input-field winning-amount"
              type="number"
            />
            <input
              placeholder="2nd Place"
              value={questionData.secondPrize}
              onChange={handleForm}
              name="secondPrize"
              className="input-field winning-amount"
              type="number"
            />
            <input
              placeholder="3rd Place"
              value={questionData.thirdPrize}
              onChange={handleForm}
              name="thirdPrize"
              className="input-field winning-amount"
              type="number"
            />
            <label className="our-label">Total Amount</label>
            <input
              disabled
              placeholder="Winners Total Amount"
              value={totalStakeAmount}
              // onChange={handleForm}
              name="totalAmount"
              className="input-field"
              type="number"
            />
            <h3 className="note">
              <span className="note-bold">NOTE: </span> 0.5% Protocol fees is added to total amount
            </h3>
            <button
              onClick={!localStorage.getItem('userWalletAddress') ? metamaskLogin2 : submitQuestion}
              className="stake-button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;
