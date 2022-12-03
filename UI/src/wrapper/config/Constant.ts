class Constant {
  chainID = '0x13881';
  get rpcURL(): string {
    return 'https://rpc-mumbai.maticvigil.com/';
  }

  get dataQuestcontract(): string {
    return '0x226082F16820F78ceE3bED4F9363084e695742f2';
  }

  get maticTokenAddress(): string {
    return '0x0000000000000000000000000000000000001010';
  }
}

export default new Constant();
