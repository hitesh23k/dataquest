import {
    AnswerSubmitted as AnswerSubmittedEvent,
    QuestionCreated as QuestionCreatedEvent,
    WinnersDeclared as WinnersDeclaredEvent
} from "../generated/DataQuestV4/DataQuestV4"
import {
    Answer,
    Protocol,
    Question,
    SubmittedAnswersCount,
    Winners
} from "../generated/schema"
import {BigInt, Bytes} from "@graphprotocol/graph-ts";

export let ZERO_BD = BigInt.fromString("0");
export let ONE_BD = BigInt.fromString("1");

export function handleQuestionCreated(event: QuestionCreatedEvent): void {
    let entity = new Question(event.transaction.hash.toHex().concat(event.logIndex.toI32().toString()));
    entity.questionHash = event.params.questionHash;
    entity.questioner = event.params.questioner;
    entity.title = event.params.title;
    entity.description = event.params.description;
    entity.imageUrl = event.params.imageUrl;
    entity.token = event.params.token;
    entity.startTimestamp = event.params.startTimestamp;
    entity.endTimestamp = event.params.endTimestamp;
    entity.totalWinningAmount = event.params.totalWinningAmount;
    entity.winnersAmount = event.params.winnerAmount;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    let protocol = Protocol.load(ONE_BD.toString());
    if (protocol === null) {
        protocol = new Protocol(ONE_BD.toString());
        protocol.totalQuestions = ONE_BD;
        protocol.totalAnswers = ZERO_BD;
        protocol.totalWinningAmount = event.params.totalWinningAmount;
    }
    protocol.totalQuestions = protocol.totalQuestions.plus(ONE_BD);
    protocol.totalWinningAmount = protocol.totalWinningAmount.plus(event.params.totalWinningAmount);

    entity.save()
    protocol.save()
}

export function handleAnswerSubmitted(event: AnswerSubmittedEvent): void {
    let entity = new Answer(event.transaction.hash.toHex().concat(event.logIndex.toI32().toString()));

    entity.answerHash = event.params.answerHash;
    entity.questionHash = event.params.questionHash;
    entity.answerer = event.params.answerer;
    entity.linkToAnswer = event.params.answerLink;
    entity.description = event.params.answerDescription;
    entity.imageUrl = event.params.answerImageUrl;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    let submittedAnswersCount = SubmittedAnswersCount.load(entity.questionHash.toString());
    if (submittedAnswersCount === null) {
        submittedAnswersCount = new SubmittedAnswersCount(entity.questionHash.toString());
        submittedAnswersCount.questionHash = entity.questionHash;
        submittedAnswersCount.answersCount = ONE_BD;
    }
    submittedAnswersCount.answersCount = submittedAnswersCount.answersCount.plus(ONE_BD);

    let protocol = Protocol.load(ONE_BD.toString());
    if (protocol !== null) {
        protocol.totalAnswers = protocol.totalAnswers.plus(ONE_BD);
        protocol.save();
    }

    entity.save();
    submittedAnswersCount.save();
}

export function handleWinnersDeclared(event: WinnersDeclaredEvent): void {
    let entity = new Winners(event.transaction.hash.toHex().concat(event.logIndex.toI32().toString()));
    entity.questionHash = event.params.questionHash;
    let totalWinners = event.params.winners.length;
    let winnersArray:Bytes[] = [];
    for (let idx = 0; idx < totalWinners; idx++){
        winnersArray.push(event.params.winners[idx]);
    }
    entity.winners = winnersArray;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();
}
