const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: "mongodb+srv://Muttakin Islam:Faluda12@cluster0.xrfwe.mongodb.net/ZAYNAX-TEST-PROJECT?retryWrites=true&w=majority"
}

export default config
