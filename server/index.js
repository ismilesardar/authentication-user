/**
 * Date: 03/06/2023
 * Subject: Auth project
 * Auth: Ismile Satdar
**/
const app = require("./app");
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
});