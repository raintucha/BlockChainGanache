// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
