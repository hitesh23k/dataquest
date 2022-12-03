class Constant {
  chainID = '0x13881';
  get rpcURL(): string {
    return 'https://rpc-mumbai.maticvigil.com/';
  }

  get dataQuestcontract(): string {
    return '0x6486B69F11a20a3Af3fc5BCc84D1F6C80645FA10';
  }

  get maticTokenAddress(): string {
    return '0x0000000000000000000000000000000000001010';
  }
}

export default new Constant();
