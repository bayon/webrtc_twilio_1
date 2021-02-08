
//These are the parameters we get back when we call a serverless function in twilio.
exports.handler = function(context, event, callback){
    const ACCOUNT_SID = context.ACCOUNT_SID;
    const API_KEY = context.API_KEY;
    const API_SECRET = context.API_SECRET;

    const AccessToken = Twilio.jwt.AccessToken;

    const accessToken = new AccessToken(ACCOUNT_SID, API_KEY, API_SECRET);

    accessToken.identity = event.identity;
    const VideoGrant = AccessToken.VideoGrant;
    const videoGrant = new VideoGrant({
        room: event.room
    })
    accessToken.addGrant(videoGrant);

    //create headers to allow cors 
    let response = new Twilio.Response(); 
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST",
        "Access-Control-Allow-Headers": "Content-Type"

    }
    response.setHeaders(headers);
    response.setBody(accessToken.toJwt())
    callback(null, response );
}

 
