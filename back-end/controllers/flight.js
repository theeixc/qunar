import mongoose, { trusted } from 'mongoose'
import Flight from '../models/flight.js'
import moment from 'moment'

// 获取航班列表
export const getFlights = async (req, res) => {

  try {
    const { depCity, arrCity, depDate } = req.query;
    const flights = await Flight.find({ depCity, arrCity, depDate })
    res.status(200).json(flights)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getSeveralLowPriceFlights = async (req, res) => {
  try {
    const { depCity, arrCity, depDate } = req.query;
    const dateArr = getNextFiveDay(depDate);
    const flights = await Flight.aggregate([
      { $match: { depCity, arrCity, "depDate": { $in: dateArr } } },
      {
        $group: {
          "_id": "$depDate",
          "price": { $min: "$minPrice" },
        },
      },
      {
        $sort: { "_id": 1 }
      }
    ])

    // 加工数据
    const arr = flights?.map((item, index) => ({ ...item, date: item._id, index, depCity, arrCity }))
    res.status(200).json(arr)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}


export const createFlight = async (req, res) => {
  console.log(1);
  const arr = [
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "09:20",
      depCity: "北京",
      depAirport: "北京大兴",
      depTerminal: "",
      depDate: "2023-06-23",
      depTime: "07:00",
      name: ["吉祥航H0O1254", "空客321(中)"],
      minPrice: 1280,
      discount: 3.9,
      increasing: true,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "13:45",
      depCity: "北京",
      depAirport: "北京大兴",
      depTerminal: "",
      depDate: "2023-06-23",
      depTime: "11:30",
      name: ["吉祥航H0O1254", "空客330(大)"],
      minPrice: 1250,
      discount: 0,
      increasing: false,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T1",
      arrDate: "2023-06-23",
      arrTime: "15:15",
      depCity: "北京",
      depAirport: "首都",
      depTerminal: "T2",
      depDate: "2023-06-23",
      depTime: "13:00",
      name: ["吉祥航H0O1254", "共享东航330"],
      minPrice: 1350,
      discount: 3.9,
      increasing: false,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "11:45",
      depCity: "北京",
      depAirport: "北京大兴",
      depTerminal: "",
      depDate: "2023-06-23",
      depTime: "09:30",
      name: ["空客330(大)", "共享东航330"],
      minPrice: 1880,
      discount: 4.3,
      increasing: false,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "13:45",
      depCity: "北京",
      depAirport: "北京大兴",
      depTerminal: "",
      depDate: "2023-06-23",
      depTime: "11:30",
      name: ["空客330(大)", "共享中联航330"],
      minPrice: 2150,
      discount: 4.9,
      increasing: true,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "14:45",
      depCity: "北京",
      depAirport: "北京大兴",
      depTerminal: "",
      depDate: "2023-06-23",
      depTime: "12:30",
      name: ["空客330(大)", "波音787"],
      minPrice: 1550,
      discount: 4.9,
      increasing: true,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "19:45",
      depCity: "北京",
      depAirport: "首都",
      depTerminal: "T2",
      depDate: "2023-06-23",
      depTime: "17:30",
      name: ["空客330(大)", "吉祥航787"],
      minPrice: 1550,
      discount: 5.9,
      increasing: true,
    },
    {
      arrCity: "上海",
      arrAirport: "虹桥",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "15:55",
      depCity: "北京",
      depAirport: "首都",
      depTerminal: "T2",
      depDate: "2023-06-23",
      depTime: "13:40",
      name: ["空客330(大)", "空客321"],
      minPrice: 1080,
      discount: 4.9,
      increasing: false,
    },
    {
      arrCity: "上海",
      arrAirport: "虹桥",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "12:45",
      depCity: "北京",
      depAirport: "首都",
      depTerminal: "T2",
      depDate: "2023-06-23",
      depTime: "10:30",
      name: ["空客330(大)", "东航321"],
      minPrice: 1080,
      discount: 7.3,
      increasing: true,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T1",
      arrDate: "2023-06-23",
      arrTime: "13:00",
      depCity: "北京",
      depAirport: "北京",
      depTerminal: "大兴",
      depDate: "2023-06-23",
      depTime: "10:45",
      name: ["南航330(大)", "东航321"],
      minPrice: 1080,
      discount: 3.9,
      increasing: false,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "17:55",
      depCity: "北京",
      depAirport: "首都",
      depTerminal: "T3",
      depDate: "2023-06-23",
      depTime: "15:45",
      name: ["南航330(大)", "共享东航321"],
      minPrice: 1680,
      discount: 5.4,
      increasing: false,
    },
    {
      arrCity: "上海",
      arrAirport: "浦东",
      arrTerminal: "T2",
      arrDate: "2023-06-23",
      arrTime: "23:20",
      depCity: "北京",
      depAirport: "首都",
      depTerminal: "T2",
      depDate: "2023-06-23",
      depTime: "21:15",
      name: ["南航330(大)", "波音737"],
      minPrice: 1080,
      discount: 3.9,
      increasing: true,
    },
  ]

  try {
    arr.forEach(async (item) => {
      const newFlight = new Flight(item);
      await newFlight.save();
    })

    console.log(2);
    res.status(201).json(arr);
  } catch (error) {
    res.status(409).json({ message: error.message });

  }
}

// 获取下一天的5天
function getNextFiveDay(depDate) {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(moment(depDate).add(i, 'days').format('YYYY-MM-DD'))
  }
  return arr;
}