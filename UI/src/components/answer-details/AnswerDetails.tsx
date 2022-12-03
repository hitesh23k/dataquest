import './AnswerDetails.scss';

function AnswerDetails({ ansObject,closeModal }: any) {
  console.log(ansObject);
  return (
    <div className="transparent-container">
      <span className='close-icon' onClick={closeModal}>+</span>
      <div className="answer-details-wrapper">
        <div className="answer-details-content">
          <div className="answer-details-banner">
            <img src="https://cdn.discordapp.com/attachments/1046693449946116116/1048546746231431168/2107.w026.n002.629B.p1_2.png" alt="" />
            <div className="answer-details-userprofile">
              <img className="userprofile-image" src={ansObject.imageUrl} alt="profile" />
            </div>
            <h1 className="answer-details-wallet-address">{ ansObject.answerer.substring(0,4)+"..."+ansObject.answerer.substring(38)}</h1>
          </div>

          <div className="answer-details-info">
            <div className="answer-details-link-section">
              <h3>Link</h3>
              <a href={ ansObject.linkToAnswer} className="answer-details-link" target="_blank">
                {ansObject.linkToAnswer}
              </a>
            </div>
            <div className="answer-link-desc-section">
              <h3>Description</h3>
              <p>
               {ansObject.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerDetails;
