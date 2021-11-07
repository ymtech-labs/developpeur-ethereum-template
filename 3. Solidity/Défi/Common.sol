pragma solidity 0.8.9;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Common is Ownable{
    
    mapping(address => Voter) whitelist;
    
    //Status du workflows;
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    
    //On initialise une variable defaultWorkflowStatus pour utliser l'enum
    WorkflowStatus public defaultWorkflowStatus = WorkflowStatus.RegisteringVoters;
    
            
    modifier onlyVotingSessionIsStarted() {
         require(
            defaultWorkflowStatus == WorkflowStatus.VotingSessionStarted, 
            "There is no vote in progress"
        );
        _;
    }
    
    //On créer un struct(objet) pour définir un proposition d'un utlisateur
    struct Proposal {
        string description;
        uint voteCount;
    }
    
    //On stocke les différentes propositions dans un tableau
    Proposal[] public proposals;
    
    //On créer un struct(objet) pour définir un élécteur   
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
    
    //On stocke les élécteurs dans un tableau
    Voter[] public voters;
     
    //id de la proposition gagnante
    uint winningProposalId; 
    
    //évenement à renvoyer lorsqu'un utlisateur a voter
    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

}