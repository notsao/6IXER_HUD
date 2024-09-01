document.addEventListener('DOMContentLoaded', function() {

    // Function to update the HUD with data received from Lua
    function updateHUD(data) {
        document.getElementById('user_id').innerText = 'ID: ' + data.playerId;
        document.getElementById('server_player_count').innerText = 'Players: ' + data.playerCount;
        document.getElementById('bank').innerText = 'Bank: $' + data.bank.toLocaleString();
        document.getElementById('cash').innerText = 'Cash: $' + data.cash.toLocaleString();
        document.getElementById('job').innerText = 'Job: ' + data.job;
        document.getElementById('minimap').innerText = data.streetName + ', ' + data.area;
    }

    // Function to update player data items based on dynamic data (health, armor, etc.)
    function updatePlayerDataItem(data) {
        // Map the IDs to their respective data fields and colors
        const statusMap = {
            health: { value: data.health, color: '#f23d3d' }, // Red
            armor: { value: data.armor, color: '#aaa6a6' }, // Grey
            hunger: { value: data.hunger, color: '#1df907' }, // Green
            thirst: { value: data.thirst, color: '#07d4f9' }, // Blue
            stamina: { value: data.stamina, color: '#ffb600' }, // Yellow
            stress: { value: data.stress, color: '#f300ff' } // Pink
        };

        // Iterate over the player data items
        Object.keys(statusMap).forEach(id => {
            const item = document.getElementById(id);

            if (item) {
                const { value, color } = statusMap[id];
                const clampedValue = Math.min(100, Math.max(0, value));
                const degree = (clampedValue / 100) * 360;

                // Update the border image with dynamic color and border radius
                item.style.borderImage = `conic-gradient(${color} ${degree}deg, #ddd ${degree}deg) 1`;
                item.style.borderRadius = '15px';
            }
        });
    }

    // Listen for the message event from Lua
    window.addEventListener('message', (event) => {
        let data = event.data;

        if (data.action === 'updatePlayerData') {
            // Update the HUD and player data items with the received data
            updateHUD(data);
            updatePlayerDataItem(data);
            console.log(data)
        }
    });
});
