import { twitterServiceUrl } from "./config";
import sentiment from "sentiment";

export default class TwiterModel {

  getAnalyzedAccountData = twitterHandle =>
    fetch(`${twitterServiceUrl}/${twitterHandle}`)
      .then(response => response.json())
      .then(this._formatRawData)
      .then(this._analyzeFormattedData)
      .then(this._sortAnalyzedData);


	_formatTweet = (tweet) => {
		let { text, entities } = tweet;
		let { user_mentions } = entities;
		let sentiment_data = sentiment(text).comparative;
		let tweet_mentions = user_mentions.map(mentioned => mentioned.screen_name);
		let unformatted_tweet = tweet;

		return [text, sentiment_data, tweet_mentions, unformatted_tweet];
	}

  _formatRawData = last200tweets => new Promise(
		(resolve, reject) => resolve(last200tweets.map(this._formatTweet))
	);

  _analyzeFormattedData = formattedData => new Promise((resolve, reject) => {
    let tweet_analysis = formattedData.reduce(
      (accumulator, currTweet) => {
        let [text, sentiment_data, tweet_mentions] = currTweet;

				tweet_mentions.forEach(mention => {
          if (mention === "realDonaldTrump") return;
          if (!accumulator[mention]) {
            accumulator[mention] = {
              count: 0, total_score: 0, weighted_score: 0
            };
          }
          accumulator[mention].count++;
          accumulator[mention].total_score += sentiment_data;
          let weighted = accumulator[mention].total_score / accumulator[mention].count;
          accumulator[mention].weighted_score = weighted;
        });

        return accumulator;
      },
      {}
    ); // end of .reduce
    resolve({ tweet_analysis, formattedData });
  });

  _sortAnalyzedData = ({ tweet_analysis, formattedData }) => (
		Object
			.keys(tweet_analysis)
			.map(twitterAccount => ({
				name: twitterAccount,
				...tweet_analysis[twitterAccount]
			}))
			.sort((a, b) => b.count - a.count)
	)
}
