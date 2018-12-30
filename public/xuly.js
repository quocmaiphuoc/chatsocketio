var socket = io("https://chatsocketdemo.herokuapp.com")

socket.on("server-send-dki-thatbai",function(){
    alert("sai user name có ng đã đk ròi")
});

socket.on("server-send-dki-thanhcong", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000)
    $("#chatForm").show(1000)
    alert("thanh cong")
})

socket.on("server-send-danhsach-Users", function(data){
    $("#boxContent").html("")
    data.forEach(function(i){
        $("#boxContent").append("<div class='userOnline'>"+ i +"</div>")
    });
})

socket.on("server-send-message",function(data){
    $("#listMessages").append("<div class='ms'>"+ data.un+ ":" + data.nd + "</div>")
})
socket.on("ai-do-dang-go-chu", function(data){
    $("#thongbao").html("<img width='20px' src='a.gif'>"+data)
})
socket.on("ai-do-het-go-chu", function(){
    $("#thongbao").html("")
})
$(document).ready(function(){
    $("#loginForm").show()
    $("#chatForm").hide()

    $("#btnRegister").click(function(){
        socket.emit("client-send-Username", $("#txtUsername").val())
    })
    $("#btnLogout").click(function(){
        socket.emit("logout")
        $("#chatForm").hide(2000)
        $("#loginForm").show(1000)
        
    })
    $("#btnSendMessage").click(function(){
        socket.emit("user-send-message", $("#txtMessage").val())
    })

    $("#txtMessage").focusin(function(){
        socket.emit("toi-dang-go-chu");
    })

    $("#txtMessage").focusout(function(){
        socket.emit("toi-ngung-go-chu");
    })

})




