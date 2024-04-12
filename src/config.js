import { configDotenv } from 'dotenv'

configDotenv()

export default {
    // globals 
    port: process.env.PORT,
    email_user: process.env.EMAIL_USER,
    email_password: process.env.EMAIL_PASSWORD,
    
    // db 
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    
    // auth
    secret_key: process.env.SECRET_KEY,
}