# Test des différentes fonctionnalités du contrat de vote

> Je teste les fonctions dans l'ordre du processus de vote

## Test de l'enregistrement d'un électeur à la liste de blanche (addAddressWhitelist)

- On vérifie que l'on renvoie bien une erreur :

  1. Si l'utilisateur qui ajoute un electeur n'est pas le propriétaire du contract.

  2. Si le workflow statut n'est pas le bon.

  3. Si l'on essaie d'ajouter 2 fois le même élécteur.

- On vérifie que :

  4. l'ajout d'un utilisateur fonctionne bien.

  5. l'événement VoterRegistered est bien envoyé.

```javascript
describe("the addition of a voter to the white list by the contract administrator", function () {
  //1
  it("should not add a voter to the white list, if sender is not owner", async function () {});
  //2
  it("should not add a voter to the white list, if initial workflowStatus is not RegisteringVoters", async function () {});
  //3
  it("should not add the same voter in the white list", async function () {});
  //4
  it("should add a voter to the white list", async function () {});
  //5
  it("should verify emit event VoterRegistered", async function () {});
});
```

## Test du lancement de la session d'enregistrement des propositions

- On vérifie que l'on renvoie bien une erreur :

  1. Si ce n'est pas le propriétaire du contract qui démarre l'enregistrement.

- On vérifie que :

  2. L'on initialise bien le workflowStatus a ProposalsRegistrationStarted.

  3. L'on émet bien l'événement WorkflowStatusChange avec les bons paramètres.

```Javascript
 describe("start recording proposals", function () {
   //1
   it("should not start recording proposals, if sender is not owner", async function () {});

   //2
   it("should have initial workflow status equal to RegisteringVoters and change to ProposalsRegistrationStarted", async function () {});

   //3
   it("should verify emit event WorkflowStatusChange", async function () {});
 });
```

### Remarques :

Une fois ce test validé, je testerais toutes les fonctions d'initialisation de session via un forEach.(stopRecordingProposals,startsVotingSession,stopVotingSession),

Exemple :

```javascript
describe('add()', function() {
 const tests = [
   {args: [1, 2], expected: 3},
   {args: [1, 2, 3], expected: 6},
   {args: [1, 2, 3, 4], expected: 10}
 ];
 tests.forEach(({args, expected}) => {
   it(`correctly adds ${args.length} args`, function() {
     const res = add(args);
     assert.strictEqual(res, expected);
   });
 });

```

## Test de l'ajout des propositions par les élécteurs

- On vérifie que cela renvoie bien un erreur :

  1. Si l'utilisateur n'est pas dans la liste blanche.
  2. Si la session d'enregistrement n'a pas démarrer.

- On vérifie que :

  3.  L'ajout de proposition et que l'événement est bien émit.
