// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ImpactChain {
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        bool isAnonymous;
    }

    struct ImpactReport {
        address reporter;
        string description;
        string imageUrl;
        uint256 timestamp;
        uint256 upvotes;
        uint256 downvotes;
        bool verified;
        bool aiVerified;
    }

    Donation[] public donations;
    ImpactReport[] public impactReports;
    
    // Track who voted on which report
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    // Track total donations
    uint256 public totalDonations;

    event DonationReceived(address indexed donor, uint256 amount, bool isAnonymous);
    event ImpactReported(address indexed reporter, uint256 reportId, string description);
    event ReportVoted(uint256 indexed reportId, address indexed voter, bool isUpvote);
    event ReportVerified(uint256 indexed reportId, bool verified, bool aiVerified);

    function donate(bool _isAnonymous) public payable {
        require(msg.value > 0, "Donation must be greater than zero");
        donations.push(Donation(
            _isAnonymous ? address(0) : msg.sender, 
            msg.value, 
            block.timestamp,
            _isAnonymous
        ));
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value, _isAnonymous);
    }

    function reportImpact(string memory _description, string memory _imageUrl) public {
        uint256 reportId = impactReports.length;
        impactReports.push(ImpactReport(
            msg.sender, 
            _description, 
            _imageUrl, 
            block.timestamp, 
            0, 
            0,
            false,
            false
        ));
        emit ImpactReported(msg.sender, reportId, _description);
    }

    function voteOnReport(uint256 _reportId, bool _isUpvote) public {
        require(_reportId < impactReports.length, "Report does not exist");
        require(!hasVoted[_reportId][msg.sender], "Already voted on this report");
        
        hasVoted[_reportId][msg.sender] = true;
        
        if (_isUpvote) {
            impactReports[_reportId].upvotes++;
        } else {
            impactReports[_reportId].downvotes++;
        }
        
        emit ReportVoted(_reportId, msg.sender, _isUpvote);
    }

    function verifyReport(uint256 _reportId, bool _verified, bool _aiVerified) public {
        require(_reportId < impactReports.length, "Report does not exist");
        impactReports[_reportId].verified = _verified;
        impactReports[_reportId].aiVerified = _aiVerified;
        emit ReportVerified(_reportId, _verified, _aiVerified);
    }

    function getDonations() public view returns (Donation[] memory) {
        return donations;
    }

    function getImpactReports() public view returns (ImpactReport[] memory) {
        return impactReports;
    }

    function getImpactReport(uint256 _reportId) public view returns (ImpactReport memory) {
        require(_reportId < impactReports.length, "Report does not exist");
        return impactReports[_reportId];
    }

    function getTotalDonations() public view returns (uint256) {
        return totalDonations;
    }

    function getReportCount() public view returns (uint256) {
        return impactReports.length;
    }
}