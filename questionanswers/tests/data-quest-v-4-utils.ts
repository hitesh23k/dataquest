import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AnswerSubmitted,
  QuestionCreated,
  WinnersDeclared
} from "../generated/DataQuestV4/DataQuestV4"

export function createAnswerSubmittedEvent(
  answerHash: Bytes,
  questionHash: Bytes,
  answerer: Address,
  answerLink: string,
  answerDescription: string,
  answerImageUrl: string
): AnswerSubmitted {
  let answerSubmittedEvent = changetype<AnswerSubmitted>(newMockEvent())

  answerSubmittedEvent.parameters = new Array()

  answerSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "answerHash",
      ethereum.Value.fromFixedBytes(answerHash)
    )
  )
  answerSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "questionHash",
      ethereum.Value.fromFixedBytes(questionHash)
    )
  )
  answerSubmittedEvent.parameters.push(
    new ethereum.EventParam("answerer", ethereum.Value.fromAddress(answerer))
  )
  answerSubmittedEvent.parameters.push(
    new ethereum.EventParam("answerLink", ethereum.Value.fromString(answerLink))
  )
  answerSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "answerDescription",
      ethereum.Value.fromString(answerDescription)
    )
  )
  answerSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "answerImageUrl",
      ethereum.Value.fromString(answerImageUrl)
    )
  )

  return answerSubmittedEvent
}

export function createQuestionCreatedEvent(
  questionHash: Bytes,
  questioner: Address,
  title: string,
  description: string,
  imageUrl: string,
  token: Address,
  startTimedtsmp: BigInt,
  endTimestamp: BigInt,
  totalWinningAmount: BigInt,
  winnerAmount: Array<BigInt>
): QuestionCreated {
  let questionCreatedEvent = changetype<QuestionCreated>(newMockEvent())

  questionCreatedEvent.parameters = new Array()

  questionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "questionHash",
      ethereum.Value.fromFixedBytes(questionHash)
    )
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "questioner",
      ethereum.Value.fromAddress(questioner)
    )
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam("imageUrl", ethereum.Value.fromString(imageUrl))
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTimedtsmp",
      ethereum.Value.fromUnsignedBigInt(startTimedtsmp)
    )
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endTimestamp",
      ethereum.Value.fromUnsignedBigInt(endTimestamp)
    )
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalWinningAmount",
      ethereum.Value.fromUnsignedBigInt(totalWinningAmount)
    )
  )
  questionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "winnerAmount",
      ethereum.Value.fromUnsignedBigIntArray(winnerAmount)
    )
  )

  return questionCreatedEvent
}

export function createWinnersDeclaredEvent(
  questionHash: Bytes,
  winners: Array<Address>
): WinnersDeclared {
  let winnersDeclaredEvent = changetype<WinnersDeclared>(newMockEvent())

  winnersDeclaredEvent.parameters = new Array()

  winnersDeclaredEvent.parameters.push(
    new ethereum.EventParam(
      "questionHash",
      ethereum.Value.fromFixedBytes(questionHash)
    )
  )
  winnersDeclaredEvent.parameters.push(
    new ethereum.EventParam("winners", ethereum.Value.fromAddressArray(winners))
  )

  return winnersDeclaredEvent
}
