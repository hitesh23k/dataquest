import Web3 from 'web3';
import { dataQuestABI } from './config/DataQuestABI';
import {
  CreateQuestionMethodParams,
  DeclareWinnerMethodParams,
  FormattedAnswerAttributes,
  FormattedQuestionDetailsAttributes,
  SubmitAnswerMethodParams,
} from './Types';
import Constant from './config/Constant';
declare var window: any;

export default class DataQuestWrapper {
  private dataQuestInstance: any;

  private web3: any;

  constructor(rpcURL: string, contractAddress: string) {
    this.web3 = new Web3(rpcURL);
    this.dataQuestInstance = new this.web3.eth.Contract(dataQuestABI as any, contractAddress);
  }

  /**
   * Creates question by sign on wallet and return questionHash for question
   * @param question
   * @param privateKey
   * @returns
   */
  public async createQuestion(question: CreateQuestionMethodParams) {
    let encodedData = this.dataQuestInstance.methods
      .createQuestion(
        question.title,
        question.description,
        question.token,
        question.startTimestamp,
        question.endTimestamp,
        question.totalWinningAmount,
        question.winnersAmount,
        question.imageUrl
      )
      .encodeABI();

    const hexData = await this.executeMetamaskTransaction(encodedData);
    const decodedData = await this.decodeAndGetQuestionHash(hexData);
    const questionHash: string = `${decodedData.questionHash}`;
    console.log(`questionHash:`, questionHash);

    window.location = `http://localhost:3000/question-details/${questionHash}`;

   // return questionHash;
  }

  /**
   * Submit answer for question by sign on wallet and return hexData
   * @param answer
   * @param privateKey
   * @returns
   */
  public async submitAnswer(answer: SubmitAnswerMethodParams) {
    let encodedData = this.dataQuestInstance.methods
      .submitAnswer(
        answer.questionHash,
        answer.answerLink,
        answer.answerDescription,
        answer.answerImageUrl
      )
      .encodeABI();

    const hexData = await this.executeMetamaskTransaction(encodedData);
    const decodedData = await this.decodeAndGetAnswerHash(hexData);
    const answerHash: string = `${decodedData.answerHash}`;
    console.log(`answerHash:`, answerHash);

    window.location = `http://localhost:3000/question-details/${decodedData.questionHash}`;

    // return answerHash;
  }

  /**
   * Declare winners for question by sign on wallet and return hexData
   * @param winnerParams
   * @param privateKey
   * @returns
   */
  public async declareWinners(winnerParams: DeclareWinnerMethodParams) {
    let encodedData = this.dataQuestInstance.methods
      .declareWinners(winnerParams.questionHash, winnerParams.winners)
      .encodeABI();

    // const hexData = await this.sendTransaction(encodedData, privateKey);
    const hexData = await this.executeMetamaskTransaction(encodedData);
    return hexData;
  }

  /**
   * Get question details by the questionHash
   * @param questionHash
   * @returns
   */
  public async getQuestionDetailsByQuestionHash(questionHash: string) {
    let questionDetails = await this.dataQuestInstance.methods.questionMap(questionHash).call();

    const formattedQuestionDetails: FormattedQuestionDetailsAttributes = {
      questioner: questionDetails.questioner,
      title: questionDetails.title,
      description: questionDetails.description,
      imageUrl: questionDetails.imageUrl,
      token: questionDetails.token,
      totalWinningAmount: questionDetails.totalWinningAmount,
      startTimestamp: questionDetails.startTimestamp,
      endTimestamp: questionDetails.endTimestamp,
    };
    return formattedQuestionDetails;
  }

  /**
   * Get answers of question by the questionHash
   * @param questionHash
   * @returns
   */
  public async getAnswersByQuestionHash(questionHash: string) {
    let answers: FormattedAnswerAttributes[] = [];
    const answerArray = await this.dataQuestInstance.methods
      .getQuestionAnswersMap(questionHash)
      .call();

    for (let i = 0; i < answerArray.length; i++) {
      const answer = answerArray[i];
      const formattedAnswer: FormattedAnswerAttributes = {
        questionHash: answer.questionHash,
        linkToAnswer: answer.linkToAnswer,
        description: answer.description,
        imageUrl: answer.imageUrl,
        answerer: answer.answerer,
      };
      answers.push(formattedAnswer);
    }
    return answers;
  }

  /**
   * Get winners of a question by the questionHash
   * @param questionHash
   * @returns winners
   */
  public async getWinners(questionHash: string) {
    const winners = await this.dataQuestInstance.methods.getWinners(questionHash).call();
    return winners;
  }

  /**
   * Sign and send transaction for encoded contract methods
   * @param encodedData
   * @param privateKey
   * @returns hexData
   */
  private async sendTransaction(encodedData: any, privateKey: string) {
    let hexData: string = '';
    this.web3.eth.accounts.wallet.add(privateKey);
    let block = await this.web3.eth.getBlock('latest');
    let gasLimit = Math.round(block.gasLimit / block.transactions.length);

    let tx = {
      gas: gasLimit,
      to: Constant.dataQuestcontract,
      data: encodedData,
    };

    await this.web3.eth.accounts
      .signTransaction(tx, privateKey)
      .then(async (signed: { rawTransaction: any }) => {
        const transaction = await this.web3.eth.sendSignedTransaction(signed.rawTransaction!);
        hexData = transaction.logs[0].data;
      });

    return hexData;
  }

  private executeMetamaskTransaction = async (encodedAbi: string) => {
    console.log(`window.ethereum.selectedAddress`+window.ethereum.selectedAddress);
    let block = await this.web3.eth.getBlock('latest');
    let gasLimit = Math.round(block.gasLimit / block.transactions.length).toString();
    console.log(`gasLimit:`, gasLimit);
    const transactionParameters = {
      nonce: '0x00', // ignored by MetaMask
      gasPrice: '0x2540BE40', // customizable by user during MetaMask confirmation.
      gas: '200390', // customizable by user during MetaMask confirmation.
      to: Constant.dataQuestcontract, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      value: '0x00', // Only required to send ether to the recipient from the initiating external account.
      data: encodedAbi, // Optional, but used for defining smart contract creation and interaction.
      chainId: Constant.chainID, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    let receipt;
    const transactionHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    console.log(transactionHash);

    console.log('sleeping');
    await this.sleep(20000);
    console.log('woke up');

    receipt = await this.getTxReciept(transactionHash);

    return receipt.logs[0].data;
  };

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getTxReciept(transactionHash: string) {
    const receipt = await this.web3.eth.getTransactionReceipt(transactionHash);
    console.log('receipt:', receipt);

    return receipt;
  }

  /**
   * Decode hexData and return the decodedData of transaction
   * @param hexData
   * @returns decodedData
   */
  private decodeAndGetQuestionHash(hexData: string) {
    const typesArray = [
      { type: 'bytes32', name: 'questionHash' },
      { type: 'address', name: 'questioner' },
      { type: 'string', name: 'title' },
      { type: 'string', name: 'description' },
      { type: 'string', name: 'imageUrl' },
      { type: 'address', name: 'token' },
      { type: 'uint256', name: 'startTimestamp' },
      { type: 'uint256', name: 'endTimestamp' },
      { type: 'uint256', name: 'totalWinningAmount' },
      { type: 'uint256[]', name: 'winnersAmount' },
    ];

    const decodedData = this.web3.eth.abi.decodeParameters(typesArray, hexData);
    return decodedData;
  }

  /**
   * Decode hexData and return the decodedData of transaction
   * @param hexData
   * @returns decodedData
   */
  private decodeAndGetAnswerHash(hexData: string) {
    const typesArray = [
      { type: 'bytes32', name: 'answerHash' },
      { type: 'bytes32', name: 'questionHash' },
      { type: 'address', name: 'answerer' },
      { type: 'string', name: 'answerLink' },
      { type: 'string', name: 'answerDescription' },
      { type: 'string', name: 'answerImageUrl' },
    ];

    const decodedData = this.web3.eth.abi.decodeParameters(typesArray, hexData);
    return decodedData;
  }
}

// const rpcURL = Constant.rpcURL;
// const contractAddress = Constant.dataQuestcontract;
// const questionHash = '0xAA519F28F07ACD3DAC38FE953A7A8E247BEC91F3A07B8B6CEDDE326ECB9F6376'

// let answer: SubmitAnswerMethodParams = {
//     questionHash: '0x6EB90C1F536E5547C0D596FFD0DDB9C46B2981F00E5B56A6BB5A8D8FFF728F4A',
//     answerDescription: 'this is answer',
//     answerImageUrl: 'image.jpg',
//     answerLink: 'http:/link'
// }

// let privateKey = 'db85da5f8f2f7129c6daddd4a8c0bc3f578672062815b4f183269647d9a3aeda'

// const dataQuest = new DataQuestWrapper(rpcURL, contractAddress);
// //dataQuest.submitAnswer(answer, privateKey).then(res => console.log(res)).catch((err) => console.log(err));

// let params: DeclareWinnerMethodParams = {
//     questionHash: '0x6EB90C1F536E5547C0D596FFD0DDB9C46B2981F00E5B56A6BB5A8D8FFF728F4A',
//     winners: ['0x907f2e1f4a477319a700fc9a28374ba47527050e', '0x60b42d88e2db8088f29f19b448b7e7669091d270', '0x87f70751d283d4d4b7cc16586e2e3afcf528ca7b']
// }

// dataQuest.declareWinners(params, privateKey).then(res => console.log(res)).catch((err) => console.log(err));
// //dataQuest.getQuestionDetailsByQuestionHash('0x8dda8bcd8ebd54af9317bb2936dc556ffc58788da33e00ad3a74a4b57c3f0c18').then(res => console.log(res));
