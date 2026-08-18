
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const RPC = process.env.SOLANA_RPC || "https://api.mainnet-beta.solana.com";

app.use(express.json());
app.use(express.static("public"));

async function rpc(method, params) {
  const r = await fetch(RPC, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({jsonrpc:"2.0", id:1, method, params})
  });
  if (!r.ok) throw new Error(`RPC HTTP ${r.status}`);
  const data = await r.json();
  if (data.error) throw new Error(data.error.message || "RPC error");
  return data.result;
}

app.get("/api/wallet/:address", async (req, res) => {
  try {
    const address = req.params.address;
    const limit = Math.min(Number(req.query.limit || 12), 25);
    const sigs = await rpc("getSignaturesForAddress", [address, {limit}]);

    const txs = [];
    for (const s of sigs.slice(0, 8)) {
      const tx = await rpc("getTransaction", [
        s.signature,
        {encoding:"jsonParsed", maxSupportedTransactionVersion:0}
      ]);

      txs.push({
        signature: s.signature,
        blockTime: s.blockTime,
        err: s.err,
        slot: s.slot,
        meta: tx?.meta || null,
        transaction: tx?.transaction || null
      });
    }
    res.json({address, transactions: txs});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

app.listen(PORT, () => {
  console.log(`Jeremiah Coin Alerts running on http://localhost:${PORT}`);
});
