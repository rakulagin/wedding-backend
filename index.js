import express from 'express'
import mongoose from "mongoose";
import multer from 'multer'
import cors from 'cors'
import UserModel from './models/User.js'

mongoose
  .connect('mongodb+srv://admin:wwwwww@cluster0.gmwgiyd.mongodb.net/wedding?retryWrites=true&w=majority')
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error: ', err))

const app = express()
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (_, __, callBack)=>{
    callBack(null, 'uploads')
  },
  filename: (_, file, callBack)=> {
    callBack(null, file.originalname)
  }
})

const upload = multer({storage})

app.get('/', (req,res) => {
  // return 'okk'
  res.send('rree')
})

//для занесения в БД
app.post('/auth/register', async (req, res) => {
  try {
    const doc = new UserModel({
      firstName: req.body.firstName,
      surName: req.body.surName,
      nickname: req.body.nickname,
      img: req.body.img,
      accept: req.body.accept,
      answered: req.body.answered,
      pair: req.body.pair,
      place: req.body.place,
      car: req.body.car,
      vine: req.body.vine,
      spirit: req.body.spirit,
      secondDay: req.body.secondDay,
    })

    const user = await doc.save()

    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось создать пользователя'
    })
  }
})

//поиск пользователя
app.post('/find', async (req, res) => {
  try {
    const firstName = req.body.firstName.trim();
    const surName = req.body.surName.trim();

    const user = await UserModel.findOne({
      firstName: { $regex: new RegExp('^' + firstName, 'i') },
      surName: { $regex: new RegExp('^' + surName, 'i') }
    });

    if (!user) {
      // return res.status(404).json({
      //   message: 'Пользователь не найден',
      // })
      return res.json(
        {message: 'Пользователь не найден'}
      )
    }

    res.json(user)
    console.log(user)
  } catch (err) {
    console.log(err)
    res.status(403).json({
      message: 'Не удалось подключиться'
    })
  }
})

//обновление данных пользователя
app.patch('/update/:id', async (req,res) => {
  try {
    const userId = req.params.id

    const updatedUser = await UserModel.findByIdAndUpdate({
      _id: userId,
    },
      {
        accept: req.body.accept,
        place: req.body.place,
        car: req.body.car,
        vine: req.body.vine,
        spirit: req.body.spirit,
        secondDay: req.body.secondDay,
        answered: req.body.answered,
      },
      {new: true}
    )

    // res.json({
    //   success: true
    // })
    res.json(updatedUser)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось обновить данные опроса'
    })
  }
})

//загрузка картинок
app.post('/upload', upload.single('image'), (req,res)=>{
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

//получаем всех пользователей
app.get('/users', async(req, res) => {
  try {
    const users = await UserModel.find()
    res.json(users)
  } catch (err) {
    res.json(err)
  }
})



app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('server OK')
})