const { BN, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const Voting = artifacts.require("Voting");

contract("Voting", function (accounts) {
  const owner = accounts[0];
  const voter = accounts[1];
  const voter2 = accounts[2];

  //Enum Test
  const RegisteringVoters = new BN(0);
  const ProposalsRegistrationStarted = new BN(1);
  const ProposalsRegistrationEnded = new BN(2);
  const VotingSessionStarted = new BN(3);
  const VotingSessionEnded = new BN(4);
  const VotesTallied = new BN(5);

  beforeEach(async function () {
    this.VotingInstance = await Voting.new({ from: owner });
    this.initialWorkflowStatus =
      await this.VotingInstance.defaultWorkflowStatus();
  });

  //Test //addAddressWhitelist
  describe("the addition of a voter to the white list by the contract administrator", function () {
    //1
    it("should not add a voter to the white list, if sender is not owner", async function () {
      await expectRevert(
        this.VotingInstance.addAddressWhitelist(voter2, { from: voter }),
        "caller is not the owner."
      );
    });
    //2
    it("should not add a voter to the white list, if initial workflowStatus is not RegisteringVoters", async function () {
      await this.VotingInstance.startsRecordingProposals();
      const WorkflowStatus = await this.VotingInstance.defaultWorkflowStatus();
      expect(this.initialWorkflowStatus.words[0]).to.equal(RegisteringVoters);
      expect(WorkflowStatus.words[0]).to.equal(ProposalsRegistrationStarted);
      await expectRevert(
        this.VotingInstance.addAddressWhitelist(voter),
        "The recording session is no longer in progress"
      );
    });
    //3
    it("should not add the same voter in the white list", async function () {
      addFirstVoters = await this.VotingInstance.addAddressWhitelist(voter);
      await expectRevert(
        this.VotingInstance.addAddressWhitelist(voter),
        "This address is already whitelisted"
      );
    });
    //4
    it("should add a voter to the white list", async function () {
      addFirstVoters = await this.VotingInstance.addAddressWhitelist(voter);
      const isWhitelistedVoter = await this.VotingInstance.isWhitelisted(voter);
      const isWhitelistedVoter2 = await this.VotingInstance.isWhitelisted(
        voter2
      );
      //On teste l'ajout d'un electeur valide et non valide
      expect(isWhitelistedVoter["isRegistered"]).to.be.ok;
      expect(isWhitelistedVoter2["isRegistered"]).to.be.equal(
        false,
        "The value is not false"
      );
    });
    //5
    it("should verify emit event VoterRegistered", async function () {
      const addFirstVoters = await this.VotingInstance.addAddressWhitelist(
        voter
      );
      //On teste l'évenement de la fonction
      expectEvent(addFirstVoters, "VoterRegistered", {
        voterAddress: voter,
      });
    });
  });

  //startsRecordingProposals
  describe("start recording proposals", function () {
    //1
    it("should not start recording proposals, if sender is not owner", async function () {
      await expectRevert(
        this.VotingInstance.startsRecordingProposals({ from: voter }),
        "caller is not the owner."
      );
    });

    //2
    it("should have initial workflow status equal to RegisteringVoters and change to ProposalsRegistrationStarted ", async function () {
      await this.VotingInstance.startsRecordingProposals();
      const WorkflowStatus = await this.VotingInstance.defaultWorkflowStatus();
      expect(this.initialWorkflowStatus.words[0]).to.equal(RegisteringVoters);
      expect(WorkflowStatus.words[0]).to.equal(ProposalsRegistrationStarted);
    });

    //3
    it("should verify emit event WorkflowStatusChange", async function () {
      const startsRecordingProposals =
        await this.VotingInstance.startsRecordingProposals();
      expectEvent(startsRecordingProposals, "WorkflowStatusChange", {
        previousStatus: RegisteringVoters,
        newStatus: ProposalsRegistrationStarted,
      });
    });
  });

  //usersAddProposal()
  describe("should add proposals by voters", function () {
    beforeEach(async function () {
      this.description = "Propostion 1";
    });

    //1
    it("should not add proposals, if sender is not in white list", async function () {
      await expectRevert(
        this.VotingInstance.userAddProposal(this.description, {
          from: voter2,
        }),
        "Users is not in white list"
      );
    });

    //2
    it("should not add proposals, if the proposal crunching session hasn't started yet", async function () {
      await this.VotingInstance.addAddressWhitelist(voter);
      await expectRevert(
        this.VotingInstance.userAddProposal(this.description, {
          from: voter,
        }),
        "The proposal crunching session hasn't started yet, please don't be in a hurry !"
      );
    });

    //3
    it.only("should add proposals and emit event ProposalRegistered", async function () {
      await this.VotingInstance.addAddressWhitelist(voter);
      await this.VotingInstance.startsRecordingProposals();
      const addProposal = await this.VotingInstance.userAddProposal(
        this.description,
        {
          from: voter,
        }
      );
      let proposals = [];
      proposals.push(this.description);
      const proposalId = new BN(proposals.length - 1);
      expectEvent(addProposal, "ProposalRegistered", {
        proposalId: proposalId,
      });
    });
  });
});
