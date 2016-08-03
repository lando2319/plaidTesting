var plaid = require('plaid');

// Initialize a client
var plaidClient = new plaid.Client('test_id', 'test_secret', plaid.environments.tartan);

// Add a BofA auth user going through question-based MFA
plaidClient.addAuthUser('bofa', {
  username: 'plaid_test',
  password: 'plaid_good',
}, function(err, mfaResponse, response) {
  if (err != null) {
    // Bad request - invalid credentials, account locked, etc.
    console.error(err);
  } else if (mfaResponse != null) {
    plaidClient.stepAuthUser(mfaResponse.access_token, 'tomato', {},
    function(err, mfaRes, response) {
      console.log(response.accounts);
    });
  } else {
    // No MFA required - response body has accounts
    console.log(response.accounts);
  }
});
