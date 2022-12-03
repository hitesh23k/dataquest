import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AnswerSubmitted } from "../generated/schema"
import { AnswerSubmitted as AnswerSubmittedEvent } from "../generated/DataQuest/DataQuest"
import { handleAnswerSubmitted } from "../src/data-quest-v-4"
import { createAnswerSubmittedEvent } from "./data-quest-v-4-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let answerHash = Bytes.fromI32(1234567890)
    let questionHash = Bytes.fromI32(1234567890)
    let answerer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let answerLink = "Example string value"
    let answerDescription = "Example string value"
    let answerImageUrl = "Example string value"
    let newAnswerSubmittedEvent = createAnswerSubmittedEvent(
      answerHash,
      questionHash,
      answerer,
      answerLink,
      answerDescription,
      answerImageUrl
    )
    handleAnswerSubmitted(newAnswerSubmittedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AnswerSubmitted created and stored", () => {
    assert.entityCount("AnswerSubmitted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AnswerSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "answerHash",
      "1234567890"
    )
    assert.fieldEquals(
      "AnswerSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "questionHash",
      "1234567890"
    )
    assert.fieldEquals(
      "AnswerSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "answerer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AnswerSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "answerLink",
      "Example string value"
    )
    assert.fieldEquals(
      "AnswerSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "answerDescription",
      "Example string value"
    )
    assert.fieldEquals(
      "AnswerSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "answerImageUrl",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
