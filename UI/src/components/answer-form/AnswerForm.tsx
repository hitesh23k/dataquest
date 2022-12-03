import { useEffect, useState } from 'react';
import './AnswerForm.scss';
import { SubmitAnswerMethodParams } from '../../wrapper/Types';
import Constant from '../../wrapper/config/Constant';
import DataQuestWrapper from '../../wrapper/DataQuest';
import { useParams } from 'react-router-dom';

function AnswerForm(props: any) {
  let { questionHash } = useParams();
  let argumentToBePassed: string = !questionHash ? '' : questionHash;
  let dataQuestInstance = new DataQuestWrapper(Constant.rpcURL, Constant.dataQuestcontract);
  const [submitAnswerMethodParams, setSubmitAnswerMethodParams] = useState(
    {} as SubmitAnswerMethodParams
  );
  const [answerData, setAnswerData] = useState({
    questionHash: '',
    link: '',
    img: '',
    desc: '',
  });

  useEffect(() => {
    let testObject = {} as SubmitAnswerMethodParams;
    testObject.questionHash = argumentToBePassed;
    testObject.answerDescription = answerData.desc;
    testObject.answerImageUrl = answerData.img;
    testObject.answerLink = answerData.link;
    console.log(answerData);
    setSubmitAnswerMethodParams(testObject);
  }, [answerData]);

  const handleForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setAnswerData({ ...answerData, [event.currentTarget.name]: event.target.value });
  };

  const submitAnswer = async () => {
    // let result = await dataQuestInstance.getQuestionDetailsByQuestionHash(argumentToBePassed);
    // let submissions = await dataQuestInstance.getAnswersByQuestionHash(argumentToBePassed);
    // setAllSubmissions(submissions);
    // setQuestionData(result);
    console.log(submitAnswerMethodParams);
    await dataQuestInstance.submitAnswer(submitAnswerMethodParams);
  };

  return (
    <div className="answer-form-main-wrapper">
      <div onClick={() => props.closeform()} className="close-icon-container">
        <svg
          id="removeFilters"
          width="15"
          height="15"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.17387 4.99929L9.75374 1.42723C9.91051 1.27044 9.99858 1.05779 9.99858 0.836054C9.99858 0.614319 9.91051 0.401665 9.75374 0.244875C9.59697 0.0880841 9.38435 0 9.16264 0C8.94094 0 8.72832 0.0880841 8.57155 0.244875L5 3.82526L1.42845 0.244875C1.27168 0.0880841 1.05906 -1.65206e-09 0.837356 0C0.615652 1.65206e-09 0.403029 0.0880841 0.246261 0.244875C0.0894923 0.401665 0.0014208 0.614319 0.00142079 0.836054C0.00142079 1.05779 0.0894923 1.27044 0.246261 1.42723L3.82613 4.99929L0.246261 8.57135C0.168229 8.64875 0.106294 8.74084 0.0640274 8.84231C0.021761 8.94377 0 9.05261 0 9.16253C0 9.27244 0.021761 9.38128 0.0640274 9.48274C0.106294 9.58421 0.168229 9.6763 0.246261 9.7537C0.323655 9.83175 0.415733 9.89369 0.517185 9.93596C0.618636 9.97824 0.727452 10 0.837356 10C0.94726 10 1.05608 9.97824 1.15753 9.93596C1.25898 9.89369 1.35106 9.83175 1.42845 9.7537L5 6.17332L8.57155 9.7537C8.64894 9.83175 8.74102 9.89369 8.84247 9.93596C8.94392 9.97824 9.05274 10 9.16264 10C9.27255 10 9.38136 9.97824 9.48281 9.93596C9.58427 9.89369 9.67634 9.83175 9.75374 9.7537C9.83177 9.6763 9.89371 9.58421 9.93597 9.48274C9.97824 9.38128 10 9.27244 10 9.16253C10 9.05261 9.97824 8.94377 9.93597 8.84231C9.89371 8.74084 9.83177 8.64875 9.75374 8.57135L6.17387 4.99929Z"
            fill="white"
            fill-opacity="0.7"
          />
        </svg>
      </div>
      <div className="answer-form-sub-wrapper">
        <h1 className="answer-form-title">Write Answer</h1>
        <label className="answer-label">Answer Link</label>
        <input
          placeholder="https://example.com/"
          value={answerData.link}
          onChange={handleForm}
          name="link"
          className="answer-input-field"
          type="text"
        />
        <label className="answer-label">Select Image</label>
        <input
          placeholder="Add Image"
          className="answer-image-field"
          value={answerData.img}
          onChange={handleForm}
          type="text"
          name="img"
        />
        <label className="answer-label">Description</label>
        <textarea
          value={answerData.desc}
          onChange={handleForm}
          name="desc"
          placeholder="Desc"
          className="answer-textarea-field"
        />

        <button onClick={submitAnswer} className="submit-answer-button">
          Submit Answer
        </button>
      </div>
    </div>
  );
}

export default AnswerForm;
