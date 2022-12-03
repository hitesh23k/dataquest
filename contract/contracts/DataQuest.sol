pragma solidity 0.8.17;

contract DataQuest {
    struct Question {
        address questioner;
        string title;
        string description;
        string imageUrl;
        address token;
        uint256 totalWinningAmount;
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256[] winnersAmount;
    }
    struct Answer {
        bytes32 questionHash;
        string linkToAnswer;
        string description;
        string imageUrl;
        address answerer;
    }

    mapping (bytes32 => Question) public questionMap;
    mapping (bytes32 => Answer) public answerMap;
    mapping (bytes32 => Answer[]) public questionAnswersMap; // questionHash => array of answers
    mapping (bytes32 => address[]) public questionWinnersMap; // questionHash => array of winners
    uint256 public questionCounter;
    uint256 public answerCounter;

    event QuestionCreated(
        bytes32 questionHash,
        address questioner,
        string title,
        string description,
        string imageUrl,
        address token,
        uint256 startTimestamp,
        uint256 endTimestamp,
        uint256 totalWinningAmount,
        uint256[] winnerAmount
    );

    event AnswerSubmitted(
        bytes32 answerHash,
        bytes32 questionHash,
        address answerer,
        string answerLink,
        string answerDescription,
        string answerImageUrl
    );

    event WinnersDeclared(
        bytes32 questionHash,
        address[] winners
    );

    constructor(){
        questionCounter = 0;
        answerCounter = 0;
    }

    function createQuestion(
        string memory title,
        string memory description,
        address token,
        uint256 startTimestamp,
        uint256 endTimestamp,
        uint256 totalWinningAmount,
        uint256[] memory winnersAmount,
        string memory imageUrl) external {
        // Creation question
    }

    function submitAnswer(
        bytes32 questionHash,
        string memory answerLink,
        string memory answerDescription,
        string memory answerImageUrl) external {
        // Submit answer
    }

    function declareWinners(bytes32 questionHash, address[] memory winners) external {
        
    }

    function getQuestionAnswersMap(bytes32 questionHash) public view returns (Answer[] memory){
        return;
    }

    function getWinners(bytes32 questionHash) public view returns (address[] memory){
        return;
    }
}
