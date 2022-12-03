// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Question extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Question entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Question must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Question", id.toString(), this);
    }
  }

  static load(id: string): Question | null {
    return changetype<Question | null>(store.get("Question", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questioner(): Bytes {
    let value = this.get("questioner");
    return value!.toBytes();
  }

  set questioner(value: Bytes) {
    this.set("questioner", Value.fromBytes(value));
  }

  get questionHash(): Bytes {
    let value = this.get("questionHash");
    return value!.toBytes();
  }

  set questionHash(value: Bytes) {
    this.set("questionHash", Value.fromBytes(value));
  }

  get title(): string | null {
    let value = this.get("title");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set title(value: string | null) {
    if (!value) {
      this.unset("title");
    } else {
      this.set("title", Value.fromString(<string>value));
    }
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get imageUrl(): string | null {
    let value = this.get("imageUrl");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set imageUrl(value: string | null) {
    if (!value) {
      this.unset("imageUrl");
    } else {
      this.set("imageUrl", Value.fromString(<string>value));
    }
  }

  get token(): Bytes {
    let value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get totalWinningAmount(): BigInt {
    let value = this.get("totalWinningAmount");
    return value!.toBigInt();
  }

  set totalWinningAmount(value: BigInt) {
    this.set("totalWinningAmount", Value.fromBigInt(value));
  }

  get startTimestamp(): BigInt {
    let value = this.get("startTimestamp");
    return value!.toBigInt();
  }

  set startTimestamp(value: BigInt) {
    this.set("startTimestamp", Value.fromBigInt(value));
  }

  get endTimestamp(): BigInt {
    let value = this.get("endTimestamp");
    return value!.toBigInt();
  }

  set endTimestamp(value: BigInt) {
    this.set("endTimestamp", Value.fromBigInt(value));
  }

  get winnersAmount(): Array<BigInt> {
    let value = this.get("winnersAmount");
    return value!.toBigIntArray();
  }

  set winnersAmount(value: Array<BigInt>) {
    this.set("winnersAmount", Value.fromBigIntArray(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class Answer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Answer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Answer must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Answer", id.toString(), this);
    }
  }

  static load(id: string): Answer | null {
    return changetype<Answer | null>(store.get("Answer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionHash(): Bytes {
    let value = this.get("questionHash");
    return value!.toBytes();
  }

  set questionHash(value: Bytes) {
    this.set("questionHash", Value.fromBytes(value));
  }

  get answerHash(): Bytes {
    let value = this.get("answerHash");
    return value!.toBytes();
  }

  set answerHash(value: Bytes) {
    this.set("answerHash", Value.fromBytes(value));
  }

  get answerer(): Bytes {
    let value = this.get("answerer");
    return value!.toBytes();
  }

  set answerer(value: Bytes) {
    this.set("answerer", Value.fromBytes(value));
  }

  get linkToAnswer(): string | null {
    let value = this.get("linkToAnswer");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set linkToAnswer(value: string | null) {
    if (!value) {
      this.unset("linkToAnswer");
    } else {
      this.set("linkToAnswer", Value.fromString(<string>value));
    }
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get imageUrl(): string | null {
    let value = this.get("imageUrl");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set imageUrl(value: string | null) {
    if (!value) {
      this.unset("imageUrl");
    } else {
      this.set("imageUrl", Value.fromString(<string>value));
    }
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class Winners extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Winners entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Winners must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Winners", id.toString(), this);
    }
  }

  static load(id: string): Winners | null {
    return changetype<Winners | null>(store.get("Winners", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionHash(): Bytes {
    let value = this.get("questionHash");
    return value!.toBytes();
  }

  set questionHash(value: Bytes) {
    this.set("questionHash", Value.fromBytes(value));
  }

  get winners(): Array<Bytes> {
    let value = this.get("winners");
    return value!.toBytesArray();
  }

  set winners(value: Array<Bytes>) {
    this.set("winners", Value.fromBytesArray(value));
  }

  get blockTimestamp(): BigInt {
    let value = this.get("blockTimestamp");
    return value!.toBigInt();
  }

  set blockTimestamp(value: BigInt) {
    this.set("blockTimestamp", Value.fromBigInt(value));
  }

  get transactionHash(): Bytes {
    let value = this.get("transactionHash");
    return value!.toBytes();
  }

  set transactionHash(value: Bytes) {
    this.set("transactionHash", Value.fromBytes(value));
  }
}

export class SubmittedAnswersCount extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save SubmittedAnswersCount entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type SubmittedAnswersCount must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("SubmittedAnswersCount", id.toString(), this);
    }
  }

  static load(id: string): SubmittedAnswersCount | null {
    return changetype<SubmittedAnswersCount | null>(
      store.get("SubmittedAnswersCount", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get questionHash(): Bytes {
    let value = this.get("questionHash");
    return value!.toBytes();
  }

  set questionHash(value: Bytes) {
    this.set("questionHash", Value.fromBytes(value));
  }

  get answersCount(): BigInt {
    let value = this.get("answersCount");
    return value!.toBigInt();
  }

  set answersCount(value: BigInt) {
    this.set("answersCount", Value.fromBigInt(value));
  }
}

export class Protocol extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Protocol entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Protocol must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Protocol", id.toString(), this);
    }
  }

  static load(id: string): Protocol | null {
    return changetype<Protocol | null>(store.get("Protocol", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get totalQuestions(): BigInt {
    let value = this.get("totalQuestions");
    return value!.toBigInt();
  }

  set totalQuestions(value: BigInt) {
    this.set("totalQuestions", Value.fromBigInt(value));
  }

  get totalAnswers(): BigInt {
    let value = this.get("totalAnswers");
    return value!.toBigInt();
  }

  set totalAnswers(value: BigInt) {
    this.set("totalAnswers", Value.fromBigInt(value));
  }

  get totalWinningAmount(): BigInt {
    let value = this.get("totalWinningAmount");
    return value!.toBigInt();
  }

  set totalWinningAmount(value: BigInt) {
    this.set("totalWinningAmount", Value.fromBigInt(value));
  }
}