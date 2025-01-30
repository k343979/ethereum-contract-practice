// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;
    mapping(address => bool) private blackList;

    event MintEvent(address indexed to, uint256 indexed amount);
    event AddedToBlacklist(address indexed account);
    event RemovedFromBlacklist(address indexed account);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint initialSupply) ERC20("Token", "WDT") {
        owner = msg.sender;
        _mint(owner, initialSupply);
    }

    function Mint(address _to, uint _amount) public {
        _mint(_to, _amount);
        emit MintEvent(_to, _amount);
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        require(!blackList[_msgSender()], "You are blacklisted");
        require(!blackList[recipient], "Recipient is blacklisted");

        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    // ブラックリストにアドレスを追加
    function addToBlackList(address _account) public onlyOwner {
        blackList[_account] = true;
        emit AddedToBlacklist(_account);
    }

    // ブラックリストからアドレスを削除
    function removeFromBlackList(address _account) public onlyOwner {
        blackList[_account] = false;
        emit RemovedFromBlacklist(_account);
    }

    // ブラックリストの状態を確認
    function isBlackListed(address _account) public view returns (bool) {
        return blackList[_account];
    }
}
