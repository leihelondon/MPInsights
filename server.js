var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

// http://stackoverflow.com/questions/5710358/how-to-get-post-a-query-in-express-js-node-js
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.PORT || 3000));

// app.get('/evaluate_mp_using_text', function (req, res) {
//   res.send('Send an AJAX request to here with the mp details, make request to watson, return data for display in your page');
// });

app.post('/evaluate_mp_using_text', function (req, res) {
	// console.log(req);
	speechText = req.body.speech.replace(/[^a-zA-Z \.]/g, '')

	// res.send({"id":"*UNKNOWN*","source":"*UNKNOWN*","word_count":6425,"processed_lang":"en","tree":{"id":"r","name":"root","children":[{"id":"personality","name":"Big 5","children":[{"id":"Openness_parent","name":"Openness","category":"personality","percentage":0.9586024251236387,"children":[{"id":"Openness","name":"Openness","category":"personality","percentage":0.9586024251236387,"sampling_error":0.050637905000000004,"children":[{"id":"Adventurousness","name":"Adventurousness","category":"personality","percentage":0.8882058434340548,"sampling_error":0.044719061},{"id":"Artistic interests","name":"Artistic interests","category":"personality","percentage":0.6326728755726256,"sampling_error":0.091437453},{"id":"Emotionality","name":"Emotionality","category":"personality","percentage":0.22615097850083807,"sampling_error":0.041646747},{"id":"Imagination","name":"Imagination","category":"personality","percentage":0.9001489289430208,"sampling_error":0.055472326},{"id":"Intellect","name":"Intellect","category":"personality","percentage":0.9606598422288001,"sampling_error":0.048174446},{"id":"Liberalism","name":"Authority-challenging","category":"personality","percentage":0.8853092366082402,"sampling_error":0.074145222}]},{"id":"Conscientiousness","name":"Conscientiousness","category":"personality","percentage":0.7726339915093782,"sampling_error":0.064476437,"children":[{"id":"Achievement striving","name":"Achievement striving","category":"personality","percentage":0.749567717446085,"sampling_error":0.087127958},{"id":"Cautiousness","name":"Cautiousness","category":"personality","percentage":0.9172622098595674,"sampling_error":0.08127952000000001},{"id":"Dutifulness","name":"Dutifulness","category":"personality","percentage":0.46842777375836914,"sampling_error":0.053495305},{"id":"Orderliness","name":"Orderliness","category":"personality","percentage":0.21117928855973334,"sampling_error":0.061595378},{"id":"Self-discipline","name":"Self-discipline","category":"personality","percentage":0.44292967766394814,"sampling_error":0.04184677},{"id":"Self-efficacy","name":"Self-efficacy","category":"personality","percentage":0.9315628668853669,"sampling_error":0.080373369}]},{"id":"Extraversion","name":"Extraversion","category":"personality","percentage":0.23727022543636453,"sampling_error":0.048595293,"children":[{"id":"Activity level","name":"Activity level","category":"personality","percentage":0.3942877507744483,"sampling_error":0.067482122},{"id":"Assertiveness","name":"Assertiveness","category":"personality","percentage":0.21328663449334317,"sampling_error":0.071738531},{"id":"Cheerfulness","name":"Cheerfulness","category":"personality","percentage":0.14181458903650418,"sampling_error":0.090239078},{"id":"Excitement-seeking","name":"Excitement-seeking","category":"personality","percentage":0.026489809678771306,"sampling_error":0.073658152},{"id":"Friendliness","name":"Outgoing","category":"personality","percentage":0.5530068303377043,"sampling_error":0.066302187},{"id":"Gregariousness","name":"Gregariousness","category":"personality","percentage":0.09490499543248972,"sampling_error":0.051430166}]},{"id":"Agreeableness","name":"Agreeableness","category":"personality","percentage":0.3877428014755124,"sampling_error":0.085938345,"children":[{"id":"Altruism","name":"Altruism","category":"personality","percentage":0.7997699988210496,"sampling_error":0.061727562},{"id":"Cooperation","name":"Cooperation","category":"personality","percentage":0.7603417287681214,"sampling_error":0.071745001},{"id":"Modesty","name":"Modesty","category":"personality","percentage":0.0597049086724457,"sampling_error":0.04736494},{"id":"Morality","name":"Uncompromising","category":"personality","percentage":0.3333422467056141,"sampling_error":0.055091559},{"id":"Sympathy","name":"Sympathy","category":"personality","percentage":1,"sampling_error":0.085676909},{"id":"Trust","name":"Trust","category":"personality","percentage":0.537814822560826,"sampling_error":0.048219743999999995}]},{"id":"Neuroticism","name":"Emotional range","category":"personality","percentage":0.2829836679837573,"sampling_error":0.078271666,"children":[{"id":"Anger","name":"Fiery","category":"personality","percentage":0.358176633834669,"sampling_error":0.082130659},{"id":"Anxiety","name":"Prone to worry","category":"personality","percentage":0.1889163812446847,"sampling_error":0.047225482000000006},{"id":"Depression","name":"Melancholy","category":"personality","percentage":0.13153425667827015,"sampling_error":0.049240736},{"id":"Immoderation","name":"Immoderation","category":"personality","percentage":0.017020870630389963,"sampling_error":0.04650725},{"id":"Self-consciousness","name":"Self-consciousness","category":"personality","percentage":0.060656986462370444,"sampling_error":0.048444797},{"id":"Vulnerability","name":"Susceptible to stress","category":"personality","percentage":0.13046539679191668,"sampling_error":0.07386084799999999}]}]}]},{"id":"needs","name":"Needs","children":[{"id":"Challenge_parent","name":"Challenge","category":"needs","percentage":0.8288776199449239,"children":[{"id":"Challenge","name":"Challenge","category":"needs","percentage":0.8288776199449239,"sampling_error":0.072607784},{"id":"Closeness","name":"Closeness","category":"needs","percentage":0.3379055532527016,"sampling_error":0.07197550900000001},{"id":"Curiosity","name":"Curiosity","category":"needs","percentage":0.2168373636496319,"sampling_error":0.10177001499999999},{"id":"Excitement","name":"Excitement","category":"needs","percentage":0.22347872368404706,"sampling_error":0.091805005},{"id":"Harmony","name":"Harmony","category":"needs","percentage":0.4686344353583311,"sampling_error":0.091410804},{"id":"Ideal","name":"Ideal","category":"needs","percentage":0.2298750188611943,"sampling_error":0.082866024},{"id":"Liberty","name":"Liberty","category":"needs","percentage":0.2585125872632414,"sampling_error":0.123836365},{"id":"Love","name":"Love","category":"needs","percentage":0.5650273512517702,"sampling_error":0.083878381},{"id":"Practicality","name":"Practicality","category":"needs","percentage":0.41230497641178704,"sampling_error":0.074101074},{"id":"Self-expression","name":"Self-expression","category":"needs","percentage":0.23293802095978172,"sampling_error":0.07105512900000001},{"id":"Stability","name":"Stability","category":"needs","percentage":0.4681802743117877,"sampling_error":0.090730936},{"id":"Structure","name":"Structure","category":"needs","percentage":0.5043799467599048,"sampling_error":0.068740466}]}]},{"id":"values","name":"Values","children":[{"id":"Self-transcendence_parent","name":"Self-transcendence","category":"values","percentage":1,"children":[{"id":"Conservation","name":"Conservation","category":"values","percentage":0.00977901465761633,"sampling_error":0.062573954},{"id":"Openness to change","name":"Openness to change","category":"values","percentage":0.9791356964797469,"sampling_error":0.056723324},{"id":"Hedonism","name":"Hedonism","category":"values","percentage":0.08915353475922713,"sampling_error":0.113701325},{"id":"Self-enhancement","name":"Self-enhancement","category":"values","percentage":0.1851061617428207,"sampling_error":0.08729975200000001},{"id":"Self-transcendence","name":"Self-transcendence","category":"values","percentage":1,"sampling_error":0.065700894}]}]}]}})
	
	var personality_insights = watson.personality_insights({
	username: '151ac950-28b3-4bf0-b78d-a4f8cd3d5834',
	password: 'iGQ0mUSdK39c',
	version: 'v2'
	});

	personality_insights.profile({ text: speechText },
	function (err, profile) {
	  if (err)
	    res.send(profile);
	  else
		res.send(profile);
	});
	

});

app.use('/home', express.static('public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

