const CONTRACT = "0xd08d000f1ac5d77274dde5cc146664793f990733";
const DECIMALS = 18;
const TOTAL_SUPPLY = 10000;

async function connectWallet() {
    if (window.ethereum) {
        await ethereum.request({ method: 'eth_requestAccounts' });
        alert("Wallet Connected");
    } else alert("Please install MetaMask");
}

async function addToken() {
    try {
        await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: CONTRACT,
                    symbol: 'OLV',
                    decimals: DECIMALS
                }
            }
        });
    } catch (e) { console.log(e); }
}

async function loadStats() {
    try {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT}`);
        const data = await res.json();
        const price = parseFloat(data.pairs[0].priceUsd);
        const mcap = price * TOTAL_SUPPLY;
        document.getElementById("price").innerText = "$" + price.toFixed(4);
        document.getElementById("marketcap").innerText = "$" + Math.floor(mcap);
        document.getElementById("holders").innerText = data.pairs[0].holders || "N/A";
        document.getElementById("staking").innerText = "0.5% daily reward (simulated)";
    } catch(e) {
        console.log(e);
        document.getElementById("price").innerText="N/A";
        document.getElementById("marketcap").innerText="N/A";
        document.getElementById("holders").innerText="N/A";
        document.getElementById("staking").innerText="N/A";
    }
}

function stake() {
    alert("Staking functionality coming soon!");
}

function unstake() {
    alert("Unstake functionality coming soon!");
}

window.addEventListener('load', loadStats);