import "@therootnetwork/api-types"; // optional, for Typescript support
import { ApiPromise } from "@polkadot/api";
import { getApiOptions, getPublicProvider } from "@therootnetwork/api";
import { Router } from 'express';
import BigNumber from "bignumber.js";

const TESTNET = false;
const provider = TESTNET ? 'porcini' : 'root'
const router = Router();

//http://localhost:3000/root/0xFfFfFfFF00000000000000000000000000036667
//http://localhost:3000/root/0xb0D22647C3545f863819248195815Da8841B59E5
router.get('/:address', async (req, res) => {
    const address = req.params.address;
    const api = await ApiPromise.create({
        ...getApiOptions(),
        ...getPublicProvider(provider),
    });
    const decimal = 1e6
    const activeEra = await api.query.staking.activeEra();
    const exposures = await api.query.staking.erasStakers.entries(activeEra.unwrap().index);
    const validator = exposures.find(([key]) => key.toHuman()[1] == address)
    res.send(JSON.stringify({
        address: validator[0].toHuman()[1],
        totalStaked: BigNumber(validator[1].total.toNumber()).div(decimal).toFixed(),
        totalUser: validator[1].others.length
    }));

});

export default router;