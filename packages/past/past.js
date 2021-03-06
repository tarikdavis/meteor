// This file is used to set up aliases and methods to preserve backwards
// compatibility on some deprecated methods.  Care should be taken when
// adding aliases and methods that the target will not be undefined, as
// the past package is loaded early.  In some cases, it may be best to
// define the alias in the package it refers to.

// Old under_score version of camelCase public API names.
Meteor.is_client = Meteor.isClient;
Meteor.is_server = Meteor.isServer;

// See also the "this.is_simulation" assignment in livedata/livedata_common.js
// and the retry_count and retry_time fields of self.current_status in
// stream/stream_client.js.


// We used to require a special "autosubscribe" call to reactively subscribe to
// things. Now, it works with autorun.
Meteor.autosubscribe = Deps.autorun;

// "new deps" back-compat
Meteor.flush = Deps.flush;
Meteor.autorun = Deps.autorun;

// Deps API that briefly existed in 0.5.9
Deps.depend = function (d) {
  return d.depend();
};

// Instead of the "random" package with Random.id(), we used to have this
// Meteor.uuid() implementing the RFC 4122 v4 UUID.
Meteor.uuid = function () {
  var HEX_DIGITS = "0123456789abcdef";
  var s = [];
  for (var i = 0; i < 36; i++) {
    s[i] = Random.choice(HEX_DIGITS);
  }
  s[14] = "4";
  s[19] = HEX_DIGITS.substr((parseInt(s[19],16) & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
};
