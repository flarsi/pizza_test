import {DBorder} from "../../models/order";
import {Order} from "../../entities/types";

export async function insertOrder (order: Order) {
    try {
        let time= ''
        if(order.finishedTime && order.startTime){
            time = `${new Date(order.finishedTime).getSeconds() - new Date(order.startTime).getSeconds()} seconds`

            order.startTime = new Date(order.startTime).toLocaleString()
            order.finishedTime = new Date(order.finishedTime).toLocaleString()
        }

        const dbOrder = new DBorder({info: order, time})
         return dbOrder.save().then(()=>{console.log(`Saved order ${order.name}`)})
    }catch (e) {
        console.error(e)
    }
}