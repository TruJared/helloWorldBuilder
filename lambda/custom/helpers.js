const getSessionData = (handlerInput) => {
  const attributes = handlerInput.attributesManager.getSessionAttributes();

  if (!attributes.counter) {
    attributes.counter = 0;
  }
  attributes.counter += 1;
  attributes.lastPhrase = handlerInput.requestEnvelope.request.intent.slots.phrase.value;
  handlerInput.attributesManager.setSessionAttributes(attributes);
};

module.exports = { getSessionData };
