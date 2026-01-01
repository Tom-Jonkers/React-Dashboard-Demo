import { Call, Channel } from "../models/call";
import "./Components.css"

export default function ChannelDist({calls : remoteCalls} : {calls : Call[] | null}) {

  let pctVoice = 0;
  let pctChat = 0;
  let pctEmail = 0;

  if (remoteCalls != null && remoteCalls.length > 0)
  {
  let numberOfVoice = remoteCalls.filter(call => call.channel === Channel.Voice).length ;
  let numberOfChat = remoteCalls.filter(call => call.channel === Channel.Chat).length ;
  let numberOfEmail = remoteCalls.filter(call => call.channel === Channel.Email).length ;

  let total = Math.max(1, numberOfVoice + numberOfChat + numberOfEmail);
  pctVoice = (numberOfVoice / total) * 100;
  pctChat = (numberOfChat / total) * 100;
  pctEmail = (numberOfEmail / total) * 100;
  }

  return (
    <div className="CardLook smallContainer">
      <p className="b">Répartition des canaux</p>
      <div className="graphSpace">
        <div className="graph">
          <div className="graphR" style={{ width: `${pctVoice}%` }}>

            {( pctVoice > 5) ? (           
              <p className="percentage">{Math.round(pctVoice)}%</p>
            ) : (<></>)}

          </div>
          <div className="graphB" style={{ width: `${pctChat}%` }}>

            {( pctChat > 5) ? (   
            <p className="percentage">{Math.round(pctChat)}%</p>
            ) : (<></>)}

          </div>
          <div className="graphG" style={{ width: `${pctEmail}%` }}>

            {( pctEmail > 5) ? (  
            <p className="percentage">{Math.round(pctEmail)}%</p>
            ) : (<></>)}

          </div>
        </div>
        <div className="valeurs">

          {( pctVoice > 0) ? ( 
          <div className="valElt"> 
            <div className="valR"/><p>Voix</p>
          </div>
          ) : (<></>)}

          {( pctChat > 0) ? ( 
          <div className="valElt">
            <div className="valB"/><p>Chat</p>
          </div>
          ) : (<></>)}

          {( pctEmail > 0) ? ( 
          <div className="valElt">
            <div className="valG"/><p>Email</p>
          </div>
          ) : (<></>)}
          
        </div>
      </div>
    </div>
  );
}