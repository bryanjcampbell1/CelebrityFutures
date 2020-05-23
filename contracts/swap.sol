pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Swap {
    IERC20 public tokenA = IERC20(0x8A976Da9aF53B799d8Dd380B3D2d9CEEf8E0A26f);
    IERC20 public tokenB = IERC20(0x9923EF747eB98Ad8d933D620C7F38dE44C953102);

    address public Alice = 0x54ae04FDBE80452B63665b510116510596341916;
    address public Bob   = 0x9BB77e8e0d0A288d6B225E4DE8ec298f90bAf248;

    uint256 exchangeRate = 3;



    function tradeAforB(uint256 amount) public {

    	uint256 amountOfA = amount / exchangeRate;

        tokenA.transferFrom(Alice, msg.sender, amountOfA);
        tokenB.transferFrom(msg.sender, Alice, amount);

        // Ok, now the tokens are transferred successfully, let's do some cool stuff!
        emit YayIReceivedTokens(amountOfA, msg.sender, tokenA.balanceOf(msg.sender));
    }

    event YayIReceivedTokens(uint256 amount, address fromAccount, uint256 totalBalance);
}