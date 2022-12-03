export function handleQuestionCreatedEvent(event: QuestionCreated): void {
    let entity = new QuestionCreatedEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.questioner = event.transaction.questioner
    entity.questionHash = event.transaction.hash
    entity.title = event.transaction.title
    entity.token = event.transaction.token
    entity.totalWinningAmount = event.transaction.totalWinningAmount
    entity.winnersAmount = event.transaction.winnersAmount
    entity.startTimestamp = event.block.startTimestamp
    entity.endTimestamp = event.block.endTimestamp
    entity.save()
}

export function handleAnswerSubmittedEvent(event: AnswerSubmitted): void {
    let entity = new AnswerSubmittedEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.answerer = event.transaction.answerer
    entity.answerHash = event.transaction.hash
    entity.questionHash = event.transaction.hash
    entity.answerLink = event.transaction.answerLink
    entity.answerDescription = event.transaction.answerDescription
    entity.answerImage = event.transaction.answerImage
    entity.save()
}

export function handleWinnersDeclaredEvent(event: WinnersDeclared): void {
    let entity = new WinnersDeclaredEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.questioner = event.transaction.questioner
    entity.questionHash = event.transaction.hash
    entity.save()
}

export function handleLockedFundEvent(event: LockedFund): void {
    let entity = new LockedFundEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.questionerAddress = event.transaction.questionerAddress
    entity.token = event.transaction.token
    entity.amount = event.transaction.amount
    entity.save()
}

export function handleFundTransferredToWinnersEvent(event: FundTransferredToWinners): void {
    let entity = new FundTransferredToWinnersEventSchema(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.questioner = event.transaction.questioner
    entity.token = event.transaction.token
    entity.amount = event.transaction.amount
    entity.winnersAddress = event.transaction.winnersAddress
    entity.save()
}
