app.controller('chatController',['$scope', ($scope) => {
    $scope.onlineList= [];
    $scope.activeTab = 2;
    $scope.roomList = [];
    $scope.chatClicked = false;
    $scope.chatName = "";

    const socket = io.connect('http://localhost:3000');
    socket.on('onlineList', users => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    socket.on('roomList', rooms => {
        $scope.roomList = rooms;
        $scope.$apply();
    });

    $scope.switchRoom = (room) => {
        $scope.chatName = room.name;
        $scope.chatClicked = true;
    };

    $scope.newRoom = () => {
        //let randomName = Math.random().toString(36).substring(7);
        let roomName = window.prompt('Enter Room Name');
        if (roomName!==""){
            socket.emit('newRoom', roomName);
        }
        
    }

    $scope.changeTab = tab => {
        $scope.activeTab = tab;
    };
}]);
