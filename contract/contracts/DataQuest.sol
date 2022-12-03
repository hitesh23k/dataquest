pragma solidity 0.8.17;
import "@openzeppelin/contracts/utils/Strings.sol";

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract DataQuest_Hack {
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

    function _bytes32ToStr(bytes32 _bytes32) private pure returns (string memory) {
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
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
        Question memory quest;
        quest.questioner = msg.sender;
        quest.title = title;
        quest.description = description;
        quest.imageUrl = imageUrl;
        quest.token = token;
        quest.startTimestamp = startTimestamp;
        quest.endTimestamp = endTimestamp;
        quest.totalWinningAmount = totalWinningAmount;
        quest.winnersAmount = winnersAmount;

        bytes32 questionHash = bytes32(keccak256(abi.encodePacked(msg.sender, questionCounter)));
        questionMap[questionHash] = quest;
        questionCounter += 1;

        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa).sendNotification(
            0x7b3Cb0dbCC799262Ed7A17D71A419d962536645A, address(this),
            bytes(string(abi.encodePacked("0", "+", "1", "+", title, "+", description)))
        );

        emit QuestionCreated(
            questionHash, msg.sender, title,
            description, imageUrl, token, startTimestamp,
            endTimestamp, totalWinningAmount, winnersAmount);
    }

    function submitAnswer(
        bytes32 questionHash,
        string memory answerLink,
        string memory answerDescription,
        string memory answerImageUrl) external {
        // Submit answer
        Answer memory ans;
        ans.answerer = msg.sender;
        ans.questionHash = questionHash;
        ans.imageUrl = answerImageUrl;
        ans.description = answerDescription;
        ans.linkToAnswer = answerLink;

        // Create unique id for answer
        bytes32 answerHash = bytes32(keccak256(abi.encodePacked(msg.sender, answerCounter)));
        answerMap[answerHash] = ans;
        answerCounter += 1;

        // Push answer to questionAnswersMap
        questionAnswersMap[questionHash].push(ans);

        string memory answererAddress = Strings.toHexString(msg.sender);
        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa).sendNotification(
            0x7b3Cb0dbCC799262Ed7A17D71A419d962536645A, address(this),
            bytes(string(abi.encodePacked("0", "+", "1", "+", string.concat("Answer submitted by ", answererAddress), "+", "")))
        );

        emit AnswerSubmitted(answerHash, questionHash, msg.sender, answerLink, answerDescription, answerImageUrl);
    }

    function declareWinners(bytes32 questionHash, address[] memory winners) external {
        questionWinnersMap[questionHash] = winners;
        string memory winnersAddress = "";
        string memory winnerAddress;
        for (uint256 i; i < winners.length; i++) {
            winnerAddress = Strings.toHexString(winners[i]);
            winnersAddress = string.concat(winnersAddress, winnerAddress);
        }
        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa).sendNotification(
            0x7b3Cb0dbCC799262Ed7A17D71A419d962536645A, address(this),
            bytes(string(abi.encodePacked("0", "+", "1", "+", string.concat("Winners declared for ", questionMap[questionHash].title),
                "+", winnersAddress)))
        );
        emit WinnersDeclared(questionHash, winners);
    }

    function getQuestionAnswersMap(bytes32 questionHash) public view returns (Answer[] memory){
        return questionAnswersMap[questionHash];
    }

    function getWinners(bytes32 questionHash) public view returns (address[] memory){
        return questionWinnersMap[questionHash];
    }
}
