window.SubscriptionMachinePLP = {
  uk: {
    subscriptionPrice: {
      en: {
        or: `or`,
        afterPrice: `with Subscription`,
      },
    },
    modalContent: {
      pay: {
        en: function (e) {
          return "Pay now ".concat(e);
        },
      },
      and: {
        en: function (e) {
          return "and then ".concat(e, "/month*");
        },
      },
      credits: {
        en: function (e) {
          return "Those ".concat(
            e,
            " will be converted to Nespresso credits to spend on cofees and accessories"
          );
        },
      },
      free: { en: "Unlimited Free Deliveries" },
      minimum: {
        en: function (e) {
          return "*".concat(e, " months minimum");
        },
      },
    },
  },
};
