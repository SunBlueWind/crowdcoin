pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(string title, uint minimum) public {
        deployedCampaigns.push(
            new Campaign(title, minimum, msg.sender)
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
    
    string public title;
    uint public minimumContribution;
    address public manager;
    uint public contributorsCount;
    mapping(address => bool) public contributors;
    Request[] public requests;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(string campaignTitle, uint minimum, address creator) public {
        title = campaignTitle;
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(contributors[msg.sender]);
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
        require(request.approversCount > contributorsCount / 2);
        
        request.recipient.transfer(request.amount);
        request.completed = true;
    }

    function getSummary() public view returns (
        string, uint, address, uint, uint, uint
    ) {
        return (
            title,
            minimumContribution,
            manager,
            this.balance,
            contributorsCount,
            requests.length
        );
    }
}
