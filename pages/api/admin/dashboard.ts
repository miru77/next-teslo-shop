import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
    numberOfOrders:number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsWithNoInventory: number;
    lowInventiry: number
}

 const handler =  async(req: NextApiRequest, res: NextApiResponse<Data>) => {



    await db.connect();
    /*
    const numberOfOrdersData = await Order.count();
    const paidOrdersData = await Order.find({isPaid:'true'}).count();
    const numberOfClientsData = await User.find({role:'client'}).count();
    const numberOfProductsData = await Product.count();
    const productsWithNoInventoryData = await Product.find({inStock:0}).count();
    const lowInventiryData = await Product.find({inStock:  { $lte: 10 }  }).count();
    await db.disconnect() */

    const [numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventiry] = await Promise.all([
        Order.count(),
        Order.find({isPaid:'true'}).count(),
        User.find({role:'client'}).count(),
        Product.count(),
        Product.find({inStock:0}).count(),
        Product.find({inStock:  { $lte: 10 }  }).count(),
    ])
    
     res.status(200).json({ 
       
            numberOfOrders,
            paidOrders,
            numberOfClients,
            numberOfProducts,
            productsWithNoInventory,
            lowInventiry,
            notPaidOrders: numberOfOrders - paidOrders,
        
     })
}

export default handler;