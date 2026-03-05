const CONTRACT="0xd08d000f1ac5d77274dde5cc146664793f990733";
const DECIMALS=18;

async function connectWallet(){
  if(window.ethereum){
    await ethereum.request({method:'eth_requestAccounts'});
    alert("Carteira Conectada!");
  } else alert("Instale MetaMask!");
}

async function addToken(){
  try{
    await ethereum.request({
      method:'wallet_watchAsset',
      params:{
        type:'ERC20',
        options:{address:CONTRACT,symbol:'OLV',decimals:DECIMALS}
      }
    });
  }catch(e){console.log(e);}
}