import hashService from "../service/hashService.js";
import User from "../models/User.js";

class UserController {
  async registration(req, res) {
  try {
    const { name, lastName, phoneNumber, email, password } = req.body;
    console.log(name);

    const hashPassword = await hashService.hashPassword(password);

    const user = await User.create({
      name,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
    });
    res.status(200).json("Регистрация прошла успешно");
  } catch (error) {
    console.log("регистрация не прошла"+ error);
    
  }
  }
  async login(req, res){
    try {
      const{email, password}= req.body

      const user = await User.findOne({email})// User модель который мы ранее создали
      console.log(user);
      if(!user){// если не нашел юзера
       return res.status(400).json("неверный логин или пароль")
      }
      const isPassValid= await hashService.comparePassword(password, user.password) //пароль юзера и  зашифроаный пароль 
      if(!isPassValid){
      return  res.status(400).json("неверный логин или пароль")
      }
      return res.json(user)
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"ошибка при авторизации"})
      
    }
  }
}

export default new UserController();
