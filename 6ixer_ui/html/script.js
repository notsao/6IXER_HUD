document.addEventListener('DOMContentLoaded', function() {
    // Simulate fetching data
    const jsonData = {
        "playerId": 123,
        "health": 85,
        "armor": 50,
        "hunger": 40,
        "thirst": 60,
        "bank": 15000,
        "cash": 500,
        "job": "Police",
        "streetName": "Vinewood Blvd",
        "area": "Downtown Vinewood",
        "playerCount": 32,
        "stress": 10,
        "stamina": 100
    };

    // Function to update the HUD with JSON data
    function updateHUD(data) {
        document.getElementById('user_id').innerText = 'ID: ' + data.playerId;
        document.getElementById('bank').innerText = 'Bank: $' + data.bank.toLocaleString();
        document.getElementById('cash').innerText = 'Cash: $' + data.cash.toLocaleString();
        document.getElementById('job').innerText = 'Job: ' + data.job;
        document.getElementById('server_player_count').innerText = 'Players: ' + data.playerCount;
        document.getElementById('minimap').innerText = data.streetName + ', ' + data.area;
    }

    // Call the function to update the HUD
    updateHUD(jsonData);
});
