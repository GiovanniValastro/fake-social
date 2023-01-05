let users = [];

const socketServer = socket => {

  socket.on('joinUser', ({id, friends}) => {
    users.push({id: id, socketId: socket.id, friends: friends});
  })

  socket.on('disconnect', () => {
    const data = users.find(user => user.socketId === socket.id)
    if(data){
      const clients = users.filter(user => 
        data.friends.find(item => item._id === user.id)
      )

      if(clients.length > 0){
        clients.forEach(client => {
          socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
        })
      }
      users = users.filter(user => user.socketId !== socket.id)
    }
  })

   socket.on('likePost', newPost => {
    const ids = [...newPost.creator.friends, newPost.creator._id]
    const clients = users.filter(user => ids.includes(user.id))
    if(clients.length > 0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost)
      })
    }
  })

   socket.on('likeComment', newComment => {
    const ids = [...newComment.creator.friends, newComment.creator._id]
    const clients = users.filter(user => ids.includes(user.id))
    if(clients.length > 0){
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeToComment', newComment)
      })
    }
  })

  socket.on('createNotify', msg => {
    const client = users.find(user => msg.recipients === user.id)
    client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
  })

  socket.on('addMessage', msg => {
    const user = users.find(user => user.id === msg.recipient)
    user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
  })

  socket.on('checkOnlineUser', friends => {
    const onlineFriends = users.filter(user => friends.find(friend => friend._id === user.id))
    socket.emit('checkOnlineUserToMe', onlineFriends) 
  })
  
  socket.on('addFriend', friend => {
    const newFriend = users.find(user => friend.userId === user.id)
    newFriend && socket.to(`${newFriend.socketId}`).emit('addFriendClient', friend) 
  })
}

module.exports = socketServer;