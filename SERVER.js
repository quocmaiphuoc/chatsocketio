var express = require("express")
var app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

var server = require("http").Server(app)
var io = require("socket.io")(server)
server.listen(process.env.PORT || 3000);

var mangUsers = [""]

io.on("connection", function(socket){
    console.log("Có người kết nối "+socket.id)

    socket.on("client-send-Username", (data)=>{
        console.log(data)
        if(mangUsers.indexOf(data)>=0){
            socket.emit("server-send-dki-thatbai");
        }else{
            //thanh cong
            console.log("else")
            socket.Username = data
            mangUsers.push(data);
            socket.emit("server-send-dki-thanhcong", data);
            io.sockets.emit("server-send-danhsach-Users", mangUsers)
        }
    })
    socket.on("logout", function(){
        mangUsers.splice(
            mangUsers.indexOf(socket.Username),1
        );
        socket.broadcast.emit("server-send-danhsach-Users",mangUsers)
    })
    socket.on("user-send-message",function(data){
        io.sockets.emit("server-send-message", {un:socket.Username, nd: data})
    })
    socket.on("toi-dang-go-chu", function(){
       var s = socket.Username+" dang go ";
       io.sockets.emit("ai-do-dang-go-chu",s)
    })
    socket.on("toi-ngung-go-chu", function(){
        io.sockets.emit("ai-do-het-go-chu")
    })
})

app.get("/", function(req,res){
    res.render("trangchu")
})