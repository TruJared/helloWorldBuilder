const Alexa = require('ask-sdk-core');

const REPROMPT_TEXT = 'This is the reprompt text';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Hello World Builder. This is a skill devised to train new concepts to Jared. For now just simply ask me to "Say a phrase", for example you can say; "Say the phrase, I love bacon"';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(REPROMPT_TEXT)
      .getResponse();
  },
};

const SpeakPhraseIntentHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'SpeakPhraseIntent';
  },
  handle(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const phrase = handlerInput.requestEnvelope.request.intent.slots.phrase.value;
    const speechText = 'Hello my name is Alexa and my favorite phrase is';

    // console.dir(allSlots.phrase.value, {
    //   depth: null,
    //   colors: true,
    // });

    console.dir(attributes, {
      depth: null,
      colors: true,
    });

    console.dir(phrase, {
      depth: null,
      colors: true,
    });

    return handlerInput.responseBuilder
      .speak(
        `${speechText} ${phrase}, if you would like to try another just tell me to say another phrase, you can try saying, Say I love eggs too. Or else say exit to quit.`,
      )
      .withSimpleCard(`I said the phrase ${phrase}`)
      .reprompt(REPROMPT_TEXT)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speechText = 'lorem ipsum';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('thanks for playing')
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(
        '<say-as interpret-as="interjection">Great scott</say-as>, something has gone <say-as interpret-as="expletive">terribly</say-as> wrong, please repeat what you just said.',
      )
      .reprompt(
        '<say-as interpret-as="interjection">Great scott</say-as>, something has gone <say-as interpret-as="expletive">terribly</say-as> wrong, please repeat what you just said.',
      )
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SpeakPhraseIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
