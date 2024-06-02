import { PubSubManager } from "./PubSubManager";


const topic :  string = "TEST-TOPIC";

setInterval(() => {
    PubSubManager.getInstance().userSubscribe(Math.random().toString(), topic);
}, 5000)