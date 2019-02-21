pragma solidity ^0.4.17;

contract CampaignFactor {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        deployedCampaigns.push(
            new Campaign(minimum, msg.sender)
        );
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint amount;
        address recipient;
        bool completed;
        uint approversCount;
        mapping(address => bool) approvers;
    }
    
    uint public minimumContribution;
    address public manager;
    uint public contributorCount;
    mapping(address => bool) public contributor;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        contributor[msg.sender] = true;
        contributorCount++;
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(contributor[msg.sender]);
        require(!request.approvers[msg.sender]);
        
        request.approvers[msg.sender] = true;
        request.approversCount++;
    }
    
    function createRequest(string description, uint amount, address recipient) public restricted {
        require(amount <= this.balance);
        requests.push(Request({
            description: description,
            amount: amount,
            recipient: recipient,
            completed: false,
            approversCount: 0
        }));
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(!request.completed);
        require(request.approversCount > contributorCount / 2);
        
        request.recipient.transfer(request.amount);
        request.completed = true;
    }
}
