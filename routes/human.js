import { Router } from 'express';
import axios from 'axios';
import BigNumber from 'bignumber.js';

const TESTNET = false;
const router = Router();
const URL = TESTNET ? 'https://humans-testnet-api.itrocket.net' : 'https://api.humans.nodestake.org';

//http://localhost:3000/human/humanvaloper1ewpcjgnf99fpa5p4u0s2u0r6g7lvnwfnvrpjtt
router.get('/:address', async (req, res) => {
    const address = req.params.address;
    const decimal = 1e18
    const result = await axios.get(`${URL}/cosmos/staking/v1beta1/validators/${address}/delegations`);
    const totalStaked = result.data?.delegation_responses.reduce((total, item) => BigNumber(total).plus(item.balance.amount).toFixed(), 0)
    res.send(JSON.stringify({
        address,
        totalStaked: BigNumber(totalStaked).div(decimal).toFixed(),
        totalUser: result.data?.delegation_responses?.length
    }));
});

export default router;