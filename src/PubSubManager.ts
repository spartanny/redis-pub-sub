import { createClient, RedisClientType } from "redis";

export class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    private subscription: Map<string, string[]>;

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscription = new Map();
    }

    static getInstance(): PubSubManager {
        if(!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }


    public userSubscribe(userId: string, topic: string) {
        if(!this.subscription.has(topic)) {
            this.subscription.set(topic, []);
        }

        this.subscription.get(topic)?.push(userId);
        this.redisClient.subscribe(topic, (message) => {
            this.handleMessage(message, topic);
        });
    }

    public userUnSubscribe(userId: string, topic: string) {
        if(this.subscription.has(topic)) {
            const users = this.subscription.get(topic)?.filter((i) => i !== userId)
            this.subscription.set(topic, !users ? [] : users );
        }
    }

    private handleMessage(message: string, topic: string) {
        console.log(message);
        this.subscription.get(topic)?.forEach(user => {
            console.log(`Sending message to subscribed user : ${user}`);
        })
    }


}