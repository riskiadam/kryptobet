export default {
  mainWallet: state => {
    let mainWallet = state.walletList.find(x => x.code === "Main");
    return mainWallet;
  }
};