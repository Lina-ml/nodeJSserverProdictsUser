import bcrypt from "bcrypt";


class HashService{
    async hashPassword(password){
        try{
            const salt = await bcrypt.genSalt(10)

            const hash = await (await bcrypt.hash(password , salt))// зашифровать hash
            console.log(hash);
            return hash
        }catch(err){
           throw new Error("ошибки при хеширование пароля")
            
        }
    }

    async comparePassword(password, hashPass){
        try {
            return bcrypt.compare(password, hashPass)//hashPass зашифрованый пароль , compare разшифровать

        } catch (error) {
            throw new Error("ошибка при сравнении паролей");
            
        }
    }
}

export default new HashService();