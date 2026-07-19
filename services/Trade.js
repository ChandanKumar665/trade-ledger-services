const dotenv = require('dotenv')
dotenv.config()
const { client, ObjectId } = require('./db')
const TradeModel = require('../models/TradeModel')
const dates = { createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString() }

class Trade {
    constructor() {
        this.db = client.db(process.env.DB)
        this.collection = this.db.collection('trades');
    }

    async create(input) {
        const trade = new TradeModel(input);
        const res = await trade.save();
        return res
    }
    async details(input) {
        const { trade_id } = input
        const res = await TradeModel.findOne({ _id: new ObjectId(trade_id) });
        return res
    }
    async getList(input) {
        const { user_id, account_id, filter } = input
        const end = new Date(filter?.end);
        end?.setUTCDate(end?.getUTCDate() + 1);
        const filterQuery = filter?.start && filter?.end ? {
            open_time: {
                $gte: filter.start,
                $lt: end?.toISOString().split('T')[0]
            }
        } : {}
        const res = await TradeModel.aggregate(
            [
                { $match: { user_id, account_id, ...filterQuery } },
                {
                    $addFields: {
                        accountIdObj: {
                            $toObjectId: "$account_id"
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'accounts',
                        localField: 'accountIdObj',
                        foreignField: '_id',
                        pipeline: [
                            {
                                $project: {
                                    _id: 0,
                                    curr: 1
                                }
                            }
                        ],
                        as: 'curr'
                    }
                },
                {
                    $project: {
                        createdAt: 0,
                        updatedAt: 0
                    }
                }
            ]
        )
            .sort({ open_time: -1 });
        return res
    }

    async getTradeStats(input) {
        const { user_id, account_id, filter } = input
        const end = new Date(filter?.end);
        end?.setUTCDate(end?.getUTCDate() + 1);
        const filterQuery = filter?.start && filter?.end ? {
            open_time: {
                $gte: filter.start,
                $lt: end.toISOString().split('T')[0]
            }
        } : {}
        const res = await TradeModel.aggregate([
            {
                $match: {
                    user_id,
                    account_id,
                    ...filterQuery
                }
            },
            {
                $addFields: {
                    accountIdObj: {
                        $toObjectId: "$account_id"
                    }
                }
            },
            {
                $lookup: {
                    from: "accounts",
                    localField: "accountIdObj",
                    foreignField: "_id",
                    as: "account"
                }
            },
            {
                $unwind: "$account"
            },
            {
                $sort: {
                    open_time: 1
                }
            },
            {
                $setWindowFields: {
                    sortBy: {
                        open_time: 1
                    },
                    output: {
                        cumulativePnl: {
                            $sum: "$pnl",
                            window: {
                                documents: ["unbounded", "current"]
                            }
                        }
                    }
                }
            },
            {
                $addFields: {
                    initial_cap: "$account.initial_cap",
                    total: {
                        $add: [
                            "$account.initial_cap",
                            "$cumulativePnl"
                        ]
                    }
                }
            },
            {
                $project: {
                    open_time: 1,
                    close_time: 1,
                    pnl: 1,
                    cumulativePnl: 1,
                    initial_cap: 1,
                    total: 1,
                }
            }
        ]);
        return res
    }

    async deleteTrade(input) {
        const { user_id, account_id, trade_id } = input
        const res = await TradeModel.findOneAndDelete({ _id: new ObjectId(trade_id), user_id, account_id });
        return res
    }
    async update(input) {
        const { user_id, account_id, trade_id,
            symbol, order_type, desc, open_time, close_time, entry_price, exit_price, qty, pnl, charges
        } = input
        const res = await TradeModel.findOneAndUpdate({ _id: new ObjectId(trade_id), user_id, account_id }, { symbol, order_type, desc, open_time, close_time, entry_price, exit_price, qty, pnl, charges });
        return res
    }
}
module.exports = Trade