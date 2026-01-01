import Alert from "../models/alert";
import "./Components.css"


export default function Alerts({ alerts: remoteAlerts }: { alerts?: any[] | null }) {

  let defaultAlerts: Alert[] = (remoteAlerts ? remoteAlerts : [])

  const alerts = !remoteAlerts || remoteAlerts.length === 0
    ? defaultAlerts
    : remoteAlerts.map(a => (typeof (a as any).toJSON === "function" ? a : Alert.from(a)));


  return (
    <div className="CardLook smallContainer alertContainer">
      <p className="b">Alertes ({alerts.length})</p>
        {alerts.length > 0 ?
      <div className="alertList ScrollZone">
        {alerts.map((item, index) => (
          <div key={index} className="alertBox">
            <p className="emoji">{item.emoji}</p><p>{item.message}</p>
          </div>
        ))}
      </div>
      :
      <div className="noAlerts">
        <p className="l">Aucune alertes présentement</p>
      </div>}
    </div>
  );
}