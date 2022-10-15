// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract tf {
    uint256 index = 0;

    struct Item {
        uint256 id;
        uint256 timestamp;
        string name;
        string item_type;
        string img_url;
        address owner;
    }

    mapping(uint256 => Item) items;

    function store(string memory _name, string memory _type, string memory _url, address owner)  public  { 
        Item memory new_item = Item(index, block.timestamp, _name, _type, _url, owner);
        items[index] = new_item;
        index += 1;
    }
    function retrieve() public view returns (Item[] memory){
        Item[] memory item_list = new Item[](index + 1);
        for (uint i = 0; i < index + 1; i++) {
            item_list[i] = items[i];
    }
        return item_list;
    }
    
    uint256 number;
    


   
}

