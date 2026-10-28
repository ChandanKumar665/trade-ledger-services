const dotenv = require('dotenv')
dotenv.config()
const { ObjectId } = require('./db')
const TradeModel = require('../models/TradeModel');
const AppError = require('../utils/AppError');

class Trade {
    constructor() { }

    async create(input) {
        try {
            const trade = new TradeModel(input);
            const res = await trade.save();
            return res

        } catch (error) {
            if (error.code === 11000) {
                throw new AppError("Transaction ID already exists", 400);
            } else {
                console.error(error);
            }
        }
    }
    async createMany(input = []) {
        try {
            const result = await TradeModel.insertMany(input);
            return result
        } catch (error) {
            throw new AppError(`Insert failed: ${error.message}`, 500)
        }
    }
    async details(input) {
        const { trade_id, user_id } = input
        const res = await TradeModel.findOne({ _id: new ObjectId(trade_id), user_id });
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
        const res = await TradeModel.find({ user_id, account_id, ...filterQuery }).populate('account_id', ['_id', 'curr']).sort({ open_time: -1 });
        return res
    }

    async getTradeStats(input, isCalendarView) {
        const { user_id, account_id, filter } = input

        const end = new Date(filter?.end);
        end?.setUTCDate(end?.getUTCDate() + 1);
        const filterQuery = filter?.start && filter?.end ? {
            open_time: {
                $gte: filter.start,
                $lt: end.toISOString().split('T')[0]
            }
        } : {}
        const groupQuery = !isCalendarView ? {
            $group: {
                _id: {
                    date: { $substrBytes: ["$open_time", 0, 10] },
                },
                daysPnl: {
                    $sum: "$pnl",
                }
            }
        } : {
            $sort: {
                open_time: 1
            }
        }
        const otherFields = isCalendarView ? { symbol: 1, qty: 1, order_type: 1, fees: 1 } : {}
        const res = await TradeModel.aggregate([
            // 1. Filter trades first
            {
                $match: {
                    user_id,
                    account_id,
                    ...filterQuery
                }
            },

            // 2. Group by account and date
            groupQuery,

            // 3. convert accout_id to objectId for lookup
            {
                $addFields: {
                    accountIdObj: {
                        $toObjectId: "$account_id"
                    }
                }
            },

            // 4. Lookup account
            {
                $lookup: {
                    from: "accounts",
                    localField: "accountIdObj",
                    foreignField: "_id",
                    as: "account"
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $setWindowFields: {
                    sortBy: {
                        _id: 1
                    },
                    output: {
                        cumulativePnl: {
                            $sum: !isCalendarView ? "$daysPnl" : "$pnl",
                            window: {
                                documents: ["unbounded", "current"]
                            }
                        }
                    }
                }
            },
            // 5. Format output
            {
                $project: {
                    _id: 0,
                    ...otherFields,
                    // symbol: 1,
                    // qty: 1,
                    // order_type: 1,
                    // entry_price: 1,
                    // exit_price: 1,
                    open_time: !isCalendarView ? "$_id.date" : "$open_time",
                    // close_time: 1,
                    // pnl: 1,
                    // curr: 1,
                    pnl: !isCalendarView ? "$daysPnl" : "$pnl",
                    // initial_cap: 1,
                    total: "$cumulativePnl",
                    // txnid: 1
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

    // async updateScript(input) {
    //     const trades = await TradeModel.find({});
    //     console.log(trades)
    //     // trades.map(async trade => {
    //     //     const x = await trade.updateOne({
    //     //         $set: {
    //     //             txnid: getRandom(),
    //     //         },
    //     //     });
    //     //     console.log('x', x);
    //     // })

    // }
}
module.exports = Trade